/**
 * Compress and convert all images in public/images/ and public/partners/
 * to WebP at 82% quality. Originals are kept as .bak files.
 *
 * Run: npm run compress-images
 * Requires: sharp (devDependency)
 */

import sharp from "sharp";
import { readdir, rename, stat } from "fs/promises";
import { join, extname, basename } from "path";

const DIRS = ["public/images", "public/partners"];
const QUALITY = 82;
// Images wider than this will be down-scaled (keeps full resolution for smaller ones)
const MAX_WIDTH = 1920;

async function processDir(dir) {
  let files;
  try {
    files = await readdir(dir);
  } catch {
    console.warn(`Skipping ${dir} — not found`);
    return;
  }

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const srcPath = join(dir, file);
    const outName = basename(file, ext) + ".webp";
    const outPath = join(dir, outName);
    const bakPath = srcPath + ".bak";

    // Skip if already converted
    try {
      await stat(outPath);
      console.log(`  skip (exists): ${outPath}`);
      continue;
    } catch {
      // not yet converted — proceed
    }

    try {
      const { width } = await sharp(srcPath).metadata();
      const pipeline = sharp(srcPath);
      if (width && width > MAX_WIDTH) {
        pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }
      await pipeline.webp({ quality: QUALITY }).toFile(outPath);

      const before = (await stat(srcPath)).size;
      const after = (await stat(outPath)).size;
      const saved = Math.round((1 - after / before) * 100);

      // Keep original as .bak so rollback is possible
      await rename(srcPath, bakPath);

      console.log(`  ✓ ${file} → ${outName}  (${kb(before)} → ${kb(after)}, -${saved}%)`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }
}

function kb(bytes) {
  return Math.round(bytes / 1024) + " KiB";
}

console.log("🗜  Compressing images…\n");
for (const dir of DIRS) {
  console.log(`📁 ${dir}`);
  await processDir(dir);
}
console.log("\n✅ Done. Originals saved as *.bak — delete them once you've verified.");
