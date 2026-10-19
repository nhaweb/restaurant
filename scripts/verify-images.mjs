import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const menuImagesSrc = fs.readFileSync(path.join(root, "lib/menu-images.ts"), "utf8");
const menuSrc = fs.readFileSync(path.join(root, "data/menu.ts"), "utf8");
const assetsSrc = fs.readFileSync(path.join(root, "lib/assets.ts"), "utf8");
const map = Object.fromEntries(
  [...menuImagesSrc.matchAll(/(\w+):\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
);

const usedKeys = [...menuSrc.matchAll(/menuImages\.(\w+)/g)].map((m) => m[1]);
const assetPaths = [...assetsSrc.matchAll(/"(\/assets\/[^"]+)"/g)].map((m) => m[1]);

const missing = [];
const checked = new Set();

for (const key of usedKeys) {
  const p = map[key];
  if (!p) {
    missing.push(`menuImages.${key} not defined`);
    continue;
  }
  if (checked.has(p)) continue;
  checked.add(p);
  const full = path.join(root, "public", p.replace(/^\//, ""));
  if (!fs.existsSync(full)) missing.push(p);
}

for (const p of assetPaths) {
  if (checked.has(p)) continue;
  checked.add(p);
  const full = path.join(root, "public", p.replace(/^\//, ""));
  if (!fs.existsSync(full)) missing.push(p);
}

// footerFood must exist
const footer = path.join(root, "public/assets/imgUnsplashYCuVsIknzhY.png");
if (!fs.existsSync(footer)) missing.push("/assets/imgUnsplashYCuVsIknzhY.png");

console.log(`Checked ${checked.size} unique paths (+ footerFood)`);
console.log(missing.length ? `MISSING:\n${missing.join("\n")}` : "All referenced images exist.");
process.exit(missing.length ? 1 : 0);
