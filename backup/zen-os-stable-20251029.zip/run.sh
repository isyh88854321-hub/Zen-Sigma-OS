#!/bin/bash
set -e
pkill -f "node .*index.cjs" || true
sleep 0.5
if [ ! -d "node_modules" ]; then
  npm install --silent
fi
exec node index.cjs
