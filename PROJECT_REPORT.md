# SafeCityAI Project Report

Designed & Developed by Mohammed Zaid Nayaz  
Project Owner: Mohammed Zaid Nayaz  
Copyright © 2026 Mohammed Zaid Nayaz. All Rights Reserved.

## Abstract

SafeCityAI is an intelligent traffic violation detection system that uses YOLOv5 to detect helmet compliance and license plates in images, videos, and live camera frames. The project combines transfer learning, a FastAPI inference service, and a modern React dashboard to provide an end-to-end AI system suitable for demonstration and deployment.

## Objectives

- Detect `Helmet`, `No_Helmet`, and `License_Plate`.
- Support image, video, and webcam inference.
- Display bounding boxes, confidence scores, FPS, and statistics.
- Prepare a custom dataset training workflow.
- Deploy frontend to Vercel and backend to Render.

## Problem Statement

Manual traffic monitoring is slow, inconsistent, and difficult to scale. Helmet and license plate violations are safety-critical events that benefit from automated detection. SafeCityAI provides a practical computer-vision pipeline for identifying these events from traffic media.

## Literature Review

Object detection has evolved from region proposal methods such as R-CNN to single-stage detectors such as YOLO and SSD. YOLOv5 is widely used because it balances speed, accuracy, usability, and transfer-learning support. For traffic applications, single-stage detectors are useful because road scenes require rapid inference under changing lighting, occlusion, and motion blur.

## Methodology

1. Collect road images and video frames.
2. Annotate three classes in YOLO format.
3. Split the dataset into train, validation, and test sets.
4. Fine-tune YOLOv5s from pretrained weights.
5. Validate using precision, recall, mAP, and confusion matrix.
6. Serve inference through FastAPI.
7. Visualize results in React.

## Architecture

The system uses a client-server architecture. The frontend uploads media and controls confidence thresholds. The backend validates input, runs YOLOv5 inference, annotates media with OpenCV, records metrics, and returns JSON plus result URLs.

## YOLO Explanation

YOLO divides an image into a prediction space and directly predicts bounding boxes, class probabilities, and objectness scores in a single forward pass. This makes it fast enough for near-realtime detection.

## Transfer Learning

SafeCityAI starts from `yolov5s.pt`, which already contains general visual features learned from a large dataset. Custom training adapts those features to helmet and license plate classes, requiring less data and less training time than training from scratch.

## IoU

Intersection over Union measures overlap between a predicted bounding box and a ground-truth box. Higher IoU indicates better localization.

## NMS

Non-Maximum Suppression removes duplicate overlapping predictions by keeping the highest-confidence box and suppressing lower-confidence boxes above an IoU threshold.

## Precision, Recall, and mAP

- Precision: how many predicted violations are correct.
- Recall: how many true violations are found.
- mAP: mean Average Precision across classes and IoU thresholds.

## Results

The repository is configured to automatically generate training curves, precision-recall curves, F1 curves, mAP metrics, and confusion matrix plots through YOLOv5 validation. Final numeric results depend on the collected custom dataset quality and are produced under `training/runs/`.

## Future Scope

- Add red-light violation and triple-riding classes.
- Integrate camera streams with RTSP.
- Add OCR for license plate recognition.
- Add alerting, audit trails, and role-based access control.
- Deploy GPU-backed inference for high-volume intersections.

## References

- Ultralytics YOLOv5 repository
- FastAPI documentation
- OpenCV documentation
- PyTorch documentation
- Roboflow dataset annotation workflows
