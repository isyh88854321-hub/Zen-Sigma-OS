import fs from "fs";
import zlib from "zlib";
import readline from "readline";

const LOG_DIR="/home/runner/workspace/SigmaCore/logs";
const INDEX_FILE="/home/runner/workspace/SigmaCore/logs/index_manifest.txt";
const COMPRESS_DIR="/home/runner/workspace/backups";

// 🔹 索引作成：logs配下をスキャンして記録
function buildIndex(){
  const files=fs.readdirSync(LOG_DIR).filter(f=>f.endsWith(".log"));
  const manifest=files.map(f=>{
    const stat=fs.statSync(`${LOG_DIR}/${f}`);
    return `${f}\t${stat.size}\t${stat.mtime.toISOString()}`;
  }).join("\n");
  fs.writeFileSync(INDEX_FILE,manifest);
  console.log(`[Index] Updated: ${files.length} files`);
}

// 🔹 ストリーム検索：圧縮前ログ or 圧縮済み.gzを対象
async function streamSearch(keyword){
  const targets=fs.readdirSync(COMPRESS_DIR).filter(f=>f.endsWith(".gz"));
  console.log(`[Search] keyword="${keyword}" 対象=${targets.length}件`);
  for(const t of targets){
    const path=`${COMPRESS_DIR}/${t}`;
    const stream=fs.createReadStream(path).pipe(zlib.createGunzip());
    const rl=readline.createInterface({input:stream});
    for await(const line of rl){
      if(line.includes(keyword)) console.log(`${t}: ${line}`);
    }
  }
}

// 自動実行（起動時に索引を更新）
buildIndex();
