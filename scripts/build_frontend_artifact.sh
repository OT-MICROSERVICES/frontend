#!/bin/sh
set -e
echo "====================================="
echo " Building OT-MICROSERVICES Frontend "
echo "====================================="

# First, let's see what we're working with
echo "-> Checking current directory..."
pwd
ls -la

cd /bp/workspace/frontend 2>/dev/null || true

# Check if .npmrc exists in the cloned repo
echo "-> Checking for .npmrc in repository..."
if [ -f .npmrc ]; then
  echo "-> Found .npmrc in repository, displaying content:"
  cat .npmrc
fi

# Remove ALL .npmrc files everywhere
echo "-> Removing all .npmrc files..."
find . -name ".npmrc" -type f -delete 2>/dev/null || true
rm -f .npmrc
rm -f ~/.npmrc
rm -f /root/.npmrc
rm -f /home/*/.npmrc 2>/dev/null || true

# Remove package-lock.json
echo "-> Removing package-lock.json..."
rm -f package-lock.json

# Clean npm cache
echo "-> Cleaning npm cache..."
npm cache clean --force 2>/dev/null || true

# Delete npm config directory entirely
echo "-> Removing npm config directory..."
rm -rf ~/.npm
rm -rf /root/.npm

# Reset npm configuration
echo "-> Resetting npm configuration..."
npm config delete registry 2>/dev/null || true
npm config delete //registry.npmjs.org/:_authToken 2>/dev/null || true
npm config list

# Configure npm to use public registry
echo "-> Configuring npm to use public registry..."
npm config set registry https://registry.npmjs.org/

# Verify configuration
echo "-> Current npm registry:"
npm config get registry

echo "-> Node & npm versions:"
node -v
npm -v

echo "-> Installing dependencies..."
npm install --legacy-peer-deps --registry=https://registry.npmjs.org/ --no-optional

echo "-> Running production build..."
if ! npm run build; then
  echo "!! Build failed, retrying with increased heap size..."
  export NODE_OPTIONS="--max_old_space_size=4096"
  npm run build
fi

echo "-> Packaging build directory into artifact..."
ARTIFACT_NAME="frontend-build.tar.gz"
ARTIFACT_PATH="$(pwd)/$ARTIFACT_NAME"
tar -czf "$ARTIFACT_NAME" build

echo "====================================="
echo " Artifact created successfully!"
echo " Location: $ARTIFACT_PATH"
echo "====================================="
