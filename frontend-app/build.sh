#!/bin/bash
set -eu

cd frontend-app

echo "==> Building frontend-app"
mvn clean package -DskipTests

echo "==> Done"
