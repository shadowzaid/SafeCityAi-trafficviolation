from pydantic import BaseModel, ConfigDict, Field


class Detection(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    class_name: str = Field(..., alias="class")
    confidence: float
    bbox: list[int]


class PredictionResponse(BaseModel):
    detections: list[Detection]
    image_url: str | None = None
    video_url: str | None = None
    fps: float
    inference_ms: float
    statistics: dict[str, int]


class MetricsResponse(BaseModel):
    total_requests: int
    image_requests: int
    video_requests: int
    webcam_requests: int
    detections_by_class: dict[str, int]
    average_latency_ms: float
