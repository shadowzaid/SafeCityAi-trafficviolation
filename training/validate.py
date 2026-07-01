from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
YOLOV5_DIR = ROOT / "training" / "yolov5"


def main() -> None:
    parser = argparse.ArgumentParser(description="Validate SafeCityAI model.")
    parser.add_argument("--weights", default=str(ROOT / "weights" / "best.pt"))
    parser.add_argument("--data", default=str(ROOT / "dataset" / "data.yaml"))
    args = parser.parse_args()

    command = [
        sys.executable,
        "val.py",
        "--weights",
        args.weights,
        "--data",
        args.data,
        "--img",
        "640",
        "--project",
        str(ROOT / "training" / "runs" / "validation"),
        "--name",
        "safecityai-validation",
        "--save-json",
        "--plots",
    ]
    subprocess.run(command, cwd=YOLOV5_DIR, check=True)


if __name__ == "__main__":
    main()
