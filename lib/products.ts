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
  { id:"n1",  category:"necklaces", nameHe:"שרשרת ביזל זהב ורד",      nameEn:"Rose Gold Bezel Necklace",      descriptionHe:"שרשרת זהב ורד 14K עם יהלום בביזל עגול",       descriptionEn:"14K rose gold necklace with round bezel diamond",   price:4800,  image:"/necklaces/j2ox_neck_01.png", images:["/necklaces/j2ox_neck_01.png"], material:"זהב ורד 14K", isBestseller:true },
  { id:"n2",  category:"necklaces", nameHe:"שרשרת בר כסף",            nameEn:"Silver Bar Necklace",           descriptionHe:"שרשרת כסף 925 עם תליון בר מינימליסטי",        descriptionEn:"925 silver minimalist bar pendant necklace",        price:1800,  image:"/necklaces/j2ox_neck_02.png", images:["/necklaces/j2ox_neck_02.png"], material:"כסף 925" },
  { id:"n3",  category:"necklaces", nameHe:"שרשרת אות ראשונית זהב",   nameEn:"Gold Initial Necklace",         descriptionHe:"שרשרת זהב 18K עם תליון אות ראשונית",          descriptionEn:"18K gold necklace with initial letter pendant",     price:3200,  image:"/necklaces/j2ox_neck_03.png", images:["/necklaces/j2ox_neck_03.png"], material:"זהב 18K", isNew:true },
  { id:"n4",  category:"necklaces", nameHe:"שרשרת אינפיניטי כסף",     nameEn:"Silver Infinity Necklace",      descriptionHe:"שרשרת כסף עם תליון אינפיניטי עדין",           descriptionEn:"Silver necklace with delicate infinity pendant",    price:2200,  image:"/necklaces/j2ox_neck_04.png", images:["/necklaces/j2ox_neck_04.png"], material:"כסף 925" },
  { id:"n5",  category:"necklaces", nameHe:"שרשרת ספיר כחול זהב",     nameEn:"Blue Sapphire Gold Necklace",   descriptionHe:"שרשרת זהב 14K עם אבן ספיר כחולה",            descriptionEn:"14K gold necklace with blue sapphire stone",        price:5600,  image:"/necklaces/j2ox_neck_05.png", images:["/necklaces/j2ox_neck_05.png"], material:"זהב 14K", isNew:true },
  { id:"n6",  category:"necklaces", nameHe:"שרשרת ירח זהב ורד",       nameEn:"Rose Gold Moon Necklace",       descriptionHe:"שרשרת זהב ורד עם תליון ירח סהר",              descriptionEn:"Rose gold crescent moon pendant necklace",          price:3400,  image:"/necklaces/j2ox_neck_06.png", images:["/necklaces/j2ox_neck_06.png"], material:"זהב ורד 14K" },
  { id:"n7",  category:"necklaces", nameHe:"שרשרת סמל זהב",           nameEn:"Gold Symbol Necklace",          descriptionHe:"שרשרת זהב 18K עם תליון סמל מיוחד",           descriptionEn:"18K gold necklace with symbol pendant",             price:2900,  image:"/necklaces/j2ox_neck_07.png", images:["/necklaces/j2ox_neck_07.png"], material:"זהב 18K" },
  { id:"n8",  category:"necklaces", nameHe:"שרשרת לב פתוח זהב",       nameEn:"Open Heart Gold Necklace",      descriptionHe:"שרשרת זהב 14K עם תליון לב פתוח",             descriptionEn:"14K gold open heart pendant necklace",              price:3100,  image:"/necklaces/j2ox_neck_08.png", images:["/necklaces/j2ox_neck_08.png"], material:"זהב 14K", isBestseller:true },
  { id:"n9",  category:"necklaces", nameHe:"שרשרת מפתח כסף",          nameEn:"Silver Key Necklace",           descriptionHe:"שרשרת כסף 925 עם תליון מפתח וינטאג'",         descriptionEn:"925 silver vintage key pendant necklace",           price:2400,  image:"/necklaces/j2ox_neck_09.png", images:["/necklaces/j2ox_neck_09.png"], material:"כסף 925" },

  { id:"n11", category:"necklaces", nameHe:"שרשרת יהלום סוליטר",      nameEn:"Solitaire Diamond Necklace",    descriptionHe:"שרשרת זהב לבן עם יהלום סוליטר עדין",         descriptionEn:"White gold delicate solitaire diamond necklace",    price:6800,  image:"/necklaces/pe7k_neck_01.png", images:["/necklaces/pe7k_neck_01.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"n12", category:"necklaces", nameHe:"שרשרת תחנות יהלום",       nameEn:"Diamond Station Necklace",      descriptionHe:"שרשרת כסף עם שתי תחנות יהלום",               descriptionEn:"Silver necklace with two diamond stations",         price:5400,  image:"/necklaces/pe7k_neck_02.png", images:["/necklaces/pe7k_neck_02.png"], material:"כסף 925" },
  { id:"n13", category:"necklaces", nameHe:"שרשרת פייר יהלום",        nameEn:"Pear Diamond Necklace",         descriptionHe:"שרשרת כסף עם תליון יהלום בצורת טיפה",        descriptionEn:"Silver necklace with pear shaped diamond pendant",  price:8200,  image:"/necklaces/pe7k_neck_03.png", images:["/necklaces/pe7k_neck_03.png"], material:"זהב לבן 14K", isNew:true },
  { id:"n14", category:"necklaces", nameHe:"שרשרת בר יהלומים",        nameEn:"Diamond Bar Necklace",          descriptionHe:"שרשרת כסף עם בר יהלומים אופקי",             descriptionEn:"Silver horizontal diamond bar necklace",            price:7600,  image:"/necklaces/pe7k_neck_04.png", images:["/necklaces/pe7k_neck_04.png"], material:"זהב לבן 14K" },
  { id:"n15", category:"necklaces", nameHe:"שרשרת פרח יהלומים",       nameEn:"Diamond Flower Necklace",       descriptionHe:"שרשרת כסף עם תליון פרח יהלומים",             descriptionEn:"Silver necklace with diamond flower cluster",       price:6500,  image:"/necklaces/pe7k_neck_05.png", images:["/necklaces/pe7k_neck_05.png"], material:"זהב לבן 14K" },
  { id:"n16", category:"necklaces", nameHe:"שרשרת טניס יהלומים",      nameEn:"Diamond Tennis Necklace",       descriptionHe:"שרשרת טניס זהב לבן עם שורת יהלומים",        descriptionEn:"White gold full diamond tennis necklace",           price:22000, image:"/necklaces/pe7k_neck_06.png", images:["/necklaces/pe7k_neck_06.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"n17", category:"necklaces", nameHe:"שרשרת כוכב יהלום",        nameEn:"Diamond Star Necklace",         descriptionHe:"שרשרת כסף עם תליון כוכב יהלומים",           descriptionEn:"Silver necklace with diamond star pendant",         price:4700,  image:"/necklaces/pe7k_neck_07.png", images:["/necklaces/pe7k_neck_07.png"], material:"כסף 925", isNew:true },
  { id:"n18", category:"necklaces", nameHe:"שרשרת מולטי תחנות",       nameEn:"Multi Station Diamond Necklace",descriptionHe:"שרשרת כסף עם תחנות יהלום מרובות",            descriptionEn:"Silver multi station diamond necklace",             price:9800,  image:"/necklaces/pe7k_neck_08.png", images:["/necklaces/pe7k_neck_08.png"], material:"כסף 925" },
  { id:"n19", category:"necklaces", nameHe:"שרשרת האלו עגול זהב",     nameEn:"Gold Halo Circle Necklace",     descriptionHe:"שרשרת זהב צהוב עם תליון האלו עגול יהלומים", descriptionEn:"Yellow gold round halo diamond pendant necklace",   price:11500, image:"/necklaces/pe7k_neck_09.png", images:["/necklaces/pe7k_neck_09.png"], material:"זהב 18K" },

  { id:"n21", category:"necklaces", nameHe:"שרשרת יהלום עגול זהב",    nameEn:"Round Diamond Gold Necklace",   descriptionHe:"שרשרת זהב צהוב עם יהלום עגול בביזל",        descriptionEn:"Yellow gold necklace with round bezel diamond",     price:5200,  image:"/necklaces/tjhq_neck_01.png", images:["/necklaces/tjhq_neck_01.png"], material:"זהב 14K" },
  { id:"n22", category:"necklaces", nameHe:"שרשרת פרינסס זהב",        nameEn:"Princess Diamond Necklace",     descriptionHe:"שרשרת זהב 18K עם יהלום פרינסס מרובע",       descriptionEn:"18K gold necklace with princess cut diamond",       price:7800,  image:"/necklaces/tjhq_neck_02.png", images:["/necklaces/tjhq_neck_02.png"], material:"זהב 18K", isNew:true },
  { id:"n23", category:"necklaces", nameHe:"שרשרת פייר זהב לבן",      nameEn:"White Gold Pear Necklace",      descriptionHe:"שרשרת זהב לבן עם תליון פייר",               descriptionEn:"White gold pear diamond pendant necklace",          price:8900,  image:"/necklaces/tjhq_neck_03.png", images:["/necklaces/tjhq_neck_03.png"], material:"זהב לבן 18K" },
  { id:"n24", category:"necklaces", nameHe:"שרשרת כרית זהב ורד",      nameEn:"Rose Gold Cushion Necklace",    descriptionHe:"שרשרת זהב ורד עם יהלום כרית",               descriptionEn:"Rose gold cushion diamond pendant necklace",        price:9200,  image:"/necklaces/tjhq_neck_04.png", images:["/necklaces/tjhq_neck_04.png"], material:"זהב ורד 18K" },
  { id:"n25", category:"necklaces", nameHe:"שרשרת סוליטר זהב לבן",    nameEn:"White Gold Solitaire Necklace", descriptionHe:"שרשרת זהב לבן 14K עם יהלום עגול קלאסי",     descriptionEn:"Classic 14K white gold round solitaire necklace",   price:6100,  image:"/necklaces/tjhq_neck_05.png", images:["/necklaces/tjhq_neck_05.png"], material:"זהב לבן 14K", isBestseller:true },
  { id:"n26", category:"necklaces", nameHe:"שרשרת אובל זהב",          nameEn:"Oval Diamond Gold Necklace",    descriptionHe:"שרשרת זהב צהוב עם יהלום אובל בביזל",        descriptionEn:"Yellow gold oval bezel diamond necklace",           price:7400,  image:"/necklaces/tjhq_neck_06.png", images:["/necklaces/tjhq_neck_06.png"], material:"זהב 18K" },
  { id:"n27", category:"necklaces", nameHe:"שרשרת מרקיז יהלום",       nameEn:"Marquise Diamond Necklace",     descriptionHe:"שרשרת כסף עם תליון מרקיז יהלום אלגנטי",     descriptionEn:"Silver necklace with elegant marquise diamond",     price:8500,  image:"/necklaces/tjhq_neck_07.png", images:["/necklaces/tjhq_neck_07.png"], material:"זהב לבן 14K", isNew:true },
  { id:"n28", category:"necklaces", nameHe:"שרשרת לב יהלום",          nameEn:"Heart Diamond Necklace",        descriptionHe:"שרשרת כסף עם תליון לב יהלום מרהיב",         descriptionEn:"Silver necklace with heart shaped diamond pendant",  price:6800,  image:"/necklaces/tjhq_neck_08.png", images:["/necklaces/tjhq_neck_08.png"], material:"זהב לבן 14K" },
  { id:"n29", category:"necklaces", nameHe:"שרשרת אמרלד קאט זהב",     nameEn:"Emerald Cut Gold Necklace",     descriptionHe:"שרשרת זהב 18K עם יהלום אמרלד קאט",          descriptionEn:"18K gold emerald cut diamond pendant necklace",     price:10500, image:"/necklaces/tjhq_neck_09.png", images:["/necklaces/tjhq_neck_09.png"], material:"זהב 18K", isBestseller:true },

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
];

export const categories = [
  { id: "all",       labelHe: "הכל" },
  { id: "rings",     labelHe: "טבעות" },
  { id: "necklaces", labelHe: "שרשראות" },
  { id: "bracelets", labelHe: "צמידים" },
  { id: "earrings",  labelHe: "עגילים" },
];
