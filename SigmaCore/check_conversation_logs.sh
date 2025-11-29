#!/bin/bash
# ==================================================
# 🧩 Z1 会話記録4系統 検証スクリプト
# ==================================================

ROOT=~/workspace
LOGS="$ROOT/logs"
MEMORY="$ROOT/記憶/会話記録"
BRAIN="$ROOT/SigmaBrain/会話記録"
STATUS="$ROOT/現状把握用フォルダ/20251126/5_会話記録"

TARGETS=("$LOGS" "$MEMORY" "$BRAIN" "$STATUS")

echo "🧠【Z1会話記録4系統 検証開始】"
echo "──────────────────────────────"

for DIR in "${TARGETS[@]}"; do
  FILE=$(ls -t "$DIR"/会話記録_*.log 2>/dev/null | head -n 1)
  if [ -z "$FILE" ]; then
    echo "⚠️  [$DIR] → ファイルなし ❌"
  else
    SIZE=$(stat -c%s "$FILE")
    if [ "$SIZE" -gt 100 ]; then
      echo "✅ [$DIR] → OK：${FILE##*/}（${SIZE}バイト）"
    else
      echo "⚠️  [$DIR] → ファイルありだが内容が薄い（${SIZE}バイト）"
    fi
  fi
done

echo "──────────────────────────────"
echo "🕰 JST $(TZ=Asia/Tokyo date '+%Y/%m/%d %H:%M:%S')"
echo "✅ 検証完了。目視と合わせて最終確認を。"
