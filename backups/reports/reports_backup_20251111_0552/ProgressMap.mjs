// ============================================================
// ProgressMap.mjs
// Version: Σ-Ver.7.7
// Purpose: BOSS体・各Phase進行状況の記録と進捗可視化
// ============================================================

import fs from "fs";
import path from "path";

const MAP_PATH = path.resolve("./reports/ProgressMap.json");

// 初期化
function initProgressMap() {
  if (!fs.existsSync(MAP_PATH)) {
    fs.writeFileSync(
      MAP_PATH,
      JSON.stringify({ phases: {}, updated: new Date().toISOString() }, null, 2)
    );
    console.log("🗺️ 新しいProgressMapを作成しました");
  }
}

// 進捗更新
export function updateProgress(phase, status, details = "") {
  initProgressMap();
  const data = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));

  data.phases[phase] = {
    status,
    details,
    timestamp: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
  };
  data.updated = new Date().toISOString();

  fs.writeFileSync(MAP_PATH, JSON.stringify(data, null, 2));
  console.log(`✅ Phase ${phase} を ${status} に更新しました`);
}

// 一覧出力
export function printProgressSummary() {
  initProgressMap();
  const data = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
  console.log("📊 ====== ProgressMap Summary ======");
  for (const [phase, info] of Object.entries(data.phases)) {
    console.log(`Phase ${phase} → 状態: ${info.status}（${info.timestamp}）`);
  }
  console.log("===================================");
}

// 実行例
// node reports/ProgressMap.mjs --summary
if (process.argv.includes("--summary")) {
  printProgressSummary();
}