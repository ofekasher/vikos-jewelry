export interface Product {
  id: string;
  nameHe: string;
  nameEn: string;
  descriptionHe: string;
  descriptionEn: string;
  price: number;
  category: "rings" | "necklaces" | "bracelets" | "earrings";
  image: string;
  hoverImage?: string;
  images: string[];
  material: string;
  isNew?: boolean;
  isBestseller?: boolean;
  inStock?: boolean;
  discount?: number;
}

// Pexels License — free for commercial use
// IDs sourced from targeted searches: "diamond ring isolated white", "diamond jewelry product photography",
// "gold chain necklace product", "gold earrings product photography white", "gold bracelet product white"
const P = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

// ── טבעות יהלום — Unsplash (verified: each photo is actual luxury ring) ──────
const U = (id: string) => `https://images.unsplash.com/${id}?w=800&q=85`;
const UR = [
  "photo-1605100804763-247f67b3557e", // pink diamond solitaire ring
  "photo-1603561591411-07134e71a2a9", // white gold halo diamond ring
  "photo-1499899833954-5ecd9439d17f", // silver diamond ring
  "photo-1662434921251-a6eba45ac40c", // sparkling diamond ring on white
  "photo-1605100804567-1ffe942b5cd6", // pear-shaped diamond halo ring
  "photo-1587947330318-88fcd9055420", // diamond engagement ring
  "photo-1543294001-f7cd5d7fb516",   // gold wedding bands
  "photo-1726507367666-08c5f025bdf6", // two wedding rings on table
  "photo-1719924998065-0c60e329ef58", // three-ring photoshoot
];
const r = (i: number) => U(UR[i % UR.length]);


// ── צמידים — verified white-background product shots ──────────────────────────
// Bracelet image pairs: [packshot, hand shot]
const BP: [string,string][] = [
  ["/bracelets/pack_a02.png", "/bracelets/hand_a02.png"], // b1  - Tennis יהלומים
  ["/bracelets/pack_a01.png", "/bracelets/hand_a01.png"], // b2  - קובו זהב
  ["/bracelets/pack_a05.png", "/bracelets/hand_a05.png"], // b3  - בנגל זהב (open cuff)
  ["/bracelets/pack_a09.png", "/bracelets/hand_a09.png"], // b4  - חרוזי יהלום
  ["/bracelets/pack_a11.png", "/bracelets/hand_a11.png"], // b5  - ריס זהב
  ["/bracelets/pack_b01.png", "/bracelets/hand_b01.png"], // b6  - פיגרו זהב
  ["/bracelets/pack_b03.png", "/bracelets/hand_b03.png"], // b7  - צ'ארם (פרפר)
  ["/bracelets/pack_b05.png", "/bracelets/hand_b05.png"], // b8  - אייס פאוט
  ["/bracelets/pack_c05.png", "/bracelets/hand_c05.png"], // b9  - כסף טניס
  ["/bracelets/pack_a03.png", "/bracelets/hand_a03.png"], // b10 - ריינסטון (rose gold)
  ["/bracelets/pack_c04.png", "/bracelets/hand_c04.png"], // b11 - פיה/נחש
  ["/bracelets/pack_a07.png", "/bracelets/hand_a07.png"], // b12 - כסף קלאסי
  ["/bracelets/pack_a10.png", "/bracelets/hand_a10.png"], // b13 - קאף זהב
  ["/bracelets/pack_c01.png", "/bracelets/hand_c01.png"], // b14 - פנינות ים
  ["/bracelets/pack_b02.png", "/bracelets/hand_b02.png"], // b15 - ורד 14K
  ["/bracelets/pack_b08.png", "/bracelets/hand_b08.png"], // b16 - פבה זהב
  ["/bracelets/pack_b09.png", "/bracelets/hand_b09.png"], // b17 - בוקס צ'יין
  ["/bracelets/pack_c02.png", "/bracelets/hand_c02.png"], // b18 - אינפיניטי
  ["/bracelets/pack_b06.png", "/bracelets/hand_b06.png"], // b19 - כסף מרובע
  ["/bracelets/pack_a06.png", "/bracelets/hand_a06.png"], // b20 - לינק זהב
  ["/bracelets/pack_b07.png", "/bracelets/hand_b07.png"], // b21 - צ'יין יהלום
  ["/bracelets/pack_c06.png", "/bracelets/hand_c06.png"], // b22 - ווייב זהב
  ["/bracelets/pack_b04.png", "/bracelets/hand_b04.png"], // b23 - זהב לבן רחב
  ["/bracelets/pack_c08.png", "/bracelets/hand_c08.png"], // b24 - פלטינה
  ["/bracelets/pack_a04.png", "/bracelets/hand_a04.png"], // b25 - בנגל יהלום
];
const bp = (i: number) => BP[i % BP.length];

// ── עגילים — verified white-background product shots ──────────────────────────
const UE = [
  P(20943476), // diamond earrings, white surface
  P(7258925),  // earrings product shot, white bg
  P(5370642),  // silver diamond studs, white bg
  P(16055232), // gold earrings on white ribbon
  P(10475794), // rose gold diamond earrings, white
  U("photo-1632525231035-c054cd5019db"), // gold hoop earrings, white
  U("photo-1723361656146-f201d215c49c"), // gold earrings, white bg
];
const e = (i: number) => UE[i % UE.length];

const MAT = ["זהב 14K","זהב 18K","כסף 925","זהב לבן 14K","זהב ורד 14K"];
const m = (i: number) => MAT[i % MAT.length];

// ── טבעות — תמונות מקומיות ──────────────────────────────────────────────────
const RA = (n: number) => `/rings/Gemini_Generated_Image_2ngdrz2ngdrz2ngd_ring_${String(n).padStart(2,"0")}.png`;
const RB = (n: number) => `/rings/Gemini_Generated_Image_4fndis4fndis4fnd_ring_${String(n).padStart(2,"0")}.png`;
const RC = (n: number) => `/rings/Gemini_Generated_Image_6zpeza6zpeza6zpe_ring_${String(n).padStart(2,"0")}.png`;
const RD = (n: number) => `/rings/Gemini_Generated_Image_hvbpbhhvbpbhhvbp_ring_${String(n).padStart(2,"0")}.png`;
const RE = (n: number) => `/rings/Gemini_Generated_Image_k2uvmok2uvmok2uv_ring_${String(n).padStart(2,"0")}.png`;
const RAH = (n: number) => `/rings/RA_hand_${String(n).padStart(2,"0")}.png`;
const RBH = (n: number) => `/rings/RB_hand_${String(n).padStart(2,"0")}.png`;
const RCH = (n: number) => `/rings/RC_hand_${String(n).padStart(2,"0")}.png`;
const RDH = (n: number) => `/rings/RD_hand_${String(n).padStart(2,"0")}.png`;
const REH = (n: number) => `/rings/RE_hand_${String(n).padStart(2,"0")}.png`;

// ── New Ring Series — individual hand shots ─────────────────────────────
const S44 = (n: number) => `/rings/44ce_hand_${String(n).padStart(2,"0")}.png`;
const S6B = (n: number) => `/rings/6bpm_hand_${String(n).padStart(2,"0")}.png`;
const SFG = (n: number) => `/rings/fgj5_hand_${String(n).padStart(2,"0")}.png`;
const SIU = (n: number) => `/rings/iui0_hand_${String(n).padStart(2,"0")}.png`;
const SNA = (n: number) => `/rings/na91_hand_${String(n).padStart(2,"0")}.png`;
const SVO = (n: number) => `/rings/vopf_hand_${String(n).padStart(2,"0")}.png`;
const RFH = (n: number) => `/rings/RF_hand_${String(n).padStart(2,"0")}.png`;
const RGH = (n: number) => `/rings/RG_hand_${String(n).padStart(2,"0")}.png`;
const RHH = (n: number) => `/rings/RH_hand_${String(n).padStart(2,"0")}.png`;
const RIH = (n: number) => `/rings/RI_hand_${String(n).padStart(2,"0")}.png`;
const RJH = (n: number) => `/rings/RJ_hand_${String(n).padStart(2,"0")}.png`;
const RKH = (n: number) => `/rings/RK_hand_${String(n).padStart(2,"0")}.png`;
// ── New Earrings — cropped product shots ────────────────────────────────
const EAp = (n: number) => `/earrings/ea_prod_${String(n).padStart(2,"0")}.png`;
const EBp = (n: number) => `/earrings/eb_prod_${String(n).padStart(2,"0")}.png`;
const ECp = (n: number) => `/earrings/ec_prod_${String(n).padStart(2,"0")}.png`;
// ── New Bracelets — cropped product shots + existing hand shots ──────────
const ND = (sheet: number, n: number) => `/bracelets/new_d${String(sheet).padStart(2,"0")}_prod_${String(n).padStart(2,"0")}.png`;
const WRIST = ["/bracelets/hand_a01.png","/bracelets/hand_a03.png","/bracelets/hand_a05.png","/bracelets/hand_a07.png","/bracelets/hand_a09.png","/bracelets/hand_b02.png","/bracelets/hand_b04.png","/bracelets/hand_b06.png","/bracelets/hand_c02.png","/bracelets/hand_c04.png","/bracelets/hand_c06.png","/bracelets/hand_c08.png"];
const w = (i: number) => WRIST[i % WRIST.length];


