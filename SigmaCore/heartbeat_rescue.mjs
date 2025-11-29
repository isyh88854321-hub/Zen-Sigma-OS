import fs from "fs";
import { exec } from "child_process";

const LOG = "/home/runner/workspace/logs/heartbeat_rescue.log";
fs.mkdirSync("/home/runner/workspace/logs", { recursive: true });

const TARGETS = [
  { name: "runtime.mjs", cmd: "nohup node /home/runner/workspace/SigmaCore/runtime.mjs >/dev/null 2>&1 &" },
  { name: "action_bank.mjs", cmd: "nohup node /home/runner/workspace/SigmaCore/action_bank.mjs >/dev/null 2>&1 &" }
];

let beat = 0;
setInterval(() => {
  beat++;
  const t = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  fs.appendFileSync(LOG, `[Heartbeat-Rescue-${beat}] ${t}\n`);

  for (const proc of TARGETS) {
    exec(`pgrep -f "${proc.name}"`, (err, stdout) => {
      if (!stdout) {
        exec(proc.cmd);
        fs.appendFileSync(LOG, `[Revive] ${t} → ${proc.name}\n`);
      }
    });
  }
}, 5000);
