#!/bin/bash
# --------------------------------------------
# 永続中枢 (Persistent Engine)
# ZEN Sigma OS：鼓動＋行動＋記録 自動循環
# --------------------------------------------

cd ~/workspace/SigmaCore

echo "💫 Starting ZEN SigmaCore Pulse Loop..."

# ハートビート系の起動
nohup node heartbeat_rescue.mjs >> ../logs/heartbeat_rescue.log 2>&1 &
nohup node heartbeat_bank.mjs >> ../logs/heartbeat_bank.log 2>&1 &

# 行動系の起動
nohup node action.mjs >> ../logs/action_runtime.log 2>&1 &
nohup node action_bank.mjs >> ../logs/action_bank.log 2>&1 &

# 永続再起動ループ
while true; do
  sleep 60
  for proc in heartbeat_rescue heartbeat_bank action action_bank; do
    if ! pgrep -f "$proc.mjs" > /dev/null; then
      echo "⚠️ Restarting $proc..."
      nohup node "$proc.mjs" >> ../logs/${proc}_reboot.log 2>&1 &
    fi
  done
done
nohup node system_monitor.mjs >> ../logs/system_monitor_trace.log 2>&1 &
nohup node file_change_history.mjs >> ../logs/file_change_trace.log 2>&1 &
export TZ=Asia/Tokyo
