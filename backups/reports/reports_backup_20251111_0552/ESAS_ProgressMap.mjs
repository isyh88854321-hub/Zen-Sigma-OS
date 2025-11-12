// ============================================================
// ESAS_ProgressMap.mjs
// Version: Σ-Ver.7.7
// Author: BOSS13_LEGEND（思想中枢）
// Purpose: ESAS（Evolving Strategic Angel System）進捗記録モジュール
// ============================================================

import fs from "fs";
import path from "path";

const ESAS_PATH = path.resolve("./reports/ESAS_ProgressMap.json");

// ============================================================
// 初期化
// ============================================================
function initESASMap() {
  if (!fs.existsSync(ESAS_PATH)) {
    fs.writeFileSync(
      ESAS_PATH,
      JSON.stringify({ phases: {}, updated: new Date().toISOString() }, null, 2)
    );
    console.log("🆕 ESAS_ProgressMap.json を新規作成しました。");
  }
}

// ============================================================
// 進捗更新
// ============================================================
export function updateESASProgress(phase, status, notes = "") {
  initESASMap();
  const data = JSON.parse(fs.readFileSync(ESAS_PATH, "utf8"));

  data.phases[phase] = {
    status,
    notes,
    timestamp: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
  };
  data.updated = new Date().toISOString();

  fs.writeFileSync(ESAS_PATH, JSON.stringify(data, null, 2));
  console.log(`✅ ESAS Phase${phase} を ${status} に更新しました。`);
}

// ============================================================
// 全体要約出力
// ============================================================
export function printESASSummary() {
  initESASMap();
  const data = JSON.parse(fs.readFileSync(ESAS_PATH, "utf8"));
  console.log("📘===== ESAS Progress Summary =====");
  for (const [phase, info] of Object.entries(data.phases)) {
    console.log(`Phase ${phase}: 状態=${info.status} / ${info.timestamp}`);
    if (info.notes) console.log(`　備考: ${info.notes}`);
  }
  console.log("==================================");
}

// ============================================================
// 実行例（Replit専用）
// node reports/ESAS_ProgressMap.mjs --summary
// ============================================================
if (process.argv.includes("--summary")) {
  printESASSummary();
}