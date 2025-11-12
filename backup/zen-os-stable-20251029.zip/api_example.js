const express = require("express");
const app = express();
const port = 3000;

// 🆕 追加：ルート確認用のエンドポイント
app.get("/", (req, res) => {
  res.send("✅ Z1 OS API is running!");
});

// サーバー起動
app.listen(port, () => {
  console.log(`🚀 Z1 OS server running on http://localhost:${port}`);
});
