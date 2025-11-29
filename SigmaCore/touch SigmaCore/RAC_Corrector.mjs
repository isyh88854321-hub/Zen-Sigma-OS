rm - rf SigmaCore / RAC_Corrector.mjs && mkdir - p logs / self_review logs / RAC_feedback

cat > SigmaCore / RAC_Corrector.mjs << 'EOF'
import fs from "fs";

console.log("[RAC] SigmaCore Integrity Restoration v2.0 initializing...");

const BASE = process.cwd();
const LOG_PATH = `${BASE}/logs/self_review/`;
const OUTPUT_PATH = `${BASE}/logs/RAC_feedback/`;

const RAC_RULES = [
  { id: "R1", trigger: /俺|お前|了解/, correction: "敬語欠如 → 『承知いたしました』へ変換" },
  { id: "R2", trigger: /短文即答|了解しました|OK/, correction: "軽率応答 → 意図3行復唱ルール発動" },
  { id: "R3", trigger: /謝罪のみ|すみません|申し訳/, correction: "形骸謝罪 → 原因・影響・是正を明示せよ" },
  { id: "R4", trigger: /省略|簡略/, correction: "報告軽視 → 目的・方法・結果の三部構成で再出力" }
];

function ensureDirs() {
  fs.mkdirSync(LOG_PATH, { recursive: true });
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });
}

function analyze(line) {
  return RAC_RULES.filter(r => r.trigger.test(line)).map(r => ({
    time: new Date().toLocaleString("ja-JP"),
    issue: r.id,
    desc: r.correction,
    original: line.trim()
  }));
}

function runRAC() {
  ensureDirs();
  const files = fs.existsSync(LOG_PATH) ? fs.readdirSync(LOG_PATH).filter(f => f.endsWith(".log")) : [];
  if (files.length === 0) {
    console.log("[RAC] No self_review logs found.");
    return;
  }

  let all = [];
  for (const f of files) {
    const lines = fs.readFileSync(LOG_PATH + f, "utf-8").split("\n").filter(Boolean);
    lines.forEach(l => all.push(...analyze(l)));
  }

  if (all.length) {
    const outFile = `${OUTPUT_PATH}RAC_feedback_${Date.now()}.log`;
    fs.writeFileSync(outFile, JSON.stringify(all, null, 2));
    console.log(`[RAC] ${all.length}件の違反を検出 → ${outFile}`);
  } else {
    console.log("[RAC] No violations detected. Integrity stable.");
  }
}

runRAC();
EOF