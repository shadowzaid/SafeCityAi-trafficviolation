$ErrorActionPreference = "Stop"
Set-Location (Split-Path -Parent $PSScriptRoot)

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  Write-Host "Python is missing from PATH."
  exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js/npm is missing from PATH."
  exit 1
}

python -m pytest backend\tests
npm --prefix frontend run test
npm --prefix frontend run build

Write-Host "SafeCityAI verification complete."
