import fs from "fs";
import path from "path";

const dataPath = path.resolve("test-data/mobiles.json");

export function getMobile(key) {
  const raw = fs.readFileSync(dataPath, "utf-8");
  const data = JSON.parse(raw);

  if (!data[key]) {
    throw new Error(`Mobile number "${key}" not found in mobiles.json`);
  }

  return data[key];
}
