# Image Migration Guide

## Overview

This guide helps you migrate all external images (from URLs like Unsplash, Pexels, etc.) to local files stored in the `public/images/` directory.

**Benefits:**
- ✅ No broken images if external sources change
- ✅ Faster image loading (same CDN as your site)
- ✅ Better control over image versions
- ✅ Improved SEO
- ✅ Reduced external dependencies

---

## Quick Start

### Step 1: Run the Migration Script

```bash
npm run migrate-images
```

This script will:
1. **Scan** your codebase for external image URLs
2. **Download** each unique image to `public/images/`
3. **Create** `IMAGE_MAPPING.json` (tracking old → new paths)
4. **Update** all source files with new local paths

### Step 2: Verify Images Downloaded

```bash
ls -la public/images/
```

Check that all images are present and have reasonable sizes.

### Step 3: Review the Mapping File

```bash
cat IMAGE_MAPPING.json
```

This JSON file maps old URLs to new local paths. Example:

```json
{
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&q=80": "/images/photo-1552664730-d307ca884978.jpg",
  "https://images.unsplash.com/photo-1556159383-e51a58dd3c84?w=600": "/images/photo-1556159383-e51a58dd3c84.jpg"
}
```

### Step 4: Test Your Site

```bash
npm run dev
```

Visit `http://localhost:3000` and verify all images load correctly.

### Step 5: Commit Changes

```bash
git add public/images/ IMAGE_MAPPING.json
git commit -m "Migrate external images to local public directory

- Download all external images to public/images/
- Update references in source files
- Create IMAGE_MAPPING.json for tracking
- Improves reliability and performance"
```

---

## What Gets Migrated

The script looks for:
- **File types**: `.tsx`, `.ts`, `.jsx`, `.js` (source files)
- **Image sources**: 
  - `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg` files
  - URLs from: unsplash.com, pexels.com, pixabay.com, imgur.com, etc.
  - Any `https://` or `http://` URL pointing to images

---

## Image Storage Structure

```
public/
├── images/                          # All migrated images
│   ├── photo-1552664730-d307ca884978.jpg
│   ├── illustration-team-working.png
│   ├── icon-arrow-right.svg
│   └── ...
│
└── ... (other public assets)

IMAGE_MAPPING.json                  # Mapping file (committed to git)
```

---

## Handling Special Cases

### 1. Images with Query Parameters

Before:
```
https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&q=80
```

After:
```
/images/photo-1552664730-d307ca884978.jpg
```

The script automatically removes query parameters.

### 2. Duplicate URLs

If the same image URL appears multiple times, it's only downloaded once. The mapping file tracks all references.

### 3. Failed Downloads

If an image fails to download (404, timeout, etc.):
- The script logs the error
- The original URL is preserved in your code
- Manual intervention may be needed

Review the console output for failed images and handle manually:

```bash
# Manual download (if needed)
curl -o public/images/custom-image.jpg https://example.com/image.jpg

# Update the source files manually
# Find: https://example.com/image.jpg
# Replace: /images/custom-image.jpg
```

---

## Optimization Tips

### 1. Image Compression (Optional)

After migration, consider compressing images:

```bash
# Install imagemin (optional)
npm install --save-dev imagemin imagemin-mozjpeg imagemin-pngquant

# Compress images
npx imagemin public/images/*.{jpg,png} --out-dir=public/images
```

### 2. Convert to WebP (Optional)

For better performance, convert images to WebP:

```bash
# Install cwebp or similar tool
# brew install cwebp (macOS)
# apt-get install webp (Linux)

# Convert
cwebp public/images/*.jpg -o public/images/%.webp
```

Then use both formats in your HTML:

```jsx
<picture>
  <source srcSet="/images/photo.webp" type="image/webp" />
  <img src="/images/photo.jpg" alt="..." />
</picture>
```

---

## Troubleshooting

### Script doesn't find images

Make sure:
1. Image URLs are valid `http://` or `https://` links
2. URLs are on separate lines or properly spaced
3. Files are in `app/`, `components/`, or `src/` directories

### Images fail to download

Check:
1. Network connectivity
2. Image URL is still valid
3. Server timeout (try again)
4. CORS issues (rare, requires manual download)

### Some files didn't update

The script updates most common patterns. For edge cases:
1. Manually search for the old URL
2. Replace with the new local path from `IMAGE_MAPPING.json`
3. Test thoroughly

### Performance hasn't improved

Verify:
1. Images are actually being served from `public/images/`
2. Images are compressed (see Optimization section)
3. Browser cache is cleared
4. CDN is properly configured (if using one)

---

## Maintenance

### Adding New Images

When adding new external images to your project:

1. Add the URL to your source code as usual
2. Before deployment, run:
   ```bash
   npm run migrate-images
   ```
3. Commit the new files and updates

### Removing Unused Images

Periodically audit `public/images/`:

1. Check `IMAGE_MAPPING.json` for all tracked URLs
2. Search your code for references
3. Delete unreferenced image files
4. Remove entries from `IMAGE_MAPPING.json`

---

## Rollback (If Needed)

If you need to revert to external URLs:

```bash
git log --oneline | grep -i "migrate\|image"
git reset --hard <commit-before-migration>
```

Or manually restore using `IMAGE_MAPPING.json` to find the original URLs.

---

## Script Source

Location: `scripts/migrate-images.js`

The script:
- ✅ No external dependencies
- ✅ Handles timeouts and errors gracefully
- ✅ Supports all image formats
- ✅ Preserves original filenames when possible
- ✅ Generates unique filenames if needed

---

## Questions?

Review `IMAGE_MAPPING.json` for the complete mapping of old→new paths.

Check the console output from `npm run migrate-images` for detailed logs.
