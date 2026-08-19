import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = 'C:/Users/ofeka/OneDrive/Desktop/cloude project/J-M project/דוגמאות לטבעות';
const OUT = path.join(__dirname, '../public/rings/new');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// Detect grid line positions using brightness profile
async function detectGridLines(imgPath, direction, expectedLines) {
  const { data, info } = await sharp(imgPath).greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const profile = [];

  if (direction === 'h') { // horizontal lines (find row boundaries)
    for (let y = 0; y < height; y++) {
      let sum = 0;
      for (let x = 0; x < width; x++) sum += data[y * width + x];
      profile.push(sum / width);
    }
  } else { // vertical lines (find column boundaries)
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let y = 0; y < height; y++) sum += data[y * width + x];
      profile.push(sum / height);
    }
  }

  // Find positions with high brightness (near 255 = white = dividing line)
  // Smooth the profile to avoid noise
  const smoothed = profile.map((v, i) => {
    const w = 5;
    const start = Math.max(0, i - w);
    const end = Math.min(profile.length, i + w + 1);
    return profile.slice(start, end).reduce((a, b) => a + b, 0) / (end - start);
  });

  const threshold = 230;
  const lines = [];
  let inLine = false;
  let lineStart = 0;

  for (let i = 0; i < smoothed.length; i++) {
    if (smoothed[i] >= threshold && !inLine) {
      inLine = true;
      lineStart = i;
    } else if (smoothed[i] < threshold && inLine) {
      inLine = false;
      const center = Math.floor((lineStart + i) / 2);
      // Only add if not too close to border
      if (center > 10 && center < smoothed.length - 10) {
        lines.push(center);
      }
    }
  }

  // Also check if still in line at end
  if (inLine) {
    const center = Math.floor((lineStart + smoothed.length) / 2);
    if (center > 10 && center < smoothed.length - 10) lines.push(center);
  }

  // Keep only the most prominent lines (skip consecutive ones close together)
  const filtered = [];
  const minGap = (direction === 'h' ? height : width) / (expectedLines + 2);
  for (const line of lines) {
    if (filtered.length === 0 || line - filtered[filtered.length - 1] > minGap) {
      filtered.push(line);
    }
  }

  return filtered;
}

// Crop a region and save to file
async function cropSave(srcPath, left, top, w, h, outPath) {
  await sharp(srcPath)
    .extract({ left: Math.max(0, left), top: Math.max(0, top), width: w, height: h })
    .jpeg({ quality: 92 })
    .toFile(outPath);
}

