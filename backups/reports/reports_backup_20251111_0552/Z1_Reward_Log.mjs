import fs from "fs";
const rewardLogPath = "./Z1_Reward_Log.json";

export function recordReward(event, bonus) {
  const entry = {
    timestamp: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
    event,
    bonus_total: bonus,
  };
  let logs = [];
  if (fs.existsSync(rewardLogPath)) {
    try {
      logs = JSON.parse(fs.readFileSync(rewardLogPath, "utf-8"));
    } catch (e) {
      console.error("JSON parse error:", e.message);
    }
  }
  logs.push(entry);
  fs.writeFileSync(rewardLogPath, JSON.stringify(logs, null, 2));
  console.log(`🌟 Reward logged: ${event}（累計: +${bonus}）`);
}
