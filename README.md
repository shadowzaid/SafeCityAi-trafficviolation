# SafeCityAI

Intelligent Traffic Violation Detection using YOLOv5.

Designed & Developed by Mohammed Zaid Nayaz  
Project Owner: Mohammed Zaid Nayaz  
Copyright © 2026 Mohammed Zaid Nayaz. All Rights Reserved.

## Overview

SafeCityAI is a production-ready AI object detection project for detecting:

- Helmet
- No_Helmet
- License_Plate

It includes a FastAPI backend, a premium React + Vite dashboard, YOLOv5 training scripts, dataset preparation guides, deployment files, tests, diagrams, and a Windows launcher.

## Project Structure

```text
SafeCityAI/
  frontend/       React, Vite, TypeScript, TailwindCSS
  backend/        FastAPI, OpenCV, PyTorch, YOLOv5 inference API
  dataset/        YOLO dataset folders and data.yaml
  training/       train, detect, validate, export, evaluate scripts
  weights/        yolov5s.pt and trained best.pt location
  docs/           documentation and diagrams
  scripts/        setup and utility scripts
  screenshots/    demo screenshot outputs
  demo/           demo guide and presentation assets
```

## Quick Start

```powershell
cd SafeCityAI
.\scripts\setup_windows.ps1
.\RUN_SAFE_CITY_AI.bat
```

Manual backend:

```powershell
cd backend
..\.venv\Scripts\uvicorn.exe app.main:app --reload
```

Manual frontend:

```powershell
cd frontend
npm install
npm run dev
```

## API

Backend runs on `http://127.0.0.1:8000`.

- `GET /`
- `GET /health`
- `POST /predict`
- `POST /predict-video`
- `POST /webcam`
- `GET /metrics`
- `GET /docs`

Example detection:

```json
{
  "class": "No_Helmet",
  "confidence": 0.91,
  "bbox": [120, 220, 80, 110]
}
```

## Training

Prepare images and labels inside `dataset/`, then run:

```powershell
python training\train.py --epochs 80 --batch 16 --img 640
python training\validate.py
python training\export.py
```

YOLOv5 automatically writes loss graphs, precision, recall, mAP, confusion matrix, and TensorBoard logs to `training/runs/`.

## Deployment

- Frontend: Vercel using `frontend/vercel.json`
- Backend: Render using `render.yaml`
- Optional Dockerfiles are included for containerized demos.

See `DEPLOYMENT.md`.
