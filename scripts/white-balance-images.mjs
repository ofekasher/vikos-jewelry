/**
 * Per-image white balance: sample the background color from the image corners
 * and scale each RGB channel so that background maps to pure white (255).
 * Then re-trim and re-pad to a clean white square.
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = p => path.join(__dirname, '..', 'public', p);

const DIRS = [pub('necklaces/gfen/cropped'), pub('bracelets/gfen/cropped'), pub('earrings/real'), pub('rings/new')];
const EXTRA = fs.readdirSync(pub('bracelets'))
  .filter(f => /^(br_d|hand_d)\d+\.jpg$/.test(f))
  .map(f => pub(path.join('bracelets', f)));

const SKIP = /model|worn/;

async function cornerColor(buf) {
  const { width: w, height: h } = await sharp(buf).metadata();
  const s = Math.max(4, Math.round(Math.min(w, h) * 0.04));
  const corners = [
    { left: 0, top: 0 }, { left: w - s, top: 0 },
    { left: 0, top: h - s }, { left: w - s, top: h - s },
  ];
  let r = 0, g = 0, b = 0;
  for (const c of corners) {
    const st = await sharp(buf).extract({ ...c, width: s, height: s }).stats();
    r += st.channels[0].mean; g += st.channels[1].mean; b += st.channels[2].mean;
  }
  return [r / 4, g / 4, b / 4];
}

async function process(file) {
  const name = path.basename(file);
  if (SKIP.test(name)) { console.log(`  – skipped: ${name}`); return; }

  let buf = fs.readFileSync(file);
  const [r, g, b] = await cornerColor(buf);

  // Only white-balance when the background is plausibly "light" (not a real scene)
  if (Math.min(r, g, b) < 190) { console.log(`  – dark bg, untouched: ${name}`); return; }

  const mult = [255 / r, 255 / g, 255 / b].map(m => Math.min(m, 1.25));
  buf = await sharp(buf).linear(mult, [0, 0, 0]).toBuffer();

  // re-trim then re-pad to square with 8% margin
  try { buf = await sharp(buf).trim({ threshold: 12 }).toBuffer(); } catch {}
  const m = await sharp(buf).metadata();
  const side = Math.round(Math.max(m.width, m.height) * 1.08);
  const padX = Math.floor((side - m.width) / 2);
  const padY = Math.floor((side - m.height) / 2);
  buf = await sharp(buf)
    .extend({ left: padX, right: side - m.width - padX, top: padY, bottom: side - m.height - padY, background: '#ffffff' })
    .jpeg({ quality: 92 })
    .toBuffer();

  fs.writeFileSync(file, buf);
  console.log(`  ✓ ${name} (bg ${Math.round(r)},${Math.round(g)},${Math.round(b)} → white, ${side}×${side})`);
}

async function main() {
  const files = [
    ...DIRS.flatMap(d => fs.readdirSync(d).filter(f => f.endsWith('.jpg')).map(f => path.join(d, f))),
    ...EXTRA,
  ];
  console.log(`White-balancing ${files.length} images...`);
  for (const f of files) await process(f);
  console.log('✅ Done');
}

main().catch(e => { console.error(e); process.exit(1); });
