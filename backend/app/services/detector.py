from __future__ import annotations

import logging
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import cv2
import numpy as np
import torch
from PIL import Image

from app.core.config import get_settings

logger = logging.getLogger(__name__)

TARGET_CLASSES = ["Helmet", "No_Helmet", "License_Plate"]


@dataclass
class InferenceResult:
    detections: list[dict[str, Any]]
    annotated: np.ndarray
    fps: float
    inference_ms: float
    statistics: dict[str, int]


class YOLOv5Detector:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = self._load_model()
        self.model.to(self.device)
        self.model.eval()
        logger.info("YOLOv5 model loaded on %s", self.device)

    def _load_model(self) -> Any:
        custom = self.settings.model_weights
        fallback = self.settings.fallback_weights
        hub_source = "local" if self.settings.yolov5_dir.exists() else "github"
        hub_repo = str(self.settings.yolov5_dir) if hub_source == "local" else "ultralytics/yolov5"

        if custom.exists():
            logger.info("Loading custom SafeCityAI weights: %s", custom)
            model = torch.hub.load(
                hub_repo,
                "custom",
                path=str(custom),
                source=hub_source,
                trust_repo=True,
            )
            model.names = {i: name for i, name in enumerate(TARGET_CLASSES)}
            return model

        weights = fallback if fallback.exists() else "yolov5s.pt"
        logger.warning(
            "Custom weights not found. Loading yolov5s transfer-learning base: %s",
            weights,
        )
        if Path(str(weights)).exists():
            return torch.hub.load(
                hub_repo,
                "custom",
                path=str(weights),
                source=hub_source,
                trust_repo=True,
            )
        return torch.hub.load("ultralytics/yolov5", "yolov5s", source="github", trust_repo=True)

    def predict_image(self, image: Image.Image, confidence: float) -> InferenceResult:
        start = time.perf_counter()
        image_rgb = image.convert("RGB")
        self.model.conf = float(confidence)
        results = self.model(image_rgb, size=640)
        inference_ms = (time.perf_counter() - start) * 1000

        frame = cv2.cvtColor(np.array(image_rgb), cv2.COLOR_RGB2BGR)
        detections = self._parse_results(results, frame)
        fps = 1000.0 / inference_ms if inference_ms else 0.0
        return InferenceResult(
            detections=detections,
            annotated=frame,
            fps=round(fps, 2),
            inference_ms=round(inference_ms, 2),
            statistics=self._stats(detections),
        )

    def predict_video(
        self,
        input_path: Path,
        output_path: Path,
        confidence: float,
    ) -> tuple[list[dict[str, Any]], float, float, dict[str, int]]:
        capture = cv2.VideoCapture(str(input_path))
        if not capture.isOpened():
            raise ValueError("Unable to open uploaded video.")

        width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
        source_fps = capture.get(cv2.CAP_PROP_FPS) or 24.0
        writer = cv2.VideoWriter(
            str(output_path),
            cv2.VideoWriter_fourcc(*"mp4v"),
            source_fps,
            (width, height),
        )

        self.model.conf = float(confidence)
        all_detections: list[dict[str, Any]] = []
        frame_count = 0
        started = time.perf_counter()

        while True:
            ok, frame = capture.read()
            if not ok:
                break
            frame_count += 1
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = self.model(rgb, size=640)
            frame_detections = self._parse_results(results, frame)
            all_detections.extend(frame_detections)
            writer.write(frame)

        capture.release()
        writer.release()
        elapsed = time.perf_counter() - started
        fps = frame_count / elapsed if elapsed else 0.0
        latency_ms = elapsed * 1000
        return all_detections, round(fps, 2), round(latency_ms, 2), self._stats(all_detections)

    def _parse_results(self, results: Any, frame: np.ndarray) -> list[dict[str, Any]]:
        detections: list[dict[str, Any]] = []
        names = results.names if hasattr(results, "names") else self.model.names
        for *xyxy, conf, cls in results.xyxy[0].detach().cpu().numpy().tolist():
            x1, y1, x2, y2 = [int(v) for v in xyxy]
            class_name = names.get(int(cls), str(int(cls))) if isinstance(names, dict) else names[int(cls)]
            detection = {
                "class": str(class_name),
                "confidence": round(float(conf), 4),
                "bbox": [x1, y1, x2 - x1, y2 - y1],
            }
            detections.append(detection)
            self._draw_box(frame, x1, y1, x2, y2, detection)
        return detections

    @staticmethod
    def _draw_box(
        frame: np.ndarray,
        x1: int,
        y1: int,
        x2: int,
        y2: int,
        detection: dict[str, Any],
    ) -> None:
        palette = {
            "Helmet": (46, 204, 113),
            "No_Helmet": (231, 76, 60),
            "License_Plate": (52, 152, 219),
        }
        color = palette.get(detection["class"], (245, 158, 11))
        label = f'{detection["class"]} {detection["confidence"]:.2f}'
        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        cv2.rectangle(frame, (x1, max(0, y1 - 28)), (x1 + 10 + len(label) * 9, y1), color, -1)
        cv2.putText(
            frame,
            label,
            (x1 + 5, y1 - 8),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.55,
            (255, 255, 255),
            2,
            cv2.LINE_AA,
        )

    @staticmethod
    def _stats(detections: list[dict[str, Any]]) -> dict[str, int]:
        stats = {name: 0 for name in TARGET_CLASSES}
        for item in detections:
            stats[item["class"]] = stats.get(item["class"], 0) + 1
        return stats


_detector: YOLOv5Detector | None = None


def get_detector() -> YOLOv5Detector:
    global _detector
    if _detector is None:
        _detector = YOLOv5Detector()
    return _detector
