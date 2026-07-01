# SafeCityAI Project Book

## Identity

Project: SafeCityAI  
Owner: Mohammed Zaid Nayaz  
Copyright © 2026 Mohammed Zaid Nayaz. All Rights Reserved.

## Executive Summary

SafeCityAI is an end-to-end AI object detection application built for intelligent traffic violation monitoring. It combines a premium user interface, FastAPI backend, YOLOv5 inference, custom training scripts, deployment assets, and complete documentation.

## User Journey

1. User opens the dashboard.
2. User selects image, video, or webcam mode.
3. User adjusts confidence threshold.
4. User uploads media or captures a frame.
5. SafeCityAI returns annotated output.
6. User reviews detections, statistics, FPS, and confidence scores.
7. User downloads annotated evidence.

## Engineering Notes

- GPU is used automatically when CUDA is available.
- CPU fallback keeps demos portable.
- Uploads are validated by MIME type and file size.
- The API exposes Swagger at `/docs`.
- Runtime metrics are stored in memory for lightweight demos.

## Quality Assurance

- Backend health tests are included.
- Frontend render test is included.
- Deployment health check targets `/health`.
- Build scripts are defined for frontend and backend.

## Ownership

Every public-facing page footer includes:

Designed & Developed by Mohammed Zaid Nayaz  
Project Owner: Mohammed Zaid Nayaz  
Copyright © 2026 Mohammed Zaid Nayaz. All Rights Reserved.
