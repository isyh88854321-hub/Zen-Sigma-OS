#!/bin/bash
# ==============================================
# [Σ-Auto Heartbeat] 永続稼働維持スクリプト
# ==============================================

while true; do
  if ! pgrep -f "SigmaChronoInfinity.mjs" > /dev/null; then
    echo "🔁 [$(date '+%Y/%m/%d %H:%M:%S')] Chrono Infinity 再起動中..."
    node SigmaCore/SigmaChronoInfinity.mjs >> logs/infinity_trace.log 2>&1 &
  fi
  sleep 60
done
