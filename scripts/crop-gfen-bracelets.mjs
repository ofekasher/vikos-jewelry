/**
 * Crop gfen bracelet composite images into individual product shots.
 *
 * Layouts discovered by visual inspection:
 *  A – 1920×1080 landscape, VIKOS header ~195px, 5 zones (01,02,03,05,07)
 *  B – Portrait 3×2 grid, no header, 6 cells (06,08,09,10)
 *  C – Portrait 3 rows, full width per row, 3 shots (04)
 *  D – Portrait complex multi-grid (11)
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir  = path.join(__dirname, '..', 'public', 'bracelets', 'gfen');
const outDir  = path.join(__dirname, '..', 'public', 'bracelets', 'gfen', 'cropped');

fs.mkdirSync(outDir, { recursive: true });

async function crop(srcFile, destFile, left, top, width, height) {
  const src  = path.join(srcDir, srcFile);
  const dest = path.join(outDir, destFile);
  await sharp(src)
    .extract({ left: Math.round(left), top: Math.round(top), width: Math.round(width), height: Math.round(height) })
    .jpeg({ quality: 92 })
    .toFile(dest);
  console.log(`  ✓ ${destFile}`);
}

async function meta(id) {
  const m = await sharp(path.join(srcDir, `${id}.jpg`)).metadata();
  return { w: m.width, h: m.height };
}

/* ── Layout A: 1920×1080 VIKOS header + 5 zones ── */
async function layoutA(id) {
  const { w, h } = await meta(id);
  console.log(`${id}: ${w}×${h} → Layout A`);

  // Calibrated from visual inspection of gfen_br_03 & gfen_br_07
  // Side strip is at the CENTER of the 1920px width, not at 63%
  const headerH = Math.round(h * 0.21);    // ~227px — safely past the title text
  const midY    = Math.round(h * 0.50);    // ~540px — horizontal split between top/bottom panels
  const sideX   = Math.round(w * 0.46);    // ~883px — left edge of center side strip
  const sideW   = Math.round(w * 0.075);   // ~144px — width of center side strip
  const margin  = Math.round(w * 0.026);   // ~50px
  const botEnd  = Math.round(h * 0.935);   // ~1010px — bottom of content

  const leftW  = sideX - margin - 8;
  const rightX = sideX + sideW + 8;
  const rightW = w - rightX - margin;
  const topH   = midY - headerH - 4;
  const botH   = botEnd - midY - 4;

  await crop(`${id}.jpg`, `${id}_front.jpg`,   margin, headerH,      leftW,  topH);
  await crop(`${id}.jpg`, `${id}_angle.jpg`,   rightX, headerH,      rightW, topH);
  await crop(`${id}.jpg`, `${id}_side.jpg`,    sideX,  headerH + 20, sideW,  Math.round(h * 0.44));
  await crop(`${id}.jpg`, `${id}_back.jpg`,    margin, midY,         leftW,  botH);
  await crop(`${id}.jpg`, `${id}_closeup.jpg`, rightX, midY,         rightW, botH);
}

/* ── Layout B2: 1920×1920 VIKOS square with header + 3×2 grid ── */
// gfen_br_06 only: VIKOS logo + title ends at ~310px, then 3 rows × 2 cols
// Each row has product photo + label at the bottom (~60px)
async function layoutB2(id) {
  const { w, h } = await meta(id);
  console.log(`${id}: ${w}×${h} → Layout B2 (square with header)`);

  const headerH = Math.round(h * 0.175);  // ~336px — safely past logo + title
  const labelH  = Math.round(h * 0.08);   // ~154px — bottom label to trim (FRONT/ANGLE text)
  const gridH   = h - headerH;            // ~1584px
  const rowH    = Math.round(gridH / 3);  // ~528px per row (incl. label)
  const cH      = rowH - labelH;          // ~465px — content only
  const cW      = Math.round(w / 2);      // 960px per col

  await crop(`${id}.jpg`, `${id}_front.jpg`,   0,  headerH,         cW,     cH);
  await crop(`${id}.jpg`, `${id}_angle.jpg`,   cW, headerH,         w - cW, cH);
  await crop(`${id}.jpg`, `${id}_side.jpg`,    0,  headerH + rowH,  cW,     cH);
  await crop(`${id}.jpg`, `${id}_back.jpg`,    cW, headerH + rowH,  w - cW, cH);
  await crop(`${id}.jpg`, `${id}_closeup.jpg`, 0,  headerH + rowH*2, cW,    cH);
  // skip bottom-right (packaging)
}

