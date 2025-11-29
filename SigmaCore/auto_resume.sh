#!/bin/bash
# Zen OS Σ - Auto Resume Pulse Monitor
mkdir -p /home/runner/workspace/logs
while true; do
  if ! pgrep -f "ChronoCore/pulse.mjs" > /dev/null; then
    node /home/runner/workspace/ChronoCore/pulse.mjs &
    echo "[Σ-AutoResume] Pulse restarted — $(date '+%Y/%m/%d %H:%M:%S')" >> /home/runner/workspace/logs/runtime.log
  fi
  sleep 3
done
nohup bash SigmaCore/persistent.sh >/dev/null 2>&1 &