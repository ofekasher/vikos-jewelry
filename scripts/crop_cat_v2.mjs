import sharp from 'sharp';
import path from 'path';

const SRC_DIR = "C:/Users/ofeka/AppData/Local/Temp/claude/C--Users-ofeka-OneDrive-Desktop-cloude-project/93a1386c-d37f-4412-916f-85bf3a0f68fa/scratchpad";
const OUT_DIR = path.join(process.cwd(), 'public');

const JOBS = [
  { src: 'cat_1_2143.jpg', out: 'cat-bracelets-v2.jpg' },   // bracelet
  { src: 'cat_2_2144.jpg', out: 'cat-earrings-v2.jpg' },    // earrings
  { src: 'cat_3_2145.jpg', out: 'cat-rings-v2.jpg' },       // ring
  { src: 'cat_4_2146.jpg', out: 'cat-necklaces-v2.jpg' },   // necklace
];

const TARGET_RATIO = 4 / 3; // width/height for the editorial tile

for (const { src, out } of JOBS) {
  const inputPath = path.join(SRC_DIR, src);
  // Trim the white background tightly around the product
  let img = sharp(inputPath);
  const trimmed = await img.trim({ threshold: 15 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const { width: w, height: h } = meta;

  // Add a small breathing margin (6% of the larger dimension) back around the trimmed product
  const margin = Math.round(Math.max(w, h) * 0.06);
  let canvasW = w + margin * 2;
  let canvasH = h + margin * 2;

  // Now extend the canvas to match TARGET_RATIO (pad with white), centered
  let finalW = canvasW, finalH = canvasH;
  if (canvasW / canvasH > TARGET_RATIO) {
    finalH = Math.round(canvasW / TARGET_RATIO);
  } else {
    finalW = Math.round(canvasH * TARGET_RATIO);
  }
  const padX = Math.floor((finalW - canvasW) / 2);
  const padY = Math.floor((finalH - canvasH) / 2);

  const result = await sharp(trimmed)
    .extend({ top: margin, bottom: margin, left: margin, right: margin, background: '#ffffff' })
    .extend({ top: padY, bottom: finalH - canvasH - padY, left: padX, right: finalW - canvasW - padX, background: '#ffffff' })
    .resize(1400, Math.round(1400 / TARGET_RATIO), { fit: 'fill' })
    .jpeg({ quality: 92 })
    .toBuffer();

  await sharp(result).toFile(path.join(OUT_DIR, out));
  console.log('✓', out, finalW, 'x', finalH, '-> 1400x' + Math.round(1400/TARGET_RATIO));
}
console.log('done');
