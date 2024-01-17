#!/bin/bash

IMAGE_NAME=$1

CONTAINER_ID=$(docker ps -q --filter "ancestor=$IMAGE_NAME")
if [ -z "$CONTAINER_ID" ]; then
    echo "container is not running."
else
  docker stop "$CONTAINER_ID"
  docker container rm "$CONTAINER_ID"
fi
