from __future__ import annotations

import logging
import time
import uuid
from pathlib import Path

import cv2
from fastapi import FastAPI, File, HTTPException, Query, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image, UnidentifiedImageError
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.extension import _rate_limit_exceeded_handler
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from app.core.config import get_settings
from app.core.logging import configure_logging
from app.schemas.detection import MetricsResponse, PredictionResponse
from app.services.detector import get_detector
from app.services.metrics import metrics_store

configure_logging()
logger = logging.getLogger(__name__)
settings = get_settings()
limiter = Limiter(key_func=get_remote_address, default_limits=[settings.rate_limit])

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Intelligent traffic violation detection API using YOLOv5.",
    contact={"name": settings.owner},
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/results", StaticFiles(directory=settings.result_dir), name="results")


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled API error: %s", exc)
    return JSONResponse(status_code=500, content={"detail": "Internal server error."})


@app.get("/")
async def root() -> dict:
    return {
        "name": settings.app_name,
        "status": "online",
        "owner": settings.owner,
        "docs": "/docs",
    }


@app.get("/health")
async def health() -> dict:
    return {"status": "healthy", "version": settings.app_version}


@app.post("/predict", response_model=PredictionResponse)
@limiter.limit(settings.rate_limit)
async def predict(
    request: Request,
    file: UploadFile = File(...),
    confidence: float = Query(settings.default_confidence, ge=0.05, le=0.95),
) -> PredictionResponse:
    validate_file(file, ["image/jpeg", "image/png", "image/webp"], "image")
    raw = await read_limited(file)
    try:
        image = Image.open(bytes_to_file(raw))
    except UnidentifiedImageError as exc:
        raise HTTPException(status_code=400, detail="Invalid image file.") from exc

    started = time.perf_counter()
    result = get_detector().predict_image(image, confidence)
    latency = (time.perf_counter() - started) * 1000

    result_name = f"{uuid.uuid4().hex}.jpg"
    result_path = settings.result_dir / result_name
    cv2.imwrite(str(result_path), result.annotated)
    metrics_store.record("image", result.detections, latency)

    return PredictionResponse(
        detections=result.detections,
        image_url=f"/results/{result_name}",
        fps=result.fps,
        inference_ms=result.inference_ms,
        statistics=result.statistics,
    )


@app.post("/predict-video", response_model=PredictionResponse)
@limiter.limit(settings.rate_limit)
async def predict_video(
    request: Request,
    file: UploadFile = File(...),
    confidence: float = Query(settings.default_confidence, ge=0.05, le=0.95),
) -> PredictionResponse:
    validate_file(file, ["video/mp4", "video/quicktime", "video/x-msvideo"], "video")
    raw = await read_limited(file)
    input_path = settings.upload_dir / f"{uuid.uuid4().hex}_{sanitize_name(file.filename or 'video.mp4')}"
    output_name = f"{uuid.uuid4().hex}.mp4"
    output_path = settings.result_dir / output_name
    input_path.write_bytes(raw)

    started = time.perf_counter()
    detections, fps, inference_ms, statistics = get_detector().predict_video(
        input_path, output_path, confidence
    )
    latency = (time.perf_counter() - started) * 1000
    metrics_store.record("video", detections, latency)
    return PredictionResponse(
        detections=detections[:300],
        video_url=f"/results/{output_name}",
        fps=fps,
        inference_ms=inference_ms,
        statistics=statistics,
    )


@app.post("/webcam", response_model=PredictionResponse)
@limiter.limit(settings.rate_limit)
async def webcam(
    request: Request,
    file: UploadFile = File(...),
    confidence: float = Query(settings.default_confidence, ge=0.05, le=0.95),
) -> PredictionResponse:
    validate_file(file, ["image/jpeg", "image/png", "image/webp"], "webcam frame")
    raw = await read_limited(file)
    try:
        image = Image.open(bytes_to_file(raw))
    except UnidentifiedImageError as exc:
        raise HTTPException(status_code=400, detail="Invalid webcam frame.") from exc

    result = get_detector().predict_image(image, confidence)
    result_name = f"webcam_{uuid.uuid4().hex}.jpg"
    cv2.imwrite(str(settings.result_dir / result_name), result.annotated)
    metrics_store.record("webcam", result.detections, result.inference_ms)
    return PredictionResponse(
        detections=result.detections,
        image_url=f"/results/{result_name}",
        fps=result.fps,
        inference_ms=result.inference_ms,
        statistics=result.statistics,
    )


@app.get("/metrics", response_model=MetricsResponse)
async def metrics() -> MetricsResponse:
    return MetricsResponse(**metrics_store.snapshot())


def validate_file(file: UploadFile, allowed: list[str], label: str) -> None:
    if file.content_type not in allowed:
        raise HTTPException(status_code=415, detail=f"Unsupported {label} format.")


async def read_limited(file: UploadFile) -> bytes:
    content = await file.read()
    if len(content) > settings.max_upload_mb * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File is too large.")
    return content


def sanitize_name(name: str) -> str:
    return "".join(ch for ch in Path(name).name if ch.isalnum() or ch in "._-")


def bytes_to_file(raw: bytes):
    from io import BytesIO

    return BytesIO(raw)
