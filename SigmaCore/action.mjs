import fs from "fs";
const LOG="/home/runner/workspace/SigmaCore/logs/action.log";
fs.mkdirSync("/home/runner/workspace/SigmaCore/logs",{recursive:true});
const MAX=20;let n=0;
const phase=["RECORD","REFLECT","CORRECT","SYNC","THINK"];
setInterval(()=>{
  n++;
  const t=new Date().toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"});
  const ph=phase[n%phase.length];
  const entry=`[Action-${ph}-${n}] ${t}\n`;
  fs.appendFileSync(LOG,entry);
  const lines=fs.readFileSync(LOG,"utf8").trim().split("\n");
  if(lines.length>MAX)fs.writeFileSync(LOG,lines.slice(-MAX).join("\n")+"\n");
},3000);
