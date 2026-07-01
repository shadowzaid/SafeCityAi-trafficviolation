from functools import lru_cache
import os
from pathlib import Path
from pydantic import BaseModel

BACKEND_DIR = Path(__file__).resolve().parents[2]
PROJECT_ROOT = BACKEND_DIR.parent


class Settings(BaseModel):
    app_name: str = "SafeCityAI API"
    app_version: str = "1.0.0"
    owner: str = "Mohammed Zaid Nayaz"
    allowed_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://safecityai.vercel.app",
    ]
    max_upload_mb: int = 250
    default_confidence: float = 0.35
    project_root: Path = PROJECT_ROOT
    backend_dir: Path = BACKEND_DIR
    model_weights: Path = PROJECT_ROOT / "weights" / "best.pt"
    fallback_weights: Path = PROJECT_ROOT / "weights" / "yolov5s.pt"
    yolov5_dir: Path = PROJECT_ROOT / "training" / "yolov5"
    upload_dir: Path = BACKEND_DIR / "storage" / "uploads"
    result_dir: Path = BACKEND_DIR / "storage" / "results"
    rate_limit: str = "60/minute"


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    origins = os.getenv("SAFECITY_ALLOWED_ORIGINS")
    if origins:
        settings.allowed_origins = [origin.strip() for origin in origins.split(",") if origin.strip()]
    settings.rate_limit = os.getenv("SAFECITY_RATE_LIMIT", settings.rate_limit)
    settings.model_weights = resolve_path(os.getenv("SAFECITY_MODEL_WEIGHTS"), settings.model_weights)
    settings.fallback_weights = resolve_path(os.getenv("SAFECITY_FALLBACK_WEIGHTS"), settings.fallback_weights)
    settings.yolov5_dir = resolve_path(os.getenv("SAFECITY_YOLOV5_DIR"), settings.yolov5_dir)
    settings.upload_dir.mkdir(parents=True, exist_ok=True)
    settings.result_dir.mkdir(parents=True, exist_ok=True)
    return settings


def resolve_path(value: str | None, default: Path) -> Path:
    if not value:
        return default
    path = Path(value)
    if path.is_absolute():
        return path
    return PROJECT_ROOT / path
