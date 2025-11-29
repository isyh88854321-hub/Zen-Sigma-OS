import fs from "fs";
import zlib from "zlib";

const LOG_DIR = "/home/runner/workspace/SigmaCore/logs";
const BACKUP_ROOT = "/home/runner/workspace/SigmaCore/backups";
fs.mkdirSync(BACKUP_ROOT, { recursive: true });

const TARGETS = [
  "action.log",
  "action_bank.log",
  "conversation.log",
  "Z1戦略会話ログ.log",
  "output_change_history.log",
  "heartbeat_rescue.log",
  "heartbeat_bank.log"
];

const LIMIT_LINES = 5000;
const LIMIT_SIZE_MB = 100;

function compressLog(file) {
  try {
    const path = `${LOG_DIR}/${file}`;
    if (!fs.existsSync(path)) return;
    const stats = fs.statSync(path);
    const lines = fs.readFileSync(path, "utf8").split("\n");
    const sizeMB = stats.size / (1024 * 1024);
    if (lines.length < LIMIT_LINES && sizeMB < LIMIT_SIZE_MB) return;

    const ts = new Date().toISOString().replace(/[:T]/g, "_").split(".")[0];
    const backupDir = `${BACKUP_ROOT}/${ts}`;
    fs.mkdirSync(backupDir, { recursive: true });

    const gzPath = `${backupDir}/${file}.gz`;
    const compressed = zlib.gzipSync(lines.join("\n"));
    fs.writeFileSync(gzPath, compressed);
    fs.writeFileSync(path, "");
    console.log(`[AUTO_COMPRESS] ${file} archived → ${gzPath}`);
  } catch (e) {
    console.error(`[WARN] compression failed: ${file}`, e.message);
  }
}

setInterval(() => {
  for (const f of TARGETS) compressLog(f);
}, 30000);

console.log("[auto_compress_manager] active (30s interval)");
