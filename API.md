# API Reference

Base URL: `http://127.0.0.1:8000`

## POST /predict

Form data:

- `file`: image
- `confidence`: query number from `0.05` to `0.95`

Response:

```json
{
  "detections": [
    {
      "class": "No_Helmet",
      "confidence": 0.91,
      "bbox": [120, 220, 80, 110]
    }
  ],
  "image_url": "/results/abc.jpg",
  "fps": 28.4,
  "inference_ms": 35.2,
  "statistics": {
    "Helmet": 0,
    "No_Helmet": 1,
    "License_Plate": 1
  }
}
```

## POST /predict-video

Accepts MP4, MOV, AVI and returns `video_url`.

## POST /webcam

Accepts a single image frame and returns annotated image output.

## GET /metrics

Returns runtime API counts, latency, and detections by class.
