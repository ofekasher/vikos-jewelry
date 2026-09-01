/**
 * Replace gfen_br_05 (smiley tennis bracelet) images with the two new renders
 * from Downloads. These have styled backgrounds (fabric / marble), so we take
 * a centered square crop — no white padding.
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'bracelets', 'gfen', 'cropped');
const dl = 'C:/Users/ofeka/Downloads';

async function centerSquare(srcFile, destFile, cxRatio = 0.5) {
  const src = path.join(dl, srcFile);
  const { width: w, height: h } = await sharp(src).metadata();
  const side = Math.min(w, h);
  const left = Math.min(Math.max(Math.round(w * cxRatio - side / 2), 0), w - side);
  await sharp(src)
    .extract({ left, top: 0, width: side, height: side })
    .jpeg({ quality: 92 })
    .toFile(path.join(outDir, destFile));
  console.log(`  ✓ ${destFile} (${side}×${side})`);
}

// front: smiley centered at ~50% ; side: bracelet centered at ~50%
await centerSquare('Requesting_frontal_view_image_202609011843.jpeg', 'gfen_br_05_front.jpg', 0.5);
await centerSquare('בקשת_יצירת_תמונה_מהצד_202609011843.jpeg',          'gfen_br_05_angle.jpg', 0.5);
console.log('✅ Done');
