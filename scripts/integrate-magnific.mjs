/**
 * Integrate Magnific-generated product views.
 * Usage: node scripts/integrate-magnific.mjs <srcDir> <productPrefix> <destSubdir> <main> <right> <left>
 * Example: node scripts/integrate-magnific.mjs "<scratch>" gfen_br_08 bracelets/gfen/cropped mag_br08_main.jpg mag_br08_right.jpg mag_br08_left.jpg
 * Pipeline per image: white-balance → trim → square pad → save as {prefix}_{front|right|left}.jpg
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [srcDir, prefix, destSub, mainF, rightF, leftF] = process.argv.slice(2);
const outDir = path.join(__dirname, '..', 'public', destSub);

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

const views = [[mainF, 'front'], [rightF, 'right'], [leftF, 'left']];
for (const [src, view] of views) {
  if (!src || src === '-') continue;
  const buf = fs.readFileSync(path.join(srcDir, src));
  const dest = path.join(outDir, `${prefix}_${view}.jpg`);
  fs.writeFileSync(dest, await finalize(buf));
  console.log(`  ✓ ${prefix}_${view}.jpg`);
}
console.log('DONE');
