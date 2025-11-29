#!/bin/bash
BASE="/home/runner/workspace/SigmaCore"
LOGS="$BASE/logs"

echo "🧹 HeartbeatBank purge + redirect start..."

# 停止中プロセスを強制終了
pkill -f "heartbeat_bank" 2>/dev/null || true
pkill -f "heartbeat_bank_archiver" 2>/dev/null || true

# 関連ファイル削除
rm -f "$LOGS/heartbeat_bank.log" "$LOGS/heartbeat_bank_keep.log" "$LOGS/heartbeat_bank_index_manifest.txt"

# バンクを廃止しレスキューへリダイレクト
cat <<'MJS' > "$BASE/heartbeat_rescue.mjs"
import fs from "fs";
const LOG="/home/runner/workspace/SigmaCore/logs/heartbeat_rescue.log";
fs.mkdirSync("/home/runner/workspace/SigmaCore/logs",{recursive:true});
setInterval(()=>{
  const now=new Date().toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"});
  const lines=fs.existsSync(LOG)?fs.readFileSync(LOG,"utf8").trim().split("\\n"):[];
  const view=lines.concat(["[HeartRescue] "+now]).slice(-20);
  fs.writeFileSync(LOG,view.join("\\n")+"\\n");
},8000);
console.log("💓 HeartbeatRescue active — 20-line strict single stream");
MJS

nohup node "$BASE/heartbeat_rescue.mjs" >/dev/null 2>&1 &
echo "✅ HeartbeatBank removed, HeartbeatRescue running (20-line strict)"
