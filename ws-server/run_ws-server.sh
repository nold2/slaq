#!/bin/sh
cd "${0%/*}"
export LD_LIBRARY_PATH="./lib"; exec ./ws-server "$@" 
