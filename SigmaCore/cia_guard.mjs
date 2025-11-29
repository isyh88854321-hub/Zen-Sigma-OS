#!/usr/bin/env node
// ======================================
// CIA-Guard Lite Edition
// ======================================

import { spawn } from 'child_process';
import fs from 'fs';

const LOG_PATH = 'logs/runtime.log';
const TARGET_PROCESS = 'ChronoCore/pulse.mjs';
const CHECK_INTERVAL = 3000; // 3秒間隔
const LOCK_FILE = '/tmp/cia_guard.lock';
let lastRestart = 0;

// 排他ロック
function acquireLock() {
  if (fs.existsSync(LOCK_FILE)) return false;
  fs.writeFileSync(LOCK_FILE, process.pid.toString());
  return true;
}
function releaseLock() {
  if (fs.existsSync(LOCK_FILE)) fs.unlinkSync(LOCK_FILE);
}
if (!acquireLock()) {
  console.log('[CIA] 🚫 他プロセス稼働中 — 終了');
  process.exit(0);
}
process.on('exit', releaseLock);

async function isProcessRunning(name) {
  return new Promise((resolve) => {
    const check = spawn('pgrep', ['-f', name]);
    let out = '';
    check.stdout.on('data', (d) => (out += d));
    check.on('close', () => resolve(out.trim().length > 0));
  });
}

function restartProcess() {
  const now = Date.now();
  if (now - lastRestart < 5000) return; // 5秒以内禁止
  lastRestart = now;
  console.log(`[CIA] ⚡ Pulse再起動 — ${new Date().toLocaleString()}`);
  spawn('nohup', ['node', TARGET_PROCESS], {
    detached: true,
    stdio: 'ignore',
  }).unref();
}

async function guardLoop() {
  const running = await isProcessRunning(TARGET_PROCESS);
  if (!running) restartProcess();
}
setInterval(guardLoop, CHECK_INTERVAL);

console.log(`[CIA] 👼 Lite守護体起動 — ${new Date().toLocaleString()}`);