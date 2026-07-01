from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
YOLOV5_DIR = ROOT / "training" / "yolov5"


def main() -> None:
    parser = argparse.ArgumentParser(description="Export SafeCityAI YOLOv5 model.")
    parser.add_argument("--weights", default=str(ROOT / "weights" / "best.pt"))
    parser.add_argument("--include", default="torchscript,onnx")
    args = parser.parse_args()

    command = [
        sys.executable,
        "export.py",
        "--weights",
        args.weights,
        "--include",
        *args.include.split(","),
        "--img",
        "640",
    ]
    subprocess.run(command, cwd=YOLOV5_DIR, check=True)


if __name__ == "__main__":
    main()
