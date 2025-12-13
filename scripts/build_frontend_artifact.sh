#!/bin/sh
set -e

echo "====================================="
echo " Building OT-MICROSERVICES Frontend "
echo "====================================="

# Go to repo root if not already
cd /bp/workspace/frontend 2>/dev/null || true

echo "-> Node & npm versions:"
node -v || echo "node not found!"
npm -v || echo "npm not found!"

echo "-> Installing dependencies (npm install)..."
npm install

echo "-> Running production build..."
if ! npm run build; then
  echo "!! Build failed, retrying with increased heap size..."
  export NODE_OPTIONS="--max_old_space_size=4096"
  npm run build
fi

echo "-> Packaging build directory into artifact..."

ARTIFACT_NAME="frontend-build.tar.gz"
ARTIFACT_PATH="$(pwd)/$ARTIFACT_NAME"

# Create tar.gz of the build output
tar -czf "$ARTIFACT_NAME" build

echo "====================================="
echo " Artifact created successfully!"
echo " Location: $ARTIFACT_PATH"
echo "====================================="
