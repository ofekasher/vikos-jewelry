/**
 * Build the 16 NEW gfen rings from Drive composites:
 * crop 3 views per product (or copy single view), then WB → trim → square pad.
 * Output: public/rings/gfen/cropped/{id}_{front|right|left}.jpg
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'public', 'rings', 'gfen');
const outDir = path.join(srcDir, 'cropped');
fs.mkdirSync(outDir, { recursive: true });

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

async function cell(src, dest, l, t, w, h) {
  const buf = await sharp(path.join(srcDir, src))
    .extract({ left: Math.round(l), top: Math.round(t), width: Math.round(w), height: Math.round(h) })
    .toBuffer();
  fs.writeFileSync(path.join(outDir, dest), await finalize(buf));
  console.log('  ✓', dest);
}

async function single(src, dest) {
  const buf = fs.readFileSync(path.join(srcDir, src));
  fs.writeFileSync(path.join(outDir, dest), await finalize(buf));
  console.log('  ✓', dest, '(single)');
}

// [id, srcFile, layout spec]
const JOBS = [
  // singles — front only (right/left generated later via Magnific)
  ['ring_gf_snake',        'gfen_r_01.jpg', 'single'],
  ['ring_gf_twohearts',    'gfen_r_02.jpg', 'single'],
  ['ring_gf_twodrops',     'gfen_r_23.jpg', 'single'],
  // grids: [type, cols, rows] with chosen cells
  ['ring_gf_heartsband',   'gfen_r_03.jpg', ['grid', 1920, 1702, [[0,0,640,567],[640,0,640,567],[1280,0,640,567]]]],
  ['ring_gf_fish',         'gfen_r_04.png', ['grid', 1536, 1024, [[30,110,580,440],[920,110,586,440],[30,560,580,430]]]],
  ['ring_gf_heartoutline', 'gfen_r_06.jpg', ['grid', 1536, 1024, [[0,0,512,512],[512,0,512,512],[1024,0,512,512]]]],
  ['ring_gf_clover',       'gfen_r_08.jpg', ['grid', 1536, 1024, [[0,0,512,512],[512,0,512,512],[1024,512,512,512]]]],
  ['ring_gf_capri',        'gfen_r_15.jpg', ['grid', 1254, 1254, [[0,60,627,500],[627,60,627,500],[130,880,1000,374]]]],
  ['ring_gf_evileye',      'gfen_r_20.jpg', ['grid', 1920, 1080, [[60,140,700,430],[1160,140,700,430],[60,620,700,400]]]],
  ['ring_gf_name',         'gfen_r_21.jpg', ['grid', 1536, 1024, [[0,0,512,341],[512,0,512,341],[1024,0,512,341]]]],
  ['ring_gf_heartsdiamonds','gfen_r_22.jpg', ['grid', 1536, 1024, [[0,0,512,512],[512,0,512,512],[1024,0,512,512]]]],
  ['ring_gf_flowerband',   'gfen_r_24.jpg', ['grid', 1254, 1254, [[0,0,418,627],[418,0,418,627],[836,0,418,627]]]],
  ['ring_gf_ovalduo',      'gfen_r_25.jpg', ['grid', 1920, 1920, [[0,0,640,640],[640,0,640,640],[1280,0,640,640]]]],
  ['ring_gf_heartsignet',  'gfen_r_28.jpg', ['grid', 1920, 1280, [[0,0,640,470],[640,0,640,470],[1280,0,640,470]]]],
  ['ring_gf_pavedome',     'gfen_r_31.jpg', ['grid', 1254, 1254, [[0,0,627,418],[627,0,627,418],[627,836,627,418]]]],
  ['ring_gf_wirewrap',     'gfen_r_32.jpg', ['grid', 1402, 1122, [[0,0,467,374],[467,0,467,374],[934,0,467,374]]]],
];

const VIEWS = ['front', 'right', 'left'];
for (const [id, src, spec] of JOBS) {
  console.log(id);
  if (spec === 'single') {
    await single(src, `${id}_front.jpg`);
  } else {
    const [, , , cells] = spec;
    for (let i = 0; i < 3; i++) {
      const [l, t, w, h] = cells[i];
      await cell(src, `${id}_${VIEWS[i]}.jpg`, l, t, w, h);
    }
  }
}
console.log('✅ Done');
