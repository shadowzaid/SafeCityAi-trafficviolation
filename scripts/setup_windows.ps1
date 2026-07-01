$ErrorActionPreference = "Stop"

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  Write-Host "Python is not on PATH. Install Python 3.11 from https://www.python.org/downloads/ and rerun."
  exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js/npm is not on PATH. Install Node.js LTS from https://nodejs.org/ and rerun."
  exit 1
}

Set-Location (Split-Path -Parent $PSScriptRoot)

python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\pip.exe install -r backend\requirements.txt
npm --prefix frontend install
.\scripts\download_weights.ps1

if (-not (Test-Path "training\yolov5")) {
  git clone https://github.com/ultralytics/yolov5.git training\yolov5
  .\.venv\Scripts\pip.exe install -r training\yolov5\requirements.txt
}

Write-Host "SafeCityAI setup complete."
