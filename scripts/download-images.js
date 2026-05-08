#!/usr/bin/env node

/**
 * Image Download & Local Migration Script
 *
 * This script:
 * 1. Scans the codebase for external image URLs
 * 2. Downloads them to the public directory
 * 3. Creates a mapping of old URLs to new local paths
 * 4. Optionally updates source files with new references
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

// Configuration
const CONFIG = {
  sourceDir: path.join(__dirname, '..'),
  publicDir: path.join(__dirname, '..', 'public', 'images'),
  imagesDir: 'images',
  filePatterns: ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js', '**/*.css', '**/*.json'],
  excludeDirs: ['node_modules', '.next', 'dist', '.git', 'public'],
  updateSources: true, // Set to false to only download without updating files
};

// URL regex pattern - matches http/https URLs
const URL_REGEX = /https?:\/\/[^\s"'`<>{}|\\^[\]]+/g;

// Image extensions to keep
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

let downloadedImages = {};
let urlMapping = {};

/**
 * Ensure public/images directory exists
 */
function ensurePublicImagesDir() {
  if (!fs.existsSync(CONFIG.publicDir)) {
    fs.mkdirSync(CONFIG.publicDir, { recursive: true });
    console.log(`✓ Created directory: ${CONFIG.publicDir}`);
  }
}

/**
 * Generate a safe filename from URL
 */
function generateFilename(url) {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const ext = path.extname(pathname) || '.jpg';

  // Clean filename - remove query params and special chars
  let filename = path.basename(pathname).split('?')[0];
  if (!filename || filename.length < 3) {
    // Fallback: use hash of URL
    filename = crypto.createHash('md5').update(url).digest('hex').substring(0, 12);
  }

  return filename.toLowerCase().replace(/[^a-z0-9.-]/g, '-') + (ext === path.extname(filename) ? '' : ext);
}

/**
 * Download image from URL
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const filename = generateFilename(url);
    const filepath = path.join(CONFIG.publicDir, filename);

    // Skip if already downloaded
    if (fs.existsSync(filepath)) {
      console.log(`⊘ Already exists: ${filename}`);
      resolve({ url, filename, filepath, local: `/${CONFIG.imagesDir}/${filename}` });
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol
      .get(url, { timeout: 10000 }, (response) => {
        if (response.statusCode === 404) {
          reject(new Error(`404 Not Found: ${url}`));
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${filename}`);
          resolve({ url, filename, filepath, local: `/${CONFIG.imagesDir}/${filename}` });
        });
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete incomplete file
        reject(err);
      });
  });
}

/**
 * Find all files matching patterns
 */
function findFiles(dir, patterns, excludeDirs) {
  let files = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(CONFIG.sourceDir, fullPath);

      // Skip excluded directories
      if (entry.isDirectory()) {
        if (excludeDirs.some((excluded) => relativePath.includes(excluded))) {
          continue;
        }
        walk(fullPath);
      } else {
        // Check if file matches patterns
        const matches = patterns.some((pattern) => {
          const minMatch = require('minimatch');
          return minMatch(relativePath, pattern) || minMatch(entry.name, pattern);
        });

        if (matches) {
          files.push(fullPath);
        }
      }
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
    const urls = content.match(URL_REGEX) || [];

    return urls.filter((url) => {
      const isImage = IMAGE_EXTENSIONS.some((ext) => url.toLowerCase().includes(ext));
      return isImage;
    });
  } catch (err) {
    console.error(`Error reading ${filepath}:`, err.message);
    return [];
  }
}

/**
 * Update file content with new image paths
 */
function updateFileContent(filepath, mapping) {
  try {
    let content = fs.readFileSync(filepath, 'utf-8');
    let updated = false;

    Object.entries(mapping).forEach(([oldUrl, newPath]) => {
      if (content.includes(oldUrl)) {
        content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
        updated = true;
      }
    });

    if (updated) {
      fs.writeFileSync(filepath, content, 'utf-8');
      console.log(`↻ Updated: ${path.relative(CONFIG.sourceDir, filepath)}`);
    }

    return updated;
  } catch (err) {
    console.error(`Error updating ${filepath}:`, err.message);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🖼️  Image Download & Migration Script\n');
  console.log('Configuration:');
  console.log(`  Source Directory: ${CONFIG.sourceDir}`);
  console.log(`  Public Images Dir: ${CONFIG.publicDir}`);
  console.log(`  Update Sources: ${CONFIG.updateSources}`);
  console.log('');

  try {
    // Step 1: Ensure directories exist
    ensurePublicImagesDir();

    // Step 2: Find all source files
    console.log('Scanning for source files...');
    const files = findFiles(CONFIG.sourceDir, CONFIG.filePatterns, CONFIG.excludeDirs);
    console.log(`✓ Found ${files.length} files to scan\n`);

    // Step 3: Extract all image URLs
    console.log('Extracting image URLs...');
    let allUrls = [];
    files.forEach((file) => {
      const urls = extractImageUrls(file);
      allUrls = allUrls.concat(urls);
    });

    const uniqueUrls = [...new Set(allUrls)];
    console.log(`✓ Found ${uniqueUrls.length} unique image URLs\n`);

    if (uniqueUrls.length === 0) {
      console.log('No image URLs found.');
      return;
    }

    // Step 4: Download images
    console.log('Downloading images...\n');
    for (const url of uniqueUrls) {
      try {
        const result = await downloadImage(url);
        urlMapping[url] = result.local;
        downloadedImages[url] = result;
      } catch (err) {
        console.error(`✗ Failed to download ${url}: ${err.message}`);
      }
    }

    // Step 5: Save mapping file
    const mappingFile = path.join(CONFIG.sourceDir, 'IMAGE_MAPPING.json');
    fs.writeFileSync(mappingFile, JSON.stringify(urlMapping, null, 2), 'utf-8');
    console.log(`\n✓ Mapping saved to: IMAGE_MAPPING.json\n`);

    // Step 6: Update source files (if enabled)
    if (CONFIG.updateSources) {
      console.log('Updating source files...\n');
      let updatedCount = 0;
      files.forEach((file) => {
        if (updateFileContent(file, urlMapping)) {
          updatedCount++;
        }
      });
      console.log(`\n✓ Updated ${updatedCount} files\n`);
    } else {
      console.log('\n⚠ Source files NOT updated (updateSources is false)\n');
      console.log('To update files, modify the mapping in IMAGE_MAPPING.json and manually:');
      console.log('  1. Use find-and-replace in your editor, OR');
      console.log('  2. Run this script again with updateSources: true\n');
    }

    // Summary
    console.log('═══════════════════════════════════════════════');
    console.log(`✓ Successfully processed ${Object.keys(urlMapping).length} images`);
    console.log(`✓ Images saved to: public/${CONFIG.imagesDir}/`);
    console.log(`✓ Mapping file: IMAGE_MAPPING.json`);
    console.log('═══════════════════════════════════════════════\n');

    console.log('Next steps:');
    console.log('  1. Review the downloaded images in public/images/');
    console.log('  2. Check IMAGE_MAPPING.json for URL mappings');
    if (!CONFIG.updateSources) {
      console.log('  3. Run again with updateSources: true to update source files');
    } else {
      console.log('  3. Test the website to ensure images load correctly');
      console.log('  4. Commit the changes: git add public/images/ IMAGE_MAPPING.json');
    }
    console.log('');
  } catch (err) {
    console.error('Fatal error:', err.message);
    process.exit(1);
  }
}

// Check for minimatch dependency
try {
  require.resolve('minimatch');
} catch (e) {
  console.error('Error: minimatch not found. Install with: npm install minimatch');
  process.exit(1);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
