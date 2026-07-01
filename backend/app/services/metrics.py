from collections import Counter
from threading import Lock


class MetricsStore:
    def __init__(self) -> None:
        self._lock = Lock()
        self.total_requests = 0
        self.image_requests = 0
        self.video_requests = 0
        self.webcam_requests = 0
        self.detections_by_class: Counter[str] = Counter()
        self.latencies_ms: list[float] = []

    def record(self, kind: str, detections: list[dict], latency_ms: float) -> None:
        with self._lock:
            self.total_requests += 1
            if kind == "image":
                self.image_requests += 1
            elif kind == "video":
                self.video_requests += 1
            elif kind == "webcam":
                self.webcam_requests += 1
            for item in detections:
                self.detections_by_class[item["class"]] += 1
            self.latencies_ms.append(latency_ms)
            self.latencies_ms = self.latencies_ms[-500:]

    def snapshot(self) -> dict:
        with self._lock:
            avg = (
                sum(self.latencies_ms) / len(self.latencies_ms)
                if self.latencies_ms
                else 0.0
            )
            return {
                "total_requests": self.total_requests,
                "image_requests": self.image_requests,
                "video_requests": self.video_requests,
                "webcam_requests": self.webcam_requests,
                "detections_by_class": dict(self.detections_by_class),
                "average_latency_ms": round(avg, 2),
            }


metrics_store = MetricsStore()
