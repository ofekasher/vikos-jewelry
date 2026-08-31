import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'public', 'earrings', 'real');

async function crop(srcFile, destFile, left, top, width, height) {
  const src = path.join(dir, srcFile);
  const dest = path.join(dir, destFile);
  await sharp(src)
    .extract({ left: Math.round(left), top: Math.round(top), width: Math.round(width), height: Math.round(height) })
    .jpeg({ quality: 92 })
    .toFile(dest);
  console.log(`  ✓ ${destFile}`);
}

async function main() {
  console.log('\n=== Cropping earrings ===\n');

  // ─── e1: Arrow Enamel Huggie (gfen_01.jpg 1920×1280) ───────────────────────
  // Layout: VIKOS header ~215px top, 3×2 grid in middle, info footer ~175px bottom
  // Grid: cols 640px each, rows ~445px each, label ~65px at cell bottom
  console.log('e1 Arrow Enamel Huggie...');
  const e1 = { cw: 640, top: 215, rh: 445, lbl: 65 };
  await crop('gfen_01.jpg', 'e1_01_front.jpg',    0,           e1.top,        e1.cw, e1.rh - e1.lbl);
  await crop('gfen_01.jpg', 'e1_02_angle45.jpg',  e1.cw,       e1.top,        e1.cw, e1.rh - e1.lbl);
  await crop('gfen_01.jpg', 'e1_03_side.jpg',     e1.cw * 2,   e1.top,        e1.cw, e1.rh - e1.lbl);
  await crop('gfen_01.jpg', 'e1_04_back.jpg',     0,           e1.top + e1.rh, e1.cw, e1.rh - e1.lbl);
  await crop('gfen_01.jpg', 'e1_05_open.jpg',     e1.cw,       e1.top + e1.rh, e1.cw, e1.rh - e1.lbl);
  await crop('gfen_01.jpg', 'e1_06_closeup.jpg',  e1.cw * 2,  e1.top + e1.rh, e1.cw, e1.rh - e1.lbl);

  // ─── e2: Rose Gold Heart Stud (gfen_02.jpg 1536×1024) ─────────────────────
  // Layout: 3×3 clean grid, labels ~45px at bottom of each cell
  console.log('e2 Rose Gold Heart...');
  const e2 = { cw: 512, ch: 341, lbl: 45 };
  await crop('gfen_02.jpg', 'e2_01_front.jpg',    0,          0,          e2.cw, e2.ch - e2.lbl);
  await crop('gfen_02.jpg', 'e2_02_angle45.jpg',  e2.cw,      0,          e2.cw, e2.ch - e2.lbl);
  await crop('gfen_02.jpg', 'e2_03_side.jpg',     e2.cw * 2,  0,          e2.cw, e2.ch - e2.lbl);
  await crop('gfen_02.jpg', 'e2_04_back.jpg',     0,          e2.ch,      e2.cw, e2.ch - e2.lbl);
  await crop('gfen_02.jpg', 'e2_05_top.jpg',      e2.cw,      e2.ch,      e2.cw, e2.ch - e2.lbl);
  await crop('gfen_02.jpg', 'e2_06_closeup.jpg',  0,          e2.ch * 2,  e2.cw, e2.ch - e2.lbl);

  // ─── e3: Ruby & Marquise Drop (gfen_03.png 1536×1024) ─────────────────────
  // Layout: 3×2 clean grid, NO labels (images fill full cells)
  console.log('e3 Ruby & Marquise Drop...');
  const e3 = { cw: 512, ch: 512 };
  await crop('gfen_03.png', 'e3_01_front.jpg',   0,          0,      e3.cw, e3.ch);
  await crop('gfen_03.png', 'e3_02_angle.jpg',   e3.cw,      0,      e3.cw, e3.ch);
  await crop('gfen_03.png', 'e3_03_side.jpg',    e3.cw * 2,  0,      e3.cw, e3.ch);
  await crop('gfen_03.png', 'e3_04_detail.jpg',  0,          e3.ch,  e3.cw, e3.ch);
  await crop('gfen_03.png', 'e3_05_back.jpg',    e3.cw,      e3.ch,  e3.cw, e3.ch);

  // ─── e4: Organic Shape Diamond Stud (gfen_04.jpg 1536×1024) ───────────────
  // Layout: 4×2 grid, labels ~80px at bottom of each cell
  console.log('e4 Organic Shape...');
  const e4 = { cw: 384, ch: 512, lbl: 80 };
  await crop('gfen_04.jpg', 'e4_01_front.jpg',   0,           0,       e4.cw, e4.ch - e4.lbl);
  await crop('gfen_04.jpg', 'e4_02_angle45.jpg', e4.cw,       0,       e4.cw, e4.ch - e4.lbl);
  await crop('gfen_04.jpg', 'e4_03_side.jpg',    e4.cw * 2,   0,       e4.cw, e4.ch - e4.lbl);
  await crop('gfen_04.jpg', 'e4_04_back.jpg',    e4.cw * 3,   0,       e4.cw, e4.ch - e4.lbl);
  await crop('gfen_04.jpg', 'e4_05_closeup.jpg', e4.cw * 2,   e4.ch,   e4.cw, e4.ch - e4.lbl);

  // ─── e5: Gold Tassel Drop (gfen_05.jpg 1080×1623) ─────────────────────────
  // Single clean portrait shot — use full image
  console.log('e5 Gold Tassel...');
  await crop('gfen_05.jpg', 'e5_01_front.jpg', 0, 0, 1080, 1623);

  // ─── e6: Red Enamel Heart Stud (gfen_06.jpg 1332×1181) ─────────────────────
  // Layout: 2×3 clean grid, NO labels
  console.log('e6 Red Enamel Heart...');
  const e6 = { cw: 666, ch: 393 };
  await crop('gfen_06.jpg', 'e6_01_front.jpg',   0,      0,       e6.cw, e6.ch);
  await crop('gfen_06.jpg', 'e6_02_angle.jpg',   e6.cw,  0,       e6.cw, e6.ch);
  await crop('gfen_06.jpg', 'e6_03_side.jpg',    0,      e6.ch,   e6.cw, e6.ch);
  await crop('gfen_06.jpg', 'e6_04_back.jpg',    e6.cw,  e6.ch,   e6.cw, e6.ch);
  await crop('gfen_06.jpg', 'e6_05_detail.jpg',  0,      e6.ch*2, e6.cw, e6.ch);
  await crop('gfen_06.jpg', 'e6_06_closeup.jpg', e6.cw,  e6.ch*2, e6.cw, e6.ch);

  // ─── e7: Infinity Diamond Stud (gfen_07.jpg 1402×1122) ─────────────────────
  // Layout: 3 rows (Silver/Yellow Gold/Rose Gold), each row has:
  //   left: large pair shot (~215px wide)
  //   middle: 3×2 angle grid (~972px, each col 324px, each row_h 187px)
  //   right: ear model photo (~215px)
  // Using Yellow Gold (row 2) as primary
  console.log('e7 Infinity...');
  const e7 = { rowH: 374, pairW: 215, midColW: 324, midRowH: 187 };
  // Yellow gold row (row index 1 = y offset 374)
  await crop('gfen_07.jpg', 'e7_01_pair_ygold.jpg', 0,             e7.rowH,                   e7.pairW, e7.rowH);
  await crop('gfen_07.jpg', 'e7_02_front_ygold.jpg', e7.pairW,     e7.rowH,                   e7.midColW, e7.midRowH);
  await crop('gfen_07.jpg', 'e7_03_angle_ygold.jpg', e7.pairW + e7.midColW, e7.rowH,          e7.midColW, e7.midRowH);
  // Silver row (row index 0)
  await crop('gfen_07.jpg', 'e7_04_pair_silver.jpg', 0,             0,                         e7.pairW, e7.rowH);
  // Rose gold row (row index 2)
  await crop('gfen_07.jpg', 'e7_05_pair_rose.jpg',   0,             e7.rowH * 2,               e7.pairW, e7.rowH);

  console.log('\n✅ All done!');
}

main().catch(console.error);
