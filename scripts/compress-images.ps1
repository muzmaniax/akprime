#!/usr/bin/env pwsh
# Image compression script using ffmpeg

$imagesDir = "$PSScriptRoot\..\public\images"
$logFile = "$PSScriptRoot\compression-results.txt"

# Clear log
"" | Out-File -FilePath $logFile -Encoding utf8 -Force

function Log($msg) {
  Write-Host $msg
  $msg | Add-Content -Path $logFile
}

Log "[IMAGE COMPRESSION] Starting image compression..."
Log ""

$jpgFiles = Get-ChildItem -Path $imagesDir -Filter "*.jpg" -File
$totalBefore = 0
$totalAfter = 0
$successCount = 0

foreach ($file in $jpgFiles) {
  $filePath = $file.FullName
  $fileName = $file.Name
  $sizeBefore = $file.Length
  $totalBefore += $sizeBefore

  # Create temp output file
  $tempFile = "$filePath.tmp.jpg"

  try {
    # Use ffmpeg to compress
    # -q:v 5 = quality level (lower = better, 5 is good)
    # -c:v mjpeg = motion jpeg codec (progressive friendly)
    # Silent output redirect
    $ffmpegCmd = "ffmpeg -y -i `"$filePath`" -q:v 5 -c:v mjpeg `"$tempFile`" 2>&1"
    $output = Invoke-Expression $ffmpegCmd 2>&1

    if (Test-Path $tempFile) {
      $sizeAfter = (Get-Item $tempFile).Length
      $totalAfter += $sizeAfter

      if ($sizeAfter -lt $sizeBefore) {
        # Replace original with compressed
        Remove-Item $filePath
        Rename-Item -Path $tempFile -NewName $fileName

        $beforeMB = [math]::Round($sizeBefore / 1MB, 2)
        $afterMB = [math]::Round($sizeAfter / 1MB, 2)
        $reduction = [math]::Round((($sizeBefore - $sizeAfter) / $sizeBefore) * 100, 1)

        Log "[OK] $fileName`: ${beforeMB}MB -> ${afterMB}MB (-${reduction}%)"
        $successCount++
      } else {
        Remove-Item $tempFile
        $beforeMB = [math]::Round($sizeBefore / 1MB, 2)
        Log "[SKIP] $fileName`: already optimized (${beforeMB}MB)"
        $totalAfter += $sizeBefore
      }
    } else {
      Log "✗ $fileName`: compression failed"
      $totalAfter += $sizeBefore
    }
  } catch {
    Log "✗ $fileName`: error - $_"
    $totalAfter += $sizeBefore
  }
}

Log ""
Log ("=" * 60)
$totalBeforeMB = [math]::Round($totalBefore / 1MB, 1)
$totalAfterMB = [math]::Round($totalAfter / 1MB, 1)
$savedMB = [math]::Round(($totalBefore - $totalAfter) / 1MB, 1)
$reduction = [math]::Round((($totalBefore - $totalAfter) / $totalBefore) * 100, 1)

Log "Total Original:   ${totalBeforeMB}MB"
Log "Total Compressed: ${totalAfterMB}MB"
Log "Total Saved:      ${savedMB}MB"
Log "Overall Reduction: ${reduction}%"
Log "Success Count:    $successCount/$($jpgFiles.Count) files"
Log ("=" * 60)
Log "[COMPLETE] Image compression complete!"
