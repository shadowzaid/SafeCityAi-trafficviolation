# Architecture

SafeCityAI is split into a React presentation layer, a FastAPI inference layer, YOLOv5 model utilities, and a YOLO-format dataset workspace.

```mermaid
flowchart LR
  User["User / Camera Operator"] --> UI["React Vite Dashboard"]
  UI --> API["FastAPI API"]
  API --> Validator["Upload Validation + Rate Limit"]
  Validator --> Model["YOLOv5 Detector"]
  Model --> Annotator["OpenCV Annotator"]
  Annotator --> Storage["Processed Media Storage"]
  Model --> Metrics["Runtime Metrics"]
  Storage --> UI
  Metrics --> UI
  Dataset["Custom Dataset"] --> Training["YOLOv5 Training"]
  Training --> Weights["weights/best.pt"]
  Weights --> Model
```

## Components

- Frontend: React, Vite, TypeScript, TailwindCSS, Framer Motion, Hero Icons, Axios
- Backend: FastAPI, Uvicorn, OpenCV, PyTorch, YOLOv5, Pillow, NumPy
- Training: YOLOv5 scripts for train, val, detect, export, evaluate
- Deployment: Vercel for frontend, Render for backend
