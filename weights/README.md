# Model Weights

Place trained YOLOv5 model files here.

Recommended files:

- `yolov5s.pt`: transfer-learning base weights
- `best.pt`: trained SafeCityAI custom model

Download the base model:

```powershell
.\scripts\download_weights.ps1
```

After training, copy:

```text
training/runs/train/safecityai-yolov5s/weights/best.pt
```

to:

```text
weights/best.pt
```
