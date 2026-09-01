/** Replace gfen_br_04 (classic tennis bracelet) images with the three new renders. */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'bracelets', 'gfen', 'cropped');
const dl = 'C:/Users/ofeka/Downloads';

async function finalize(buf) {
  const { width: w, height: h } = await sharp(buf).metadata();
  const s = Math.max(4, Math.round(Math.min(w, h) * 0.04));
  let r = 0, g = 0, b = 0;
  for (const c of [{ left: 0, top: 0 }, { left: w - s, top: 0 }, { left: 0, top: h - s }, { left: w - s, top: h - s }]) {
    const st = await sharp(buf).extract({ ...c, width: s, height: s }).stats();
    r += st.channels[0].mean; g += st.channels[1].mean; b += st.channels[2].mean;
  }
  r /= 4; g /= 4; b /= 4;
  if (Math.min(r, g, b) >= 190) {
    const mult = [255 / r, 255 / g, 255 / b].map(m => Math.min(m, 1.25));
    buf = await sharp(buf).linear(mult, [0, 0, 0]).toBuffer();
  }
  try { buf = await sharp(buf).trim({ threshold: 12 }).toBuffer(); } catch {}
  const m = await sharp(buf).metadata();
  const side = Math.round(Math.max(m.width, m.height) * 1.08);
  const padX = Math.floor((side - m.width) / 2);
  const padY = Math.floor((side - m.height) / 2);
  return sharp(buf)
    .extend({ left: padX, right: side - m.width - padX, top: padY, bottom: side - m.height - padY, background: '#ffffff' })
    .jpeg({ quality: 92 })
    .toBuffer();
}

async function processFile(srcName, destName) {
  const buf = fs.readFileSync(path.join(dl, srcName));
  fs.writeFileSync(path.join(outDir, destName), await finalize(buf));
  console.log(`  ✓ ${destName}`);
}

await processFile('image.png_202609011849.jpeg',                          'gfen_br_04_front.jpg');
await processFile('User_requesting_product_side_image_202609011840.jpeg', 'gfen_br_04_side.jpg');
await processFile('אני_צריל_שתעשה_לי_תמונה_202609011839.jpeg',            'gfen_br_04_closeup.jpg');

const stale = path.join(outDir, 'gfen_br_04_back.jpg');
if (fs.existsSync(stale)) { fs.unlinkSync(stale); console.log('  ✗ removed gfen_br_04_back.jpg'); }
console.log('✅ Done');
