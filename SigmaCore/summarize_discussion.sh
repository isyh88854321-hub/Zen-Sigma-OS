#!/bin/bash
SOURCE="/home/runner/workspace/logs/Z1戦略会話ログ.log"
SUMMARY="/home/runner/workspace/logs/summary_discussion.log"
TMP="/tmp/discussion_extract.txt"

if [ ! -f "$SOURCE" ]; then
  echo "⚠️ Z1戦略会話ログ.log が存在しません。"
  exit 1
fi

echo "🧠 【要点抽出】 $(date +"%Y/%m/%d %H:%M:%S JST")" > "$SUMMARY"
grep -E "議題|要点|\[DISCUSSION\]"
# ==========================================================
# 🧠 ZenSigma Discussion Summary Shell
# 要点抽出 → summary_discussion.log に保存
# ==========================================================

cd ~/workspace/SigmaCore || mkdir -p ~/workspace/SigmaCore && cd ~/workspace/SigmaCore
mkdir -p /home/runner/workspace/logs
chmod -R 777 /home/runner/workspace/logs

cat << 'EOF' > /home/runner/workspace/SigmaCore/summarize_discussion.sh
#!/bin/bash
SOURCE="/home/runner/workspace/logs/Z1戦略会話ログ.log"
SUMMARY="/home/runner/workspace/logs/summary_discussion.log"
TMP="/tmp/discussion_extract.txt"

if [ ! -f "$SOURCE" ]; then
  echo "⚠️ Z1戦略会話ログ.log が存在しません。"
  exit 1
fi

echo "🧠 【要点抽出】 $(date +"%Y/%m/%d %H:%M:%S JST")" > "$SUMMARY"
grep -E "議題|要点|\[DISCUSSION\]" "$SOURCE" > "$TMP"

awk '
  /議題/ {topic=$0}
  /要点/ {print topic "\n" $0 "\n──────────────────────────────"} 
  /\[DISCUSSION\]/ {print $0}
' "$TMP" >> "$SUMMARY"

echo "✅ 要点抽出完了: $SUMMARY"
tail -n 10 "$SUMMARY"