// Ring definitions
const rings = [
  // ── 5-column table images (label col + 5 view cols, 3 rows = 3 products) ──
  {
    file: '222.jpeg',
    type: 'table5',
    products: [
      { id: 'r_eternity_silver', name_he: 'טבעת נצח כסף 925', name_en: 'Silver 925 Eternity Band', material: 'Silver 925', price: 850 },
      { id: 'r_eternity_gold',   name_he: 'טבעת נצח זהב צהוב 14K', name_en: 'Yellow Gold 14K Eternity Band', material: 'Yellow Gold 14K', price: 1800 },
      { id: 'r_eternity_rose',   name_he: 'טבעת נצח זהב ורד 14K', name_en: 'Rose Gold 14K Eternity Band', material: 'Rose Gold 14K', price: 1800 },
    ]
  },
  {
    file: 'WhatsApp Image 2026-08-19 at 08.51.28.jpeg',
    type: 'table5',
    products: [
      { id: 'r_pear_silver', name_he: 'טבעת הילה פירה כסף 925', name_en: 'Silver 925 Pear Halo Morganite Ring', material: 'Silver 925', price: 950 },
      { id: 'r_pear_gold',   name_he: 'טבעת הילה פירה זהב 14K', name_en: 'Yellow Gold 14K Pear Halo Morganite Ring', material: 'Yellow Gold 14K', price: 2200 },
      { id: 'r_pear_rose',   name_he: 'טבעת הילה פירה זהב ורד 14K', name_en: 'Rose Gold 14K Pear Halo Morganite Ring', material: 'Rose Gold 14K', price: 2200 },
    ]
  },

  // ── 3×3 grid images (9 views per ring) ──
  { file: 'WhatsApp Image 2026-08-19 at 09.11.47.jpeg', type: 'grid3x3', id: 'r_heart_dome',      name_he: 'טבעת לב פבה זהב ורד',              name_en: 'Rose Gold Heart Dome Pave Ring',                 material: 'Rose Gold 14K',    price: 1600 },
  { file: 'WhatsApp Image 2026-08-19 at 09.23.30.jpeg', type: 'grid3x3', id: 'r_marquise_flower', name_he: 'טבעת מרקיז פרח זהב לבן',           name_en: 'White Gold Marquise Star Flower Ring',           material: 'White Gold 14K',   price: 1900 },
  { file: 'WhatsApp Image 2026-08-19 at 09.24.30.jpeg', type: 'grid3x3', id: 'r_emerald_5stone',  name_he: 'טבעת אמרלד 5 אבנים זהב לבן',      name_en: 'White Gold Emerald Cut 5-Stone Ring',            material: 'White Gold 14K',   price: 2400 },
  { file: 'WhatsApp Image 2026-08-19 at 09.26.32.jpeg', type: 'grid3x3', id: 'r_pear_solitaire',  name_he: 'טבעת פירה סוליטר זהב ורד',         name_en: 'Rose Gold Pear Solitaire Ring',                  material: 'Rose Gold 14K',    price: 2100 },
  { file: 'WhatsApp Image 2026-08-19 at 09.30.20.jpeg', type: 'grid3x3', id: 'r_infinity_twist',  name_he: 'טבעת אינפיניטי יהלום זהב לבן',     name_en: 'White Gold Infinity Twist Diamond Ring',         material: 'White Gold 14K',   price: 1700 },
  { file: 'WhatsApp Image 2026-08-19 at 09.34.30.jpeg', type: 'grid3x3', id: 'r_oval_3stone',     name_he: 'טבעת אובל 3 אבנים זהב לבן',        name_en: 'White Gold Oval 3-Stone Ring',                   material: 'White Gold 14K',   price: 2800 },
  { file: 'WhatsApp Image 2026-08-19 at 09.35.33.jpeg', type: 'grid3x3', id: 'r_emerald_halo',    name_he: 'טבעת הילה אמרלד זהב לבן',          name_en: 'White Gold Emerald Cut Halo Ring',               material: 'White Gold 14K',   price: 2600 },
  { file: 'WhatsApp Image 2026-08-19 at 09.36.58.jpeg', type: 'grid3x3', id: 'r_marquise_halo',   name_he: 'טבעת הילה מרקיז פבה זהב לבן',      name_en: 'White Gold Marquise Halo Pave Band',             material: 'White Gold 14K',   price: 2900 },
  { file: 'WhatsApp Image 2026-08-19 at 09.39.25.jpeg', type: 'grid3x3', id: 'r_heart_enamel',    name_he: 'טבעת לבבות אמייל זהב ורד',          name_en: 'Rose Gold Heart Band Red Enamel',                material: 'Rose Gold 14K',    price: 1400 },
  { file: 'WhatsApp Image 2026-08-19 at 09.42.47.jpeg', type: 'grid3x3', id: 'r_emerald_sol',     name_he: 'טבעת אמרלד סוליטר זהב לבן',        name_en: 'White Gold Emerald Cut Solitaire Ring',          material: 'White Gold 14K',   price: 2200 },
  { file: 'WhatsApp Image 2026-08-19 at 10.12.29.jpeg', type: 'grid3x3', id: 'r_round_halo',      name_he: 'טבעת הילה עגולה פבה זהב לבן',      name_en: 'White Gold Round Brilliant Halo Pave Ring',      material: 'White Gold 14K',   price: 2500 },
  { file: 'WhatsApp Image 2026-08-19 at 10.17.15.jpeg', type: 'grid3x3', id: 'r_eternity_wg',     name_he: 'טבעת יהלומים חצי נצח זהב לבן',    name_en: 'White Gold Diamond Half-Eternity Band',          material: 'White Gold 14K',   price: 2000 },
  { file: 'WhatsApp Image 2026-08-19 at 10.20.20.jpeg', type: 'grid3x3', id: 'r_round_6prong',    name_he: 'טבעת סוליטר עגולה 6 שיניים זהב לבן', name_en: 'White Gold Round Brilliant 6-Prong Solitaire', material: 'White Gold 14K',   price: 2300 },
  { file: 'WhatsApp Image 2026-08-19 at 10.35.17.jpeg', type: 'grid3x3', id: 'r_3stone_rp',       name_he: 'טבעת 3 אבנים עגול ופירה זהב לבן',  name_en: 'White Gold Round Pear 3-Stone Ring',             material: 'White Gold 14K',   price: 3100 },
  { file: 'WhatsApp Image 2026-08-19 at 10.40.47.jpeg', type: 'grid3x3', id: 'r_bezel_gold',      name_he: 'טבעת ביזל עגולה זהב צהוב',          name_en: 'Yellow Gold Bezel Round Band',                   material: 'Yellow Gold 14K',  price: 1500 },
  { file: 'WhatsApp Image 2026-08-19 at 10.44.25.jpeg', type: 'grid3x3', id: 'r_marquise_yg',     name_he: 'טבעת מרקיז סוליטר זהב צהוב',       name_en: 'Yellow Gold Marquise Solitaire Ring',            material: 'Yellow Gold 14K',  price: 1800 },
  { file: 'WhatsApp Image 2026-08-19 at 10.50.42.jpeg', type: 'grid3x3', id: 'r_princess_yg',     name_he: 'טבעת פרינסס סוליטר זהב צהוב',      name_en: 'Yellow Gold Princess Cut Solitaire Ring',        material: 'Yellow Gold 14K',  price: 1700 },

  // ── 7-view irregular grid (2+3+2 layout) ──
  { file: 'WhatsApp Image 2026-08-19 at 11.06.59.jpeg', type: 'grid7_232', id: 'r_emerald_green',  name_he: 'טבעת אמרלד ירוק זהב צהוב',         name_en: 'Yellow Gold Emerald Cut Green Stone Ring',       material: 'Yellow Gold 14K',  price: 3400 },
];

