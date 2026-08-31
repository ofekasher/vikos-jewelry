/**
 * Crop gfen necklace composite images into individual product shots.
 *
 * Layouts:
 *  nk_01 — 1536×1024, 5×2 grid with Hebrew labels (Pink Heart)
 *  nk_02 — 1920×1280, 1 large left + 2 small right stacked (Black Heart Choker)
 *  nk_03 — 1080×1080, 3 equal columns (Butterfly Choker)
 *  nk_04 — 1402×1122, 2×2 grid (Gold Tennis Choker)
 *  nk_05 — 1402×1122, 2 top + 3 bottom (Rose Gold Tennis)
 *  nk_06 — 1254×1254, single view (Evil Eye Heart) → copy as-is
 *  nk_07 — 1254×1254, single view (Fish Charm) → copy as-is
 *  nk_08 — 1536×1024, 3×2 grid (Star of David)
 *  nk_09 — 1536×1024, 3×2 grid (Name Necklace, skip bracelet cell)
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir  = path.join(__dirname, '..', 'public', 'necklaces', 'gfen');
const outDir  = path.join(__dirname, '..', 'public', 'necklaces', 'gfen', 'cropped');

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

async function copyAsJpeg(srcFile, destFile) {
  const src  = path.join(srcDir, srcFile);
  const dest = path.join(outDir, destFile);
  await sharp(src).jpeg({ quality: 92 }).toFile(dest);
  console.log(`  ✓ ${destFile} (full image)`);
}

// nk_01: 1536×1024, 5 cols × 2 rows
// Hebrew labels at bottom of each cell (~60px per cell)
async function nk01() {
  const w = 1536, h = 1024;
  const cW   = Math.round(w / 5);   // 307px per column
  const rH   = Math.round(h / 2);   // 512px per row
  const labelH = 60;                 // trim label from bottom
  const cH   = rH - labelH;         // 452px content

  console.log('gfen_nk_01 → Layout 5×2 grid with labels');
  // Row 0 labels: תמונה מלאה | מבט קדמי | זווית 45° | מבט צד | מבט אחורי
  // Row 1 labels: מבט כללי | תקריב מלמעלה | זווית נוספת | סוגר+שרשרת | תקריב תליון
  await crop('gfen_nk_01.png', 'gfen_nk_01_front.jpg',   cW,      0,    cW,   cH);  // col1 row0 - front
  await crop('gfen_nk_01.png', 'gfen_nk_01_angle.jpg',   cW*2,    0,    cW,   cH);  // col2 row0 - 45°
  await crop('gfen_nk_01.png', 'gfen_nk_01_side.jpg',    cW*3,    0,    cW,   cH);  // col3 row0 - side
  await crop('gfen_nk_01.png', 'gfen_nk_01_back.jpg',    cW*4,    0,    w - cW*4, cH); // col4 row0 - back
  await crop('gfen_nk_01.png', 'gfen_nk_01_closeup.jpg', cW*4,    rH,   w - cW*4, cH); // col4 row1 - pendant closeup
}

// nk_02: 1920×1280, 1 large left + 2 stacked right
async function nk02() {
  const w = 1920, h = 1280;
  const midX = Math.round(w / 2);  // 960
  const midY = Math.round(h / 2);  // 640

  console.log('gfen_nk_02 → Layout: 1 large left + 2 right stacked');
  await crop('gfen_nk_02.jpg', 'gfen_nk_02_front.jpg',   0,    0,    midX, h);
  await crop('gfen_nk_02.jpg', 'gfen_nk_02_angle.jpg',   midX, 0,    w - midX, midY);
  await crop('gfen_nk_02.jpg', 'gfen_nk_02_closeup.jpg', midX, midY, w - midX, h - midY);
}

// nk_03: 1080×1080, 3 equal columns
async function nk03() {
  const w = 1080, h = 1080;
  const cW = Math.round(w / 3);  // 360

  console.log('gfen_nk_03 → Layout: 3 equal columns');
  await crop('gfen_nk_03.jpg', 'gfen_nk_03_front.jpg',   0,    0, cW,     h);
  await crop('gfen_nk_03.jpg', 'gfen_nk_03_angle.jpg',   cW,   0, cW,     h);
  await crop('gfen_nk_03.jpg', 'gfen_nk_03_closeup.jpg', cW*2, 0, w-cW*2, h);
}

// nk_04 & nk_05: 1402×1122
// Layout: big circle top-left | 2 stacked right | bottom row
// top/bot split ~59.5%, left/right split ~47%, right top portion ~35% of total height
async function nk04() {
  const w = 1402, h = 1122;
  const topH  = Math.round(h * 0.595);  // 668 — top section height
  const leftW = Math.round(w * 0.47);   // 659 — left col width
  const rightTopH = Math.round(h * 0.348); // 390 — right top cell height

  console.log('gfen_nk_04 → Layout: 1 big left + 2 right stacked + 1 bottom row');
  await crop('gfen_nk_04.jpg', 'gfen_nk_04_front.jpg',   0,     0,          leftW,      topH);
  await crop('gfen_nk_04.jpg', 'gfen_nk_04_closeup.jpg', leftW, 0,          w - leftW,  rightTopH);
  await crop('gfen_nk_04.jpg', 'gfen_nk_04_clasp.jpg',   leftW, rightTopH,  w - leftW,  topH - rightTopH);
  await crop('gfen_nk_04.jpg', 'gfen_nk_04_side.jpg',    0,     topH,       w,          h - topH);
}

// nk_05: same top layout as nk_04, bottom row has 3 views: model | detail | coiled
async function nk05() {
  const w = 1402, h = 1122;
  const topH      = Math.round(h * 0.595);  // 668
  const leftW     = Math.round(w * 0.47);   // 659
  const rightTopH = Math.round(h * 0.348);  // 390
  const botCW     = Math.round(w / 3);      // 467

  console.log('gfen_nk_05 → Layout: 1 big left + 2 right stacked + 3-col bottom row');
  await crop('gfen_nk_05.jpg', 'gfen_nk_05_front.jpg',   0,       0,         leftW,      topH);
  await crop('gfen_nk_05.jpg', 'gfen_nk_05_closeup.jpg', leftW,   0,         w - leftW,  rightTopH);
  await crop('gfen_nk_05.jpg', 'gfen_nk_05_clasp.jpg',   leftW,   rightTopH, w - leftW,  topH - rightTopH);
  await crop('gfen_nk_05.jpg', 'gfen_nk_05_model.jpg',   0,       topH,      botCW,      h - topH);
  await crop('gfen_nk_05.jpg', 'gfen_nk_05_angle.jpg',   botCW,   topH,      botCW,      h - topH);
  await crop('gfen_nk_05.jpg', 'gfen_nk_05_side.jpg',    botCW*2, topH,      w-botCW*2,  h - topH);
}

// nk_06 & nk_07: single view → just convert to jpeg
async function nk06() {
  console.log('gfen_nk_06 → Single view');
  await copyAsJpeg('gfen_nk_06.jpg', 'gfen_nk_06_front.jpg');
}

async function nk07() {
  console.log('gfen_nk_07 → Single view');
  await copyAsJpeg('gfen_nk_07.jpg', 'gfen_nk_07_front.jpg');
}

// nk_08: 1536×1024, 3 cols × 2 rows (Star of David)
async function nk08() {
  const w = 1536, h = 1024;
  const cW = Math.round(w / 3);   // 512
  const cH = Math.round(h / 2);   // 512

  console.log('gfen_nk_08 → Layout: 3×2 grid');
  await crop('gfen_nk_08.jpg', 'gfen_nk_08_front.jpg',   0,     0,   cW,     cH);
  await crop('gfen_nk_08.jpg', 'gfen_nk_08_angle.jpg',   cW,    0,   cW,     cH);
  await crop('gfen_nk_08.jpg', 'gfen_nk_08_side.jpg',    cW*2,  0,   w-cW*2, cH);
  await crop('gfen_nk_08.jpg', 'gfen_nk_08_general.jpg', 0,     cH,  cW,     h-cH);
  await crop('gfen_nk_08.jpg', 'gfen_nk_08_back.jpg',    cW,    cH,  cW,     h-cH);
  await crop('gfen_nk_08.jpg', 'gfen_nk_08_worn.jpg',    cW*2,  cH,  w-cW*2, h-cH);
}

// nk_09: 1536×1024, 3 cols × 2 rows (Name Necklace – skip R2C3 which is a bracelet)
async function nk09() {
  const w = 1536, h = 1024;
  const cW = Math.round(w / 3);   // 512
  const cH = Math.round(h / 2);   // 512

  console.log('gfen_nk_09 → Layout: 3×2 grid (skip bottom-right bracelet cell)');
  await crop('gfen_nk_09.jpg', 'gfen_nk_09_front.jpg',   0,     0,   cW,     cH);
  await crop('gfen_nk_09.jpg', 'gfen_nk_09_angle.jpg',   cW,    0,   cW,     cH);
  await crop('gfen_nk_09.jpg', 'gfen_nk_09_side.jpg',    cW*2,  0,   w-cW*2, cH);
  await crop('gfen_nk_09.jpg', 'gfen_nk_09_general.jpg', 0,     cH,  cW,     h-cH);
  await crop('gfen_nk_09.jpg', 'gfen_nk_09_closeup.jpg', cW,    cH,  cW,     h-cH);
  // skip R2C3 (bracelet product, not a necklace view)
}

async function main() {
  console.log('\n=== Cropping GFEN necklace images ===\n');
  await nk01();
  await nk02();
  await nk03();
  await nk04();
  await nk05();
  await nk06();
  await nk07();
  await nk08();
  await nk09();
  console.log('\n✅ Done! Check public/necklaces/gfen/cropped/');
}

main().catch(console.error);
