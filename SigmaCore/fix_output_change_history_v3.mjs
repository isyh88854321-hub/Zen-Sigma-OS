import fs from "fs";

const SRC = "/home/runner/workspace/logs/output_change_history.log";
const TMP = "/home/runner/workspace/logs/output_change_history_fixed.log";
if (!fs.existsSync(SRC)) {
  console.error("⚠️ output_change_history.log が見つかりません。");
  process.exit(1);
}

let raw = fs.readFileSync(SRC, "utf8");

// 行頭が欠損していても検出できるよう補正
raw = raw.replace(/(\d{4}-?\d{0,2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/g, "\n[$1");

// 改行／不要記号の整理
raw = raw.replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\t+/g, "");

// JST変換＋再整形
const lines = raw.split("\n").map(l => {
  const match = l.match(/\[(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3})Z\]\s*(.*)/);
  if (!match) return l.trim();
  try {
    const utc = new Date(match[1] + "Z");
    const jst = new Date(utc.getTime() + 9 * 60 * 60 * 1000);
    const timeStr = jst.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    return `[${timeStr}] ${match[2]}`;
  } catch {
    return l.trim();
  }
}).filter(Boolean);

fs.writeFileSync(TMP, lines.join("\n") + "\n");
console.log("✅ 出力履歴を再構築しました → output_change_history_fixed.log");
