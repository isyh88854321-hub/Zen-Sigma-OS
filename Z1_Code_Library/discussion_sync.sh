#!/bin/bash
# Z1 ↔ ZEN ディスカッションログ同期スクリプト
LOG_SRC=~/workspace/logs/Z1戦略会話ログ.log
LOG_DST=~/workspace/現状把握用フォルダ/20251126/5_ディスカッション記録/Z1戦略会話ログ.log
mkdir -p "$(dirname "$LOG_DST")"
ln -sf "$LOG_SRC" "$LOG_DST"
echo "[$(date '+%Y/%m/%d %H:%M:%S')] Discussion log synchronized ✅"
安全リロードルール  pkill -f "mjs"