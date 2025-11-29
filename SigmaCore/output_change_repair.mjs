import fs from "fs";

const LOG_DIR = "/home/runner/workspace/logs";
const MAIN = `${LOG_DIR}/output_change_history.log`;
const KEEP = `${LOG_DIR}/output_keep.log`;
const ARCH = `${LOG_DIR}/output_change_archive.log`;
fs.mkdirSync(LOG_DIR, { recursive: true });

function now(){
  return new Date().toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"});
}

function safeWrite(file,line){
  try{
    fs.appendFileSync(file,line+"\n");
  }catch(e){
    console.error("⚠️ Write failed:",file,e.message);
  }
}

// 1️⃣ 壊れたファイル検知 → バックアップ保存
for(const f of [MAIN,KEEP,ARCH]){
  if(fs.existsSync(f)){
    const bak = f.replace(".log",`_${Date.now()}.bak`);
    fs.copyFileSync(f,bak);
  }else{
    fs.writeFileSync(f,"");
  }
}

// 2️⃣ 重複やループ書き込み除去
if(fs.existsSync(MAIN)){
  const lines = fs.readFileSync(MAIN,"utf8").trim().split("\n");
  const unique = [...new Set(lines)];
  fs.writeFileSync(MAIN, unique.join("\n")+"\n");
}

// 3️⃣ 新しい行追加
const msg = `[${now()}] 🧩 OutputChange System repaired and relaunched.`;
safeWrite(MAIN, msg);
safeWrite(KEEP, `[KEEP] ${msg}`);
safeWrite(ARCH, `[ARCHIVE] ${msg}`);

// 4️⃣ 保全チェック
console.log("✅ OutputChange logs repaired.");
console.log(fs.readFileSync(MAIN,"utf8").split("\n").slice(-5).join("\n"));
