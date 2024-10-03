#!/bin/sh
set -e

VERSION=$1
SERVICE=$2

echo "Push image to file server"
docker --config ~/.docker/.nguyenvd3 push 10.60.156.72/xap/$SERVICE:$VERSION
docker rmi 10.60.156.72/xap/$SERVICE:$VERSION
echo "Finish push image to file server"