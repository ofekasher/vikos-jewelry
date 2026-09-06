/** Integrate AI-generated product renders: WB → trim → square pad → save as front image. */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'bracelets', 'gfen', 'cropped');
const scratch = 'C:/Users/ofeka/AppData/Local/Temp/claude/C--Users-ofeka-OneDrive-Desktop-cloude-project/93a1386c-d37f-4412-916f-85bf3a0f68fa/scratchpad';

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

const jobs = [
  ['pilot_br08.png', 'gfen_br_08_front.jpg'],
  ['gen_br01.png',   'gfen_br_01_front.jpg'],
  ['gen_br02.png',   'gfen_br_02_front.jpg'],
];
for (const [src, dest] of jobs) {
  const buf = fs.readFileSync(path.join(scratch, src));
  fs.writeFileSync(path.join(outDir, dest), await finalize(buf));
  console.log(`  ✓ ${dest}`);
}
console.log('✅ Done');
