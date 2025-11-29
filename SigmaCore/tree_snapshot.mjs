import fs from "fs";
import { execSync } from "child_process";

const ROOT = "/home/runner/workspace";
const BASE_DIR = `${ROOT}/ZENΣツリー構造`;

const now = new Date();
const dateTag = now.toISOString().slice(0, 10).replace(/-/g, "");
const JST = now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", hour12: false });
const OUTPUT_FILE = `${BASE_DIR}/ZENΣ_Tree_${dateTag}.txt`;

fs.mkdirSync(BASE_DIR, { recursive: true });

try {
  const result = execSync(`find ${ROOT} -type d | sed 's|${ROOT}/||' | sort`);
  fs.writeFileSync(OUTPUT_FILE, result);
  fs.appendFileSync(OUTPUT_FILE, `\n[${JST}] ✅ ZENΣツリー構造 snapshot saved successfully.\n`);
  console.log(`✅ ZENΣツリー構造を保存しました → ${OUTPUT_FILE}`);
} catch (err) {
  console.error("❌ 保存中にエラーが発生しました:", err.message);
}
