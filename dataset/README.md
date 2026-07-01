# SafeCityAI Dataset

Owner: Mohammed Zaid Nayaz

This folder is ready for YOLOv5 custom training.

## Structure

```text
dataset/
  images/
    train/
    val/
    test/
  labels/
    train/
    val/
    test/
  data.yaml
```

Each image must have a matching `.txt` label file with the same filename in the equivalent `labels` split.

## Classes

| ID | Class |
|---:|---|
| 0 | Helmet |
| 1 | No_Helmet |
| 2 | License_Plate |

## YOLO Label Format

Each line in a label file:

```text
class_id x_center y_center width height
```

All coordinates are normalized between `0` and `1`.

Example:

```text
1 0.512 0.441 0.184 0.263
2 0.641 0.733 0.218 0.071
```

## Split Guidance

Use an 80 / 10 / 10 split:

- `train`: model learning
- `val`: hyperparameter and checkpoint selection
- `test`: final unbiased evaluation

## Augmentation Guidance

Recommended augmentations for traffic footage:

- Horizontal flip for rider orientation diversity
- Random brightness and contrast for day/night variation
- Motion blur for moving cameras
- HSV shift for different camera sensors
- Mosaic augmentation for dense road scenes
- Random crop only when objects remain visible

Avoid vertical flip because traffic-camera geometry becomes unrealistic.

## LabelImg Workflow

1. Install LabelImg: `pip install labelImg`
2. Launch: `labelImg`
3. Select PascalVOC/YOLO mode as needed, then save as YOLO.
4. Create classes in this exact order: `Helmet`, `No_Helmet`, `License_Plate`.
5. Save labels beside the matching image split.

## Roboflow Workflow

1. Create a new Object Detection project.
2. Upload raw images and videos.
3. Annotate with the three class names exactly.
4. Generate a YOLOv5 PyTorch export.
5. Copy exported `images`, `labels`, and `data.yaml` into this dataset folder.

## Quality Checklist

- Every visible rider head should be labeled as `Helmet` or `No_Helmet`.
- License plates must be tight boxes around the plate region.
- Do not label unreadable helmets hidden behind heavy occlusion.
- Include difficult negatives: cars, pedestrians, bicycles, shadows, and signboards.
