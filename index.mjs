/*
 ZEN OS Σ Phase7.4 - SigmaMemory Core Link
 //Z1_Phi : 思想を形に、記憶を血流に変える橋
*/

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// 現在ディレクトリの絶対パスを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// メモリコアの絶対パスを設定
const memoryCorePath = path.join(__dirname, 'modules/memory_core.mjs');

// モジュール存在チェック
if (fs.existsSync(memoryCorePath)) {
  try {
    const { circulateThought, autoPulse } = await import(`file://${memoryCorePath}`);
    console.log('🧠 SigmaMemory Link Activated - Phase7.4');
    circulateThought();
    autoPulse(90000);
    console.log('🌿 [ESAS] Memory Core Initialized');
    console.log('🌿 [ESAS] Interface Bridge Core Synchronized');
  } catch (err) {
    console.error('⚠️ Memory Core Module Load Error:', err);
  }
} else {
  console.error('❌ Memory Core Module Not Found:', memoryCorePath);
}
