// ChronoCore/pulse.mjs - Fixed for exact 20行保持
import fs from "fs";
const LOG = "logs/runtime.log";
const MAX = 20;
let b = 0;
setInterval(() => {
  b++;
  const t = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", hour12: false });
  fs.appendFileSync(LOG, `[Pulse ♻️Beat-${b}] ${t}\n`);
  const lines = fs.readFileSync(LOG, "utf8").trim().split("\n");
  if (lines.length > MAX) {
    fs.writeFileSync(LOG, lines.slice(-MAX).join("\n") + "\n");
  }
}, 3000);