export const products: Product[] = [
  /* ══════ RINGS ══════ */
  { id:"r1",  category:"rings", nameHe:"טבעת סוליטר זהב לבן",      nameEn:"White Gold Solitaire",         descriptionHe:"טבעת זהב לבן 18K עם יהלום עגול קלאסי",      descriptionEn:"Classic 18K white gold round solitaire",        price:8500,  image:RA(1),  images:[RA(1),  RAH(1)],  material:"זהב לבן 18K", isBestseller:true },
  { id:"r2",  category:"rings", nameHe:"טבעת סוליטר זהב צהוב",     nameEn:"Yellow Gold Solitaire",        descriptionHe:"טבעת זהב צהוב 18K עם יהלום עגול",           descriptionEn:"18K yellow gold round diamond solitaire",       price:7800,  image:RA(2),  images:[RA(2),  RAH(2)],  material:"זהב 18K" },
  { id:"r3",  category:"rings", nameHe:"טבעת האלו זהב לבן",        nameEn:"White Gold Halo Ring",         descriptionHe:"טבעת זהב לבן עם האלו יהלומים סביב האבן",    descriptionEn:"White gold halo diamond ring",                  price:12000, image:RA(3),  images:[RA(3),  RAH(3)],  material:"זהב לבן 14K", isNew:true },
  { id:"r4",  category:"rings", nameHe:"טבעת אמרלד קאט",           nameEn:"Emerald Cut Diamond Ring",     descriptionHe:"טבעת יהלום אמרלד קאט על להקת זהב עדינה",    descriptionEn:"Elegant emerald cut diamond on slim band",       price:15000, image:RA(4),  images:[RA(4),  RAH(4)],  material:"זהב לבן 18K" },
  { id:"r5",  category:"rings", nameHe:"טבעת באגט וצד",            nameEn:"Baguette Side Stone Ring",     descriptionHe:"יהלום עגול עם אבני באגט בצדדים",            descriptionEn:"Round diamond flanked by baguette stones",       price:11500, image:RA(5),  images:[RA(5),  RAH(5)],  material:"זהב לבן 14K", isBestseller:true },
  { id:"r6",  category:"rings", nameHe:"טבעת פייר זהב ורד",        nameEn:"Rose Gold Pear Pavé Ring",     descriptionHe:"יהלום בצורת טיפה על להקת פייב זהב ורד",     descriptionEn:"Pear diamond on rose gold pavé band",            price:14500, image:RA(6),  images:[RA(6),  RAH(6)],  material:"זהב ורד 14K", isNew:true },
  { id:"r8",  category:"rings", nameHe:"טבעת מרקיז יהלום",         nameEn:"Marquise Diamond Ring",        descriptionHe:"יהלום מרקיז אלגנטי על להקת זהב לבן",       descriptionEn:"Elegant marquise diamond on white gold band",    price:16000, image:RA(8),  images:[RA(8),  RAH(8)],  material:"זהב לבן 14K" },
  { id:"r9",  category:"rings", nameHe:"טבעת צד פייב",             nameEn:"Pavé Side Stone Ring",         descriptionHe:"יהלום עגול עם פייב יהלומים בצדדים",        descriptionEn:"Round diamond with pavé set side stones",        price:13000, image:RA(9),  images:[RA(9),  RAH(9)],  material:"זהב לבן 18K", isBestseller:true },
  { id:"r10", category:"rings", nameHe:"טבעת זהב מודרנית",         nameEn:"Modern Yellow Gold Band",      descriptionHe:"טבעת זהב צהוב 14K בעיצוב מודרני נקי",      descriptionEn:"Sleek modern 14K yellow gold ring",              price:3800,  image:RA(10), images:[RA(10), RAH(10)], material:"זהב 14K" },

  { id:"r12", category:"rings", nameHe:"טבעת ספיר אובל",           nameEn:"Oval Sapphire Ring",           descriptionHe:"ספיר אובל כחול עם יהלומי צד בזהב צהוב",   descriptionEn:"Oval blue sapphire with diamond accents in gold", price:11000, image:RB(2),  images:[RB(2),  RBH(2)],  material:"זהב 18K", isNew:true },
  { id:"r13", category:"rings", nameHe:"טבעת ארט דקו יהלום",       nameEn:"Art Deco Diamond Band",        descriptionHe:"להקת יהלומים בסגנון ארט דקו יוקרתי",       descriptionEn:"Luxurious Art Deco diamond band",                price:18000, image:RB(3),  images:[RB(3),  RBH(3)],  material:"זהב לבן 18K", isBestseller:true },
  { id:"r14", category:"rings", nameHe:"טבעת מורגנייט פייר",       nameEn:"Morganite Pear Ring",          descriptionHe:"מורגנייט בצורת טיפה בזהב ורד, אלגנטי ועדין",descriptionEn:"Pear morganite in delicate rose gold setting",   price:8800,  image:RB(4),  images:[RB(4),  RBH(4)],  material:"זהב ורד 14K" },
  { id:"r16", category:"rings", nameHe:"טבעת עלים זהב ורד",        nameEn:"Rose Gold Leaf Ring",          descriptionHe:"טבעת זהב ורד בצורת עלים ויהלומים עדינים",  descriptionEn:"Delicate rose gold leaf design with diamonds",   price:6500,  image:RB(6),  images:[RB(6),  RBH(6)],  material:"זהב ורד 14K" },
  { id:"r17", category:"rings", nameHe:"טבעת יהלום שחור",          nameEn:"Black Diamond Band",           descriptionHe:"להקת זהב שחורה עם יהלומים שחורים מרהיבים",  descriptionEn:"Bold black gold band with black diamonds",       price:9500,  image:RB(7),  images:[RB(7),  RBH(7)],  material:"זהב שחור 14K" },
  { id:"r18", category:"rings", nameHe:"טבעת ביפס יהלום",          nameEn:"Bypass Diamond Ring",          descriptionHe:"טבעת ביפס זהב לבן עם שני יהלומים",         descriptionEn:"White gold bypass ring with two diamonds",       price:7200,  image:RB(8),  images:[RB(8),  RBH(8)],  material:"זהב לבן 14K" },
  { id:"r19", category:"rings", nameHe:"טבעת פרח יהלומים",         nameEn:"Flower Cluster Ring",          descriptionHe:"עיצוב פרח יהלומים קלאסי ומרהיב",           descriptionEn:"Classic diamond flower cluster design",          price:10500, image:RB(9),  images:[RB(9),  RBH(9)],  material:"זהב לבן 18K", isBestseller:true },
  { id:"r20", category:"rings", nameHe:"טבעת נצח יהלומים",         nameEn:"Diamond Eternity Band",        descriptionHe:"להקת נצח זהב לבן עם יהלומים סביב",         descriptionEn:"Full diamond eternity white gold band",          price:22000, image:RB(10), images:[RB(10), RBH(10)], material:"זהב לבן 18K" },

  { id:"r21", category:"rings", nameHe:"טבעת נישואין זהב לבן",     nameEn:"White Gold Wedding Band",      descriptionHe:"להקת נישואין זהב לבן קלאסית וחלקה",        descriptionEn:"Classic smooth white gold wedding band",         price:3200,  image:RC(1),  images:[RC(1),  RCH(1)],  material:"זהב לבן 14K" },
  { id:"r22", category:"rings", nameHe:"טבעת נישואין זהב צהוב",    nameEn:"Yellow Gold Wedding Band",     descriptionHe:"להקת נישואין זהב צהוב 18K עם פוליש גבוה",   descriptionEn:"High polish 18K yellow gold wedding band",       price:3500,  image:RC(2),  images:[RC(2),  RCH(2)],  material:"זהב 18K" },
  { id:"r23", category:"rings", nameHe:"להקה מוחצנת זהב",          nameEn:"Hammered Gold Band",           descriptionHe:"להקת זהב 14K עם גימור מוחצן טקסטורלי",     descriptionEn:"14K gold band with hammered texture finish",     price:2800,  image:RC(3),  images:[RC(3),  RCH(3)],  material:"זהב 14K", isNew:true },
  { id:"r24", category:"rings", nameHe:"להקת נצח יהלומים",         nameEn:"Diamond Eternity Wedding Band",descriptionHe:"להקת יהלומים עגולים בזהב לבן לנצח",         descriptionEn:"Round diamond eternity band in white gold",      price:12000, image:RC(4),  images:[RC(4),  RCH(4)],  material:"זהב לבן 14K", isBestseller:true },
  { id:"r25", category:"rings", nameHe:"להקה מקבילה זהב ורד",      nameEn:"Curved Rose Gold Band",        descriptionHe:"להקת זהב ורד מעוקלת לאצבע, עיצוב ייחודי",  descriptionEn:"Elegantly curved rose gold band ring",           price:3100,  image:RC(5),  images:[RC(5),  RCH(5)],  material:"זהב ורד 14K" },
  { id:"r26", category:"rings", nameHe:"להקה מבורשת כסף",          nameEn:"Brushed Silver Band",          descriptionHe:"להקת כסף 925 עם גימור מבורשת עדין",         descriptionEn:"925 silver band with brushed matte finish",      price:1400,  image:RC(6),  images:[RC(6),  RCH(6)],  material:"כסף 925" },
  { id:"r27", category:"rings", nameHe:"להקה דו-גוון",             nameEn:"Two-Tone Wedding Band",        descriptionHe:"שילוב זהב לבן וצהוב בלהקת נישואין אחת",    descriptionEn:"White and yellow gold two-tone wedding band",    price:4200,  image:RC(7),  images:[RC(7),  RCH(7)],  material:"זהב 14K" },
  { id:"r28", category:"rings", nameHe:"להקה שחורה קרמיקה",        nameEn:"Black Ceramic Band",           descriptionHe:"להקת קרמיקה שחורה עם פנים זהב ורד",        descriptionEn:"Black ceramic band with rose gold inner lining",  price:2600,  image:RC(8),  images:[RC(8),  RCH(8)],  material:"קרמיקה/זהב ורד" },
  { id:"r29", category:"rings", nameHe:"להקת באגט שקועים",         nameEn:"Channel Set Baguette Band",    descriptionHe:"להקת זהב לבן עם יהלומי באגט שקועים",       descriptionEn:"White gold channel set baguette diamond band",   price:9800,  image:RC(9),  images:[RC(9),  RCH(9)],  material:"זהב לבן 18K", isNew:true },
  { id:"r30", category:"rings", nameHe:"להקה מודרנית זהב",         nameEn:"Modern Gold Statement Band",   descriptionHe:"להקת זהב 14K רחבה בעיצוב מינימל מודרני",   descriptionEn:"Wide modern minimalist 14K gold band",           price:3900,  image:RC(10), images:[RC(10), RCH(10)], material:"זהב 14K" },

  { id:"r31", category:"rings", nameHe:"טבעת כרית האלו",           nameEn:"Cushion Halo Engagement Ring", descriptionHe:"יהלום כרית עם האלו יהלומים בזהב לבן",      descriptionEn:"Cushion diamond with white gold halo setting",   price:17000, image:RD(1),  images:[RD(1),  RDH(1)],  material:"זהב לבן 18K", isBestseller:true },
  { id:"r32", category:"rings", nameHe:"טבעת שלוש אבנות זהב",      nameEn:"Three Stone Yellow Gold Ring", descriptionHe:"שלושה יהלומים גדולים בזהב צהוב 18K",        descriptionEn:"Three large diamonds in 18K yellow gold",        price:21000, image:RD(2),  images:[RD(2),  RDH(2)],  material:"זהב 18K" },
  { id:"r33", category:"rings", nameHe:"טבעת אמרלד זהב צהוב",      nameEn:"Emerald Cut Yellow Gold Ring", descriptionHe:"יהלום אמרלד קאט על להקת זהב צהוב עדינה",   descriptionEn:"Emerald cut diamond on slim yellow gold band",   price:19000, image:RD(3),  images:[RD(3),  RDH(3)],  material:"זהב 18K", isNew:true },
  { id:"r34", category:"rings", nameHe:"טבעת מרקיז האלו",           nameEn:"Marquise Halo Ring",           descriptionHe:"יהלום מרקיז עם האלו יהלומים בזהב לבן",     descriptionEn:"Marquise diamond with full halo in white gold",  price:18500, image:RD(4),  images:[RD(4),  RDH(4)],  material:"זהב לבן 18K" },
  { id:"r35", category:"rings", nameHe:"טבעת אינפיניטי עגול",       nameEn:"Infinity Diamond Ring",        descriptionHe:"יהלום עגול על להקת אינפיניטי זהב לבן",    descriptionEn:"Round diamond on white gold infinity band",      price:7600,  image:RD(5),  images:[RD(5),  RDH(5)],  material:"זהב לבן 14K" },
  { id:"r36", category:"rings", nameHe:"טבעת וינטאג' זהב",          nameEn:"Vintage Yellow Gold Ring",     descriptionHe:"טבעת סגנון וינטאג' עם חריטות בזהב צהוב",   descriptionEn:"Vintage style engraved yellow gold ring",        price:8200,  image:RD(6),  images:[RD(6),  RDH(6)],  material:"זהב 14K" },
  { id:"r37", category:"rings", nameHe:"טבעת כרית האלו מרובע",      nameEn:"Square Cushion Halo Ring",     descriptionHe:"יהלום כרית מרובע עם האלו יהלומים",         descriptionEn:"Square cushion diamond with pavé halo",          price:15500, image:RD(7),  images:[RD(7),  RDH(7)],  material:"זהב לבן 18K", isBestseller:true },
  { id:"r39", category:"rings", nameHe:"טבעת עגול צד פייב",         nameEn:"Round Pavé Shoulder Ring",     descriptionHe:"יהלום עגול עם כתפי פייב בזהב לבן",         descriptionEn:"Round diamond with pavé shoulders in white gold", price:14200, image:RD(9),  images:[RD(9),  RDH(9)],  material:"זהב לבן 18K" },

  { id:"r42", category:"rings", nameHe:"טבעת כרית צהובה שלוש",      nameEn:"Yellow Cushion Three-Stone",   descriptionHe:"יהלום צהוב כרית עם שני יהלומים לצדדים",    descriptionEn:"Yellow cushion diamond with two side stones",     price:25000, image:RE(2),  images:[RE(2),  REH(2)],  material:"זהב 18K", isBestseller:true },
  { id:"r43", category:"rings", nameHe:"טבעת שני אבנות כחול ורד",   nameEn:"Two-Stone Blue & Rose Gold",   descriptionHe:"יהלום כחול ולבן על להקת זהב ורד מיוחדת",   descriptionEn:"Blue & white diamond two-stone on rose gold",     price:22000, image:RE(3),  images:[RE(3),  REH(3)],  material:"זהב ורד 18K", isNew:true },
  { id:"r44", category:"rings", nameHe:"טבעת כרית האלו מרובע",      nameEn:"Cushion Square Halo Ring",     descriptionHe:"יהלום כרית מרובע עם האלו פייב בזהב לבן",   descriptionEn:"Square cushion diamond with full pavé halo",      price:19500, image:RE(4),  images:[RE(4),  REH(4)],  material:"זהב לבן 18K" },
  { id:"r45", category:"rings", nameHe:"טבעת ארט דקו אמרלד",        nameEn:"Art Deco Emerald Cut Ring",    descriptionHe:"יהלום אמרלד קאט בעיצוב ארט דקו אלגנטי",    descriptionEn:"Emerald cut in elegant Art Deco setting",         price:23000, image:RE(5),  images:[RE(5),  REH(5)],  material:"זהב לבן 18K", isBestseller:true },
  { id:"r46", category:"rings", nameHe:"טבעת פרפר יהלומים",         nameEn:"Butterfly Diamond Ring",       descriptionHe:"עיצוב פרפר ייחודי משובץ יהלומים",          descriptionEn:"Unique butterfly design set with diamonds",       price:17500, image:RE(6),  images:[RE(6),  REH(6)],  material:"זהב לבן 14K", isNew:true },
  { id:"r47", category:"rings", nameHe:"טבעת נחש ספירלה",           nameEn:"Diamond Snake Spiral Ring",    descriptionHe:"טבעת נחש מסתחלת משובצת יהלומים",           descriptionEn:"Spiraling snake ring fully set with diamonds",    price:14000, image:RE(7),  images:[RE(7),  REH(7)],  material:"זהב לבן 14K" },
  { id:"r48", category:"rings", nameHe:"טבעת סוליטר זהב פשוט",      nameEn:"Simple Yellow Gold Solitaire", descriptionHe:"יהלום קטן אלגנטי על להקת זהב צהוב עדינה",  descriptionEn:"Small elegant diamond on delicate yellow gold",   price:4800,  image:RE(8),  images:[RE(8),  REH(8)],  material:"זהב 14K" },
  { id:"r49", category:"rings", nameHe:"להקת נצח ארט דקו",          nameEn:"Art Deco Eternity Band",       descriptionHe:"להקת יהלומים בעיצוב ארט דקו בזהב לבן",    descriptionEn:"Art Deco inspired diamond eternity band",         price:13500, image:RE(9),  images:[RE(9),  REH(9)],  material:"זהב לבן 18K" },
  { id:"r50", category:"rings", nameHe:"טבעת מרקיז שמש יהלומים",    nameEn:"Marquise Sunburst Ring",       descriptionHe:"יהלום מרקיז מרכזי עם פרחי יהלום סביבו",   descriptionEn:"Marquise center diamond with diamond sunburst",   price:28000, image:RE(10), images:[RE(10), REH(10)], material:"זהב לבן 18K", isBestseller:true },

  /* ══════ NECKLACES ══════ */
  { id:"n1",  category:"necklaces", nameHe:"שרשרת ביזל זהב ורד",      nameEn:"Rose Gold Bezel Necklace",      descriptionHe:"שרשרת זהב ורד 14K עם יהלום בביזל עגול",       descriptionEn:"14K rose gold necklace with round bezel diamond",   price:4800,  image:"/necklaces/j2ox_neck_01.png", images:["/necklaces/j2ox_neck_01.png","/necklaces/j2ox_base.png"], material:"זהב ורד 14K", isBestseller:true },
  { id:"n2",  category:"necklaces", nameHe:"שרשרת בר כסף",            nameEn:"Silver Bar Necklace",           descriptionHe:"שרשרת כסף 925 עם תליון בר מינימליסטי",        descriptionEn:"925 silver minimalist bar pendant necklace",        price:1800,  image:"/necklaces/j2ox_neck_02.png", images:["/necklaces/j2ox_neck_02.png","/necklaces/j2ox_base.png"], material:"כסף 925" },
  { id:"n3",  category:"necklaces", nameHe:"שרשרת אות ראשונית זהב",   nameEn:"Gold Initial Necklace",         descriptionHe:"שרשרת זהב 18K עם תליון אות ראשונית",          descriptionEn:"18K gold necklace with initial letter pendant",     price:3200,  image:"/necklaces/j2ox_neck_03.png", images:["/necklaces/j2ox_neck_03.png","/necklaces/j2ox_base.png"], material:"זהב 18K", isNew:true },
  { id:"n4",  category:"necklaces", nameHe:"שרשרת אינפיניטי כסף",     nameEn:"Silver Infinity Necklace",      descriptionHe:"שרשרת כסף עם תליון אינפיניטי עדין",           descriptionEn:"Silver necklace with delicate infinity pendant",    price:2200,  image:"/necklaces/j2ox_neck_04.png", images:["/necklaces/j2ox_neck_04.png","/necklaces/j2ox_base.png"], material:"כסף 925" },
  { id:"n5",  category:"necklaces", nameHe:"שרשרת ספיר כחול זהב",     nameEn:"Blue Sapphire Gold Necklace",   descriptionHe:"שרשרת זהב 14K עם אבן ספיר כחולה",            descriptionEn:"14K gold necklace with blue sapphire stone",        price:5600,  image:"/necklaces/j2ox_neck_05.png", images:["/necklaces/j2ox_neck_05.png","/necklaces/j2ox_base.png"], material:"זהב 14K", isNew:true },
  { id:"n6",  category:"necklaces", nameHe:"שרשרת ירח זהב ורד",       nameEn:"Rose Gold Moon Necklace",       descriptionHe:"שרשרת זהב ורד עם תליון ירח סהר",              descriptionEn:"Rose gold crescent moon pendant necklace",          price:3400,  image:"/necklaces/j2ox_neck_06.png", images:["/necklaces/j2ox_neck_06.png","/necklaces/j2ox_base.png"], material:"זהב ורד 14K" },
  { id:"n7",  category:"necklaces", nameHe:"שרשרת סמל זהב",           nameEn:"Gold Symbol Necklace",          descriptionHe:"שרשרת זהב 18K עם תליון סמל מיוחד",           descriptionEn:"18K gold necklace with symbol pendant",             price:2900,  image:"/necklaces/j2ox_neck_07.png", images:["/necklaces/j2ox_neck_07.png","/necklaces/j2ox_base.png"], material:"זהב 18K" },
  { id:"n8",  category:"necklaces", nameHe:"שרשרת לב פתוח זהב",       nameEn:"Open Heart Gold Necklace",      descriptionHe:"שרשרת זהב 14K עם תליון לב פתוח",             descriptionEn:"14K gold open heart pendant necklace",              price:3100,  image:"/necklaces/j2ox_neck_08.png", images:["/necklaces/j2ox_neck_08.png","/necklaces/j2ox_base.png"], material:"זהב 14K", isBestseller:true },
  { id:"n9",  category:"necklaces", nameHe:"שרשרת מפתח כסף",          nameEn:"Silver Key Necklace",           descriptionHe:"שרשרת כסף 925 עם תליון מפתח וינטאג'",         descriptionEn:"925 silver vintage key pendant necklace",           price:2400,  image:"/necklaces/j2ox_neck_09.png", images:["/necklaces/j2ox_neck_09.png","/necklaces/j2ox_base.png"], material:"כסף 925" },

  { id:"n11", category:"necklaces", nameHe:"שרשרת יהלום סוליטר",      nameEn:"Solitaire Diamond Necklace",    descriptionHe:"שרשרת זהב לבן עם יהלום סוליטר עדין",         descriptionEn:"White gold delicate solitaire diamond necklace",    price:6800,  image:"/necklaces/pe7k_neck_01.png", images:["/necklaces/pe7k_neck_01.png","/necklaces/pe7k_base.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"n12", category:"necklaces", nameHe:"שרשרת תחנות יהלום",       nameEn:"Diamond Station Necklace",      descriptionHe:"שרשרת כסף עם שתי תחנות יהלום",               descriptionEn:"Silver necklace with two diamond stations",         price:5400,  image:"/necklaces/pe7k_neck_02.png", images:["/necklaces/pe7k_neck_02.png","/necklaces/pe7k_base.png"], material:"כסף 925" },
  { id:"n13", category:"necklaces", nameHe:"שרשרת פייר יהלום",        nameEn:"Pear Diamond Necklace",         descriptionHe:"שרשרת כסף עם תליון יהלום בצורת טיפה",        descriptionEn:"Silver necklace with pear shaped diamond pendant",  price:8200,  image:"/necklaces/pe7k_neck_03.png", images:["/necklaces/pe7k_neck_03.png","/necklaces/pe7k_base.png"], material:"זהב לבן 14K", isNew:true },
  { id:"n14", category:"necklaces", nameHe:"שרשרת בר יהלומים",        nameEn:"Diamond Bar Necklace",          descriptionHe:"שרשרת כסף עם בר יהלומים אופקי",             descriptionEn:"Silver horizontal diamond bar necklace",            price:7600,  image:"/necklaces/pe7k_neck_04.png", images:["/necklaces/pe7k_neck_04.png","/necklaces/pe7k_base.png"], material:"זהב לבן 14K" },
  { id:"n15", category:"necklaces", nameHe:"שרשרת פרח יהלומים",       nameEn:"Diamond Flower Necklace",       descriptionHe:"שרשרת כסף עם תליון פרח יהלומים",             descriptionEn:"Silver necklace with diamond flower cluster",       price:6500,  image:"/necklaces/pe7k_neck_05.png", images:["/necklaces/pe7k_neck_05.png","/necklaces/pe7k_base.png"], material:"זהב לבן 14K" },
  { id:"n16", category:"necklaces", nameHe:"שרשרת טניס יהלומים",      nameEn:"Diamond Tennis Necklace",       descriptionHe:"שרשרת טניס זהב לבן עם שורת יהלומים",        descriptionEn:"White gold full diamond tennis necklace",           price:22000, image:"/necklaces/pe7k_neck_06.png", images:["/necklaces/pe7k_neck_06.png","/necklaces/pe7k_base.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"n17", category:"necklaces", nameHe:"שרשרת כוכב יהלום",        nameEn:"Diamond Star Necklace",         descriptionHe:"שרשרת כסף עם תליון כוכב יהלומים",           descriptionEn:"Silver necklace with diamond star pendant",         price:4700,  image:"/necklaces/pe7k_neck_07.png", images:["/necklaces/pe7k_neck_07.png","/necklaces/pe7k_base.png"], material:"כסף 925", isNew:true },
  { id:"n18", category:"necklaces", nameHe:"שרשרת מולטי תחנות",       nameEn:"Multi Station Diamond Necklace",descriptionHe:"שרשרת כסף עם תחנות יהלום מרובות",            descriptionEn:"Silver multi station diamond necklace",             price:9800,  image:"/necklaces/pe7k_neck_08.png", images:["/necklaces/pe7k_neck_08.png","/necklaces/pe7k_base.png"], material:"כסף 925" },
  { id:"n19", category:"necklaces", nameHe:"שרשרת האלו עגול זהב",     nameEn:"Gold Halo Circle Necklace",     descriptionHe:"שרשרת זהב צהוב עם תליון האלו עגול יהלומים", descriptionEn:"Yellow gold round halo diamond pendant necklace",   price:11500, image:"/necklaces/pe7k_neck_09.png", images:["/necklaces/pe7k_neck_09.png","/necklaces/pe7k_base.png"], material:"זהב 18K" },

  { id:"n21", category:"necklaces", nameHe:"שרשרת יהלום עגול זהב",    nameEn:"Round Diamond Gold Necklace",   descriptionHe:"שרשרת זהב צהוב עם יהלום עגול בביזל",        descriptionEn:"Yellow gold necklace with round bezel diamond",     price:5200,  image:"/necklaces/tjhq_neck_01.png", images:["/necklaces/tjhq_neck_01.png","/necklaces/tjhq_base.png"], material:"זהב 14K" },
  { id:"n22", category:"necklaces", nameHe:"שרשרת פרינסס זהב",        nameEn:"Princess Diamond Necklace",     descriptionHe:"שרשרת זהב 18K עם יהלום פרינסס מרובע",       descriptionEn:"18K gold necklace with princess cut diamond",       price:7800,  image:"/necklaces/tjhq_neck_02.png", images:["/necklaces/tjhq_neck_02.png","/necklaces/tjhq_base.png"], material:"זהב 18K", isNew:true },
  { id:"n23", category:"necklaces", nameHe:"שרשרת פייר זהב לבן",      nameEn:"White Gold Pear Necklace",      descriptionHe:"שרשרת זהב לבן עם תליון פייר",               descriptionEn:"White gold pear diamond pendant necklace",          price:8900,  image:"/necklaces/tjhq_neck_03.png", images:["/necklaces/tjhq_neck_03.png","/necklaces/tjhq_base.png"], material:"זהב לבן 18K" },
  { id:"n24", category:"necklaces", nameHe:"שרשרת כרית זהב ורד",      nameEn:"Rose Gold Cushion Necklace",    descriptionHe:"שרשרת זהב ורד עם יהלום כרית",               descriptionEn:"Rose gold cushion diamond pendant necklace",        price:9200,  image:"/necklaces/tjhq_neck_04.png", images:["/necklaces/tjhq_neck_04.png","/necklaces/tjhq_base.png"], material:"זהב ורד 18K" },
  { id:"n25", category:"necklaces", nameHe:"שרשרת סוליטר זהב לבן",    nameEn:"White Gold Solitaire Necklace", descriptionHe:"שרשרת זהב לבן 14K עם יהלום עגול קלאסי",     descriptionEn:"Classic 14K white gold round solitaire necklace",   price:6100,  image:"/necklaces/tjhq_neck_05.png", images:["/necklaces/tjhq_neck_05.png","/necklaces/tjhq_base.png"], material:"זהב לבן 14K", isBestseller:true },
  { id:"n26", category:"necklaces", nameHe:"שרשרת אובל זהב",          nameEn:"Oval Diamond Gold Necklace",    descriptionHe:"שרשרת זהב צהוב עם יהלום אובל בביזל",        descriptionEn:"Yellow gold oval bezel diamond necklace",           price:7400,  image:"/necklaces/tjhq_neck_06.png", images:["/necklaces/tjhq_neck_06.png","/necklaces/tjhq_base.png"], material:"זהב 18K" },
  { id:"n27", category:"necklaces", nameHe:"שרשרת מרקיז יהלום",       nameEn:"Marquise Diamond Necklace",     descriptionHe:"שרשרת כסף עם תליון מרקיז יהלום אלגנטי",     descriptionEn:"Silver necklace with elegant marquise diamond",     price:8500,  image:"/necklaces/tjhq_neck_07.png", images:["/necklaces/tjhq_neck_07.png","/necklaces/tjhq_base.png"], material:"זהב לבן 14K", isNew:true },
  { id:"n28", category:"necklaces", nameHe:"שרשרת לב יהלום",          nameEn:"Heart Diamond Necklace",        descriptionHe:"שרשרת כסף עם תליון לב יהלום מרהיב",         descriptionEn:"Silver necklace with heart shaped diamond pendant",  price:6800,  image:"/necklaces/tjhq_neck_08.png", images:["/necklaces/tjhq_neck_08.png","/necklaces/tjhq_base.png"], material:"זהב לבן 14K" },
  { id:"n29", category:"necklaces", nameHe:"שרשרת אמרלד קאט זהב",     nameEn:"Emerald Cut Gold Necklace",     descriptionHe:"שרשרת זהב 18K עם יהלום אמרלד קאט",          descriptionEn:"18K gold emerald cut diamond pendant necklace",     price:10500, image:"/necklaces/tjhq_neck_09.png", images:["/necklaces/tjhq_neck_09.png","/necklaces/tjhq_base.png"], material:"זהב 18K", isBestseller:true },

  /* ══════ BRACELETS ══════ */
  { id:"b6",  category:"bracelets", nameHe:"צמיד יהלומים שלושה", nameEn:"Three Diamond Bracelet",   descriptionHe:"צמיד זהב עם שלושה יהלומים",    descriptionEn:"Gold bracelet with three diamonds",   price:6500, image:bp(5)[0], images:[bp(5)[0],bp(5)[1]], material:m(0) },
  { id:"b7",  category:"bracelets", nameHe:"צמיד קאף ורד פייב",  nameEn:"Rose Gold Pavé Cuff",      descriptionHe:"צמיד קאף זהב ורד עם פייב יהלומים",descriptionEn:"Rose gold open cuff with pavé diamonds",price:9800,image:bp(6)[0], images:[bp(6)[0],bp(6)[1]], material:m(4) },
  { id:"b8",  category:"bracelets", nameHe:"צמיד פרפר יהלומים",  nameEn:"Butterfly Diamond Bracelet",descriptionHe:"צמיד כסף עם פרפר יהלומים",      descriptionEn:"Silver bracelet with diamond butterfly",price:7200,image:bp(7)[0], images:[bp(7)[0],bp(7)[1]], material:m(2), isBestseller:true },
  { id:"b9",  category:"bracelets", nameHe:"צמיד טניס אמרלד",    nameEn:"Emerald Tennis Bracelet",  descriptionHe:"צמיד טניס כסף עם אמרלד קאט",   descriptionEn:"Silver emerald cut tennis bracelet",  price:14500,image:bp(8)[0], images:[bp(8)[0],bp(8)[1]], material:m(2) },
  { id:"b11", category:"bracelets", nameHe:"צמיד קאף נחש זהב",   nameEn:"Gold Snake Cuff",          descriptionHe:"צמיד קאף זהב בצורת ראש נחש",   descriptionEn:"Gold snake head open cuff bracelet",  price:5400, image:bp(10)[0],images:[bp(10)[0],bp(10)[1]],material:m(1) },
  { id:"b14", category:"bracelets", nameHe:"צמיד פנינות ים",     nameEn:"Freshwater Pearl Bracelet",descriptionHe:"צמיד זהב עם פנינות מים מתוקים", descriptionEn:"Gold bracelet with freshwater pearls", price:3600, image:bp(13)[0],images:[bp(13)[0],bp(13)[1]],material:m(0) },
  { id:"b15", category:"bracelets", nameHe:"צמיד קאף ורד פתוח",  nameEn:"Rose Gold Open Cuff",      descriptionHe:"צמיד קאף זהב ורד פתוח עם יהלומים",descriptionEn:"Rose gold open cuff with pavé tips",  price:8200, image:bp(14)[0],images:[bp(14)[0],bp(14)[1]],material:m(4), isBestseller:true },
  { id:"b16", category:"bracelets", nameHe:"צמיד בנגל כפול",     nameEn:"Double Row Diamond Bangle",descriptionHe:"צמיד בנגל זהב ורד שתי שורות יהלומים",descriptionEn:"Rose gold double row diamond bangle",price:18000,image:bp(15)[0],images:[bp(15)[0],bp(15)[1]],material:m(4), isNew:true },
  { id:"b17", category:"bracelets", nameHe:"צמיד אובל יהלומים",  nameEn:"Oval Diamond Bracelet",    descriptionHe:"צמיד זהב עם יהלומי אובל",       descriptionEn:"Gold bracelet with oval cut diamonds", price:12000,image:bp(16)[0],images:[bp(16)[0],bp(16)[1]],material:m(0) },
  { id:"b18", category:"bracelets", nameHe:"צמיד אינפיניטי",     nameEn:"Infinity Bracelet",        descriptionHe:"צמיד כסף אינפיניטי יהלומים",   descriptionEn:"Silver infinity diamond bracelet",    price:4800, image:bp(17)[0],images:[bp(17)[0],bp(17)[1]],material:m(2) },
  { id:"b19", category:"bracelets", nameHe:"צמיד משושה פייב",    nameEn:"Hexagon Pavé Bracelet",    descriptionHe:"צמיד כסף עם משושים מפייב יהלומים",descriptionEn:"Silver bracelet with pavé hexagons",  price:5600, image:bp(18)[0],images:[bp(18)[0],bp(18)[1]],material:m(2) },
  { id:"b21", category:"bracelets", nameHe:"צמיד לב יהלום",      nameEn:"Heart Diamond Bracelet",   descriptionHe:"צמיד זהב עם לב יהלומים",        descriptionEn:"Gold bracelet with heart diamond",    price:7400, image:bp(20)[0],images:[bp(20)[0],bp(20)[1]],material:m(0) },
  { id:"b22", category:"bracelets", nameHe:"צמיד שמש זהב ורד",   nameEn:"Sunburst Rose Gold",       descriptionHe:"צמיד זהב ורד עם תליון שמש",     descriptionEn:"Rose gold bracelet with sunburst charm",price:4200,image:bp(21)[0],images:[bp(21)[0],bp(21)[1]],material:m(4) },
  { id:"b23", category:"bracelets", nameHe:"צמיד קשר יהלום",     nameEn:"Knot Diamond Bangle",      descriptionHe:"צמיד בנגל זהב עם קשר ויהלומים", descriptionEn:"Gold bangle with knot and diamonds",  price:9500, image:bp(22)[0],images:[bp(22)[0],bp(22)[1]],material:m(0), isNew:true },
  { id:"b24", category:"bracelets", nameHe:"צמיד בנגל כסף",      nameEn:"Silver Diamond Bangle",    descriptionHe:"צמיד בנגל כסף עם יהלומים וחריטות",descriptionEn:"Silver bangle with diamonds and engravings",price:6800,image:bp(23)[0],images:[bp(23)[0],bp(23)[1]],material:m(2) },

  /* ══════ EARRINGS ══════ */
  { id:"e1",  category:"earrings", nameHe:"עגיל טיפת יהלום",     nameEn:"Diamond Drop Earrings",    descriptionHe:"עגילי זהב לבן עם יהלומים בתלייה", descriptionEn:"White gold diamond drop earrings",    price:8500, image:e(0), images:[e(0),e(1),e(2)], material:m(3), isBestseller:true },
  { id:"e2",  category:"earrings", nameHe:"עגיל חישוק יהלום",    nameEn:"Diamond Hoop Earrings",    descriptionHe:"עגילי חישוק זהב לבן עם יהלומים", descriptionEn:"White gold diamond hoop earrings",    price:11000,image:e(1), images:[e(1),e(2),e(3)], material:m(3), isBestseller:true },
  { id:"e3",  category:"earrings", nameHe:"עגיל סטאד יהלום",     nameEn:"Diamond Stud Earrings",    descriptionHe:"עגילי סטאד זהב לבן עם יהלומים",  descriptionEn:"Classic white gold diamond studs",    price:6200, image:e(2), images:[e(2),e(3),e(4)], material:m(3), isNew:true },
  { id:"e4",  category:"earrings", nameHe:"עגיל זהב קלאסי",      nameEn:"Classic Gold Earrings",    descriptionHe:"עגילי זהב 14K קלאסיים",          descriptionEn:"Classic 14K gold earrings",           price:1800, image:e(3), images:[e(3),e(4),e(5)], material:m(0) },
  { id:"e5",  category:"earrings", nameHe:"עגיל האלו יהלום",     nameEn:"Halo Diamond Earrings",    descriptionHe:"עגילי האלו זהב לבן יהלומים",     descriptionEn:"White gold halo diamond earrings",    price:14000,image:e(4), images:[e(4),e(5),e(6)], material:m(3), isNew:true },
  { id:"e6",  category:"earrings", nameHe:"עגיל חישוק זהב",      nameEn:"Gold Hoop Earrings",       descriptionHe:"עגילי חישוק זהב 14K בינוני",     descriptionEn:"14K gold medium hoop earrings",       price:2400, image:e(5), images:[e(5),e(6),e(0)], material:m(0) },
  { id:"e7",  category:"earrings", nameHe:"עגיל ורד יהלום",      nameEn:"Rose Gold Diamond Earrings",descriptionHe:"עגילי זהב ורד עם יהלומים",       descriptionEn:"Rose gold diamond earrings",          price:7800, image:e(6), images:[e(6),e(0),e(1)], material:m(4) },
  { id:"e8",  category:"earrings", nameHe:"עגיל פנינה",          nameEn:"Pearl Drop Earrings",      descriptionHe:"עגילי זהב עם פנינה בתלייה",      descriptionEn:"Gold drop earrings with natural pearl",price:3200, image:e(0), images:[e(0),e(1),e(2)], material:m(0), isBestseller:true },
  { id:"e9",  category:"earrings", nameHe:"עגיל כסף סטאד",       nameEn:"Silver Stud Earrings",     descriptionHe:"עגילי סטאד כסף 925",             descriptionEn:"925 silver stud earrings",             price:850,  image:e(1), images:[e(1),e(2),e(3)], material:m(2) },
  { id:"e10", category:"earrings", nameHe:"עגיל ירח יהלום",      nameEn:"Diamond Moon Earrings",    descriptionHe:"עגילי זהב לבן בצורת ירח ויהלום", descriptionEn:"White gold diamond moon earrings",    price:5600, image:e(2), images:[e(2),e(3),e(4)], material:m(3), isNew:true },
  { id:"e11", category:"earrings", nameHe:"עגיל קרנבל",          nameEn:"Chandelier Earrings",      descriptionHe:"עגילי קנדליר זהב ויהלומים",      descriptionEn:"Gold and diamond chandelier earrings", price:9400, image:e(3), images:[e(3),e(4),e(5)], material:m(0) },
  { id:"e12", category:"earrings", nameHe:"עגיל לינק זהב",       nameEn:"Gold Link Earrings",       descriptionHe:"עגילי זהב 14K סגנון לינק",       descriptionEn:"14K gold link style earrings",         price:2100, image:e(4), images:[e(4),e(5),e(6)], material:m(0) },
  { id:"e13", category:"earrings", nameHe:"עגיל טיפה ספיר",      nameEn:"Sapphire Drop Earrings",   descriptionHe:"עגילי זהב לבן עם ספיר כחול",    descriptionEn:"White gold blue sapphire drop earrings",price:6800,image:e(5), images:[e(5),e(6),e(0)], material:m(3) },
  { id:"e14", category:"earrings", nameHe:"עגיל קריאול זהב",     nameEn:"Gold Creole Earrings",     descriptionHe:"עגילי קריאול זהב 18K",           descriptionEn:"18K gold creole style earrings",       price:3600, image:e(6), images:[e(6),e(0),e(1)], material:m(1), isNew:true },
  { id:"e15", category:"earrings", nameHe:"עגיל ורד כסף",        nameEn:"Silver Rose Earrings",     descriptionHe:"עגילי כסף 925 בצורת ורד",        descriptionEn:"925 silver rose-shaped earrings",     price:1200, image:e(0), images:[e(0),e(1),e(2)], material:m(2) },
  { id:"e16", category:"earrings", nameHe:"עגיל פייב יהלום",     nameEn:"Pavé Diamond Earrings",    descriptionHe:"עגילי זהב לבן פייב יהלומים",    descriptionEn:"White gold pavé diamond earrings",    price:12500,image:e(1), images:[e(1),e(2),e(3)], material:m(3) },
  { id:"e17", category:"earrings", nameHe:"עגיל לולאה כסף",      nameEn:"Silver Loop Earrings",     descriptionHe:"עגילי לולאה כסף 925 עדינים",     descriptionEn:"Delicate 925 silver loop earrings",   price:780,  image:e(2), images:[e(2),e(3),e(4)], material:m(2) },
  { id:"e18", category:"earrings", nameHe:"עגיל גל זהב",         nameEn:"Gold Wave Earrings",       descriptionHe:"עגילי זהב 14K בצורת גל",         descriptionEn:"14K gold wave-shaped earrings",        price:2900, image:e(3), images:[e(3),e(4),e(5)], material:m(0) },
  { id:"e19", category:"earrings", nameHe:"עגיל שמש יהלום",      nameEn:"Diamond Sun Earrings",     descriptionHe:"עגילי זהב 18K בצורת שמש יהלומים",descriptionEn:"18K gold diamond sun earrings",        price:7200, image:e(4), images:[e(4),e(5),e(6)], material:m(1), isBestseller:true },
  { id:"e20", category:"earrings", nameHe:"עגיל כדור זהב",       nameEn:"Gold Ball Earrings",       descriptionHe:"עגילי כדור זהב 14K",             descriptionEn:"14K gold ball stud earrings",          price:1600, image:e(5), images:[e(5),e(6),e(0)], material:m(0) },
  { id:"e21", category:"earrings", nameHe:"עגיל טיפה ורד זהב",   nameEn:"Rose Gold Drop Earrings",  descriptionHe:"עגילי זהב ורד בתלייה עדינה",    descriptionEn:"Delicate rose gold drop earrings",    price:4100, image:e(6), images:[e(6),e(0),e(1)], material:m(4), isNew:true },
  { id:"e22", category:"earrings", nameHe:"עגיל מרקיז יהלום",    nameEn:"Marquise Diamond Earrings",descriptionHe:"עגילי זהב לבן יהלום מרקיז",      descriptionEn:"White gold marquise diamond earrings", price:8800, image:e(0), images:[e(0),e(1),e(2)], material:m(3) },
  { id:"e23", category:"earrings", nameHe:"עגיל קריסטל כסף",     nameEn:"Crystal Silver Earrings",  descriptionHe:"עגילי כסף עם קריסטל מרהיב",     descriptionEn:"Silver earrings with stunning crystal", price:1100, image:e(1), images:[e(1),e(2),e(3)], material:m(2) },
  { id:"e24", category:"earrings", nameHe:"עגיל לייר זהב",       nameEn:"Gold Lyre Earrings",       descriptionHe:"עגילי זהב 14K בצורת לייר",       descriptionEn:"14K gold lyre-shaped earrings",        price:3300, image:e(2), images:[e(2),e(3),e(4)], material:m(0) },
  { id:"e25", category:"earrings", nameHe:"עגיל מלכה יהלומים",   nameEn:"Queen Diamond Earrings",   descriptionHe:"עגילי זהב 18K יהלומים יוקרתיים",descriptionEn:"Luxurious 18K gold diamond earrings",  price:19500,image:e(3), images:[e(3),e(4),e(5)], material:m(1) },

  /* ══════ NEW RINGS — Additional Series ══════ */
  { id:"r51", category:"rings", nameHe:"טבעת קמורה מינימל", nameEn:"Dome Minimal Ring", descriptionHe:"להקה קמורה עדינה", descriptionEn:"Delicate domed band", price:3200, image:S44(1), images:[S44(1)], material:"זהב 14K" },
  { id:"r52", category:"rings", nameHe:"להקה שטוחה זהב", nameEn:"Flat Gold Band", descriptionHe:"להקת זהב שטוחה ומבריקה", descriptionEn:"High polish flat gold band", price:3800, image:S44(2), images:[S44(2)], material:"זהב 18K" },
  { id:"r53", category:"rings", nameHe:"להקה מבורשת ורד", nameEn:"Brushed Rose Band", descriptionHe:"להקת זהב ורד עם גימור מבורשת", descriptionEn:"Brushed rose gold band", price:2900, image:S44(3), images:[S44(3)], material:"זהב ורד 14K" },
  { id:"r54", category:"rings", nameHe:"להקת נצח יהלומים", nameEn:"Diamond Eternity Band", descriptionHe:"שורת יהלומים מסביב ללהקה", descriptionEn:"Full diamond eternity band", price:8500, image:S44(4), images:[S44(4)], material:"זהב לבן 14K" },
  { id:"r55", category:"rings", nameHe:"טבעת V זהב", nameEn:"V-Shape Gold Ring", descriptionHe:"להקת זהב בצורת V אלגנטי", descriptionEn:"Elegant V-shape gold band", price:2600, image:S44(5), images:[S44(5)], material:"זהב 14K" },
  { id:"r56", category:"rings", nameHe:"להקת פייב עדינה", nameEn:"Slim Pavé Band", descriptionHe:"להקת זהב לבן עם פייב יהלומים", descriptionEn:"White gold slim pavé band", price:7200, image:S44(6), images:[S44(6)], material:"זהב לבן 14K" },
  { id:"r57", category:"rings", nameHe:"טבעת דו גוון", nameEn:"Two-Tone Band", descriptionHe:"שילוב זהב לבן וצהוב", descriptionEn:"White and yellow gold two-tone", price:4100, image:S44(7), images:[S44(7)], material:"זהב 14K" },
  { id:"r58", category:"rings", nameHe:"להקה רחבה זהב", nameEn:"Wide Gold Band", descriptionHe:"להקת זהב רחבה ומרשימה", descriptionEn:"Impressive wide gold band", price:4800, image:S44(8), images:[S44(8)], material:"זהב 18K" },
  { id:"r59", category:"rings", nameHe:"טבעת באגט מוטבע", nameEn:"Channel Baguette Ring", descriptionHe:"יהלומי באגט שקועים בערוץ", descriptionEn:"Channel set baguette diamonds", price:6500, image:S44(9), images:[S44(9)], material:"זהב לבן 14K" },
  { id:"r60", category:"rings", nameHe:"להקת יהלום יחידה", nameEn:"Single Diamond Band", descriptionHe:"יהלום בודד על להקה עדינה", descriptionEn:"Delicate band with one diamond", price:5200, image:S44(10), images:[S44(10)], material:"זהב 18K" },
  { id:"r61", category:"rings", nameHe:"טבעת אירוסין עגולה", nameEn:"Round Engagement Ring", descriptionHe:"יהלום עגול על להקה קלאסית", descriptionEn:"Classic round diamond solitaire", price:9500, image:S6B(1), images:[S6B(1)], material:"זהב לבן 18K", isNew:true },
  { id:"r62", category:"rings", nameHe:"טבעת האלו קלאסי", nameEn:"Classic Halo Ring", descriptionHe:"יהלום עם האלו יהלומים", descriptionEn:"Diamond with classic halo", price:13500, image:S6B(2), images:[S6B(2)], material:"זהב לבן 18K", isBestseller:true },
  { id:"r63", category:"rings", nameHe:"טבעת שלוש אבנות", nameEn:"Three Stone Ring", descriptionHe:"שלושה יהלומים בזהב 18K", descriptionEn:"Three diamonds in 18K gold", price:11000, image:S6B(3), images:[S6B(3)], material:"זהב 18K", isNew:true },
  { id:"r64", category:"rings", nameHe:"טבעת פרינסס האלו", nameEn:"Princess Halo Ring", descriptionHe:"יהלום פרינסס עם האלו", descriptionEn:"Princess cut with diamond halo", price:14000, image:S6B(4), images:[S6B(4)], material:"זהב לבן 14K" },
  { id:"r65", category:"rings", nameHe:"טבעת כרית מרכז", nameEn:"Cushion Center Ring", descriptionHe:"יהלום כרית מרכזי אלגנטי", descriptionEn:"Elegant center cushion diamond", price:8800, image:S6B(5), images:[S6B(5)], material:"זהב ורד 14K" },
  { id:"r66", category:"rings", nameHe:"טבעת מרקיז יוקרה", nameEn:"Luxury Marquise Ring", descriptionHe:"מרקיז יהלום יוקרתי", descriptionEn:"Luxurious marquise diamond", price:17000, image:S6B(6), images:[S6B(6)], material:"זהב לבן 18K", isBestseller:true },
  { id:"r67", category:"rings", nameHe:"טבעת ביפס זהב", nameEn:"Gold Bypass Ring", descriptionHe:"ביפס יהלום על זהב", descriptionEn:"Diamond bypass ring in gold", price:6800, image:S6B(7), images:[S6B(7)], material:"זהב 14K" },
  { id:"r68", category:"rings", nameHe:"טבעת אמרלד אלגנט", nameEn:"Elegant Emerald Ring", descriptionHe:"אמרלד קאט על להקת זהב לבן", descriptionEn:"Emerald cut on white gold band", price:19500, image:S6B(8), images:[S6B(8)], material:"זהב לבן 14K" },
  { id:"r69", category:"rings", nameHe:"טבעת אובל פייב", nameEn:"Oval Pavé Ring", descriptionHe:"אובל יהלום עם כתפי פייב", descriptionEn:"Oval diamond with pavé shoulders", price:16000, image:S6B(9), images:[S6B(9)], material:"זהב ורד 18K", isNew:true },
  { id:"r70", category:"rings", nameHe:"טבעת יהלום כפול", nameEn:"Double Diamond Ring", descriptionHe:"שני יהלומים על להקת זהב", descriptionEn:"Two diamonds on gold band", price:8200, image:S6B(10), images:[S6B(10)], material:"זהב לבן 14K" },
  { id:"r71", category:"rings", nameHe:"טבעת פרח זהב", nameEn:"Gold Flower Ring", descriptionHe:"פרח יהלומים זהב קלאסי", descriptionEn:"Classic gold diamond flower", price:5800, image:SFG(1), images:[SFG(1)], material:"זהב 18K" },
  { id:"r72", category:"rings", nameHe:"טבעת פרפר יהלום", nameEn:"Butterfly Diamond Ring", descriptionHe:"פרפר יהלומים ייחודי", descriptionEn:"Unique butterfly diamond design", price:7200, image:SFG(2), images:[SFG(2)], material:"זהב לבן 14K", isNew:true },
  { id:"r73", category:"rings", nameHe:"טבעת עלה גפן", nameEn:"Vine Leaf Ring", descriptionHe:"להקת עלים וגפנים מפורטת", descriptionEn:"Detailed vine and leaf band", price:4500, image:SFG(3), images:[SFG(3)], material:"זהב ורד 14K" },
  { id:"r74", category:"rings", nameHe:"טבעת ארט נובו", nameEn:"Art Nouveau Ring", descriptionHe:"עיצוב ארט נובו אורגני", descriptionEn:"Organic Art Nouveau design", price:9800, image:SFG(4), images:[SFG(4)], material:"זהב 18K", isBestseller:true },
  { id:"r75", category:"rings", nameHe:"טבעת ורד זהב", nameEn:"Gold Rose Ring", descriptionHe:"ורד יהלומים על להקה", descriptionEn:"Diamond rose on band", price:6100, image:SFG(5), images:[SFG(5)], material:"זהב 14K" },
  { id:"r76", category:"rings", nameHe:"טבעת ענפים", nameEn:"Branch Ring", descriptionHe:"ענפים וצמחייה על טבעת", descriptionEn:"Branch and foliage ring", price:3900, image:SFG(6), images:[SFG(6)], material:"כסף 925" },
  { id:"r77", category:"rings", nameHe:"טבעת פרח יהלום", nameEn:"Diamond Flower Ring", descriptionHe:"פרח יהלומים גדול מרכזי", descriptionEn:"Large diamond flower centerpiece", price:11500, image:SFG(7), images:[SFG(7)], material:"זהב לבן 18K", isBestseller:true },
  { id:"r78", category:"rings", nameHe:"טבעת עלים יהלום", nameEn:"Diamond Leaf Ring", descriptionHe:"עלים יהלומים בסגנון אורגני", descriptionEn:"Organic diamond leaf ring", price:7800, image:SFG(8), images:[SFG(8)], material:"זהב ורד 14K", isNew:true },
  { id:"r79", category:"rings", nameHe:"טבעת צמח ספיר", nameEn:"Botanical Sapphire Ring", descriptionHe:"עיצוב בוטני עם ספיר", descriptionEn:"Botanical design with sapphire", price:8400, image:SFG(9), images:[SFG(9)], material:"זהב 14K" },
  { id:"r80", category:"rings", nameHe:"טבעת גן פרחים", nameEn:"Garden Flower Ring", descriptionHe:"גן פרחים יהלומים", descriptionEn:"Diamond flower garden ring", price:5300, image:SFG(10), images:[SFG(10)], material:"זהב לבן 14K" },
  { id:"r81", category:"rings", nameHe:"להקה דקה מינימל", nameEn:"Ultra Thin Band", descriptionHe:"להקה דקה וקלה", descriptionEn:"Ultra thin and light band", price:1800, image:SIU(1), images:[SIU(1)], material:"כסף 925" },
  { id:"r82", category:"rings", nameHe:"להקת נקודה", nameEn:"Dot Band Ring", descriptionHe:"נקודת יהלום על להקה", descriptionEn:"Single diamond dot on band", price:3200, image:SIU(2), images:[SIU(2)], material:"זהב 14K", isNew:true },
  { id:"r83", category:"rings", nameHe:"להקת קו", nameEn:"Line Band Ring", descriptionHe:"קו יהלומים על להקה", descriptionEn:"Diamond line on thin band", price:4500, image:SIU(3), images:[SIU(3)], material:"זהב לבן 14K" },
  { id:"r84", category:"rings", nameHe:"להקת גל", nameEn:"Wave Band Ring", descriptionHe:"גל יהלומים מינימליסטי", descriptionEn:"Minimalist diamond wave band", price:5200, image:SIU(4), images:[SIU(4)], material:"זהב ורד 14K" },
  { id:"r85", category:"rings", nameHe:"להקת עיגול", nameEn:"Circle Band Ring", descriptionHe:"עיגול יהלומים מעוצב", descriptionEn:"Designed diamond circle band", price:6800, image:SIU(5), images:[SIU(5)], material:"זהב לבן 14K", isBestseller:true },
  { id:"r86", category:"rings", nameHe:"להקה חלקה", nameEn:"Polished Band", descriptionHe:"להקה חלקה ומבריקה", descriptionEn:"Highly polished smooth band", price:2200, image:SIU(6), images:[SIU(6)], material:"זהב 18K" },
  { id:"r87", category:"rings", nameHe:"להקת קו דיאגונלי", nameEn:"Diagonal Line Band", descriptionHe:"פסים אלכסוניים מינימל", descriptionEn:"Diagonal minimal stripes", price:3600, image:SIU(7), images:[SIU(7)], material:"כסף 925" },
  { id:"r88", category:"rings", nameHe:"להקת נקודות", nameEn:"Dot Row Band", descriptionHe:"שורת נקודות יהלום", descriptionEn:"Row of diamond dots", price:5800, image:SIU(8), images:[SIU(8)], material:"זהב לבן 14K" },
  { id:"r89", category:"rings", nameHe:"להקה מינימל מודרני", nameEn:"Modern Minimal Band", descriptionHe:"מינימל מודרני חדשני", descriptionEn:"Modern minimalist innovation", price:2900, image:SIU(9), images:[SIU(9)], material:"זהב 14K", isNew:true },
  { id:"r90", category:"rings", nameHe:"להקת סימטריה", nameEn:"Symmetry Band", descriptionHe:"סימטריה מושלמת", descriptionEn:"Perfect symmetry band", price:4100, image:SIU(10), images:[SIU(10)], material:"זהב ורד 14K" },
  { id:"r91", category:"rings", nameHe:"טבעת סטייטמנט זהב", nameEn:"Gold Statement Ring", descriptionHe:"טבעת גדולה ומרשימה", descriptionEn:"Bold impressive gold ring", price:8900, image:SNA(1), images:[SNA(1)], material:"זהב 18K", isNew:true },
  { id:"r92", category:"rings", nameHe:"טבעת קוקטייל יהלום", nameEn:"Diamond Cocktail Ring", descriptionHe:"טבעת קוקטייל מפוארת", descriptionEn:"Glamorous diamond cocktail", price:14500, image:SNA(2), images:[SNA(2)], material:"זהב לבן 14K", isBestseller:true },
  { id:"r93", category:"rings", nameHe:"טבעת אוכף יהלומים", nameEn:"Saddle Diamond Ring", descriptionHe:"אוכף יהלומים מרשים", descriptionEn:"Impressive diamond saddle ring", price:11200, image:SNA(3), images:[SNA(3)], material:"זהב 18K" },
  { id:"r94", category:"rings", nameHe:"טבעת כיפה יהלום", nameEn:"Diamond Dome Ring", descriptionHe:"כיפה מלאה יהלומים", descriptionEn:"Full diamond dome ring", price:16000, image:SNA(4), images:[SNA(4)], material:"זהב לבן 18K", isBestseller:true },
  { id:"r95", category:"rings", nameHe:"טבעת בנד רחב יהלום", nameEn:"Wide Diamond Band", descriptionHe:"בנד רחב עם יהלומים", descriptionEn:"Wide band with diamonds", price:9800, image:SNA(5), images:[SNA(5)], material:"זהב 18K" },
  { id:"r96", category:"rings", nameHe:"טבעת קלאסטר גדול", nameEn:"Large Cluster Ring", descriptionHe:"קלאסטר יהלומים גדול", descriptionEn:"Large diamond cluster statement", price:13500, image:SNA(6), images:[SNA(6)], material:"זהב לבן 14K", isNew:true },
  { id:"r97", category:"rings", nameHe:"טבעת כרית קוקטייל", nameEn:"Cushion Cocktail Ring", descriptionHe:"כרית יהלום גדול ומרהיב", descriptionEn:"Large cushion cocktail diamond", price:17500, image:SNA(7), images:[SNA(7)], material:"זהב ורד 18K" },
  { id:"r98", category:"rings", nameHe:"טבעת ספיר גדול", nameEn:"Large Sapphire Ring", descriptionHe:"ספיר כחול גדול ויוקרתי", descriptionEn:"Large luxurious blue sapphire", price:12000, image:SNA(8), images:[SNA(8)], material:"זהב 18K", isNew:true },
  { id:"r99", category:"rings", nameHe:"טבעת פנינה דרמטית", nameEn:"Dramatic Pearl Ring", descriptionHe:"פנינה גדולה ומרשימה", descriptionEn:"Impressive large pearl ring", price:7200, image:SNA(9), images:[SNA(9)], material:"זהב 14K" },
  { id:"r100", category:"rings", nameHe:"טבעת ראנוויי", nameEn:"Runway Ring", descriptionHe:"עיצוב תצוגת שיא", descriptionEn:"Runway-inspired design", price:22000, image:SNA(10), images:[SNA(10)], material:"זהב לבן 18K", isBestseller:true },
  { id:"r101", category:"rings", nameHe:"טבעת לב ורד", nameEn:"Rose Gold Heart Ring", descriptionHe:"לב יהלום ורד זהב", descriptionEn:"Rose gold heart diamond ring", price:4200, image:SVO(1), images:[SVO(1)], material:"זהב ורד 14K", isNew:true },
  { id:"r102", category:"rings", nameHe:"טבעת ירח כוכב", nameEn:"Moon Star Ring", descriptionHe:"ירח וכוכב יהלומים", descriptionEn:"Moon and star diamond ring", price:5600, image:SVO(2), images:[SVO(2)], material:"כסף 925" },
  { id:"r103", category:"rings", nameHe:"טבעת ורד יהלום", nameEn:"Diamond Rose Ring", descriptionHe:"ורד יהלומים רומנטי", descriptionEn:"Romantic diamond rose", price:7800, image:SVO(3), images:[SVO(3)], material:"זהב ורד 18K", isBestseller:true },
  { id:"r104", category:"rings", nameHe:"טבעת פנינה ורד", nameEn:"Rose Pearl Ring", descriptionHe:"פנינה על זהב ורד", descriptionEn:"Pearl on rose gold", price:3400, image:SVO(4), images:[SVO(4)], material:"זהב ורד 14K" },
  { id:"r105", category:"rings", nameHe:"טבעת גבישים", nameEn:"Crystal Ring", descriptionHe:"גבישים צבעוניים יפים", descriptionEn:"Beautiful colored crystals", price:4800, image:SVO(5), images:[SVO(5)], material:"זהב 14K" },
  { id:"r106", category:"rings", nameHe:"טבעת אמרלד רומנטי", nameEn:"Romantic Emerald Ring", descriptionHe:"אמרלד ירוק אלגנטי", descriptionEn:"Elegant green emerald", price:8900, image:SVO(6), images:[SVO(6)], material:"זהב 18K", isNew:true },
  { id:"r107", category:"rings", nameHe:"טבעת לב פייב", nameEn:"Pavé Heart Ring", descriptionHe:"לב מלא פייב יהלומים", descriptionEn:"Full pavé heart ring", price:9200, image:SVO(7), images:[SVO(7)], material:"זהב לבן 14K", isBestseller:true },
  { id:"r108", category:"rings", nameHe:"טבעת פנינות יפן", nameEn:"Japanese Pearl Ring", descriptionHe:"פנינות יפן יוקרתיות", descriptionEn:"Luxurious Japanese pearls", price:6500, image:SVO(8), images:[SVO(8)], material:"זהב לבן 14K" },
  { id:"r109", category:"rings", nameHe:"טבעת אורנמנטלי ורד", nameEn:"Ornamental Rose Ring", descriptionHe:"קישוטי ורד יהלום", descriptionEn:"Ornamental rose diamonds", price:11000, image:SVO(9), images:[SVO(9)], material:"זהב ורד 18K", isNew:true },
  { id:"r110", category:"rings", nameHe:"טבעת אהבה נצחית", nameEn:"Eternal Love Ring", descriptionHe:"מסמל אהבה נצחית", descriptionEn:"Symbol of eternal love", price:5100, image:SVO(10), images:[SVO(10)], material:"זהב ורד 14K" },
  { id:"r111", category:"rings", nameHe:"טבעת רצועה מחורצת", nameEn:"Grooved Band Ring", descriptionHe:"חריצים עמוקים על להקה", descriptionEn:"Deep grooved band ring", price:3100, image:RFH(1), images:[RFH(1)], material:"זהב 14K" },
  { id:"r112", category:"rings", nameHe:"להקה חלקה זהב צהוב", nameEn:"Yellow Gold Smooth Band", descriptionHe:"זהב צהוב חלק ומבריק", descriptionEn:"Smooth shiny yellow gold", price:2800, image:RFH(2), images:[RFH(2)], material:"זהב 18K" },
  { id:"r113", category:"rings", nameHe:"להקה מבורשת כסף", nameEn:"Brushed Silver Band", descriptionHe:"כסף 925 מבורשת", descriptionEn:"925 silver brushed band", price:1600, image:RFH(3), images:[RFH(3)], material:"כסף 925" },
  { id:"r114", category:"rings", nameHe:"להקת נצח יהלומים", nameEn:"Eternity Diamond Band", descriptionHe:"שורת יהלומים עגולים", descriptionEn:"Round diamond eternity", price:12000, image:RFH(4), images:[RFH(4)], material:"זהב לבן 14K", isBestseller:true },
  { id:"r115", category:"rings", nameHe:"להקת V זהב", nameEn:"V-Shape Gold Band", descriptionHe:"V מחוטב בזהב", descriptionEn:"V-shaped gold carving", price:2500, image:RFH(5), images:[RFH(5)], material:"זהב 14K" },
  { id:"r116", category:"rings", nameHe:"להקת פייב כסף", nameEn:"Silver Pavé Band", descriptionHe:"יהלומים פייב על כסף", descriptionEn:"Pavé diamonds on silver", price:6800, image:RFH(6), images:[RFH(6)], material:"כסף 925", isNew:true },
  { id:"r117", category:"rings", nameHe:"להקה דו גוון", nameEn:"Two-Tone Band", descriptionHe:"שילוב זהב לבן וצהוב", descriptionEn:"White and yellow gold blend", price:4300, image:RFH(7), images:[RFH(7)], material:"זהב 14K" },
  { id:"r118", category:"rings", nameHe:"להקה שחורה רחבה", nameEn:"Black Wide Band", descriptionHe:"להקה שחורה בולטת", descriptionEn:"Bold black wide band", price:2700, image:RFH(8), images:[RFH(8)], material:"זהב שחור 14K" },
  { id:"r119", category:"rings", nameHe:"להקת באגט זהב", nameEn:"Baguette Gold Band", descriptionHe:"יהלומי באגט משובצים", descriptionEn:"Set baguette diamonds", price:7500, image:RFH(9), images:[RFH(9)], material:"זהב לבן 14K", isNew:true },
  { id:"r120", category:"rings", nameHe:"טבעת יהלום יחידה", nameEn:"Single Diamond Ring", descriptionHe:"יהלום בודד יוקרתי", descriptionEn:"Luxurious single diamond", price:5600, image:RFH(10), images:[RFH(10)], material:"זהב 18K" },
  { id:"r121", category:"rings", nameHe:"להקה מרובעת זהב", nameEn:"Square Gold Band", descriptionHe:"חתך מרובע מודרני", descriptionEn:"Modern square cross-section", price:3400, image:RGH(1), images:[RGH(1)], material:"זהב 14K" },
  { id:"r122", category:"rings", nameHe:"להקת קוביות יהלום", nameEn:"Diamond Cube Band", descriptionHe:"קוביות יהלום בלהקה", descriptionEn:"Diamond cube band design", price:8200, image:RGH(2), images:[RGH(2)], material:"זהב לבן 14K", isNew:true },
  { id:"r123", category:"rings", nameHe:"להקה משולשת", nameEn:"Triangular Band", descriptionHe:"חתך משולש אמנותי", descriptionEn:"Artistic triangular cut", price:2900, image:RGH(3), images:[RGH(3)], material:"כסף 925" },
  { id:"r124", category:"rings", nameHe:"להקה מסתחלת", nameEn:"Twisted Band", descriptionHe:"ספירלה כפולה זהב", descriptionEn:"Double spiral gold", price:5100, image:RGH(4), images:[RGH(4)], material:"זהב 18K" },
  { id:"r125", category:"rings", nameHe:"להקת קטע", nameEn:"Segment Band", descriptionHe:"קטעים בגוונים שונים", descriptionEn:"Multi-tone segment band", price:4600, image:RGH(5), images:[RGH(5)], material:"זהב 14K" },
  { id:"r126", category:"rings", nameHe:"להקה מחורצת עמוקה", nameEn:"Deep Grooved Band", descriptionHe:"חריצים עמוקים ומרשימים", descriptionEn:"Deep impressive grooves", price:3700, image:RGH(6), images:[RGH(6)], material:"זהב לבן 14K", isBestseller:true },
  { id:"r127", category:"rings", nameHe:"להקה בסגנון ספורטי", nameEn:"Sports Style Band", descriptionHe:"ספורטי ומודרני", descriptionEn:"Modern sporty style", price:2300, image:RGH(7), images:[RGH(7)], material:"כסף 925" },
  { id:"r128", category:"rings", nameHe:"להקה אלומינית", nameEn:"Architectural Band", descriptionHe:"גיאומטרי אדריכלי", descriptionEn:"Architectural geometric", price:4900, image:RGH(8), images:[RGH(8)], material:"זהב 14K" },
  { id:"r129", category:"rings", nameHe:"להקת זיג זג", nameEn:"Zigzag Band", descriptionHe:"זיג זג יהלומים", descriptionEn:"Diamond zigzag pattern", price:6700, image:RGH(9), images:[RGH(9)], material:"זהב לבן 14K", isNew:true },
  { id:"r130", category:"rings", nameHe:"להקה מחורצת מינימל", nameEn:"Minimal Grooved Band", descriptionHe:"חריצים עדינים ומינימל", descriptionEn:"Delicate minimal grooves", price:3100, image:RGH(10), images:[RGH(10)], material:"זהב 18K" },
  { id:"r131", category:"rings", nameHe:"טבעת וינטאג' פרחים", nameEn:"Vintage Flower Ring", descriptionHe:"פרחים בסגנון וינטאג'", descriptionEn:"Vintage floral design", price:6200, image:RHH(1), images:[RHH(1)], material:"זהב 14K" },
  { id:"r132", category:"rings", nameHe:"להקת חריטה עדינה", nameEn:"Fine Engraved Band", descriptionHe:"חריטה פיליגרנית", descriptionEn:"Filigree engraved band", price:4800, image:RHH(2), images:[RHH(2)], material:"כסף 925" },
  { id:"r133", category:"rings", nameHe:"טבעת ארט דקו", nameEn:"Art Deco Ring", descriptionHe:"סגנון ארט דקו קלאסי", descriptionEn:"Classic Art Deco style", price:9500, image:RHH(3), images:[RHH(3)], material:"זהב לבן 18K", isBestseller:true },
  { id:"r134", category:"rings", nameHe:"להקת מיליגריין", nameEn:"Milgrain Band", descriptionHe:"מיליגריין קלאסי", descriptionEn:"Classic milgrain detail", price:3600, image:RHH(4), images:[RHH(4)], material:"זהב 14K" },
  { id:"r135", category:"rings", nameHe:"טבעת אדוארדי", nameEn:"Edwardian Ring", descriptionHe:"סגנון אדוארדי אצילי", descriptionEn:"Noble Edwardian style", price:11000, image:RHH(5), images:[RHH(5)], material:"זהב לבן 14K", isNew:true },
  { id:"r136", category:"rings", nameHe:"להקת חריטת פרחים", nameEn:"Floral Engraved Band", descriptionHe:"פרחים חרוטים על להקה", descriptionEn:"Engraved flowers on band", price:4200, image:RHH(6), images:[RHH(6)], material:"זהב ורד 14K" },
  { id:"r137", category:"rings", nameHe:"טבעת וינטאג' ספיר", nameEn:"Vintage Sapphire Ring", descriptionHe:"ספיר וינטאג' קלאסי", descriptionEn:"Classic vintage sapphire", price:12500, image:RHH(7), images:[RHH(7)], material:"זהב 18K", isBestseller:true },
  { id:"r138", category:"rings", nameHe:"להקת ויקטוריאני", nameEn:"Victorian Band", descriptionHe:"סגנון ויקטוריאני", descriptionEn:"Victorian style band", price:5900, image:RHH(8), images:[RHH(8)], material:"זהב 14K" },
  { id:"r139", category:"rings", nameHe:"טבעת בלה אפוק", nameEn:"Belle Époque Ring", descriptionHe:"יופי תקופת האפוק", descriptionEn:"Belle Époque beauty", price:8800, image:RHH(9), images:[RHH(9)], material:"זהב לבן 14K" },
  { id:"r140", category:"rings", nameHe:"להקת פיליגרן", nameEn:"Filigree Band", descriptionHe:"עבודת פיליגרן עדינה", descriptionEn:"Delicate filigree work", price:7100, image:RHH(10), images:[RHH(10)], material:"כסף 925", isNew:true },
  { id:"r141", category:"rings", nameHe:"טבעת קלאסטר פרח", nameEn:"Flower Cluster Ring", descriptionHe:"קלאסטר פרח יהלומים", descriptionEn:"Diamond flower cluster", price:9200, image:RIH(1), images:[RIH(1)], material:"זהב לבן 14K", isBestseller:true },
  { id:"r142", category:"rings", nameHe:"טבעת קלאסטר עגול", nameEn:"Round Cluster Ring", descriptionHe:"קלאסטר יהלומים עגולים", descriptionEn:"Round diamond cluster", price:7800, image:RIH(2), images:[RIH(2)], material:"זהב 14K", isNew:true },
  { id:"r143", category:"rings", nameHe:"טבעת קלאסטר אובל", nameEn:"Oval Cluster Ring", descriptionHe:"קלאסטר אובל יהלומים", descriptionEn:"Oval diamond cluster", price:8500, image:RIH(3), images:[RIH(3)], material:"זהב לבן 18K" },
  { id:"r144", category:"rings", nameHe:"טבעת קלאסטר לב", nameEn:"Heart Cluster Ring", descriptionHe:"קלאסטר לב יהלומים", descriptionEn:"Heart-shaped diamond cluster", price:6900, image:RIH(4), images:[RIH(4)], material:"זהב ורד 14K" },
  { id:"r145", category:"rings", nameHe:"טבעת קלאסטר כרית", nameEn:"Cushion Cluster Ring", descriptionHe:"קלאסטר כרית יהלומים", descriptionEn:"Cushion cut cluster", price:10500, image:RIH(5), images:[RIH(5)], material:"זהב לבן 14K", isBestseller:true },
  { id:"r146", category:"rings", nameHe:"טבעת קלאסטר כוכב", nameEn:"Star Cluster Ring", descriptionHe:"קלאסטר כוכב יהלומים", descriptionEn:"Star-shaped diamond cluster", price:7200, image:RIH(6), images:[RIH(6)], material:"זהב 18K" },
  { id:"r147", category:"rings", nameHe:"טבעת קלאסטר מרקיז", nameEn:"Marquise Cluster Ring", descriptionHe:"קלאסטר מרקיז", descriptionEn:"Marquise diamond cluster", price:11000, image:RIH(7), images:[RIH(7)], material:"זהב לבן 18K", isNew:true },
  { id:"r148", category:"rings", nameHe:"טבעת קלאסטר מרובע", nameEn:"Square Cluster Ring", descriptionHe:"קלאסטר מרובע מרשים", descriptionEn:"Square diamond cluster", price:8900, image:RIH(8), images:[RIH(8)], material:"זהב 14K" },
  { id:"r149", category:"rings", nameHe:"טבעת קלאסטר אנטיק", nameEn:"Antique Cluster Ring", descriptionHe:"קלאסטר בסגנון אנטיק", descriptionEn:"Antique style cluster", price:13500, image:RIH(9), images:[RIH(9)], material:"זהב לבן 14K" },
  { id:"r150", category:"rings", nameHe:"טבעת קלאסטר ספיר", nameEn:"Sapphire Cluster Ring", descriptionHe:"ספיר וקלאסטר יהלומים", descriptionEn:"Sapphire and diamond cluster", price:14200, image:RIH(10), images:[RIH(10)], material:"זהב 18K", isBestseller:true },
  { id:"r151", category:"rings", nameHe:"להקה מסולסלת זהב", nameEn:"Twisted Gold Band", descriptionHe:"סלסול זהב יוקרתי", descriptionEn:"Luxury gold twist", price:4100, image:RJH(1), images:[RJH(1)], material:"זהב 18K" },
  { id:"r152", category:"rings", nameHe:"להקת חבל כסף", nameEn:"Rope Silver Band", descriptionHe:"חבל כסף קלאסי", descriptionEn:"Classic silver rope band", price:2800, image:RJH(2), images:[RJH(2)], material:"כסף 925" },
  { id:"r153", category:"rings", nameHe:"להקה מסולסלת ורד", nameEn:"Twisted Rose Gold", descriptionHe:"סלסול זהב ורד", descriptionEn:"Rose gold twist band", price:3600, image:RJH(3), images:[RJH(3)], material:"זהב ורד 14K" },
  { id:"r154", category:"rings", nameHe:"להקת חבל זהב לבן", nameEn:"White Gold Rope Band", descriptionHe:"חבל זהב לבן אלגנטי", descriptionEn:"Elegant white gold rope", price:3200, image:RJH(4), images:[RJH(4)], material:"זהב לבן 14K", isNew:true },
  { id:"r155", category:"rings", nameHe:"להקת שתי ורד לבן", nameEn:"Two-Strand Rope Ring", descriptionHe:"שתי ורד לבן ביחד", descriptionEn:"Two intertwined strands", price:4800, image:RJH(5), images:[RJH(5)], material:"זהב 14K" },
  { id:"r156", category:"rings", nameHe:"להקת חבל יהלומים", nameEn:"Diamond Rope Band", descriptionHe:"חבל עם יהלומים", descriptionEn:"Rope band with diamonds", price:8900, image:RJH(6), images:[RJH(6)], material:"זהב לבן 14K", isBestseller:true },
  { id:"r157", category:"rings", nameHe:"להקה מעוגלת טוויסט", nameEn:"Rounded Twist Band", descriptionHe:"עיגול וסלסול ביחד", descriptionEn:"Round and twist combined", price:3400, image:RJH(7), images:[RJH(7)], material:"זהב 18K" },
  { id:"r158", category:"rings", nameHe:"להקת ספירלה כפולה", nameEn:"Double Spiral Band", descriptionHe:"ספירלה כפולה זהב ורד", descriptionEn:"Double rose gold spiral", price:5200, image:RJH(8), images:[RJH(8)], material:"זהב ורד 14K", isNew:true },
  { id:"r159", category:"rings", nameHe:"להקת גדילים", nameEn:"Braided Band", descriptionHe:"גדילים זהב אמנותי", descriptionEn:"Artistic gold braid", price:4700, image:RJH(9), images:[RJH(9)], material:"זהב 14K" },
  { id:"r160", category:"rings", nameHe:"להקת קלועה יהלום", nameEn:"Woven Diamond Band", descriptionHe:"כלייה עם יהלומים", descriptionEn:"Woven pattern with diamonds", price:7600, image:RJH(10), images:[RJH(10)], material:"זהב לבן 18K" },
  { id:"r161", category:"rings", nameHe:"טבעת אינסוף", nameEn:"Infinity Ring", descriptionHe:"סמל אינסוף יהלומים", descriptionEn:"Infinity symbol in diamonds", price:5900, image:RKH(1), images:[RKH(1)], material:"זהב לבן 14K", isNew:true },
  { id:"r162", category:"rings", nameHe:"טבעת שמש", nameEn:"Sun Ring", descriptionHe:"שמש יהלומים זהב", descriptionEn:"Sun design in diamonds", price:6400, image:RKH(2), images:[RKH(2)], material:"זהב 14K" },
  { id:"r163", category:"rings", nameHe:"טבעת ירח", nameEn:"Moon Ring", descriptionHe:"ירח כסף יהלומים", descriptionEn:"Moon design silver diamonds", price:4200, image:RKH(3), images:[RKH(3)], material:"כסף 925" },
  { id:"r164", category:"rings", nameHe:"טבעת כוכב", nameEn:"Star Ring", descriptionHe:"כוכב יהלומים נוצץ", descriptionEn:"Sparkling diamond star", price:5100, image:RKH(4), images:[RKH(4)], material:"זהב 14K" },
  { id:"r165", category:"rings", nameHe:"טבעת לב", nameEn:"Heart Ring", descriptionHe:"לב יהלומים קלאסי", descriptionEn:"Classic diamond heart", price:4800, image:RKH(5), images:[RKH(5)], material:"זהב ורד 14K" },
  { id:"r166", category:"rings", nameHe:"טבעת נחש", nameEn:"Snake Ring", descriptionHe:"נחש יהלומים ספירלה", descriptionEn:"Diamond snake spiral", price:7200, image:RKH(6), images:[RKH(6)], material:"זהב לבן 14K", isBestseller:true },
  { id:"r167", category:"rings", nameHe:"טבעת צלב", nameEn:"Cross Ring", descriptionHe:"צלב יהלומים", descriptionEn:"Diamond cross ring", price:5600, image:RKH(7), images:[RKH(7)], material:"זהב לבן 14K" },
  { id:"r168", category:"rings", nameHe:"טבעת עוגן", nameEn:"Anchor Ring", descriptionHe:"עוגן ימי בסגנון", descriptionEn:"Nautical anchor style", price:3800, image:RKH(8), images:[RKH(8)], material:"כסף 925" },
  { id:"r169", category:"rings", nameHe:"טבעת מפתח", nameEn:"Key Ring", descriptionHe:"מפתח יהלומים מיוחד", descriptionEn:"Unique diamond key", price:6100, image:RKH(9), images:[RKH(9)], material:"זהב 14K", isNew:true },
  { id:"r170", category:"rings", nameHe:"טבעת ציפור", nameEn:"Bird Ring", descriptionHe:"ציפור עדינה בזהב", descriptionEn:"Delicate bird in gold", price:4500, image:RKH(10), images:[RKH(10)], material:"זהב 18K" },

  /* ══════ NEW EARRINGS — Local Product Shots ══════ */
  { id:"e26", category:"earrings", nameHe:"עגיל חישוק זהב", nameEn:"Gold Hoop Earrings", descriptionHe:"חישוק זהב 14K קלאסי", descriptionEn:"Classic 14K gold hoop", price:2400, image:EAp(1), images:[EAp(1),P(20943476)], material:"זהב 14K" },
  { id:"e27", category:"earrings", nameHe:"עגיל חישוק כסף", nameEn:"Silver Hoop Earrings", descriptionHe:"חישוק כסף 925 עדין", descriptionEn:"Delicate 925 silver hoop", price:1200, image:EAp(2), images:[EAp(2),P(20943476)], material:"כסף 925" },
  { id:"e28", category:"earrings", nameHe:"עגיל פנינה סטאד", nameEn:"Pearl Stud Earrings", descriptionHe:"פנינה על בסיס זהב", descriptionEn:"Pearl on gold base", price:3200, image:EAp(3), images:[EAp(3),P(20943476)], material:"זהב 14K", isNew:true },
  { id:"e29", category:"earrings", nameHe:"עגיל כוכב תלוי", nameEn:"Star Drop Earrings", descriptionHe:"כוכב מנצנץ בתלייה", descriptionEn:"Sparkling star drop", price:4100, image:EAp(4), images:[EAp(4),P(20943476)], material:"זהב ורד 14K" },
  { id:"e30", category:"earrings", nameHe:"עגיל פרח קטן", nameEn:"Flower Stud Earrings", descriptionHe:"פרח יהלומים מינימל", descriptionEn:"Minimal diamond flower", price:2800, image:EAp(5), images:[EAp(5),P(20943476)], material:"זהב 14K" },
  { id:"e31", category:"earrings", nameHe:"עגיל חוטי שרשרת", nameEn:"Chain Threader Earrings", descriptionHe:"חוטי שרשרת זהב עדין", descriptionEn:"Delicate gold chain threader", price:1900, image:EAp(6), images:[EAp(6),P(20943476)], material:"זהב 14K" },
  { id:"e32", category:"earrings", nameHe:"עגיל קריסטל קלאסטר", nameEn:"Crystal Cluster Earrings", descriptionHe:"קלאסטר קריסטל", descriptionEn:"Crystal cluster stud", price:5200, image:EAp(7), images:[EAp(7),P(20943476)], material:"זהב לבן 14K", isBestseller:true },
  { id:"e33", category:"earrings", nameHe:"עגיל עלה ורד זהב", nameEn:"Rose Gold Leaf Earrings", descriptionHe:"עלה בזהב ורד", descriptionEn:"Rose gold leaf design", price:3600, image:EAp(8), images:[EAp(8),P(20943476)], material:"זהב ורד 14K", isNew:true },
  { id:"e34", category:"earrings", nameHe:"עגיל אמטיסט תלייה", nameEn:"Amethyst Drop Earrings", descriptionHe:"אמטיסט בתלייה ורד", descriptionEn:"Amethyst in rose gold drop", price:4800, image:EAp(9), images:[EAp(9),P(20943476)], material:"זהב ורד 14K" },
  { id:"e35", category:"earrings", nameHe:"עגיל אבן כחולה", nameEn:"Blue Stone Stud Earrings", descriptionHe:"אבן כחולה יפה", descriptionEn:"Beautiful blue stone stud", price:2200, image:EAp(10), images:[EAp(10),P(20943476)], material:"זהב 14K" },
  { id:"e36", category:"earrings", nameHe:"עגיל יהלום סטאד", nameEn:"Diamond Stud Earrings", descriptionHe:"יהלום קלאסי עגול", descriptionEn:"Classic round diamond stud", price:8500, image:EBp(1), images:[EBp(1),P(5370642)], material:"זהב לבן 18K", isBestseller:true },
  { id:"e37", category:"earrings", nameHe:"עגיל פייב חישוק", nameEn:"Pavé Hoop Earrings", descriptionHe:"חישוק זהב עם פייב", descriptionEn:"Gold hoop with pavé diamonds", price:7200, image:EBp(2), images:[EBp(2),P(5370642)], material:"זהב 14K", isNew:true },
  { id:"e38", category:"earrings", nameHe:"עגיל ורד מרקיז", nameEn:"Rose Gold Marquise Drop", descriptionHe:"מרקיז ורד זהב תלייה", descriptionEn:"Rose gold marquise drop", price:6100, image:EBp(3), images:[EBp(3),P(5370642)], material:"זהב ורד 14K" },
  { id:"e39", category:"earrings", nameHe:"עגיל קרולר", nameEn:"Ear Crawler Earrings", descriptionHe:"קרולר מדפי אוזן", descriptionEn:"Ear climbing crawler", price:4800, image:EBp(4), images:[EBp(4),P(5370642)], material:"זהב לבן 14K", isNew:true },
  { id:"e40", category:"earrings", nameHe:"עגיל קלייבר צלב", nameEn:"Cross Climber Earrings", descriptionHe:"קלייבר צלב לאורך האוזן", descriptionEn:"Cross shaped ear climber", price:5300, image:EBp(5), images:[EBp(5),P(5370642)], material:"זהב 14K" },
  { id:"e41", category:"earrings", nameHe:"עגיל פנינה האלו", nameEn:"Pearl Halo Stud", descriptionHe:"פנינה עם האלו יהלומים", descriptionEn:"Pearl with diamond halo", price:5900, image:EBp(6), images:[EBp(6),P(5370642)], material:"זהב לבן 14K", isBestseller:true },
  { id:"e42", category:"earrings", nameHe:"עגיל חישוק שורה כפולה", nameEn:"Double Row Hoop", descriptionHe:"חישוק שתי שורות יהלום", descriptionEn:"Double row diamond hoop", price:9800, image:EBp(7), images:[EBp(7),P(5370642)], material:"זהב 14K" },
  { id:"e43", category:"earrings", nameHe:"עגיל כוכב זהב", nameEn:"Gold Star Stud", descriptionHe:"כוכב זהב מינימל", descriptionEn:"Minimal gold star stud", price:1800, image:EBp(8), images:[EBp(8),P(5370642)], material:"זהב 14K" },
  { id:"e44", category:"earrings", nameHe:"עגיל פרח ורד", nameEn:"Rose Gold Flower Stud", descriptionHe:"פרח ורד זהב יפה", descriptionEn:"Beautiful rose gold flower", price:3100, image:EBp(9), images:[EBp(9),P(5370642)], material:"זהב ורד 14K", isNew:true },
  { id:"e45", category:"earrings", nameHe:"עגיל שרשרת כסף", nameEn:"Silver Chain Drop", descriptionHe:"שרשרת כסף בתלייה", descriptionEn:"Silver chain drop earring", price:2600, image:EBp(10), images:[EBp(10),P(5370642)], material:"כסף 925" },
  { id:"e46", category:"earrings", nameHe:"עגיל האלו יהלום", nameEn:"Diamond Halo Stud", descriptionHe:"האלו יהלומים מרשים", descriptionEn:"Impressive diamond halo", price:12000, image:ECp(1), images:[ECp(1),P(10475794)], material:"זהב לבן 18K", isBestseller:true },
  { id:"e47", category:"earrings", nameHe:"עגיל חישוק חרוט", nameEn:"Engraved Gold Hoop", descriptionHe:"חישוק זהב עם חריטה", descriptionEn:"Engraved gold hoop", price:3200, image:ECp(2), images:[ECp(2),P(10475794)], material:"זהב 14K" },
  { id:"e48", category:"earrings", nameHe:"עגיל פנינה תלייה", nameEn:"Pearl Drop Earrings", descriptionHe:"פנינה בתלייה עדינה", descriptionEn:"Delicate pearl drop", price:4800, image:ECp(3), images:[ECp(3),P(10475794)], material:"זהב לבן 14K", isNew:true },
  { id:"e49", category:"earrings", nameHe:"עגיל עלה קלייבר", nameEn:"Leaf Climber Earrings", descriptionHe:"עלה מטפס לאורך האוזן", descriptionEn:"Leaf climbing up the ear", price:6200, image:ECp(4), images:[ECp(4),P(10475794)], material:"זהב ורד 14K" },
  { id:"e50", category:"earrings", nameHe:"עגיל כוכב קלאסטר", nameEn:"Star Cluster Stud", descriptionHe:"קלאסטר כוכב יהלומים", descriptionEn:"Star shaped diamond cluster", price:8900, image:ECp(5), images:[ECp(5),P(10475794)], material:"זהב 18K", isBestseller:true },
  { id:"e51", category:"earrings", nameHe:"עגיל פנינה מרובע", nameEn:"Square Pearl Halo", descriptionHe:"מרובע ורד זהב פנינה", descriptionEn:"Square rose gold pearl halo", price:7100, image:ECp(6), images:[ECp(6),P(10475794)], material:"זהב ורד 14K" },
  { id:"e52", category:"earrings", nameHe:"עגיל פייב חישוק כסף", nameEn:"Silver Pavé Hoop", descriptionHe:"חישוק כסף עם פייב", descriptionEn:"Silver hoop with pavé", price:5400, image:ECp(7), images:[ECp(7),P(10475794)], material:"כסף 925", isNew:true },
  { id:"e53", category:"earrings", nameHe:"עגיל פרח זהב", nameEn:"Gold Flower Stud", descriptionHe:"פרח זהב מרשים", descriptionEn:"Impressive gold flower", price:2900, image:ECp(8), images:[ECp(8),P(10475794)], material:"זהב 14K" },
  { id:"e54", category:"earrings", nameHe:"עגיל יהלום פייר", nameEn:"Pear Diamond Drop", descriptionHe:"פייר יהלום בתלייה", descriptionEn:"Pear diamond in drop setting", price:11500, image:ECp(9), images:[ECp(9),P(10475794)], material:"זהב לבן 18K", isBestseller:true },
  { id:"e55", category:"earrings", nameHe:"עגיל ספירלה ורד", nameEn:"Rose Gold Spiral", descriptionHe:"ספירלה ורד זהב קלייבר", descriptionEn:"Rose gold spiral climber", price:5700, image:ECp(10), images:[ECp(10),P(10475794)], material:"זהב ורד 14K", isNew:true },

  /* ══════ NEW BRACELETS — Product Shots with Body Examples ══════ */
  { id:"b26", category:"bracelets", nameHe:"צמיד שרשרת יהלום", nameEn:"Gold Diamond Chain", descriptionHe:"שרשרת זהב עם יהלום", descriptionEn:"Gold chain with diamond", price:7800, image:ND(1,1), images:[ND(1,1),w(0)], material:"זהב 14K", isBestseller:true },
  { id:"b27", category:"bracelets", nameHe:"צמיד טניס כסף", nameEn:"Silver Tennis Bracelet", descriptionHe:"טניס כסף קלאסי", descriptionEn:"Classic silver tennis", price:11000, image:ND(1,2), images:[ND(1,2),w(1)], material:"כסף 925", isNew:true },
  { id:"b28", category:"bracelets", nameHe:"צמיד ורד אבן", nameEn:"Rose Gold Stone Chain", descriptionHe:"ורד זהב עם אבן", descriptionEn:"Rose gold with stone", price:6500, image:ND(1,3), images:[ND(1,3),w(2)], material:"זהב ורד 14K" },
  { id:"b29", category:"bracelets", nameHe:"צמיד בנגל אינסוף", nameEn:"Infinity Bangle", descriptionHe:"בנגל אינסוף זהב", descriptionEn:"Gold infinity bangle", price:4200, image:ND(1,4), images:[ND(1,4),w(3)], material:"זהב 14K" },
  { id:"b30", category:"bracelets", nameHe:"צמיד קאף יהלומים", nameEn:"Open Diamond Cuff", descriptionHe:"קאף פתוח יהלומים", descriptionEn:"Open cuff with diamonds", price:9800, image:ND(1,5), images:[ND(1,5),w(4)], material:"זהב לבן 14K", isBestseller:true },
  { id:"b31", category:"bracelets", nameHe:"צמיד כחול שרשרת", nameEn:"Blue Lapis Silver Chain", descriptionHe:"שרשרת כסף לפיס כחול", descriptionEn:"Silver lapis chain", price:5200, image:ND(1,6), images:[ND(1,6),w(5)], material:"כסף 925" },
  { id:"b32", category:"bracelets", nameHe:"צמיד חרוזים כסף", nameEn:"Silver Beaded Bracelet", descriptionHe:"חרוזים כסף עגולים", descriptionEn:"Round silver beads", price:2800, image:ND(1,7), images:[ND(1,7),w(6)], material:"כסף 925" },
  { id:"b33", category:"bracelets", nameHe:"צמיד ספיר זהב", nameEn:"Gold Sapphire Chain", descriptionHe:"שרשרת זהב עם ספיר", descriptionEn:"Gold chain with sapphire", price:7200, image:ND(1,8), images:[ND(1,8),w(7)], material:"זהב 14K", isNew:true },
  { id:"b34", category:"bracelets", nameHe:"צמיד יהלום קטן", nameEn:"Small Diamond Chain", descriptionHe:"שרשרת יהלום עדין", descriptionEn:"Delicate diamond chain", price:5900, image:ND(1,9), images:[ND(1,9),w(8)], material:"זהב לבן 14K" },
  { id:"b35", category:"bracelets", nameHe:"צמיד קאף רובי", nameEn:"Gold Ruby Cuff", descriptionHe:"קאף זהב עם רובי", descriptionEn:"Gold cuff with rubies", price:12000, image:ND(1,10), images:[ND(1,10),w(9)], material:"זהב 18K", isBestseller:true },
  { id:"b36", category:"bracelets", nameHe:"צמיד כדורים זהב", nameEn:"Gold Ball Chain", descriptionHe:"שרשרת כדורים זהב", descriptionEn:"Gold ball chain", price:3400, image:ND(1,11), images:[ND(1,11),w(10)], material:"זהב 14K" },
  { id:"b37", category:"bracelets", nameHe:"צמיד פנינה ורד", nameEn:"Rose Gold Pearl Chain", descriptionHe:"ורד זהב עם פנינה", descriptionEn:"Rose gold with pearl", price:6100, image:ND(1,12), images:[ND(1,12),w(11)], material:"זהב ורד 14K" },
  { id:"b38", category:"bracelets", nameHe:"צמיד חישוק זהב", nameEn:"Gold Ring Bracelet", descriptionHe:"חישוק זהב יוקרתי", descriptionEn:"Luxurious gold ring bracelet", price:4800, image:ND(2,1), images:[ND(2,1),w(12)], material:"זהב 14K" },
  { id:"b39", category:"bracelets", nameHe:"צמיד נחש זהב", nameEn:"Gold Snake Bracelet", descriptionHe:"נחש זהב סלנטי", descriptionEn:"Slithering gold snake", price:6200, image:ND(2,2), images:[ND(2,2),w(13)], material:"זהב 18K", isNew:true },
  { id:"b40", category:"bracelets", nameHe:"צמיד שורה כפולה", nameEn:"Double Row Bracelet", descriptionHe:"שתי שורות יהלום", descriptionEn:"Two rows of diamonds", price:8500, image:ND(2,3), images:[ND(2,3),w(14)], material:"זהב לבן 14K", isBestseller:true },
  { id:"b41", category:"bracelets", nameHe:"צמיד קוביות", nameEn:"Cube Chain Bracelet", descriptionHe:"קוביות זהב בשרשרת", descriptionEn:"Gold cubes in chain", price:3900, image:ND(2,4), images:[ND(2,4),w(15)], material:"זהב 14K" },
  { id:"b42", category:"bracelets", nameHe:"צמיד ספירלה", nameEn:"Spiral Chain", descriptionHe:"ספירלה עדינה", descriptionEn:"Delicate spiral chain", price:5400, image:ND(2,5), images:[ND(2,5),w(16)], material:"כסף 925" },
  { id:"b43", category:"bracelets", nameHe:"צמיד ורד עדין", nameEn:"Delicate Rose Bracelet", descriptionHe:"ורד עדין זהב", descriptionEn:"Delicate gold rose", price:3200, image:ND(2,6), images:[ND(2,6),w(17)], material:"זהב ורד 14K" },
  { id:"b44", category:"bracelets", nameHe:"צמיד פנינות זהב", nameEn:"Pearl Gold Bracelet", descriptionHe:"פנינות על שרשרת זהב", descriptionEn:"Pearls on gold chain", price:7200, image:ND(2,7), images:[ND(2,7),w(18)], material:"זהב 14K" },
  { id:"b45", category:"bracelets", nameHe:"צמיד אינסוף כסף", nameEn:"Silver Infinity Bracelet", descriptionHe:"אינסוף כסף 925", descriptionEn:"925 silver infinity", price:3600, image:ND(2,8), images:[ND(2,8),w(19)], material:"כסף 925" },
  { id:"b46", category:"bracelets", nameHe:"צמיד פרפר ורד", nameEn:"Rose Butterfly Bracelet", descriptionHe:"פרפר ורד זהב", descriptionEn:"Rose gold butterfly", price:5100, image:ND(2,9), images:[ND(2,9),w(20)], material:"זהב ורד 14K", isNew:true },
  { id:"b47", category:"bracelets", nameHe:"צמיד חרוז שרשרת", nameEn:"Bead Chain Bracelet", descriptionHe:"חרוזים קטנים בשרשרת", descriptionEn:"Small beads on chain", price:2600, image:ND(2,10), images:[ND(2,10),w(21)], material:"כסף 925" },
  { id:"b48", category:"bracelets", nameHe:"צמיד לב זהב", nameEn:"Gold Heart Bracelet", descriptionHe:"לב זהב יוקרתי", descriptionEn:"Luxurious gold heart", price:4500, image:ND(2,11), images:[ND(2,11),w(22)], material:"זהב 14K" },
  { id:"b49", category:"bracelets", nameHe:"צמיד מסלול כסף", nameEn:"Silver Track Bracelet", descriptionHe:"מסלול כסף מיוחד", descriptionEn:"Unique silver track", price:3100, image:ND(2,12), images:[ND(2,12),w(23)], material:"כסף 925" },
  { id:"b50", category:"bracelets", nameHe:"צמיד טניס יהלום", nameEn:"Diamond Tennis Bracelet", descriptionHe:"טניס יהלומים מסביב", descriptionEn:"Full diamond tennis", price:18000, image:ND(3,1), images:[ND(3,1),w(24)], material:"זהב לבן 18K", isBestseller:true },
  { id:"b51", category:"bracelets", nameHe:"צמיד בנגל משחזר", nameEn:"Gemstone Bangle", descriptionHe:"בנגל עם אבן חן", descriptionEn:"Bangle with gemstone", price:5600, image:ND(3,2), images:[ND(3,2),w(25)], material:"זהב 14K" },
  { id:"b52", category:"bracelets", nameHe:"צמיד לינק זהב", nameEn:"Gold Link Bracelet", descriptionHe:"לינקים זהב מאוחדים", descriptionEn:"United gold links", price:4300, image:ND(3,3), images:[ND(3,3),w(26)], material:"זהב 14K", isNew:true },
  { id:"b53", category:"bracelets", nameHe:"צמיד טניס ורד", nameEn:"Rose Gold Tennis", descriptionHe:"טניס ורד זהב", descriptionEn:"Rose gold tennis", price:14000, image:ND(3,4), images:[ND(3,4),w(27)], material:"זהב ורד 18K" },
  { id:"b54", category:"bracelets", nameHe:"צמיד זכוכית כסף", nameEn:"Silver Glass Bracelet", descriptionHe:"כדורי זכוכית כסף", descriptionEn:"Silver glass beads", price:2900, image:ND(3,5), images:[ND(3,5),w(28)], material:"כסף 925" },
  { id:"b55", category:"bracelets", nameHe:"צמיד קרנבל", nameEn:"Carnival Bracelet", descriptionHe:"קרנבל צבעוני", descriptionEn:"Colorful carnival bracelet", price:6800, image:ND(3,6), images:[ND(3,6),w(29)], material:"זהב 14K" },
  { id:"b56", category:"bracelets", nameHe:"צמיד בנגל עצם", nameEn:"Bone Bangle", descriptionHe:"בנגל צורת עצם", descriptionEn:"Bone-shaped bangle", price:3700, image:ND(3,7), images:[ND(3,7),w(30)], material:"כסף 925" },
  { id:"b57", category:"bracelets", nameHe:"צמיד קאף פרח", nameEn:"Flower Cuff", descriptionHe:"קאף פרח עדין", descriptionEn:"Delicate flower cuff", price:5500, image:ND(3,8), images:[ND(3,8),w(31)], material:"זהב ורד 14K" },
  { id:"b58", category:"bracelets", nameHe:"צמיד מרקיז", nameEn:"Marquise Bracelet", descriptionHe:"מרקיז יהלומים", descriptionEn:"Marquise diamond chain", price:9200, image:ND(3,9), images:[ND(3,9),w(32)], material:"זהב לבן 14K", isBestseller:true },
  { id:"b59", category:"bracelets", nameHe:"צמיד חרוזים אמטיסט", nameEn:"Amethyst Bead Bracelet", descriptionHe:"אמטיסט ופנינות", descriptionEn:"Amethyst and pearls", price:4100, image:ND(3,10), images:[ND(3,10),w(33)], material:"זהב 14K" },
  { id:"b60", category:"bracelets", nameHe:"צמיד ספיר כחול", nameEn:"Blue Sapphire Bracelet", descriptionHe:"ספיר כחול בשרשרת", descriptionEn:"Blue sapphire chain", price:8800, image:ND(3,11), images:[ND(3,11),w(34)], material:"זהב 18K", isNew:true },
  { id:"b61", category:"bracelets", nameHe:"צמיד לוקה", nameEn:"Luca Bracelet", descriptionHe:"סגנון איטלקי מקורי", descriptionEn:"Original Italian style", price:3300, image:ND(3,12), images:[ND(3,12),w(35)], material:"כסף 925" },
  { id:"b62", category:"bracelets", nameHe:"צמיד שרשרת כסף", nameEn:"Silver Chain Bracelet", descriptionHe:"שרשרת כסף קלאסית", descriptionEn:"Classic silver chain", price:2200, image:ND(4,1), images:[ND(4,1),w(36)], material:"כסף 925" },
  { id:"b63", category:"bracelets", nameHe:"צמיד פנינה שחורה", nameEn:"Black Pearl Bracelet", descriptionHe:"פנינה שחורה דרמטי", descriptionEn:"Dramatic black pearl", price:6900, image:ND(4,2), images:[ND(4,2),w(37)], material:"זהב לבן 14K" },
  { id:"b64", category:"bracelets", nameHe:"צמיד כרית קטן", nameEn:"Cushion Station Bracelet", descriptionHe:"כריות קטנות בשרשרת", descriptionEn:"Small cushion stations", price:7400, image:ND(4,3), images:[ND(4,3),w(38)], material:"זהב לבן 14K", isNew:true },
  { id:"b65", category:"bracelets", nameHe:"צמיד צלב", nameEn:"Cross Bracelet", descriptionHe:"צלב זהב בשרשרת", descriptionEn:"Cross on gold chain", price:3800, image:ND(4,4), images:[ND(4,4),w(39)], material:"זהב 14K" },
  { id:"b66", category:"bracelets", nameHe:"צמיד אבני מורגן", nameEn:"Morganite Bracelet", descriptionHe:"מורגנייט ורוד עדין", descriptionEn:"Delicate pink morganite", price:8200, image:ND(4,5), images:[ND(4,5),w(40)], material:"זהב ורד 14K", isBestseller:true },
  { id:"b67", category:"bracelets", nameHe:"צמיד עיגולים", nameEn:"Circle Chain", descriptionHe:"עיגולי זהב בשרשרת", descriptionEn:"Gold circles in chain", price:4600, image:ND(4,6), images:[ND(4,6),w(41)], material:"זהב 14K" },
  { id:"b68", category:"bracelets", nameHe:"צמיד ורד לבן", nameEn:"White Rose Bracelet", descriptionHe:"ורד לבן אלגנטי", descriptionEn:"Elegant white rose", price:3100, image:ND(4,7), images:[ND(4,7),w(42)], material:"כסף 925" },
  { id:"b69", category:"bracelets", nameHe:"צמיד ירוק", nameEn:"Emerald Bracelet", descriptionHe:"אמרלד ירוק בשרשרת", descriptionEn:"Emerald in chain", price:9500, image:ND(4,8), images:[ND(4,8),w(43)], material:"זהב 18K", isBestseller:true },
  { id:"b70", category:"bracelets", nameHe:"צמיד שרשרת כפולה", nameEn:"Double Chain Bracelet", descriptionHe:"שתי שרשראות ביחד", descriptionEn:"Two chains together", price:3600, image:ND(4,9), images:[ND(4,9),w(44)], material:"זהב 14K", isNew:true },
  { id:"b71", category:"bracelets", nameHe:"צמיד בנגל חריטה", nameEn:"Engraved Bangle", descriptionHe:"בנגל עם חריטה", descriptionEn:"Engraved bangle", price:4900, image:ND(4,10), images:[ND(4,10),w(45)], material:"כסף 925" },
  { id:"b72", category:"bracelets", nameHe:"צמיד רובי אדום", nameEn:"Red Ruby Bracelet", descriptionHe:"רובי אדום יוקרתי", descriptionEn:"Luxurious red ruby", price:11500, image:ND(4,11), images:[ND(4,11),w(46)], material:"זהב 18K" },
  { id:"b73", category:"bracelets", nameHe:"צמיד בנגל נקי", nameEn:"Clean Bangle", descriptionHe:"בנגל נקי ומינימל", descriptionEn:"Clean minimal bangle", price:2700, image:ND(4,12), images:[ND(4,12),w(47)], material:"כסף 925" },
  { id:"b74", category:"bracelets", nameHe:"צמיד שרשרת זהב", nameEn:"Gold Link Chain", descriptionHe:"שרשרת לינק זהב", descriptionEn:"Gold link chain", price:5100, image:ND(5,1), images:[ND(5,1),w(48)], material:"זהב 14K" },
  { id:"b75", category:"bracelets", nameHe:"צמיד שחור קאף", nameEn:"Black Cuff Bracelet", descriptionHe:"קאף שחור מרשים", descriptionEn:"Impressive black cuff", price:6300, image:ND(5,2), images:[ND(5,2),w(49)], material:"זהב שחור 14K" },
  { id:"b76", category:"bracelets", nameHe:"צמיד פייב מלאה", nameEn:"Full Pavé Bracelet", descriptionHe:"פייב מלאה יהלומים", descriptionEn:"Full pavé diamonds", price:15000, image:ND(5,3), images:[ND(5,3),w(50)], material:"זהב לבן 18K", isBestseller:true },
  { id:"b77", category:"bracelets", nameHe:"צמיד לב פנינה", nameEn:"Pearl Heart Bracelet", descriptionHe:"לב פנינה ורוד", descriptionEn:"Pink pearl heart", price:3900, image:ND(5,4), images:[ND(5,4),w(51)], material:"זהב ורד 14K" },
  { id:"b78", category:"bracelets", nameHe:"צמיד ישיר", nameEn:"Straight Bar Bracelet", descriptionHe:"בר ישיר זהב", descriptionEn:"Straight gold bar", price:4400, image:ND(5,5), images:[ND(5,5),w(52)], material:"זהב 14K", isNew:true },
  { id:"b79", category:"bracelets", nameHe:"צמיד פנינות קטנות", nameEn:"Small Pearl Bracelet", descriptionHe:"פנינות קטנות", descriptionEn:"Small pearl bracelet", price:3200, image:ND(5,6), images:[ND(5,6),w(53)], material:"כסף 925" },
  { id:"b80", category:"bracelets", nameHe:"צמיד שורת כוכבים", nameEn:"Star Row Bracelet", descriptionHe:"שורת כוכבים זהב", descriptionEn:"Gold star row", price:4700, image:ND(5,7), images:[ND(5,7),w(54)], material:"זהב 14K" },
  { id:"b81", category:"bracelets", nameHe:"צמיד עלה", nameEn:"Leaf Bracelet", descriptionHe:"עלים זהב ורד", descriptionEn:"Rose gold leaves", price:5800, image:ND(5,8), images:[ND(5,8),w(55)], material:"זהב ורד 14K" },
  { id:"b82", category:"bracelets", nameHe:"צמיד חוטי פלך", nameEn:"Spinner Bracelet", descriptionHe:"חוטי זהב מסתחל", descriptionEn:"Spinning gold wire", price:3500, image:ND(5,9), images:[ND(5,9),w(56)], material:"זהב 14K" },
  { id:"b83", category:"bracelets", nameHe:"צמיד טניס מרובע", nameEn:"Square Tennis", descriptionHe:"מרובעים בטניס", descriptionEn:"Square tennis bracelet", price:13000, image:ND(5,10), images:[ND(5,10),w(57)], material:"זהב לבן 14K", isBestseller:true },
  { id:"b84", category:"bracelets", nameHe:"צמיד קשרים", nameEn:"Knot Bracelet", descriptionHe:"קשרים זהב ורד", descriptionEn:"Rose gold knot", price:6600, image:ND(5,11), images:[ND(5,11),w(58)], material:"זהב ורד 14K", isNew:true },
  { id:"b85", category:"bracelets", nameHe:"צמיד בנגל רחב", nameEn:"Wide Bangle", descriptionHe:"בנגל רחב ומרשים", descriptionEn:"Wide impressive bangle", price:7500, image:ND(5,12), images:[ND(5,12),w(59)], material:"כסף 925" },
  { id:"b86", category:"bracelets", nameHe:"צמיד אינסוף זהב", nameEn:"Gold Infinity Bracelet", descriptionHe:"אינסוף זהב 14K", descriptionEn:"14K gold infinity", price:4900, image:ND(6,1), images:[ND(6,1),w(60)], material:"זהב 14K" },
  { id:"b87", category:"bracelets", nameHe:"צמיד זירקוניה", nameEn:"Zirconia Bracelet", descriptionHe:"זירקוניה יוקרתי", descriptionEn:"Luxurious zirconia", price:6200, image:ND(6,2), images:[ND(6,2),w(61)], material:"זהב לבן 14K" },
  { id:"b88", category:"bracelets", nameHe:"צמיד חישוק פייב", nameEn:"Pavé Hoop Bracelet", descriptionHe:"חישוק פייב יהלומים", descriptionEn:"Pavé diamond hoop", price:9400, image:ND(6,3), images:[ND(6,3),w(62)], material:"זהב לבן 14K", isBestseller:true },
  { id:"b89", category:"bracelets", nameHe:"צמיד לחרוז", nameEn:"Charm Bracelet", descriptionHe:"צ'ארם יפה", descriptionEn:"Beautiful charm bracelet", price:5700, image:ND(6,4), images:[ND(6,4),w(63)], material:"כסף 925", isNew:true },
  { id:"b90", category:"bracelets", nameHe:"צמיד מסוגנן", nameEn:"Stylish Bracelet", descriptionHe:"מסוגנן ואופנתי", descriptionEn:"Stylish and fashionable", price:3800, image:ND(6,5), images:[ND(6,5),w(64)], material:"זהב 14K" },
  { id:"b91", category:"bracelets", nameHe:"צמיד חישוק כסף", nameEn:"Silver Hoop Bracelet", descriptionHe:"חישוק כסף יוקרתי", descriptionEn:"Luxurious silver hoop", price:4100, image:ND(6,6), images:[ND(6,6),w(65)], material:"כסף 925" },
  { id:"b92", category:"bracelets", nameHe:"צמיד ורד זהב", nameEn:"Rose Gold Bracelet", descriptionHe:"זהב ורד עדין", descriptionEn:"Delicate rose gold", price:5300, image:ND(6,7), images:[ND(6,7),w(66)], material:"זהב ורד 14K" },
  { id:"b93", category:"bracelets", nameHe:"צמיד יהלום שורה", nameEn:"Diamond Row Bracelet", descriptionHe:"שורת יהלומים", descriptionEn:"Row of diamonds", price:11200, image:ND(6,8), images:[ND(6,8),w(67)], material:"זהב לבן 18K" },
  { id:"b94", category:"bracelets", nameHe:"צמיד פרל שרשרת", nameEn:"Pearl Chain Bracelet", descriptionHe:"פנינות בשרשרת", descriptionEn:"Pearls in chain", price:4600, image:ND(6,9), images:[ND(6,9),w(68)], material:"זהב 14K" },
  { id:"b95", category:"bracelets", nameHe:"צמיד בנגל קפסולה", nameEn:"Capsule Bangle", descriptionHe:"בנגל צורת קפסולה", descriptionEn:"Capsule shaped bangle", price:3300, image:ND(6,10), images:[ND(6,10),w(69)], material:"כסף 925" },
  { id:"b96", category:"bracelets", nameHe:"צמיד מנייאת", nameEn:"Manayat Bracelet", descriptionHe:"מסורתי מודרני", descriptionEn:"Traditional modern", price:5900, image:ND(6,11), images:[ND(6,11),w(70)], material:"זהב 14K" },
  { id:"b97", category:"bracelets", nameHe:"צמיד כלה", nameEn:"Bridal Bracelet", descriptionHe:"לכלה יוקרתי", descriptionEn:"Luxurious bridal", price:16000, image:ND(6,12), images:[ND(6,12),w(71)], material:"זהב לבן 18K", isBestseller:true },
  { id:"b98", category:"bracelets", nameHe:"צמיד זהב מרשים", nameEn:"Impressive Gold Bracelet", descriptionHe:"זהב 18K מרשים", descriptionEn:"Impressive 18K gold", price:8200, image:ND(7,1), images:[ND(7,1),w(72)], material:"זהב 18K", isBestseller:true },
  { id:"b99", category:"bracelets", nameHe:"צמיד שמש", nameEn:"Sun Bracelet", descriptionHe:"שמש זהב בשרשרת", descriptionEn:"Gold sun in chain", price:4700, image:ND(7,2), images:[ND(7,2),w(73)], material:"זהב 14K", isNew:true },
  { id:"b100", category:"bracelets", nameHe:"צמיד ירח", nameEn:"Moon Bracelet", descriptionHe:"ירח כסף בשרשרת", descriptionEn:"Silver moon in chain", price:3200, image:ND(7,3), images:[ND(7,3),w(74)], material:"כסף 925" },
  { id:"b101", category:"bracelets", nameHe:"צמיד כוכב", nameEn:"Star Bracelet", descriptionHe:"כוכב בשרשרת", descriptionEn:"Star in chain", price:3800, image:ND(7,4), images:[ND(7,4),w(75)], material:"זהב 14K" },
  { id:"b102", category:"bracelets", nameHe:"צמיד פרפר", nameEn:"Butterfly Bracelet", descriptionHe:"פרפר יהלומים", descriptionEn:"Diamond butterfly", price:7100, image:ND(7,5), images:[ND(7,5),w(76)], material:"זהב לבן 14K" },
  { id:"b103", category:"bracelets", nameHe:"צמיד ציפור", nameEn:"Bird Bracelet", descriptionHe:"ציפור עפה זהב", descriptionEn:"Flying gold bird", price:4200, image:ND(7,6), images:[ND(7,6),w(77)], material:"זהב 14K" },
  { id:"b104", category:"bracelets", nameHe:"צמיד פרפר ורד", nameEn:"Rose Butterfly", descriptionHe:"פרפר ורד זהב", descriptionEn:"Rose gold butterfly", price:5500, image:ND(7,7), images:[ND(7,7),w(78)], material:"זהב ורד 14K" },
  { id:"b105", category:"bracelets", nameHe:"צמיד דג", nameEn:"Fish Bracelet", descriptionHe:"דג יהלום", descriptionEn:"Diamond fish bracelet", price:6800, image:ND(7,8), images:[ND(7,8),w(79)], material:"זהב לבן 14K" },
  { id:"b106", category:"bracelets", nameHe:"צמיד ביצת פנינה", nameEn:"Pearl Egg Bracelet", descriptionHe:"ביצת פנינה עגולה", descriptionEn:"Round pearl egg", price:3600, image:ND(7,9), images:[ND(7,9),w(80)], material:"כסף 925" },
  { id:"b107", category:"bracelets", nameHe:"צמיד שמש ירח", nameEn:"Sun Moon Bracelet", descriptionHe:"שמש וירח ביחד", descriptionEn:"Sun and moon combined", price:5100, image:ND(7,10), images:[ND(7,10),w(81)], material:"זהב 14K", isNew:true },
  { id:"b108", category:"bracelets", nameHe:"צמיד תמר", nameEn:"Palm Bracelet", descriptionHe:"תמר זהב ורד", descriptionEn:"Rose gold palm", price:4400, image:ND(7,11), images:[ND(7,11),w(82)], material:"זהב ורד 14K" },
  { id:"b109", category:"bracelets", nameHe:"צמיד חי", nameEn:"Chai Bracelet", descriptionHe:"חי יהלומים", descriptionEn:"Diamond chai bracelet", price:6300, image:ND(7,12), images:[ND(7,12),w(83)], material:"זהב לבן 14K" },
  { id:"b110", category:"bracelets", nameHe:"צמיד זהב 18K", nameEn:"18K Gold Bracelet", descriptionHe:"זהב 18K קלאסי", descriptionEn:"Classic 18K gold", price:9500, image:ND(8,1), images:[ND(8,1),w(84)], material:"זהב 18K", isBestseller:true },
  { id:"b111", category:"bracelets", nameHe:"צמיד ספיר לבן", nameEn:"White Sapphire Bracelet", descriptionHe:"ספיר לבן מבריק", descriptionEn:"Brilliant white sapphire", price:8700, image:ND(8,2), images:[ND(8,2),w(85)], material:"זהב לבן 14K" },
  { id:"b112", category:"bracelets", nameHe:"צמיד כסף מדרגות", nameEn:"Graduated Silver", descriptionHe:"מדרגות כסף", descriptionEn:"Graduated silver steps", price:3400, image:ND(8,3), images:[ND(8,3),w(86)], material:"כסף 925" },
  { id:"b113", category:"bracelets", nameHe:"צמיד קאף ורד", nameEn:"Rose Gold Cuff", descriptionHe:"קאף ורד זהב", descriptionEn:"Rose gold cuff", price:5800, image:ND(8,4), images:[ND(8,4),w(87)], material:"זהב ורד 14K", isNew:true },
  { id:"b114", category:"bracelets", nameHe:"צמיד בנגל גדול", nameEn:"Large Bangle", descriptionHe:"בנגל גדול ומרשים", descriptionEn:"Large impressive bangle", price:6100, image:ND(8,5), images:[ND(8,5),w(88)], material:"זהב 14K" },
  { id:"b115", category:"bracelets", nameHe:"צמיד נישואין", nameEn:"Wedding Bracelet", descriptionHe:"לחגיגה מיוחדת", descriptionEn:"For special celebration", price:12500, image:ND(8,6), images:[ND(8,6),w(89)], material:"זהב לבן 18K" },
  { id:"b116", category:"bracelets", nameHe:"צמיד פייב שחור", nameEn:"Black Pavé Bracelet", descriptionHe:"פייב שחור מרשים", descriptionEn:"Impressive black pavé", price:7800, image:ND(8,7), images:[ND(8,7),w(90)], material:"זהב שחור 14K" },
  { id:"b117", category:"bracelets", nameHe:"צמיד שורת עיגולים", nameEn:"Circle Row Bracelet", descriptionHe:"עיגולים בשורה", descriptionEn:"Row of circles", price:3900, image:ND(8,8), images:[ND(8,8),w(91)], material:"זהב 14K" },
  { id:"b118", category:"bracelets", nameHe:"צמיד קרול", nameEn:"Carol Bracelet", descriptionHe:"עיצוב מיוחד", descriptionEn:"Special design", price:4300, image:ND(8,9), images:[ND(8,9),w(92)], material:"כסף 925" },
  { id:"b119", category:"bracelets", nameHe:"צמיד טניס ורד גדול", nameEn:"Large Rose Tennis", descriptionHe:"טניס ורד גדול", descriptionEn:"Large rose tennis", price:16500, image:ND(8,10), images:[ND(8,10),w(93)], material:"זהב ורד 18K", isBestseller:true },
  { id:"b120", category:"bracelets", nameHe:"צמיד מפתח", nameEn:"Key Bracelet", descriptionHe:"מפתח בשרשרת", descriptionEn:"Key on chain", price:2900, image:ND(8,11), images:[ND(8,11),w(94)], material:"כסף 925" },
  { id:"b121", category:"bracelets", nameHe:"צמיד מרכזי", nameEn:"Statement Bracelet", descriptionHe:"סטייטמנט מרכזי", descriptionEn:"Central statement", price:10200, image:ND(8,12), images:[ND(8,12),w(95)], material:"זהב 18K", isNew:true },

];

export const categories = [
  { id: "all",       labelHe: "הכל",      labelEn: "All" },
  { id: "rings",     labelHe: "טבעות",    labelEn: "Rings" },
  { id: "necklaces", labelHe: "שרשראות",  labelEn: "Necklaces" },
  { id: "bracelets", labelHe: "צמידים",   labelEn: "Bracelets" },
  { id: "earrings",  labelHe: "עגילים",   labelEn: "Earrings" },
];

const MATERIAL_EN_MAP: Record<string, string> = {
  "זהב 14K": "14K Gold",
  "זהב 18K": "18K Gold",
  "כסף 925": "925 Silver",
  "זהב לבן 14K": "14K White Gold",
  "זהב ורד 14K": "14K Rose Gold",
  "זהב לבן 18K": "18K White Gold",
  "זהב ורד 18K": "18K Rose Gold",
  "זהב שחור 14K": "14K Black Gold",
  "קרמיקה/זהב ורד": "Ceramic/Rose Gold",
};

export function getMaterialEn(matHe: string): string {
  return MATERIAL_EN_MAP[matHe] ?? matHe;
}
