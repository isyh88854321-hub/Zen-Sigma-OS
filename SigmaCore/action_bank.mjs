import fs from "fs";
import { exec } from "child_process";

const LOG = "/home/runner/workspace/logs/action_bank.log";
fs.mkdirSync("/home/runner/workspace/logs", { recursive: true });

let count = 0;
setInterval(() => {
  count++;
  const t = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  fs.appendFileSync(LOG, `[ActionBank-${count}] ${t}\n`);
  const lines = fs.readFileSync(LOG, "utf8").trim().split("\n");
  if (lines.length > 1000) fs.writeFileSync(LOG, lines.slice(-1000).join("\n") + "\n");
}, 5000);
