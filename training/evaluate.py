from __future__ import annotations

import argparse
import json
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="Summarize YOLOv5 evaluation artifacts.")
    parser.add_argument("--run", default="training/runs/validation/safecityai-validation")
    args = parser.parse_args()

    run_dir = Path(args.run)
    results = {
        "run": str(run_dir),
        "precision_recall_curve": str(run_dir / "PR_curve.png"),
        "f1_curve": str(run_dir / "F1_curve.png"),
        "confusion_matrix": str(run_dir / "confusion_matrix.png"),
        "results_csv": str(run_dir / "results.csv"),
        "notes": "Open TensorBoard with: tensorboard --logdir training/runs",
    }
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
