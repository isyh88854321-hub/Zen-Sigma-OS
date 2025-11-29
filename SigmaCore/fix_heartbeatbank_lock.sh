#!/bin/bash
BASE="/home/runner/workspace/SigmaCore"
LOGS="$BASE/logs"
BACKUPS="$BASE/backups"
TARGET="heartbeat_bank"

cat <<MJS > "$BASE/${TARGET}_archiver.mjs"
import fs from "fs";
import zlib from "zlib";

const SRC = "${LOGS}/${TARGET}.log";
const KEEP = "${LOGS}/${TARGET}_keep.log";
const INDEX = "${LOGS}/${TARGET}_index_manifest.txt";
const BACKUP_DIR = "${BACKUPS}";
const LOCK_FILE = "${LOGS}/${TARGET}.lock";

fs.mkdirSync("${LOGS}", { recursive: true });
fs.mkdirSync("${BACKUP_DIR}", { recursive: true });

const MAX_DISPLAY = 20;
const MAX_HOLD = 500;
const ARCHIVE_THRESHOLD = 5000;

function safeRead(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8").trim().split("\\n") : [];
}

function acquireLock() {
  if (fs.existsSync(LOCK_FILE)) return false;
  fs.writeFileSync(LOCK_FILE, process.pid.toString());
  return true;
}

function releaseLock() {
  if (fs.existsSync(LOCK_FILE)) fs.unlinkSync(LOCK_FILE);
}

function archive() {
  if (!acquireLock()) return;
  try {
    const lines = safeRead(SRC);
    if (lines.length === 0) return;

    // 最新20行を残して書き戻す（上書き）
    const view = lines.slice(-MAX_DISPLAY);
    fs.writeFileSync(SRC, view.join("\\n") + "\\n", { flag: "w" });

    // 保持層（500行）
    const hold = safeRead(KEEP).concat(view).slice(-MAX_HOLD);
    fs.writeFileSync(KEEP, hold.join("\\n") + "\\n", { flag: "w" });

    // 圧縮層（5000行以上でアーカイブ）
    if (hold.length >= ARCHIVE_THRESHOLD) {
      const ts = new Date().toISOString().replace(/[:T]/g, "_").split(".")[0];
      const gz = \`\${BACKUP_DIR}/\${TARGET}_archive_\${ts}.gz\`;
      const data = zlib.gzipSync(hold.join("\\n"));
      fs.writeFileSync(gz, data);
      fs.appendFileSync(INDEX, \`[\${ts}] archived \${hold.length} lines → \${gz}\\n\`);
      fs.writeFileSync(KEEP, "", { flag: "w" });
    }
  } finally {
    releaseLock();
  }
}

setInterval(archive, 5000);
console.log("[ARCHIVER] HEARTBEAT_BANK locked 20-line retention active.");
MJS

pkill -f "heartbeat_bank_archiver.mjs" 2>/dev/null || true
nohup node "$BASE/${TARGET}_archiver.mjs" >/dev/null 2>&1 &
echo "💓 HeartbeatBank strict 20-line (locked) mode enabled."
