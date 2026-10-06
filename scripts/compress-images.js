#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imagesDir = path.join(process.cwd(), 'public/images');
const logFile = path.join(process.cwd(), 'scripts/compression-results.txt');

// Clear previous log
fs.writeFileSync(logFile, '');

function log(msg) {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
}

async function compressImages() {
  log('🖼️  Starting image compression...\n');

  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));

  log(`Found ${imageFiles.length} images to compress\n`);

  let totalOriginal = 0;
  let totalCompressed = 0;
  const results = [];

  for (const file of imageFiles) {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    totalOriginal += originalSize;

    try {
      const ext = path.extname(file).toLowerCase();
      let pipeline = sharp(filePath).rotate();

      if (ext === '.png') {
        // PNG: compress with high quality, reduce colors
        pipeline = pipeline.png({
          quality: 80,
          compressionLevel: 9,
          progressive: true
        });
      } else {
        // JPG: compress with quality 80
        pipeline = pipeline.jpeg({
          quality: 80,
          progressive: true,
          mozjpeg: true
        });
      }

      const buffer = await pipeline.toBuffer();
      const compressedSize = buffer.length;

      // Only write if smaller
      if (compressedSize < originalSize) {
        fs.writeFileSync(filePath, buffer);
        totalCompressed += compressedSize;

        const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
        const msg = `✓ ${file}: ${(originalSize/1024/1024).toFixed(1)}MB → ${(compressedSize/1024/1024).toFixed(1)}MB (-${reduction}%)`;
        log(msg);
        results.push({ file, original: originalSize, compressed: compressedSize, reduction });
      } else {
        totalCompressed += originalSize;
        log(`⊘ ${file}: already optimized`);
      }
    } catch (err) {
      log(`✗ ${file}: ${err.message}`);
      totalCompressed += originalSize;
    }
  }

  log('\n' + '='.repeat(60));
  log(`Total Original:   ${(totalOriginal/1024/1024).toFixed(1)}MB`);
  log(`Total Compressed: ${(totalCompressed/1024/1024).toFixed(1)}MB`);
  log(`Total Saved:      ${((totalOriginal-totalCompressed)/1024/1024).toFixed(1)}MB`);
  log(`Overall Reduction: ${((totalOriginal-totalCompressed)/totalOriginal*100).toFixed(1)}%`);
  log('='.repeat(60));
  log('\n✅ Image compression complete!');
}

compressImages().catch(err => {
  log(`❌ Error: ${err.message}`);
  process.exit(1);
});
