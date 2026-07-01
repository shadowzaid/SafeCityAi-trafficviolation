# Training Guide

Project Owner: Mohammed Zaid Nayaz

## Objective

Fine-tune YOLOv5 from `yolov5s.pt` for:

1. Helmet
2. No_Helmet
3. License_Plate

## Dataset Preparation

Follow `dataset/README.md`. Use LabelImg or Roboflow with YOLO format.

## Train

```powershell
python training\train.py --epochs 80 --batch 16 --img 640
```

## Validate

```powershell
python training\validate.py --weights weights\best.pt
```

## Evaluate Artifacts

YOLOv5 generates:

- `results.png`
- `PR_curve.png`
- `P_curve.png`
- `R_curve.png`
- `F1_curve.png`
- `confusion_matrix.png`
- `results.csv`
- TensorBoard event files

Run:

```powershell
tensorboard --logdir training\runs
```

## Export

```powershell
python training\export.py --weights weights\best.pt --include torchscript,onnx
```
