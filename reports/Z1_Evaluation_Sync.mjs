import fs from "fs";

const logPath = "./Z1_Evaluation_Log.json";
const mistakePath = "./Z1_Mistake_Log.json";
const outputPath = "./Z1_Evaluation_Final.json";

function mergeLogs() {
  const evalLogs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, "utf-8")) : [];
  const mistakes = fs.existsSync(mistakePath) ? JSON.parse(fs.readFileSync(mistakePath, "utf-8")) : [];

  const latestEval = evalLogs[evalLogs.length - 1] || { grade: "N/A", score: 0 };
  const penaltyCount = mistakes.length;
  const penaltyScore = penaltyCount * 0.5;
  const adjustedScore = Math.max((latestEval.score || 0) - penaltyScore, 0);

  const result = {
    timestamp: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
    base_score: latestEval.score,
    penalty_count: penaltyCount,
    penalty_score: penaltyScore,
    final_score: adjustedScore,
    grade: adjustedScore >= 97 ? "S" : adjustedScore >= 90 ? "A" : adjustedScore >= 80 ? "B" : "C"
  };

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log("📘 Z1 Evaluation System 稼働完了 (Ver.Σ-8.0)");
  console.log("🧾 統合結果:", result);
}

mergeLogs();