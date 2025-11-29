#!/bin/bash
# ==============================================
# [Σ-Auto Ping] Replit セッション維持スクリプト
# 1分ごとに自分のURLを叩いて永続稼働を維持
# ==============================================

URL="https://94bd0499-ed42-4377-a71e-fe0fc1905f86-00-3bsg27vrss1bw.spock.replit.dev"

while true; do
  curl -s -o /dev/null $URL
  echo "🌐 [$(date '+%Y/%m/%d %H:%M:%S')] Ping sent to $URL"
  sleep 60
done