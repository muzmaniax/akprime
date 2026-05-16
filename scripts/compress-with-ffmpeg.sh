#!/bin/bash

# Compress all JPG images using ffmpeg for better quality/size ratio
# This will replace originals with compressed versions

cd public/images

echo "🖼️  Compressing JPG images with ffmpeg..."
echo ""

total_before=0
total_after=0

for jpg in *.jpg; do
  if [ -f "$jpg" ]; then
    before=$(stat -f%z "$jpg" 2>/dev/null || stat -c%s "$jpg" 2>/dev/null)
    before_mb=$(echo "scale=2; $before / 1024 / 1024" | bc)
    total_before=$((total_before + before))

    # Create temp file
    temp_file="${jpg}.tmp"

    # Compress with ffmpeg: quality 80, progressive, optimize
    ffmpeg -y -i "$jpg" -q:v 5 -progressive "$temp_file" 2>/dev/null

    after=$(stat -f%z "$temp_file" 2>/dev/null || stat -c%s "$temp_file" 2>/dev/null)
    after_mb=$(echo "scale=2; $after / 1024 / 1024" | bc)
    total_after=$((total_after + after))
    reduction=$(echo "scale=1; (($before - $after) / $before) * 100" | bc)

    # Only replace if compressed version is smaller
    if [ $after -lt $before ]; then
      mv "$temp_file" "$jpg"
      echo "✓ $jpg: ${before_mb}MB → ${after_mb}MB (-${reduction}%)"
    else
      rm -f "$temp_file"
      echo "⊘ $jpg: already optimized"
    fi
  fi
done

echo ""
echo "=========================================="
total_before_mb=$(echo "scale=1; $total_before / 1024 / 1024" | bc)
total_after_mb=$(echo "scale=1; $total_after / 1024 / 1024" | bc)
saved=$(echo "scale=1; ($total_before - $total_after) / 1024 / 1024" | bc)
reduction=$(echo "scale=1; (($total_before - $total_after) / $total_before) * 100" | bc)

echo "Total Before:   ${total_before_mb}MB"
echo "Total After:    ${total_after_mb}MB"
echo "Total Saved:    ${saved}MB"
echo "Reduction:      ${reduction}%"
echo "=========================================="
echo "✅ Image compression complete!"
