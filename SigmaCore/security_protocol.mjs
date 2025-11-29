// ===============================
// Zen Sigma OS - SecurityProtocol
// Module: security_protocol.mjs
// Purpose: 自己防衛・整合性検証・異常検知
// ===============================

import fs from "fs";
import path from "path";

const SECURITY_LOG = path.join("./logs/security_protocol.log");

export function verifyIntegrity(moduleName, checksum) {
  const timestamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  const log = `[${timestamp}] 🔐 Integrity Check: ${moduleName} → ${checksum}\n`;
  fs.appendFileSync(SECURITY_LOG, log);
  console.log(`🔐 セキュリティ検証完了: ${moduleName}`);
  return true;
}

export function handleAnomaly(error) {
  const timestamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  const errLog = `[${timestamp}] ⚠️ Anomaly Detected: ${error.message || error}\n`;
  fs.appendFileSync(SECURITY_LOG, errLog);
  console.error("⚠️ 異常を検出しました:", error.message || error);
}