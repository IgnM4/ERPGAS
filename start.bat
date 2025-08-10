@echo off
setlocal

set MODE=%1
if "%MODE%"=="" set MODE=server

echo Installing Node dependencies...
npm install || exit /b 1

echo Building frontend...
npm run build:web || exit /b 1

echo Building backend functions...
npm run build:functions || exit /b 1

echo Installing Python dependencies...
pip install -r api\requirements.txt || exit /b 1

if "%MODE%"=="desktop" (
  echo Starting desktop application...
  npm --prefix desktop run start
) else (
  echo Starting API server...
  python -m uvicorn api.app.main:app --host 0.0.0.0 --port 8000
)
