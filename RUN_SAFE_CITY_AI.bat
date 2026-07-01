@echo off
setlocal
title SafeCityAI Launcher

set "ROOT=%~dp0"
cd /d "%ROOT%"

where python >nul 2>nul
if errorlevel 1 (
  echo Python is not available on PATH.
  echo Install Python 3.11, then run scripts\setup_windows.ps1.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js/npm is not available on PATH.
  echo Install Node.js LTS, then run scripts\setup_windows.ps1.
  pause
  exit /b 1
)

where git >nul 2>nul
if errorlevel 1 (
  echo Git is not available on PATH.
  echo Install Git for Windows, then run scripts\setup_windows.ps1.
  pause
  exit /b 1
)

if not exist "%ROOT%.venv\Scripts\python.exe" (
  echo Creating virtual environment and installing backend dependencies...
  python -m venv "%ROOT%.venv"
  "%ROOT%.venv\Scripts\python.exe" -m pip install --upgrade pip
  "%ROOT%.venv\Scripts\pip.exe" install -r "%ROOT%backend\requirements.txt"
)

if not exist "%ROOT%frontend\node_modules" (
  echo Installing frontend dependencies...
  npm --prefix "%ROOT%frontend" install
)

if not exist "%ROOT%weights\yolov5s.pt" (
  echo Base YOLOv5 weights are missing. Attempting download...
  powershell -ExecutionPolicy Bypass -File "%ROOT%scripts\download_weights.ps1"
)

if not exist "%ROOT%training\yolov5" (
  echo YOLOv5 source is missing. Cloning for local model loading...
  git clone https://github.com/ultralytics/yolov5.git "%ROOT%training\yolov5"
  "%ROOT%.venv\Scripts\pip.exe" install -r "%ROOT%training\yolov5\requirements.txt"
)

start "SafeCityAI API" powershell -NoExit -ExecutionPolicy Bypass -Command "Set-Location '%ROOT%backend'; ..\.venv\Scripts\uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload"
timeout /t 4 /nobreak >nul
start "SafeCityAI Frontend" powershell -NoExit -ExecutionPolicy Bypass -Command "Set-Location '%ROOT%frontend'; npm run dev"
timeout /t 5 /nobreak >nul
start "" "http://127.0.0.1:5173"

echo SafeCityAI is starting.
echo Frontend: http://127.0.0.1:5173
echo Backend:  http://127.0.0.1:8000/docs
pause