const results = []; // Will hold DB-ready product objects

async function processGrid3x3(ring, srcPath) {
  const meta = await sharp(srcPath).metadata();
  const { width, height } = meta;
  const cw = Math.floor(width / 3);
  const ch = Math.floor(height / 3);
  const prefix = ring.id;
  const views = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const fname = `${prefix}_v${row * 3 + col + 1}.jpg`;
      await cropSave(srcPath, col * cw, row * ch, cw, ch, path.join(OUT, fname));
      views.push(`/rings/new/${fname}`);
    }
  }

  // views[0] = front (top-left), views[1] = hover (top-center), rest = gallery
  results.push({
    id: ring.id,
    name_he: ring.name_he,
    name_en: ring.name_en,
    description_he: '',
    description_en: '',
    price: ring.price,
    category: 'rings',
    image: views[0],
    hover_image: views[1],
    images: views.slice(2),
    material: ring.material,
    is_new: true,
    is_bestseller: false,
    in_stock: true,
    discount: 0
  });
  console.log(`✓ ${ring.id} → ${views.length} views`);
}

async function processTable5(ring, srcPath) {
  const meta = await sharp(srcPath).metadata();
  const { width, height } = meta;

  // Detect vertical dividing lines to find column boundaries
  const vLines = await detectGridLines(srcPath, 'v', 5);
  // Detect horizontal dividing lines for row boundaries
  const hLines = await detectGridLines(srcPath, 'h', 2);

  // Build column boundaries: [0, vLine1, vLine2, ..., width]
  // The first section (0 → vLines[0]) is the label; skip it
  let colBounds = [0, ...vLines, width];
  // Remove duplicates and sort
  colBounds = [...new Set(colBounds)].sort((a, b) => a - b);

  // Build row boundaries
  let rowBounds = [0, ...hLines, height];
  rowBounds = [...new Set(rowBounds)].sort((a, b) => a - b);

  console.log(`  ${path.basename(srcPath)}: colBounds=${JSON.stringify(colBounds)} rowBounds=${JSON.stringify(rowBounds)}`);

  // We need exactly 3 rows and at least 5 image columns (skip label col)
  // If detection found too few, fall back to equal division + label skip
  const labelWidth = colBounds.length > 2 ? colBounds[1] : Math.floor(width / 6);
  const imgColCount = 5;
  const rowCount = 3;
  const imgColWidth = Math.floor((width - labelWidth) / imgColCount);
  const rowHeight = Math.floor(height / rowCount);

  // If more row sections than products, there's a header row — skip it
  const rowOffset = rowBounds.length > ring.products.length + 1 ? 1 : 0;

  for (let ri = 0; ri < ring.products.length; ri++) {
    const prod = ring.products[ri];
    const idx = ri + rowOffset;
    const top = rowBounds.length >= ring.products.length + 1 ? rowBounds[idx] : ri * rowHeight;
    const rowH = rowBounds.length >= ring.products.length + 1 ? rowBounds[idx + 1] - rowBounds[idx] : rowHeight;
    const views = [];

    for (let ci = 0; ci < imgColCount; ci++) {
      const left = labelWidth + ci * imgColWidth;
      const fname = `${prod.id}_v${ci + 1}.jpg`;
      await cropSave(srcPath, left, top, imgColWidth, rowH, path.join(OUT, fname));
      views.push(`/rings/new/${fname}`);
    }

    results.push({
      id: prod.id,
      name_he: prod.name_he,
      name_en: prod.name_en,
      description_he: '',
      description_en: '',
      price: prod.price,
      category: 'rings',
      image: views[0],     // FRONT
      hover_image: views[1], // 45°
      images: views.slice(2), // SIDE, BACK, ON HAND
      material: prod.material,
      is_new: true,
      is_bestseller: false,
      in_stock: true,
      discount: 0
    });
    console.log(`✓ ${prod.id} → ${views.length} views`);
  }
}

