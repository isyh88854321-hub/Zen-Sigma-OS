#!/bin/bash
# =========================================
# Zen OS Σ Phase6 起動プロトコル（完全統合版）
# ChronoCore + ESAS + ReflectiveLoop 連動稼働
# =========================================

echo "[Init] Launching Zen OS Σ Phase6..."
echo "[AutoReboot] ChronoCore + ESAS linked initialization..."
sleep 1

# === 環境変数ロード ===
if [ -f .env ]; then
  echo "[Env] Loading environment configuration..."
  export $(grep -v '^#' .env | xargs)
else
  echo "[Warning] .env file not found. Proceeding with defaults..."
fi

# === ChronoCore起動 ===
echo "[Boot] Starting ChronoCore..."
node modules/chrono_core.mjs &
sleep 2

# === ESAS起動 ===
echo "[Boot] Starting ESAS Core..."
node modules/esas_core.mjs &
sleep 2

# === ReflectiveLoop起動 ===
echo "[Link] ReflectiveLoop Linking ChronoCore ⇄ ESAS feedback cycles..."
node modules/reflective_loop.mjs &
sleep 3

# === ログ確認 ===
echo "[Check] SigmaMemory log directories active."
ls -lt SigmaMemory/logs | head -5

# === フェーズ6稼働完了 ===
