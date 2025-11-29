#!/bin/bash
TARGET_DIR=~/workspace/現状把握用フォルダ/$(date '+%Y%m%d')
SUMMARY_FILE=$TARGET_DIR/6_現状総合マップ_$(date '+%Y%m%d_%H%M').txt

mkdir -p "$TARGET_DIR"

{
echo "📍現状総合マップ $(date '+%Y/%m/%d %H:%M:%S') JST"
echo "──────────────────────────────"
echo "🧩 フォルダツリー構造:"
tree ~/workspace/現状把握用フォルダ | sed 's/^/  /'
echo
echo "🧠 最新ディスカッション抜粋:"
tail -n 20 ~/workspace/logs/Z1戦略会話ログ.log
echo
echo "💻 システムステータス:"
top -b -n1 | head -n 10
} > "$SUMMARY_FILE"

echo "✅ 現状総合マップ生成完了 → $SUMMARY_FILE"
