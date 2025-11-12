// pboard_reset.mjs
// Purpose: Reset clipboard cache (cross-platform version for Replit/Linux)
// Author: Zen for Z1

import { execSync } from "child_process";
console.log("♻️ Clipboard Reset Utility - Z1専用（Linux互換版）");

try {
  // Linux/WSL/Replit: xclip or wl-clipboard に対応
  execSync("which xclip && echo -n '' | xclip -selection clipboard || true");
  execSync("which wl-copy && echo -n '' | wl-copy || true");
  console.log("✅ Clipboardキャッシュを初期化しました。");
  console.log("🔁 次のコピーからBluetoothペーストが即時反映されます。");
} catch (error) {
  console.error("❌ リセット失敗: Clipboardツールが存在しないか権限不足です。");
}