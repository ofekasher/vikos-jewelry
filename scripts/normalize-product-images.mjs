/**
 * Normalize all gfen product images to uniform white squares:
 *  1. gfen_br_02_front: crop off bottom label ("FRONT")
 *  2. Whiten near-white backgrounds to pure white (linear curve)
 *  3. Trim uniform borders
 *  4. Pad to square with pure white + 10% margin
 * Skips on-body photos (model/worn) — squaring those adds visible bars.
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = p => path.join(__dirname, '..', 'public', p);

const DIRS = [
  pub('necklaces/gfen/cropped'),
  pub('bracelets/gfen/cropped'),
];
const EXTRA_FILES = fs.readdirSync(pub('bracelets'))
  .filter(f => /^(br_d|hand_d)\d+\.jpg$/.test(f))
  .map(f => pub(path.join('bracelets', f)));

const SKIP = /model|worn/;

async function normalize(file) {
  const name = path.basename(file);
  if (SKIP.test(name)) { console.log(`  – skipped (on-body): ${name}`); return; }

  let buf = fs.readFileSync(file);

  // 1. special case: trim the "FRONT" caption strip
  if (name === 'gfen_br_02_front.jpg') {
    const m = await sharp(buf).metadata();
    buf = await sharp(buf)
      .extract({ left: 0, top: 0, width: m.width, height: Math.round(m.height * 0.86) })
      .toBuffer();
  }

  // 2. whiten near-white background (245+ → 255), barely affects midtones
  buf = await sharp(buf).linear(1.05, -6).toBuffer();

  // 3. trim uniform border
  try {
    buf = await sharp(buf).trim({ threshold: 18 }).toBuffer();
  } catch { /* fully uniform or tiny — keep as is */ }

  // 4. pad to square with 10% white margin
  const m = await sharp(buf).metadata();
  const side = Math.round(Math.max(m.width, m.height) * 1.10);
  const padX = Math.floor((side - m.width) / 2);
  const padY = Math.floor((side - m.height) / 2);
  buf = await sharp(buf)
    .extend({
      left: padX, right: side - m.width - padX,
      top: padY, bottom: side - m.height - padY,
      background: '#ffffff',
    })
    .jpeg({ quality: 92 })
    .toBuffer();

  fs.writeFileSync(file, buf);
  console.log(`  ✓ ${name} → ${side}×${side}`);
}

async function main() {
  const files = [
    ...DIRS.flatMap(d => fs.readdirSync(d).filter(f => f.endsWith('.jpg')).map(f => path.join(d, f))),
    ...EXTRA_FILES,
  ];
  console.log(`Normalizing ${files.length} images...`);
  for (const f of files) await normalize(f);
  console.log('✅ Done');
}

main().catch(e => { console.error(e); process.exit(1); });
