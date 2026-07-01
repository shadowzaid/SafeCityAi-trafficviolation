@echo off
setlocal
set "ROOT=%USERPROFILE%\OneDrive\Desktop\SafeCityAI\"
if not exist "%ROOT%RUN_SAFE_CITY_AI.bat" (
  echo SafeCityAI was not found at %ROOT%
  echo Open the project folder and run RUN_SAFE_CITY_AI.bat directly.
  pause
  exit /b 1
)
call "%ROOT%RUN_SAFE_CITY_AI.bat"
