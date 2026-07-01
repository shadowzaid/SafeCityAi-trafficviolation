# Installation

Owner: Mohammed Zaid Nayaz

## Requirements

- Python 3.11
- Node.js LTS
- Git
- Optional NVIDIA CUDA GPU for faster inference/training

## Windows Setup

```powershell
cd SafeCityAI
.\scripts\setup_windows.ps1
```

This creates `.venv`, installs backend dependencies, installs frontend dependencies, downloads `yolov5s.pt`, and clones YOLOv5 into `training/yolov5` for local model loading.

## Manual Setup

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\pip.exe install -r backend\requirements.txt
npm --prefix frontend install
.\scripts\download_weights.ps1
```

## Environment

Copy `.env.example` to `.env` and adjust:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000
SAFECITY_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
SAFECITY_MODEL_WEIGHTS=weights/best.pt
```
