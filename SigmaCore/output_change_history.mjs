import fs from "fs";
import zlib from "zlib";

const LOG="/home/runner/workspace/SigmaCore/logs/output_change_history.log";
const INDEX="/home/runner/workspace/SigmaCore/logs/output_index_manifest.txt";
const BACKUP_DIR="/home/runner/workspace/SigmaCore/backups";
fs.mkdirSync(BACKUP_DIR,{recursive:true});

let prevState={};

function scan(){
  const files=fs.readdirSync("/home/runner/workspace/SigmaCore/logs");
  let changes=[];
  for(const f of files){
    const path=`/home/runner/workspace/SigmaCore/logs/${f}`;
    const stat=fs.statSync(path);
    const size=stat.size;
    if(!prevState[f]){changes.push({f,act:"CREATE"});}
    else if(prevState[f]!==size){changes.push({f,act:"MODIFY"});}
    prevState[f]=size;
  }
  const known=new Set(files);
  for(const f in prevState){
    if(!known.has(f)){changes.push({f,act:"DELETE"});delete prevState[f];}
  }
  if(changes.length>0){
    const ts=new Date().toISOString();
    for(const c of changes){
      fs.appendFileSync(LOG,`[${ts}] ${c.act} → ${c.f}\\n`);
    }
  }
  const lines=fs.readFileSync(LOG,"utf8").trim().split("\\n");
  if(lines.length>=5000){
    const tsid=new Date().toISOString().replace(/[:T]/g,"_").split(".")[0];
    const gzPath=`${BACKUP_DIR}/output_change_${tsid}.gz`;
    fs.writeFileSync(gzPath,zlib.gzipSync(lines.join("\\n")));
    fs.appendFileSync(INDEX,`[${tsid}] archived ${lines.length} lines → ${gzPath}\\n`);
    fs.writeFileSync(LOG,"");
  }
}
setInterval(scan,15000);
console.log("✅ OutputChangeHistory active (diff tracking + gzip@5000 lines).");
