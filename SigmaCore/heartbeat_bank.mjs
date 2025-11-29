import fs from "fs";
import zlib from "zlib";

const LOG="/home/runner/workspace/SigmaCore/logs/heartbeat_bank.log";
const INDEX="/home/runner/workspace/SigmaCore/logs/heartbeat_index_manifest.txt";
const BACKUP_DIR="/home/runner/workspace/SigmaCore/backups";
fs.mkdirSync(BACKUP_DIR,{recursive:true});

let counter=0;
const INTERVAL=20000;
const MAX_LINES=500;

function writeLog(){
  const ts=new Date().toISOString();
  fs.appendFileSync(LOG,`[${ts}] 💓 Heartbeat Bank pulse ${++counter}\n`);
  const lines=fs.readFileSync(LOG,"utf8").trim().split("\n");
  if(lines.length>=MAX_LINES){
    const tsid=ts.replace(/[:T]/g,"_").split(".")[0];
    const gzPath=`${BACKUP_DIR}/heartbeat_bank_${tsid}.gz`;
    fs.writeFileSync(gzPath,zlib.gzipSync(lines.join("\n")));
    fs.appendFileSync(INDEX,`[${ts}] archived ${lines.length} lines → ${gzPath}\n`);
    fs.writeFileSync(LOG,"");
  }
}
setInterval(writeLog,INTERVAL);
console.log("✅ Heartbeat Bank active (20s interval, gzip@500 lines).");
