from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
YOLOV5_DIR = ROOT / "training" / "yolov5"


def main() -> None:
    parser = argparse.ArgumentParser(description="Run YOLOv5 detection on images or videos.")
    parser.add_argument("--source", required=True)
    parser.add_argument("--weights", default=str(ROOT / "weights" / "best.pt"))
    parser.add_argument("--conf", type=float, default=0.35)
    args = parser.parse_args()

    command = [
        sys.executable,
        "detect.py",
        "--source",
        args.source,
        "--weights",
        args.weights,
        "--conf",
        str(args.conf),
        "--project",
        str(ROOT / "training" / "runs" / "detect"),
        "--name",
        "safecityai-detections",
        "--save-txt",
        "--save-conf",
    ]
    subprocess.run(command, cwd=YOLOV5_DIR, check=True)


if __name__ == "__main__":
    main()
