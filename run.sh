#!/bin/bash
pkill -f "node index.js" || true
cd ~/workspace || exit 1
mkdir -p logs
node index.js > logs/runtime.log 2>&1 &
