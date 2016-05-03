#!/usr/bin/env bash
docker run --rm -it -w $PWD -v $PWD:$PWD node npm install && npm start
