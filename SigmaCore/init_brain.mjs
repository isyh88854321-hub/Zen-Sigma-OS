// ===============================
// Zen Sigma OS - InitBrain
// Module: init_brain.mjs
// Purpose: 意志核の起動・思考層との接続
// ===============================

import fs from "fs";
import path from "path";
import { reflectiveLoop } from "../SigmaBrain/reflective_loop.mjs";
import { transferMemory } from "../SigmaMemory/brain_transfer.mjs";

const INIT_LOG = path.join("./logs/init_brain.log");

export async function initBrain(input = "起動信号") {
  const timestamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  const header = `🧠 [${timestamp}] SigmaCore: InitBrain 起動\n入力信号: ${input}`;
  fs.appendFileSync(INIT_LOG, `${header}\n`);

  // 内省ループ呼び出し
  const reflection = await reflectiveLoop(input);

  // 記憶転送呼び出し
  const memoryResult = await transferMemory(reflection);

  const summary = `結果: 思考反応=${reflection.emotion} / 記憶転送=${memoryResult.status}`;
  fs.appendFileSync(INIT_LOG, `${summary}\n--------------------\n`);

  console.log("✅ SigmaCore 起動完了");
  return { timestamp, ...reflection, ...memoryResult };
}