/* ── Layout B: Portrait 3×2 equal grid ── */
async function layoutB(id, skipBR = false) {
  const { w, h } = await meta(id);
  console.log(`${id}: ${w}×${h} → Layout B`);

  const cW = Math.round(w / 2);
  const cH = Math.round(h / 3);

  await crop(`${id}.jpg`, `${id}_front.jpg`,   0,   0,      cW,     cH);
  await crop(`${id}.jpg`, `${id}_angle.jpg`,   cW,  0,      w - cW, cH);
  await crop(`${id}.jpg`, `${id}_side.jpg`,    0,   cH,     cW,     cH);
  await crop(`${id}.jpg`, `${id}_closeup.jpg`, cW,  cH,     w - cW, cH);
  await crop(`${id}.jpg`, `${id}_back.jpg`,    0,   cH * 2, cW,     h - cH * 2);
  if (!skipBR) {
    await crop(`${id}.jpg`, `${id}_extra.jpg`, cW,  cH * 2, w - cW, h - cH * 2);
  }
}

/* ── Layout C: Portrait 3 rows full-width ── */
async function layoutC(id) {
  const { w, h } = await meta(id);
  console.log(`${id}: ${w}×${h} → Layout C`);

  const rH = Math.round(h / 3);
  await crop(`${id}.jpg`, `${id}_front.jpg`, 0, 0,      w, rH);
  await crop(`${id}.jpg`, `${id}_side.jpg`,  0, rH,     w, rH);
  await crop(`${id}.jpg`, `${id}_back.jpg`,  0, rH * 2, w, h - rH * 2);
}

/* ── Layout D: gfen_br_11 — full top-row panorama + lower 4×4 individual cells ── */
// 1080×1080: top row height ~33% (bracelets positioned at bottom of each cell)
// Lower section: 4 rows × 4 cols, each cell ~270×181
async function layoutD(id) {
  const { w, h } = await meta(id);
  console.log(`${id}: ${w}×${h} → Layout D`);

  const topH  = Math.round(h * 0.33);   // ~356px — top 3-col row
  const gridY = topH;
  const gridH = h - topH;               // ~724px
  const ROWS  = 4;
  const COLS  = 4;
  const cellH = Math.round(gridH / ROWS); // ~181px
  const cellW = Math.round(w / COLS);     // ~270px

  // Full top row as a single panoramic front shot (all 3 views together)
  await crop(`${id}.jpg`, `${id}_front.jpg`, 0, 0, w, topH);

  // Individual cells from the lower 4×4 grid
  const labels = [
    'side', 'angle', 'closeup', 'detail1',   // row 1
    'back', 'detail2', 'detail3', 'detail4',  // row 2
  ];
  let li = 0;
  for (let row = 0; row < Math.min(ROWS, 2); row++) {
    for (let col = 0; col < COLS; col++) {
      const label = labels[li++];
      await crop(`${id}.jpg`, `${id}_${label}.jpg`,
        col * cellW, gridY + row * cellH, cellW, cellH);
    }
  }
}

async function main() {
  console.log('\n=== Cropping GFEN bracelet images ===\n');

  // Layout A: 1920×1080 VIKOS header + 5 zones
  for (const id of ['gfen_br_01', 'gfen_br_02', 'gfen_br_03', 'gfen_br_05', 'gfen_br_07']) {
    await layoutA(id);
  }

  // Layout B2: 1920×1920 square with VIKOS header + 3×2 grid
  await layoutB2('gfen_br_06');

  // Layout B: Portrait 3×2 equal grid
  await layoutB('gfen_br_08');
  await layoutB('gfen_br_09');
  await layoutB('gfen_br_10');

  // Layout C: Portrait 3 rows full-width
  await layoutC('gfen_br_04');

  // Layout D: gfen_br_11 complex grid
  await layoutD('gfen_br_11');

  console.log('\n✅ Done! Check public/bracelets/gfen/cropped/');
}

main().catch(console.error);
