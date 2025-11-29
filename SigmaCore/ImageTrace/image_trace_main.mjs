// ==============================================
// 🧠 Sigma Image Trace Main（RA思想統合）
// ==============================================
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const TRACE_DIR = path.join(ROOT, "SigmaCore", "ImageTrace");
const INPUT = path.join(TRACE_DIR, "input");
const OUTPUT = path.join(TRACE_DIR, "output");
const LOG = path.join(ROOT, "logs", "image_trace_runtime.log");

function log(msg) {
  const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  fs.appendFileSync(LOG, `[${now}] ${msg}\n`);
}

log("🟢 Image Trace Module 起動：安定化処理開始");

// 入力画像の走査と解析処理
fs.readdirSync(INPUT).forEach(file => {
  const inputPath = path.join(INPUT, file);
  const outputPath = path.join(OUTPUT, `${file}_trace.json`);

  try {
    const stats = fs.statSync(inputPath);
    const metadata = {
      filename: file,
      size: stats.size,
      mtime: stats.mtime,
      status: "analyzed",
    };
    fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
    log(`✅ 解析完了：${file}`);
  } catch (err) {
    log(`❌ 解析エラー：${file} (${err.message})`);
  }
});

log("🧩 Image Trace Module：処理完了・安定稼働中");
