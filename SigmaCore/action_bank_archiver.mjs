import fs from "fs";import zlib from "zlib";
const SRC="/home/runner/workspace/SigmaCore/logs/action_bank.log";
const KEEP="/home/runner/workspace/SigmaCore/logs/action_bank_keep.log";
const BACKUP_DIR="/home/runner/workspace/SigmaCore/backups";
fs.mkdirSync("/home/runner/workspace/SigmaCore/logs",{recursive:true});
fs.mkdirSync("",{recursive:true});
const MAX_DISPLAY=20,MAX_HOLD=500,ARCHIVE_THRESHOLD=5000;
function safeRead(p){return fs.existsSync(p)?fs.readFileSync(p,"utf8").trim().split("\n"):[];}
function archive(){
  const lines=safeRead(SRC);if(lines.length===0)return;
  fs.writeFileSync(SRC,lines.slice(-MAX_DISPLAY).join("\n")+"\n");
  const hold=safeRead(KEEP).concat(lines).slice(-MAX_HOLD);
  fs.writeFileSync(KEEP,hold.join("\n")+"\n");
  if(hold.length>=ARCHIVE_THRESHOLD){
    const ts=new Date().toISOString().replace(/[:T]/g,"_").split(".")[0];
    const gz=`${BACKUP_DIR}/${target}_archive_${ts}.gz`;
    const data=zlib.gzipSync(hold.join("\n"));
    fs.writeFileSync(gz,data);
    fs.writeFileSync(KEEP,"");
  }
}
setInterval(archive,15000);
console.log("[ARCHIVER] "+target.toUpperCase()+" ready.");
