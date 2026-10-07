#!/usr/bin/env bash
# Build and push an immutable-tagged image to Docker Hub.
# Usage: docker login && ./scripts/push-image.sh
set -euo pipefail

REPO="taimoorkhan5044/crud-app"
VERSION="$(node -p "require('./package.json').version")"
SHA="$(git rev-parse --short=7 HEAD)"
TAG="${VERSION}-${SHA}"   # unique per commit; never reuse, never "latest"

if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree is dirty; commit first so the tag maps to real source." >&2
  exit 1
fi

if docker manifest inspect "${REPO}:${TAG}" >/dev/null 2>&1; then
  echo "Tag ${REPO}:${TAG} already exists; refusing to overwrite." >&2
  exit 1
fi

docker build -t "${REPO}:${TAG}" .
docker push "${REPO}:${TAG}"
echo "Pushed ${REPO}:${TAG}"
