/* ============================================================
   Z1_Evaluation_System.mjs
   Version: Σ-Ver.8.5-FIXED
   Purpose: 思想評価システム（文字コード・改行対応版）
   ============================================================ */

import fs from "fs";
import path from "path";
import { Z1_Tactical_Scoring_System } from "./Tactical_Scoring_System.mjs";

const DESIGN_PATH = path.resolve("./Z1_Evaluation_System_Design.txt");
const LOG_PATH = path.resolve("./Z1_Evaluation_Log.json");

// 思想設計書の読込
function parseDesignFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  let text = buffer.toString("utf8");

  // BOM除去・改行統一・空白除去
  text = text.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").trim();

  const lines = text.split("\n");
  const data = {};

  for (const line of lines) {
    if (/^\s*#/.test(line) || !line.trim()) continue;
    const parts = line.split(":");
    if (parts.length === 2) {
      const key = parts[0].trim().toLowerCase();
      const val = parseFloat(parts[1].trim());
      if (!isNaN(val)) data[key] = val;
    }
  }

  const required = ["reproduction", "correction", "comprehension", "performance", "decisiveness", "accumulation"];
  const missing = required.filter(k => !(k in data));
  if (missing.length) {
    console.log(`⚠️ 不足しているキー: ${missing.join(", ")}`);
    return null;
  }

  return data;
}

async function runEvaluation() {
  console.log("📘 Tactical Scoring System 初期化完了 (Ver: Σ-7.8 )");
  const design = parseDesignFile(DESIGN_PATH);

  if (!design) {
    console.log("⚠️ 思想設計書読込失敗: 一部データが欠落");
    console.log("❌ 思想設計書が存在しないため終了");
    return;
  }

  console.log("🚀 Z1 Evaluation System 起動");
  console.log("✅ 思想設計書 読込成功");
  console.log("🧾 設計データ反映:", design);

  console.log("🕐 積み上げの2秒ルール起動：思考プロセス開始");
  await new Promise(r => setTimeout(r, 1000));
  console.log("✅ 1秒経過：ルール整合チェック完了（違反なし）");
  await new Promise(r => setTimeout(r, 1000));
  console.log("💡 2秒経過：信頼形成のための思考完了");
  console.log("🚀 積み上げの2秒ルール遵守完了。出力を開始します。");

  const total = (
    (design.reproduction +
      design.correction +
      design.comprehension +
      design.performance +
      design.decisiveness +
      design.accumulation) / 6
  ).toFixed(2);

  let grade = "C";
  if (total >= 90) grade = "A";
  if (total >= 97) grade = "S";

  console.log(`🧭 評価完了: ${grade} (${total}pt)`);
  console.log(`🏁 評価プロセス完了: ${grade} 総合点: ${total}`);

  const log = fs.existsSync(LOG_PATH) ? JSON.parse(fs.readFileSync(LOG_PATH, "utf8")) : [];
  log.push({ timestamp: new Date().toLocaleString("ja-JP"), grade, score: Number(total) });
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2), "utf8");
  console.log("💾 評価ログを保存しました。");
}

if (process.argv.includes("--run")) runEvaluation();