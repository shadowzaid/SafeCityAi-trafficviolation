from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
YOLOV5_DIR = ROOT / "training" / "yolov5"


def ensure_yolov5() -> None:
    if YOLOV5_DIR.exists():
        return
    subprocess.run(
        ["git", "clone", "https://github.com/ultralytics/yolov5.git", str(YOLOV5_DIR)],
        check=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Train SafeCityAI YOLOv5 model.")
    parser.add_argument("--epochs", type=int, default=80)
    parser.add_argument("--batch", type=int, default=16)
    parser.add_argument("--img", type=int, default=640)
    parser.add_argument("--weights", default=str(ROOT / "weights" / "yolov5s.pt"))
    parser.add_argument("--data", default=str(ROOT / "dataset" / "data.yaml"))
    parser.add_argument("--name", default="safecityai-yolov5s")
    args = parser.parse_args()

    ensure_yolov5()
    command = [
        sys.executable,
        "train.py",
        "--img",
        str(args.img),
        "--batch",
        str(args.batch),
        "--epochs",
        str(args.epochs),
        "--data",
        args.data,
        "--weights",
        args.weights,
        "--name",
        args.name,
        "--project",
        str(ROOT / "training" / "runs" / "train"),
        "--cache",
    ]
    subprocess.run(command, cwd=YOLOV5_DIR, check=True)


if __name__ == "__main__":
    main()
