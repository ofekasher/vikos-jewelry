import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const dir = "./public/bracelets";
const INSET = 4; // px margin to avoid grid dividers

const grids = [
  // 3-col × 4-row grids (2052×2048)
  { file: "new_d01.png", cols: 3, rows: 4, w: 2052, h: 2048, prefix: "new_d01_prod" },
  { file: "new_d02.png", cols: 3, rows: 4, w: 2052, h: 2048, prefix: "new_d02_prod" },
  // 5-col × 2-row grids (2816×1536)
  { file: "new_d03.png", cols: 5, rows: 2, w: 2816, h: 1536, prefix: "new_d03_prod" },
  { file: "new_d04.png", cols: 5, rows: 2, w: 2816, h: 1536, prefix: "new_d04_prod" },
  { file: "new_d05.png", cols: 5, rows: 2, w: 2816, h: 1536, prefix: "new_d05_prod" },
  { file: "new_d06.png", cols: 5, rows: 2, w: 2816, h: 1536, prefix: "new_d06_prod" },
  { file: "new_d07.png", cols: 5, rows: 2, w: 2816, h: 1536, prefix: "new_d07_prod" },
  { file: "new_d08.png", cols: 5, rows: 2, w: 2816, h: 1536, prefix: "new_d08_prod" },
];

for (const g of grids) {
  const srcPath = path.join(dir, g.file);
  if (!fs.existsSync(srcPath)) { console.log(`SKIP (missing): ${g.file}`); continue; }

  // Calculate column boundaries (handles non-divisible widths)
  const colStarts = Array.from({ length: g.cols }, (_, i) => Math.round(g.w * i / g.cols));
  const rowStarts = Array.from({ length: g.rows }, (_, i) => Math.round(g.h * i / g.rows));

  console.log(`\nProcessing ${g.file} → ${g.cols}×${g.rows} = ${g.cols * g.rows} cells`);

  let num = 1;
  for (let row = 0; row < g.rows; row++) {
    for (let col = 0; col < g.cols; col++) {
      const x0 = colStarts[col];
      const y0 = rowStarts[row];
      const x1 = col + 1 < g.cols ? colStarts[col + 1] : g.w;
      const y1 = row + 1 < g.rows ? rowStarts[row + 1] : g.h;

      const left   = x0 + INSET;
      const top    = y0 + INSET;
      const width  = x1 - x0 - INSET * 2;
      const height = y1 - y0 - INSET * 2;

      const outName = `${g.prefix}_${String(num).padStart(2, '0')}.png`;
      await sharp(srcPath)
        .extract({ left, top, width, height })
        .toFile(path.join(dir, outName));

      console.log(`  ✓ ${outName} (${left},${top} ${width}×${height})`);
      num++;
    }
  }

  // Delete stale prod_11 / prod_12 if grid only has 10 cells
  if (g.cols * g.rows === 10) {
    for (const extra of ['_11', '_12']) {
      const bad = path.join(dir, `${g.prefix}${extra}.png`);
      if (fs.existsSync(bad)) { fs.unlinkSync(bad); console.log(`  🗑 deleted ${g.prefix}${extra}.png`); }
    }
  }
}

console.log('\n✅ All grids re-cropped.');
