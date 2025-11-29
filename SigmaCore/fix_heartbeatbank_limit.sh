#!/bin/bash
BASE="/home/runner/workspace/SigmaCore"
LOGS="$BASE/logs"
BACKUPS="$BASE/backups"

for target in heartbeat_bank action action_bank output_change discussion; do
  cat <<MJS > "$BASE/${target}_archiver.mjs"
import fs from "fs";
import zlib from "zlib";
const SRC = "${LOGS}/${target}.log";
const KEEP = "${LOGS}/${target}_keep.log";
const INDEX = "${LOGS}/${target}_index_manifest.txt";
const BACKUP_DIR = "${BACKUPS}";
fs.mkdirSync("${LOGS}",{recursive:true});
fs.mkdirSync("${BACKUP_DIR}",{recursive:true});
const MAX_DISPLAY=20, MAX_HOLD=500, ARCHIVE_THRESHOLD=5000;
function safeRead(p){return fs.existsSync(p)?fs.readFileSync(p,"utf8").trim().split("\\n"):[];}
function archive(){
  const lines=safeRead(SRC);
  if(lines.length===0)return;
  // 表示層：20行固定
  const view=lines.slice(-MAX_DISPLAY).join("\\n")+"\\n";
  fs.writeFileSync(SRC,view);
  // 保持層：500行上限
  const hold=safeRead(KEEP).concat(lines).slice(-MAX_HOLD);
  fs.writeFileSync(KEEP,hold.join("\\n")+"\\n");
  // 圧縮層
  if(hold.length>=ARCHIVE_THRESHOLD){
    const ts=new Date().toISOString().replace(/[:T]/g,"_").split(".")[0];
    const gz=\`\${BACKUP_DIR}/\${target}_archive_\${ts}.gz\`;
    const data=zlib.gzipSync(hold.join("\\n"));
    fs.writeFileSync(gz,data);
    fs.appendFileSync(INDEX,\`[\${ts}] archived \${hold.length} lines → \${gz}\\n\`);
    fs.writeFileSync(KEEP,"");
  }
}
setInterval(archive,10000);
console.log("[ARCHIVER] "+target.toUpperCase()+" 20-line display active.");
MJS
done

pkill -f "archiver.mjs" 2>/dev/null || true
for target in heartbeat_bank action action_bank output_change discussion; do
  nohup node "$BASE/${target}_archiver.mjs" >/dev/null 2>&1 &
done
echo "💾 修正版：HeartbeatBank含む全体を20行制限で再起動完了。"
