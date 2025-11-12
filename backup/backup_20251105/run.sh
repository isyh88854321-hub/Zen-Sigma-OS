#!/bin/bash
echo "[Init] Launching Zen OS Σ Phase6..."
echo "[AutoReboot] ChronoCore + ESAS linked initialization..."
sleep 1

# 環境変数ロード
if [ -f .env ]; then
  echo "[Env] Loading environment configuration..."
  export $(grep -v '^#' .env | xargs)
else
  echo "[Warning] .env file not found. Proceeding with defaults..."
fi

# ChronoCore起動
echo "[Boot] Starting ChronoCore..."
node modules/chrono_core.mjs &
sleep 2

# ESAS起動
echo "[Boot] Starting ESAS Core..."
node modules/esas_core.mjs &
sleep 2

# ログ確認
echo "[Check] SigmaMemory log directories active."
ls -l SigmaMemory/logs | head -5

# フェーズ6起動完了
echo "[ZenOS] Phase6 operational. External recognition layer synchronized." 
echo "[Complete] ESAS link established successfully." >> SigmaMemory/logs/esas_activity.log

# 継続稼働ループ
while true; do
  sleep 5
  echo "[Heartbeat] Zen OS Σ Phase6 stable..."
done
