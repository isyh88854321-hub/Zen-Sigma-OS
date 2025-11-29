import fs from "fs";

const SRC = "/home/runner/workspace/logs/output_change_history.log";
const TMP = "/home/runner/workspace/logs/output_change_history_fixed.log";

if (!fs.existsSync(SRC)) {
  console.error("⚠️ output_change_history.log が見つかりません。");
  process.exit(1);
}

let raw = fs.readFileSync(SRC, "utf8");

// 改行復元（ISO形式の前に必ず改行を入れる）
raw = raw.replace(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/g, "\n[$1");

// 不要な文字を整理
raw = raw.replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\t+/g, "");

// 各行をJSTに変換
const lines = raw.split("\n").map(l => {
  const match = l.match(/\[(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3})Z\]\s*(.*)/);
  if (!match) return l;
  try {
    const utc = new Date(match[1] + "Z");
    const jst = new Date(utc.getTime() + 9 * 60 * 60 * 1000);
    const timeStr = jst.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    return `[${timeStr}] ${match[2]}`;
  } catch {
    return l;
  }
});

fs.writeFileSync(TMP, lines.join("\n") + "\n");
console.log("✅ 再修復完了 → output_change_history_fixed.log に保存しました。");
