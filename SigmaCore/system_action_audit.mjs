import fs from "fs";
import { execSync } from "child_process";

const LOG_DIR = "/home/runner/workspace/logs";
const MODULES = [
  "heartbeat_rescue",
  "heartbeat_bank",
  "action",
  "action_bank",
  "discussion_history",
  "output_change_history",
  "conversation"
];

console.log("───────────────");
console.log("🧭 System Action Audit Report");
console.log("───────────────");

for (const mod of MODULES) {
  const logPath = `${LOG_DIR}/${mod}.log`;
  try {
    const ps = execSync(`pgrep -af ${mod}.mjs || true`).toString().trim();
    const running = ps ? "🟢 RUNNING" : "🔴 STOPPED";
    console.log(`\n[${mod}] Status: ${running}`);

    if (fs.existsSync(logPath)) {
      const lines = fs.readFileSync(logPath, "utf8").trim().split("\n");
      console.log(`  ├─ Lines: ${lines.length}`);
      console.log("  └─ Last 5 entries:");
      console.log(lines.slice(-5).map(l => "     " + l).join("\n"));
    } else {
      console.log("  ⚠️ Log file not found.");
    }
  } catch (e) {
    console.error(`  ⚠️ Error reading ${mod}:`, e.message);
  }
}

console.log("\n───────────────");
console.log("✅ Audit complete.");
