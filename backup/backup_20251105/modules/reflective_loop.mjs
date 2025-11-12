import fs from "fs";
import { ESAS } from "./esas_core.mjs";
import { ChronoCore } from "./chrono_core.mjs";

export class ReflectiveLoop {
  constructor() {
    this.esas = new ESAS();
    this.chrono = new ChronoCore();
    this.loopCount = 0;
  }

  reflect() {
    this.loopCount++;
    const uptime = this.chrono.sync();
    this.esas.log(`ReflectiveLoop 実行 #${this.loopCount} | 稼働時間: ${uptime} 秒`);
    if (this.loopCount % 3 === 0) {
      this.esas.monitor(0.65 + Math.random() * 0.1);
    }
  }
}

const loop = new ReflectiveLoop();
setInterval(() => loop.reflect(), 5000);
