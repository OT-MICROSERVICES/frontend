#!/bin/sh
set -e
echo "====================================="
echo " Building OT-MICROSERVICES Frontend "
echo "====================================="
cd /bp/workspace/frontend 2>/dev/null || true

# Remove ALL .npmrc files that might have expired tokens
echo "-> Removing any existing .npmrc files..."
rm -f .npmrc
rm -f ~/.npmrc
rm -f /root/.npmrc

# Remove package-lock.json - it contains references to unavailable package versions
echo "-> Removing package-lock.json to allow fresh dependency resolution..."
rm -f package-lock.json

# Clean npm cache to remove any cached credentials
echo "-> Cleaning npm cache..."
npm cache clean --force 2>/dev/null || true

# Reset npm configuration completely
echo "-> Resetting npm configuration..."
npm config delete registry 2>/dev/null || true
npm config delete //registry.npmjs.org/:_authToken 2>/dev/null || true

# Configure npm to use public registry explicitly
echo "-> Configuring npm to use public registry..."
npm config set registry https://registry.npmjs.org/

# Verify npm configuration
echo "-> Current npm registry:"
npm config get registry

# Configure npm authentication if needed for private packages
if [ -n "$NPM_TOKEN" ]; then
  echo "-> Configuring npm authentication..."
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
fi

echo "-> Node & npm versions:"
node -v || echo "node not found!"
npm -v || echo "npm not found!"

echo "-> Installing dependencies (npm install with legacy peer deps)..."
npm install --legacy-peer-deps --registry=https://registry.npmjs.org/

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
