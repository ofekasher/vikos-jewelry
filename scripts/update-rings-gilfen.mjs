import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xoquxhiqsjfsxngxnpaj.supabase.co",
  process.env.SUPABASE_SECRET_KEY,
  { auth: { persistSession: false } }
);

// שמות ומחירים אמיתיים מגפן מימון - התאמה לפי ID
const updates = [
  { id: "r_marquise_flower",  name_he: "טבעת פרח זהב",          price: 1950 },
  { id: "r_emerald_5stone",   name_he: "טבעת יהלום פייב",        price: 1950 },
  { id: "r_marquise_yg",      name_he: "טבעת ירח כוכב",          price: 2350 },
  { id: "r_marquise_halo",    name_he: "טבעת מרקיז יוקרה",       price: 3200 },
  { id: "r_pear_gold",        name_he: "טבעת טיפה אבן חן",       price: 3300 },
  { id: "r_oval_3stone",      name_he: "טבעת פנינות יפן",        price: 3000 },
  { id: "r_pear_rose",        name_he: "טבעת פנינה ורד",         price: 2800 },
  { id: "r_round_halo",       name_he: "טבעת להקת נקודה",        price: 2800 },
  { id: "r_infinity_twist",   name_he: "להקת גל",                price: 2500 },
  { id: "r_eternity_gold",    name_he: "להקת עיגול",             price: 2100 },
  { id: "r_emerald_green",    name_he: "טבעת ירוקה",             price: 2100 },
  { id: "r_eternity_wg",      name_he: "להקת יהלום יחידה",       price: 1850 },
  { id: "r_princess_yg",      name_he: "להקת נקודות",            price: 1950 },
  { id: "r_round_6prong",     name_he: "טבעת אירוסין עגולה",     price: 2000 },
  { id: "r_bezel_gold",       name_he: "טבעת מינימל מודרני",     price: 2300 },
  { id: "r_heart_enamel",     name_he: "טבעת לבבות",             price: 900  },
  { id: "r_pear_solitaire",   name_he: "נחש",                    price: 1400 },
];

let success = 0, failed = 0;

for (const u of updates) {
  const { error } = await supabase
    .from("products")
    .update({ name_he: u.name_he, price: u.price })
    .eq("id", u.id);

  if (error) {
    console.error(`✗ ${u.id}: ${error.message}`);
    failed++;
  } else {
    console.log(`✓ ${u.id} → ${u.name_he} | ₪${u.price}`);
    success++;
  }
}

console.log(`\nסיום: ${success} עודכנו, ${failed} שגיאות`);
console.log(`\n7 טבעות ללא שם גפן נשארו עם השמות הקיימים:`);
[
  "r_eternity_silver", "r_eternity_rose", "r_pear_silver",
  "r_heart_dome", "r_emerald_halo", "r_emerald_sol", "r_3stone_rp"
].forEach(id => console.log(`  - ${id}`));
