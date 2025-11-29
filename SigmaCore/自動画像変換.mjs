import fs from "fs";
import sharp from "sharp";
import path from "path";

const INPUT_DIR = "/home/runner/workspace/現状把握用フォルダ/20251126/5_画像解析待機フォルダ";
const OUTPUT_DIR = "/home/runner/workspace/現状把握用フォルダ/20251126/6_スクショ解析可能変換用フォルダー";

// 出力フォルダ作成
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

fs.readdirSync(INPUT_DIR).forEach(file => {
  const inputPath = path.join(INPUT_DIR, file);
  const outputPath = path.join(OUTPUT_DIR, file.replace(/\.[^.]+$/, ".jpg"));
  sharp(inputPath)
    .resize({ width: 1280 })
    .jpeg({ quality: 85 })
    .toFile(outputPath)
    .then(() => console.log(`✅ 変換完了: ${file} → ${outputPath}`))
    .catch(err => console.error(`❌ エラー (${file}):`, err.message));
});
