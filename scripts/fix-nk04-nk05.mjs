/**
 * Re-crop gfen_nk_04 / gfen_nk_05 fronts with the CORRECT cell boundaries.
 * Real layout (1402×1122): big left cell is ~61% wide, ~67.5% tall — the full
 * necklace circle fits inside it. Right column: closeup (0–36%), clasp (36–67.5%).
 * Bottom row (67.5–100%): nk_04 full-width side; nk_05 three cells.
 * Each crop then goes through white-balance → trim → square pad.
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'public', 'necklaces', 'gfen');
const outDir = path.join(srcDir, 'cropped');

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

async function crop(srcFile, destFile, l, t, w, h) {
  const buf = await sharp(path.join(srcDir, srcFile))
    .extract({ left: Math.round(l), top: Math.round(t), width: Math.round(w), height: Math.round(h) })
    .toBuffer();
  fs.writeFileSync(path.join(outDir, destFile), await finalize(buf));
  console.log(`  ✓ ${destFile}`);
}

async function doOne(id, bottomThree, topRatio = 0.675) {
  const { width: w, height: h } = await sharp(path.join(srcDir, `${id}.jpg`)).metadata();
  console.log(`${id}: ${w}×${h}`);
  const leftW = w * 0.61, topH = h * topRatio, rightMid = h * 0.36;
  await crop(`${id}.jpg`, `${id}_front.jpg`,   0,     0,        leftW,     topH);
  await crop(`${id}.jpg`, `${id}_closeup.jpg`, leftW, 0,        w - leftW, rightMid);
  await crop(`${id}.jpg`, `${id}_clasp.jpg`,   leftW, rightMid, w - leftW, topH - rightMid);
  if (bottomThree) {
    const cw = w / 3;
    await crop(`${id}.jpg`, `${id}_model.jpg`, 0,      topH, cw, h - topH);
    await crop(`${id}.jpg`, `${id}_angle.jpg`, cw,     topH, cw, h - topH);
    await crop(`${id}.jpg`, `${id}_side.jpg`,  cw * 2, topH, cw, h - topH);
  } else {
    await crop(`${id}.jpg`, `${id}_side.jpg`, 0, topH, w, h - topH);
  }
}

async function main() {
  await doOne('gfen_nk_05', true, 0.595);
  console.log('✅ Done');
}

main().catch(e => { console.error(e); process.exit(1); });
