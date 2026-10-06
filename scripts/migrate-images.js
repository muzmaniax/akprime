#!/usr/bin/env node

/**
 * Image Migration Script (Simplified)
 *
 * Downloads all external images and updates references to local paths
 * No external dependencies required
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

const SOURCE_DIR = path.join(__dirname, '..');
const PUBLIC_IMAGES_DIR = path.join(SOURCE_DIR, 'public', 'images');
const MAPPING_FILE = path.join(SOURCE_DIR, 'IMAGE_MAPPING.json');

let urlMapping = {};
let stats = { found: 0, downloaded: 0, failed: 0, updated: 0 };

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Generate safe filename from URL
 */
function generateFilename(url) {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  let filename = path.basename(pathname).split('?')[0];

  if (!filename || filename.length < 3) {
    filename = crypto.createHash('md5').update(url).digest('hex').substring(0, 12);
  }

  return filename.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
}

/**
 * Download image
 */
function downloadImage(url) {
  return new Promise((resolve) => {
    const filename = generateFilename(url);
    const filepath = path.join(PUBLIC_IMAGES_DIR, filename);

    if (fs.existsSync(filepath)) {
      console.log(`  ⊘ Exists: ${filename}`);
      resolve({ url, local: `/images/${filename}` });
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    let size = 0;

    protocol
      .get(url, { timeout: 10000 }, (response) => {
        response.on('data', (chunk) => {
          size += chunk.length;
        });

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          stats.downloaded++;
          console.log(`  ✓ Downloaded: ${filename} (${(size / 1024).toFixed(1)}KB)`);
          resolve({ url, local: `/images/${filename}` });
        });
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {});
        stats.failed++;
        console.log(`  ✗ Failed: ${url}`);
        console.log(`    Error: ${err.message}`);
        resolve(null);
      });
  });
}

/**
 * Recursively find files
 */
function findFiles(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  let files = [];

  function walk(currentPath) {
    try {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        const relativePath = path.relative(SOURCE_DIR, fullPath);

        // Skip node_modules, .next, etc
        if (entry.isDirectory()) {
          if (!/^(node_modules|\.next|\.git|dist|\.claude)/.test(relativePath)) {
            walk(fullPath);
          }
        } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    } catch (err) {
      // Skip permission errors
    }
  }

  walk(dir);
  return files;
}

/**
 * Extract image URLs from file
 */
function extractImageUrls(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    const urlRegex = /https?:\/\/[^\s"'`<>{}|\\^[\]]+/g;
    const urls = content.match(urlRegex) || [];

    return urls.filter((url) => {
      const lower = url.toLowerCase();
      return (
        lower.includes('.jpg') ||
        lower.includes('.jpeg') ||
        lower.includes('.png') ||
        lower.includes('.gif') ||
        lower.includes('.webp') ||
        lower.includes('.svg') ||
        /unsplash\.com|pexels\.com|pixabay\.com|imgur\.com/.test(url)
      );
    });
  } catch (err) {
    return [];
  }
}

/**
 * Update file with new paths
 */
function updateFile(filepath, mapping) {
  try {
    let content = fs.readFileSync(filepath, 'utf-8');
    let changed = false;

    Object.entries(mapping).forEach(([oldUrl, newPath]) => {
      if (content.includes(oldUrl)) {
        const regex = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        content = content.replace(regex, newPath);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(filepath, content, 'utf-8');
      stats.updated++;
      return true;
    }
  } catch (err) {
    console.error(`Error updating ${filepath}:`, err.message);
  }

  return false;
}

/**
 * Main
 */
async function main() {
  console.log('\n📥 Image Migration Script\n');

  ensureDir(PUBLIC_IMAGES_DIR);
  console.log(`📁 Public images directory: public/images/\n`);

  // Find files
  console.log('🔍 Scanning for source files...');
  const files = findFiles(SOURCE_DIR);
  console.log(`   Found ${files.length} files\n`);

  // Extract URLs
  console.log('🔎 Extracting image URLs...');
  let allUrls = [];
  files.forEach((file) => {
    const urls = extractImageUrls(file);
    allUrls.push(...urls);
  });

  const uniqueUrls = [...new Set(allUrls)];
  stats.found = uniqueUrls.length;

  if (uniqueUrls.length === 0) {
    console.log('   No external images found\n');
    return;
  }

  console.log(`   Found ${uniqueUrls.length} unique image URLs\n`);

  // Download
  console.log('⬇️  Downloading images...\n');
  for (const url of uniqueUrls) {
    const result = await downloadImage(url);
    if (result) {
      urlMapping[url] = result.local;
    }
  }

  // Save mapping
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(urlMapping, null, 2), 'utf-8');
  console.log(`\n✓ Mapping saved: IMAGE_MAPPING.json\n`);

  // Update files
  console.log('🔄 Updating source files...\n');
  files.forEach((file) => {
    if (updateFile(file, urlMapping)) {
      const rel = path.relative(SOURCE_DIR, file);
      console.log(`  ↻ ${rel}`);
    }
  });

  // Summary
  console.log('\n' + '═'.repeat(50));
  console.log(`✓ Found:      ${stats.found} images`);
  console.log(`✓ Downloaded: ${stats.downloaded} images`);
  console.log(`✓ Failed:     ${stats.failed} images`);
  console.log(`✓ Updated:    ${stats.updated} files`);
  console.log('═'.repeat(50) + '\n');

  console.log('📋 Next steps:');
  console.log('  1. Review downloaded images: public/images/');
  console.log('  2. Check IMAGE_MAPPING.json');
  console.log('  3. Test the website');
  console.log('  4. Commit changes:\n');
  console.log('     git add public/images/ IMAGE_MAPPING.json');
  console.log('     git commit -m "Move images to public directory"\n');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
