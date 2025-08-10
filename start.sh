#!/usr/bin/env bash
set -e

MODE=${1:-server}

echo "Installing Node dependencies..."
npm install

echo "Building frontend..."
npm run build:web

echo "Building backend functions..."
npm run build:functions

echo "Installing Python dependencies..."
pip install -r api/requirements.txt

if [ "$MODE" = "desktop" ]; then
  echo "Starting desktop application..."
  npm --prefix desktop run start
else
  echo "Starting API server..."
  python -m uvicorn api.app.main:app --host 0.0.0.0 --port 8000
fi
