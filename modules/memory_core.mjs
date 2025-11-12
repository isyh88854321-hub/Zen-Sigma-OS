import fs from "fs";
import path from "path";

export default class MemoryCore {
  constructor() {
    this.data = {};
  }

  load() {
    const filePath = path.resolve("./logs/memory_backup.json");
    if (fs.existsSync(filePath)) {
      this.data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      console.log("[MemoryCore] Memory loaded.");
    } else {
      console.log("[MemoryCore] No existing memory found, initializing fresh.");
    }
  }

  save() {
    const filePath = path.resolve("./logs/memory_backup.json");
    fs.writeFileSync(filePath, JSON.stringify(this.data, null, 2));
    console.log("[MemoryCore] Memory saved.");
  }
}
