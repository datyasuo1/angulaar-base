#!/bin/bash
set -e

VERSION=$1
SERVICE=$2

# echo "Start build maven"
# mvn -U clean install -Dmaven.test.skip=true
# echo "Finish build maven"

echo "Start build docker-harbor"
docker build -t 10.60.156.72/xap/$SERVICE:$VERSION .
echo "Finish build docker-harbor"