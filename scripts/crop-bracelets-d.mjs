import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'public', 'bracelets');

// new_d07 / new_d08: 2816×1536, 5 cols × 2 rows
const COLS = 5, ROWS = 2;
const W = Math.floor(2816 / COLS); // 563
const H = Math.floor(1536 / ROWS); // 768

async function cropGrid(srcFile, prefix, ext = 'jpg') {
  let i = 1;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const dest = path.join(dir, `${prefix}${String(i).padStart(2,'0')}.${ext}`);
      await sharp(path.join(dir, srcFile))
        .extract({ left: col * W, top: row * H, width: W, height: H })
        .jpeg({ quality: 92 })
        .toFile(dest);
      console.log(`  ✓ ${prefix}${String(i).padStart(2,'0')}.${ext}`);
      i++;
    }
  }
}

async function main() {
  console.log('Cropping Series D product shots (new_d07)...');
  await cropGrid('new_d07.png', 'br_d');

  console.log('Cropping Series D hand shots (new_d08)...');
  await cropGrid('new_d08.png', 'hand_d');

  console.log('✅ Done! 10 product + 10 hand shots created.');
}

main().catch(console.error);
