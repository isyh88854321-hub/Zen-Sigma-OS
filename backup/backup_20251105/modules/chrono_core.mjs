export class ChronoCore {
  constructor() {
    this.start = Date.now();
  }

  sync() {
    const uptime = ((Date.now() - this.start) / 1000).toFixed(2);
    console.log(`[ChronoCore] 稼働時間: ${uptime} 秒`);
    return uptime;
  }
}

const chrono = new ChronoCore();
setInterval(() => chrono.sync(), 5000);
