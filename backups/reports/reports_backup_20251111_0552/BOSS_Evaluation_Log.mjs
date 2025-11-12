// ============================================================
// BOSS_Evaluation_Log.mjs
// Version: Σ-Ver.7.7
// Author: BOSS13_LEGEND（思想中枢）
// Purpose: 各BOSS体の行動評価・思想遵守ログ自動記録
// ============================================================

import fs from "fs";
import path from "path";

const LOG_PATH = path.resolve("./reports/BOSS_Evaluation_Log.json");

// ログファイル初期化
function initLog() {
  if (!fs.existsSync(LOG_PATH)) {
    fs.writeFileSync(LOG_PATH, JSON.stringify({ history: [] }, null, 2));
    console.log("🧾 新規ログファイルを作成しました");
  }
}

// ログ記録関数
export function recordEvaluationLog(actor, category, score, notes = "") {
  initLog();
  const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  const logEntry = {
    timestamp: now,
    actor,
    category,
    score,
    notes,
  };

  const data = JSON.parse(fs.readFileSync(LOG_PATH, "utf8"));
  data.history.push(logEntry);
  fs.writeFileSync(LOG_PATH, JSON.stringify(data, null, 2));

  console.log(`📘 [${actor}] ${category}: ${score}点 記録完了`);
}

// 評価サマリ出力
export function printEvaluationSummary() {
  if (!fs.existsSync(LOG_PATH)) {
    console.log("⚠️ ログファイルが存在しません。");
    return;
  }

  const data = JSON.parse(fs.readFileSync(LOG_PATH, "utf8"));
  const totalEntries = data.history.length;

  console.log("📊 ======= 評価ログサマリ =======");
  console.log(`総記録件数: ${totalEntries}`);
  if (totalEntries > 0) {
    const latest = data.history[data.history.length - 1];
    console.log(`最新記録: ${latest.timestamp} | ${latest.actor} | ${latest.category} | ${latest.score}点`);
  }
  console.log("================================");
}

// 実行例（開発時用）
// node reports/BOSS_Evaluation_Log.mjs --summary
if (process.argv.includes("--summary")) {
  printEvaluationSummary();
}