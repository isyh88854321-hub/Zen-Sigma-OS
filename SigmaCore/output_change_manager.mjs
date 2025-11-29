import fs from "fs";
import zlib from "zlib";

const LOG_DIR = "/home/runner/workspace/logs";
const BACKUP_DIR = "/home/runner/workspace/backups";
fs.mkdirSync(LOG_DIR, { recursive: true });
fs.mkdirSync(BACKUP_DIR, { recursive: true });

const HISTORY = `${LOG_DIR}/output_change_history.log`;
const KEEP = `${LOG_DIR}/output_keep.log`;
const MAX_DISPLAY = 20;
const MAX_KEEP = 500;
const ARCHIVE_THRESHOLD = 5000;

function safeRead(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8").trim().split("\n") : [];
}

function archive() {
  const lines = safeRead(HISTORY);
  if (lines.length === 0) return;

  // 1️⃣ 最新20行をヒストリー表示用に保持
  fs.writeFileSync(HISTORY, lines.slice(-MAX_DISPLAY).join("\n") + "\n");

  // 2️⃣ KEEPに追加保持
  const keep = safeRead(KEEP).concat(lines).slice(-MAX_KEEP);
  fs.writeFileSync(KEEP, keep.join("\n") + "\n");

  // 3️⃣ KEEPが一定を超えたら圧縮アーカイブ
  if (keep.length >= ARCHIVE_THRESHOLD) {
    const ts = new Date().toISOString().replace(/[:T]/g, "_").split(".")[0];
    const gzPath = `${BACKUP_DIR}/output_archive_${ts}.gz`;
    const compressed = zlib.gzipSync(keep.join("\n"));
    fs.writeFileSync(gzPath, compressed);
    fs.writeFileSync(KEEP, "");
    fs.appendFileSync(`${LOG_DIR}/output_archive_index.txt`, `[${ts}] archived ${keep.length} lines → ${gzPath}\n`);
  }
}

setInterval(archive, 10000);
console.log("[OutputChangeManager] active.");
