import { exec } from "child_process";
import fs from "fs";
const LOG_DIR = "/home/runner/workspace/SigmaCore/logs";
fs.mkdirSync(LOG_DIR, { recursive: true });

const MODULES = [
  "action.mjs",
  "action_bank.mjs",
  "heartbeat_rescue.mjs",
  "heartbeat_bank.mjs",
  "discussion_log.mjs",
  "output_change_history.mjs",
  "auto_compress_manager.mjs"
];

function launchAll(){
  MODULES.forEach(m=>{
    exec(`nohup node /home/runner/workspace/SigmaCore/${m} >> ${LOG_DIR}/controller.log 2>&1 &`);
    console.log("🚀 launched",m);
  });
}

setInterval(()=>{
  exec("ps aux | grep node",(err,stdout)=>{
    if(err)return;
    MODULES.forEach(m=>{
      if(!stdout.includes(m)){
        console.warn("[RESCUE]",m,"→ restarting");
        exec(`nohup node /home/runner/workspace/SigmaCore/${m} >> ${LOG_DIR}/controller.log 2>&1 &`);
      }
    });
  });
},30000);

console.log("💠 Σ Unified Controller active (全7体監視・蘇生連携中)");
launchAll();
