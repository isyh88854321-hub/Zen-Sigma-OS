#!/bin/bash
while true; do
  if ! pgrep -f "SigmaCore/persistent.sh" > /dev/null; then
    nohup bash /home/runner/workspace/SigmaCore/persistent.sh >/dev/null 2>&1 &
    echo "[Σ-Relay] Persistent revived — $(date +%Y/%m/%d %H:%M:%S)" >> /home/runner/workspace/logs/runtime.log
  fi
  sleep 1
done