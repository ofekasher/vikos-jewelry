import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RINGS_DIR = path.join(__dirname, '../public/rings/new');

async function autoTrimAndPad(inputPath, outputPath, targetSize = 900, padPercent = 0.12) {
  // 1. Load image
  const img = sharp(inputPath);
  const meta = await img.metadata();

  // 2. Convert to raw pixels to find content bounds
  const { data, info } = await sharp(inputPath)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const threshold = 215; // pixels brighter than this are "white background"

  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // Check if pixel is NOT white background
      if (r < threshold || g < threshold || b < threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // If no content found, just resize
  if (minX >= maxX || minY >= maxY) {
    await sharp(inputPath)
      .resize(targetSize, targetSize, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 92 })
      .toFile(outputPath);
    return;
  }

  // 3. Add padding around content
  const contentW = maxX - minX + 1;
  const contentH = maxY - minY + 1;
  const padPx = Math.round(Math.max(contentW, contentH) * padPercent);

  const cropLeft = Math.max(0, minX - padPx);
  const cropTop = Math.max(0, minY - padPx);
  const cropRight = Math.min(width, maxX + padPx + 1);
  const cropBottom = Math.min(height, maxY + padPx + 1);
  const cropW = cropRight - cropLeft;
  const cropH = cropBottom - cropTop;

  // 4. Crop to content + padding, then resize to square target
  await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
    .resize(targetSize, targetSize, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 92 })
    .toFile(outputPath);
}

// Process all ring images in the new folder
const files = fs.readdirSync(RINGS_DIR).filter(f => f.endsWith('.jpg'));
console.log(`Processing ${files.length} ring images...`);

let done = 0;
const tmpSuffix = '__tmp.jpg';

for (const file of files) {
  const filePath = path.join(RINGS_DIR, file);
  const tmpPath = path.join(RINGS_DIR, file.replace('.jpg', tmpSuffix));

  try {
    await autoTrimAndPad(filePath, tmpPath, 900, 0.04);
    // Replace original with improved version
    fs.renameSync(tmpPath, filePath);
    done++;
    if (done % 20 === 0) console.log(`  ${done}/${files.length}...`);
  } catch (err) {
    console.warn(`  ⚠ ${file}: ${err.message}`);
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
}

console.log(`\nDone! Improved ${done} ring images.`);
