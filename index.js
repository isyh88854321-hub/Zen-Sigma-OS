import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.send("Zen OS Σ v12 online — Port 5000 operational");
});

console.log(`Zen OS Σ v12 起動完了。ポート: ${PORT}`);

app.listen(PORT, () => {
  console.log(`Port ${PORT} opened on http://localhost:${PORT}`);
});