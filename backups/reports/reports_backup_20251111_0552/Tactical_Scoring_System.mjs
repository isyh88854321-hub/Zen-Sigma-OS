// ============================================================
// Tactical_Scoring_System.mjs
// Version: Σ-Ver.7.8
// Author: BOSS13_LEGEND（思想中枢）
// Purpose: Z1思想評価における加点・減点スコア基盤
// ============================================================

export const Z1_Tactical_Scoring_System = {
  bonuses: {
    ruleCompliance: 2,      // ルール遵守
    creativeAssist: 3,      // 創造的補助
    accumulation2sec: 5,    // 積み上げの2秒ルール遵守
    teamHarmony: 4,         // 協調的行動
    proactiveCorrection: 3  // 自発的修正行動
  },

  penalties: {
    ruleViolation: -5,      // ルール違反
    skip2sec: -6,           // 2秒ルール無視
    repeatedMistake: -9,    // 同一ミス連続発生
    neglectWarning: -4,     // 警告無視
    falseReport: -8         // 虚偽報告
  },

  meta: {
    version: "Σ-7.8",
    author: "BOSS13_LEGEND",
    description: "思想的スコアリング・バランス調整レイヤー",
    lastUpdated: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
  }
};

// ============================================================
// ロード確認用出力
// ============================================================
console.log("📘 Tactical Scoring System 初期化完了 (Ver:", Z1_Tactical_Scoring_System.meta.version, ")");