async function processGrid7(ring, srcPath) {
  const meta = await sharp(srcPath).metadata();
  const { width, height } = meta;
  const rowH = Math.floor(height / 3);
  const prefix = ring.id;
  const views = [];

  // Row 0: 2 images side by side (each half width)
  for (let c = 0; c < 2; c++) {
    const fname = `${prefix}_v${c + 1}.jpg`;
    await cropSave(srcPath, c * Math.floor(width / 2), 0, Math.floor(width / 2), rowH, path.join(OUT, fname));
    views.push(`/rings/new/${fname}`);
  }
  // Row 1: 3 images (each 1/3 width)
  const colW3 = Math.floor(width / 3);
  for (let c = 0; c < 3; c++) {
    const fname = `${prefix}_v${c + 3}.jpg`;
    await cropSave(srcPath, c * colW3, rowH, colW3, rowH, path.join(OUT, fname));
    views.push(`/rings/new/${fname}`);
  }
  // Row 2: 2 images side by side
  for (let c = 0; c < 2; c++) {
    const fname = `${prefix}_v${c + 6}.jpg`;
    await cropSave(srcPath, c * Math.floor(width / 2), 2 * rowH, Math.floor(width / 2), rowH, path.join(OUT, fname));
    views.push(`/rings/new/${fname}`);
  }

  results.push({
    id: ring.id,
    name_he: ring.name_he,
    name_en: ring.name_en,
    description_he: '',
    description_en: '',
    price: ring.price,
    category: 'rings',
    image: views[0],
    hover_image: views[1],
    images: views.slice(2),
    material: ring.material,
    is_new: true,
    is_bestseller: false,
    in_stock: true,
    discount: 0
  });
  console.log(`✓ ${ring.id} → ${views.length} views`);
}

// ── Main ──
console.log('Starting ring crop...');
for (const ring of rings) {
  const srcPath = path.join(SRC, ring.file);
  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠ File not found: ${ring.file}`);
    continue;
  }

  if (ring.type === 'grid3x3') {
    await processGrid3x3(ring, srcPath);
  } else if (ring.type === 'table5') {
    await processTable5(ring, srcPath);
  } else if (ring.type === 'grid7_232') {
    await processGrid7(ring, srcPath);
  }
}

// Write results to JSON for DB insertion
const jsonPath = path.join(__dirname, 'ring-products.json');
fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
console.log(`\nDone! ${results.length} products → ${jsonPath}`);
console.log(`Images saved to: ${OUT}`);
