/**
 * Re-crop gfen_br_04 and gfen_br_11 with correct layouts, then
 * white-balance + trim + square-pad each output (same pipeline as the rest).
 *
 * gfen_br_04 — 3 uneven rows: big top (0–47%), thin strip (47–63.5%), big bottom (63.5–100%)
 * gfen_br_11 — 2 content rows in a square: row1 = 3 cells (~y 24–51%), row2 = 4 cells (~y 51–80%)
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'public', 'bracelets', 'gfen');
const outDir = path.join(srcDir, 'cropped');

async function finalize(buf) {
  // white balance from corners
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

async function main() {
  // ── br_04: 3 uneven full-width rows ──
  const m4 = await sharp(path.join(srcDir, 'gfen_br_04.jpg')).metadata();
  const { width: w4, height: h4 } = m4;
  console.log(`gfen_br_04: ${w4}×${h4}`);
  await crop('gfen_br_04.jpg', 'gfen_br_04_front.jpg', 0, 0,             w4, h4 * 0.465);
  await crop('gfen_br_04.jpg', 'gfen_br_04_side.jpg',  0, h4 * 0.465,   w4, h4 * 0.17);
  await crop('gfen_br_04.jpg', 'gfen_br_04_back.jpg',  0, h4 * 0.635,   w4, h4 * 0.365);

  // ── br_11: row1 = 3 cells, row2 = 4 cells ──
  const m11 = await sharp(path.join(srcDir, 'gfen_br_11.jpg')).metadata();
  const { width: w11, height: h11 } = m11;
  console.log(`gfen_br_11: ${w11}×${h11}`);
  const r1t = h11 * 0.225, r1h = h11 * 0.295;
  const r2t = h11 * 0.50,  r2h = h11 * 0.30;
  const c3 = w11 / 3, c4 = w11 / 4;
  await crop('gfen_br_11.jpg', 'gfen_br_11_front.jpg',   0,      r1t, c3, r1h);
  await crop('gfen_br_11.jpg', 'gfen_br_11_angle.jpg',   c3,     r1t, c3, r1h);
  await crop('gfen_br_11.jpg', 'gfen_br_11_clasp.jpg',   c3 * 2, r1t, c3, r1h);
  await crop('gfen_br_11.jpg', 'gfen_br_11_open.jpg',    0,      r2t, c4, r2h);
  await crop('gfen_br_11.jpg', 'gfen_br_11_flat.jpg',    c4,     r2t, c4, r2h);
  await crop('gfen_br_11.jpg', 'gfen_br_11_top.jpg',     c4 * 2, r2t, c4, r2h);
  await crop('gfen_br_11.jpg', 'gfen_br_11_side.jpg',    c4 * 3, r2t, c4, r2h);

  // remove stale br_11 crops from the old wrong layout
  for (const f of ['gfen_br_11_closeup.jpg', 'gfen_br_11_detail1.jpg', 'gfen_br_11_detail2.jpg', 'gfen_br_11_detail3.jpg', 'gfen_br_11_detail4.jpg', 'gfen_br_11_back.jpg']) {
    const p = path.join(outDir, f);
    if (fs.existsSync(p)) { fs.unlinkSync(p); console.log(`  ✗ removed ${f}`); }
  }
  console.log('✅ Done');
}

main().catch(e => { console.error(e); process.exit(1); });
