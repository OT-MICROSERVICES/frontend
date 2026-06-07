#!/bin/bash
set -euo pipefail

echo "==> Building frontend-app"
mvn package -DskipTests

echo "==> Done. Run with:"
echo "    java -jar target/frontend-app-1.0.0.jar"

