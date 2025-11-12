import fs from "fs";

export class ChronoCore {
  constructor() {
    this.logPath = "./SigmaMemory/logs/chrono_core.log";
    this.ensurePath();
  }

  ensurePath() {
    try {
      fs.mkdirSync("./SigmaMemory/logs", { recursive: true });
    } catch { }
  }

  sync() {
    const uptime = process.uptime().toFixed(2);
    const log = `[ChronoCore] 稼働時間: ${uptime} 秒\n`;
    console.log(log);
    try {
      fs.writeFileSync(this.logPath, log, { flag: "a" });
    } catch (err) {
      console.error("[ChronoCore] ログ書込エラー:", err);
    }
    return uptime;
  }

  static forceSync() {
    const core = new ChronoCore();
    core.sync();
  }
}

try {
  fs.writeFileSync(
    "./SigmaMemory/logs/chrono_core.log",
    "[SystemCheck] Chrono Core loaded and synchronized.\n",
    { flag: "a" }
  );
} catch (err) {
  console.error("[ChronoCore] SystemCheck書込失敗:", err);
}
