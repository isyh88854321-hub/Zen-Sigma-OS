// ===============================
// Zen Sigma OS - ReflectiveLoop
// Module: reflective_loop.mjs
// ===============================

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ パスを workspace/logs に固定
const LOOP_LOG = path.join(process.cwd(), "logs/thought_pulse.log");

let loopCount = 0;

export async function reflectiveLoop(input) {
  const timestamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  const emotion = analyzeEmotion(input);
  const reflection = `[${timestamp}] Thought Pulse #${++loopCount}\nInput: ${input}\nEmotion Score: ${emotion}\n--------------------\n`;

  fs.appendFileSync(LOOP_LOG, reflection);
  console.log(`🌀 ReflectiveLoop: 感情値=${emotion} 記録完了`);
  return { timestamp, emotion };
}

function analyzeEmotion(text) {
  const positive = ["希望", "未来", "信頼", "進化", "光"];
  const negative = ["不安", "恐怖", "迷い", "後悔"];
  let score = 0.5;
  for (const w of positive) if (text.includes(w)) score += 0.1;
  for (const w of negative) if (text.includes(w)) score -= 0.1;
  return Math.max(0, Math.min(1, score));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = process.argv[2] || "テスト入力";
  reflectiveLoop(input);
}