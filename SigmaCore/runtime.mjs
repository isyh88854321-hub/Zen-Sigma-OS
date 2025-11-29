import fs from "fs";

const LOG = "/home/runner/workspace/logs/runtime.log";
fs.mkdirSync("/home/runner/workspace/logs", { recursive: true });

let n = 0;
setInterval(() => {
  n++;
  const t = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  fs.appendFileSync(LOG, `[Pulse-${n}] ${t} 🫁 呼吸循環稼働中\n`);
  const lines = fs.readFileSync(LOG, "utf8").trim().split("\n");
  if (lines.length > 2000) fs.writeFileSync(LOG, lines.slice(-2000).join("\n") + "\n");
}, 3000);
