import fs from "fs";
import path from "path";

const ROOT = "/home/runner/workspace";
const IMG_DIR = `${ROOT}/画像解析ツール/解析場所_ここにスクショを入れてください`;

// ディレクトリ作成
fs.mkdirSync(IMG_DIR, { recursive: true });

// ログファイル設定
const LOG = `${IMG_DIR}/解析ログ.txt`;

console.log("🧩 画像解析ツール起動中...");
console.log("📂 スクショを以下のフォルダへ入れてください:");
console.log(IMG_DIR);

// 監視処理
fs.watch(IMG_DIR, (eventType, filename) => {
  if (eventType === "rename" && /\.(png|jpg|jpeg)$/i.test(filename)) {
    const filePath = path.join(IMG_DIR, filename);
    if (fs.existsSync(filePath)) {
      const timestamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
      const logEntry = `[${timestamp}] ${filename} を解析しました。\n`;
      fs.appendFileSync(LOG, logEntry);
      console.log(`✅ 解析完了: ${filename}`);
    }
  }
});

console.log("🔍 監視中：スクショをフォルダに追加すると自動で記録されます。");
