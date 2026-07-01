# Presentation Outline

## Slide 1: SafeCityAI

Intelligent Traffic Violation Detection using YOLOv5  
Designed & Developed by Mohammed Zaid Nayaz

## Slide 2: Problem

Manual traffic violation monitoring is difficult to scale and prone to inconsistent review.

## Slide 3: Solution

SafeCityAI detects helmets, missing helmets, and license plates from traffic media.

## Slide 4: Tech Stack

React, Vite, TypeScript, TailwindCSS, FastAPI, OpenCV, PyTorch, YOLOv5.

## Slide 5: Architecture

Frontend dashboard → FastAPI API → YOLOv5 detector → OpenCV annotator → metrics and downloadable evidence.

## Slide 6: Model

Transfer learning from `yolov5s.pt` for three custom classes.

## Slide 7: Dataset

YOLO-format dataset with train, validation, and test splits.

## Slide 8: Demo

Image detection, video detection, live webcam detection, API Swagger, metrics dashboard.

## Slide 9: Deployment

Frontend on Vercel, backend on Render.

## Slide 10: Future Scope

OCR, RTSP streaming, dashboards, alerts, and additional violation classes.
