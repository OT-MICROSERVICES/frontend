#!/bin/sh
set -e
echo "====================================="
echo " Building OT-MICROSERVICES Frontend "
echo "====================================="
cd /bp/workspace/frontend 2>/dev/null || true

# Remove any existing .npmrc that might have expired tokens
if [ -f .npmrc ]; then
  echo "-> Removing existing .npmrc with potentially expired tokens..."
  rm -f .npmrc
fi

# Clean npm cache to remove any cached credentials
echo "-> Cleaning npm cache..."
npm cache clean --force

# Configure npm to use public registry explicitly
echo "-> Configuring npm to use public registry..."
npm config set registry https://registry.npmjs.org/

# Configure npm authentication if needed for private packages
if [ -n "$NPM_TOKEN" ]; then
  echo "-> Configuring npm authentication..."
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
fi

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
tar -czf "$ARTIFACT_NAME" build

echo "====================================="
echo " Artifact created successfully!"
echo " Location: $ARTIFACT_PATH"
echo "====================================="
