$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Weights = Join-Path $Root "weights"
New-Item -ItemType Directory -Force -Path $Weights | Out-Null

$Url = "https://github.com/ultralytics/yolov5/releases/download/v7.0/yolov5s.pt"
$Out = Join-Path $Weights "yolov5s.pt"

Write-Host "Downloading YOLOv5s transfer-learning weights..."
Invoke-WebRequest -Uri $Url -OutFile $Out
Write-Host "Saved to $Out"
