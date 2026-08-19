import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = 'C:/Users/ofeka/OneDrive/Desktop/cloude project/J-M project/דוגמאות לטבעות/222.jpeg';
const OUT = path.join(__dirname, '../public/rings/new');
const AUTOTRIM_OUT = path.join(__dirname, '../public/rings/new');

const PRODUCTS = [
  { id: 'r_eternity_silver', section: 0 },
  { id: 'r_eternity_gold',   section: 1 },
  { id: 'r_eternity_rose',   section: 2 },
];

// In 222.jpeg, each section (Silver/Gold/Rose) has 3 rows:
//   row 0: big title (SILVER 925 / YELLOW GOLD 14K / ROSE GOLD 14K)
//   row 1: column labels (FRONT / ANGLE 45° / SIDE / BACK / ON HAND)
//   row 2: ring photos  ← the one we want
// The 5 image columns span the full image width with NO label column on left.

async function autoTrimAndPad(inputPath, outputPath, targetSize = 900, padPercent = 0.04) {
  const { data, info } = await sharp(inputPath)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const threshold = 215;

  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx] < threshold || data[idx + 1] < threshold || data[idx + 2] < threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) {
    await sharp(inputPath)
      .resize(targetSize, targetSize, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 92 })
      .toFile(outputPath);
    return;
  }

  const contentW = maxX - minX + 1;
  const contentH = maxY - minY + 1;
  const padPx = Math.round(Math.max(contentW, contentH) * padPercent);
  const cropLeft = Math.max(0, minX - padPx);
  const cropTop = Math.max(0, minY - padPx);
  const cropRight = Math.min(width, maxX + padPx + 1);
  const cropBottom = Math.min(height, maxY + padPx + 1);

  await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropRight - cropLeft, height: cropBottom - cropTop })
    .resize(targetSize, targetSize, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 92 })
    .toFile(outputPath);
}

async function run() {
  const meta = await sharp(SRC).metadata();
  const { width, height } = meta;
  console.log(`222.jpeg: ${width} × ${height}`);

  const sectionH = Math.floor(height / 3);
  const colW     = Math.floor(width / 5); // 5 equal columns, NO label col

  // Within each section, the image row is approximately in the bottom 60%
  // (top ~40% = big title + column labels)
  const imgRowStart = Math.floor(sectionH * 0.38);
  const imgRowH     = sectionH - imgRowStart;

  const tmpDir = path.join(__dirname, '_eternity_tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  for (const prod of PRODUCTS) {
    const sectionTop = prod.section * sectionH;
    const top = sectionTop + imgRowStart;

    for (let ci = 0; ci < 5; ci++) {
      const left = ci * colW;
      const raw  = path.join(tmpDir, `${prod.id}_v${ci + 1}_raw.jpg`);
      const final = path.join(OUT, `${prod.id}_v${ci + 1}.jpg`);

      // 1. Crop raw cell
      await sharp(SRC)
        .extract({ left, top, width: colW, height: imgRowH })
        .jpeg({ quality: 92 })
        .toFile(raw);

      // 2. Auto-trim + pad + resize → 900×900
      await autoTrimAndPad(raw, final);
      console.log(`  ✓ ${prod.id}_v${ci + 1}.jpg`);
    }
  }

  // Cleanup temp files
  fs.readdirSync(tmpDir).forEach(f => fs.unlinkSync(path.join(tmpDir, f)));
  fs.rmdirSync(tmpDir);
  console.log('\nDone! Eternity ring images regenerated.');
}

run().catch(console.error);
