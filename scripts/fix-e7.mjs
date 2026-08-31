// Fix e7 (Infinity) crops - gfen_07.jpg is 1402x1122, 3 rows x complex layout
// Row layout per row (height 374px):
//   Left panel (~294px wide): label at top ~93px, then large pair photo
//   Middle section (~900px): 3-col angle grid, labels at top ~30px
//   Right (~208px): ear model photo
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'public', 'earrings', 'real');

async function crop(destFile, left, top, width, height) {
  const src = path.join(dir, 'gfen_07.jpg');
  const dest = path.join(dir, destFile);
  await sharp(src)
    .extract({ left: Math.round(left), top: Math.round(top), width: Math.round(width), height: Math.round(height) })
    .jpeg({ quality: 92 })
    .toFile(dest);
  console.log(`  ✓ ${destFile}`);
}

async function main() {
  const rowH = 374;
  const pairW = 294;   // left panel width (large pair)
  const labelH = 93;   // text label at top of left panel
  const pairH = rowH - labelH; // 281px of clean earring image

  const midX = pairW;         // middle section starts here
  const midColW = 300;        // each angle column width
  const midRowH = 187;        // each angle row height
  const angleLbl = 30;        // angle label at top of cell

  console.log('Fixing e7 Infinity crops...');

  // Yellow Gold (row 2) - primary
  await crop('e7_01_ygold_pair.jpg',  0,              rowH + labelH,          pairW,    pairH);
  await crop('e7_02_ygold_front.jpg', midX,           rowH + angleLbl,        midColW,  midRowH - angleLbl);
  await crop('e7_03_ygold_angle.jpg', midX + midColW, rowH + angleLbl,        midColW,  midRowH - angleLbl);
  await crop('e7_04_ygold_back.jpg',  midX,           rowH + midRowH + angleLbl, midColW, midRowH - angleLbl);

  // Silver (row 1)
  await crop('e7_05_silver_pair.jpg', 0, labelH, pairW, pairH);

  // Rose Gold (row 3)
  await crop('e7_06_rose_pair.jpg', 0, rowH * 2 + labelH, pairW, pairH);

  console.log('✅ Done!');
}

main().catch(console.error);
