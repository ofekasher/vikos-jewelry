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

// ── שרשראות — verified white-background product shots ────────────────────────
const UN = [
  P(13204122), // diamond necklace, white bg
  P(14111392), // gold chain necklace, white bg
  P(12194387), // gold necklace on white platform
  P(16109185), // silver & gold pendant, white bg
  P(19869445), // gold necklace on stand, white bg
  P(27535671), // jewelry on white geometric stand
  U("photo-1515562141207-7a88fb7ce338"), // necklace, white
  U("photo-1576022162559-ebc60cd8b6dd"), // gold necklace, white
  U("photo-1599643478518-a784e5dc4c8f"), // pendant necklace, white
];
const n = (i: number) => UN[i % UN.length];

// ── צמידים — verified white-background product shots ──────────────────────────
const UB = [
  P(12194302), // gold bracelet, white surface
  P(12194303), // gold mesh bracelet, white bg
  P(12194310), // sleek gold bracelet, white geometric
  P(12194331), // gold & diamond bracelet, white bg
  P(12194338), // gold bracelet close-up, white bg
  P(15491661), // gold bracelet with onyx, white reflective
  P(3641056),  // rose gold bracelet, white
  U("photo-1723361656145-b481be3f9e05"), // gold diamond bangles stacked, white
];
const b = (i: number) => UB[i % UB.length];

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

export const products: Product[] = [
  /* ══════ RINGS ══════ */
  { id:"r1",  category:"rings", nameHe:"טבעת סוליטר זהב לבן",      nameEn:"White Gold Solitaire",         descriptionHe:"טבעת זהב לבן 18K עם יהלום עגול קלאסי",      descriptionEn:"Classic 18K white gold round solitaire",        price:8500,  image:RA(1),  images:[RA(1),  "/rings/RA_hand_01.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"r2",  category:"rings", nameHe:"טבעת סוליטר זהב צהוב",     nameEn:"Yellow Gold Solitaire",        descriptionHe:"טבעת זהב צהוב 18K עם יהלום עגול",           descriptionEn:"18K yellow gold round diamond solitaire",       price:7800,  image:RA(2),  images:[RA(2),  "/rings/RA_hand_02.png"], material:"זהב 18K" },
  { id:"r3",  category:"rings", nameHe:"טבעת האלו זהב לבן",        nameEn:"White Gold Halo Ring",         descriptionHe:"טבעת זהב לבן עם האלו יהלומים סביב האבן",    descriptionEn:"White gold halo diamond ring",                  price:12000, image:RA(3),  images:[RA(3),  "/rings/RA_hand_03.png"], material:"זהב לבן 14K", isNew:true },
  { id:"r4",  category:"rings", nameHe:"טבעת אמרלד קאט",           nameEn:"Emerald Cut Diamond Ring",     descriptionHe:"טבעת יהלום אמרלד קאט על להקת זהב עדינה",    descriptionEn:"Elegant emerald cut diamond on slim band",       price:15000, image:RA(4),  images:[RA(4),  "/rings/RA_hand_04.png"], material:"זהב לבן 18K" },
  { id:"r5",  category:"rings", nameHe:"טבעת באגט וצד",            nameEn:"Baguette Side Stone Ring",     descriptionHe:"יהלום עגול עם אבני באגט בצדדים",            descriptionEn:"Round diamond flanked by baguette stones",       price:11500, image:RA(5),  images:[RA(5),  "/rings/RA_hand_05.png"], material:"זהב לבן 14K", isBestseller:true },
  { id:"r6",  category:"rings", nameHe:"טבעת פייר זהב ורד",        nameEn:"Rose Gold Pear Pavé Ring",     descriptionHe:"יהלום בצורת טיפה על להקת פייב זהב ורד",     descriptionEn:"Pear diamond on rose gold pavé band",            price:14500, image:RA(6),  images:[RA(6),  "/rings/RA_hand_06.png"], material:"זהב ורד 14K", isNew:true },
  { id:"r8",  category:"rings", nameHe:"טבעת מרקיז יהלום",         nameEn:"Marquise Diamond Ring",        descriptionHe:"יהלום מרקיז אלגנטי על להקת זהב לבן",       descriptionEn:"Elegant marquise diamond on white gold band",    price:16000, image:RA(8),  images:[RA(8),  "/rings/RA_hand_07.png"], material:"זהב לבן 14K" },
  { id:"r9",  category:"rings", nameHe:"טבעת צד פייב",             nameEn:"Pavé Side Stone Ring",         descriptionHe:"יהלום עגול עם פייב יהלומים בצדדים",        descriptionEn:"Round diamond with pavé set side stones",        price:13000, image:RA(9),  images:[RA(9),  "/rings/RA_hand_08.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"r10", category:"rings", nameHe:"טבעת זהב מודרנית",         nameEn:"Modern Yellow Gold Band",      descriptionHe:"טבעת זהב צהוב 14K בעיצוב מודרני נקי",      descriptionEn:"Sleek modern 14K yellow gold ring",              price:3800,  image:RA(10), images:[RA(10), "/rings/RA_hand_09.png"], material:"זהב 14K" },

  { id:"r12", category:"rings", nameHe:"טבעת ספיר אובל",           nameEn:"Oval Sapphire Ring",           descriptionHe:"ספיר אובל כחול עם יהלומי צד בזהב צהוב",   descriptionEn:"Oval blue sapphire with diamond accents in gold", price:11000, image:RB(2),  images:[RB(2),  "/rings/RB_hand_02.png"], material:"זהב 18K", isNew:true },
  { id:"r13", category:"rings", nameHe:"טבעת ארט דקו יהלום",       nameEn:"Art Deco Diamond Band",        descriptionHe:"להקת יהלומים בסגנון ארט דקו יוקרתי",       descriptionEn:"Luxurious Art Deco diamond band",                price:18000, image:RB(3),  images:[RB(3),  "/rings/RB_hand_03.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"r14", category:"rings", nameHe:"טבעת מורגנייט פייר",       nameEn:"Morganite Pear Ring",          descriptionHe:"מורגנייט בצורת טיפה בזהב ורד, אלגנטי ועדין",descriptionEn:"Pear morganite in delicate rose gold setting",   price:8800,  image:RB(4),  images:[RB(4),  "/rings/RB_hand_04.png"], material:"זהב ורד 14K" },
  { id:"r16", category:"rings", nameHe:"טבעת עלים זהב ורד",        nameEn:"Rose Gold Leaf Ring",          descriptionHe:"טבעת זהב ורד בצורת עלים ויהלומים עדינים",  descriptionEn:"Delicate rose gold leaf design with diamonds",   price:6500,  image:RB(6),  images:[RB(6),  "/rings/RB_hand_06.png"], material:"זהב ורד 14K" },
  { id:"r17", category:"rings", nameHe:"טבעת יהלום שחור",          nameEn:"Black Diamond Band",           descriptionHe:"להקת זהב שחורה עם יהלומים שחורים מרהיבים",  descriptionEn:"Bold black gold band with black diamonds",       price:9500,  image:RB(7),  images:[RB(7),  "/rings/RB_hand_07.png"], material:"זהב שחור 14K" },
  { id:"r18", category:"rings", nameHe:"טבעת ביפס יהלום",          nameEn:"Bypass Diamond Ring",          descriptionHe:"טבעת ביפס זהב לבן עם שני יהלומים",         descriptionEn:"White gold bypass ring with two diamonds",       price:7200,  image:RB(8),  images:[RB(8),  "/rings/RB_hand_08.png"], material:"זהב לבן 14K" },
  { id:"r19", category:"rings", nameHe:"טבעת פרח יהלומים",         nameEn:"Flower Cluster Ring",          descriptionHe:"עיצוב פרח יהלומים קלאסי ומרהיב",           descriptionEn:"Classic diamond flower cluster design",          price:10500, image:RB(9),  images:[RB(9),  "/rings/RB_hand_09.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"r20", category:"rings", nameHe:"טבעת נצח יהלומים",         nameEn:"Diamond Eternity Band",        descriptionHe:"להקת נצח זהב לבן עם יהלומים סביב",         descriptionEn:"Full diamond eternity white gold band",          price:22000, image:RB(10), images:[RB(10), "/rings/RB_hand_10.png"], material:"זהב לבן 18K" },

  { id:"r21", category:"rings", nameHe:"טבעת נישואין זהב לבן",     nameEn:"White Gold Wedding Band",      descriptionHe:"להקת נישואין זהב לבן קלאסית וחלקה",        descriptionEn:"Classic smooth white gold wedding band",         price:3200,  image:RC(1),  images:[RC(1), "/rings/RC_hand_01.png"],  material:"זהב לבן 14K" },
  { id:"r22", category:"rings", nameHe:"טבעת נישואין זהב צהוב",    nameEn:"Yellow Gold Wedding Band",     descriptionHe:"להקת נישואין זהב צהוב 18K עם פוליש גבוה",   descriptionEn:"High polish 18K yellow gold wedding band",       price:3500,  image:RC(2),  images:[RC(2), "/rings/RC_hand_02.png"],  material:"זהב 18K" },
  { id:"r23", category:"rings", nameHe:"להקה מוחצנת זהב",          nameEn:"Hammered Gold Band",           descriptionHe:"להקת זהב 14K עם גימור מוחצן טקסטורלי",     descriptionEn:"14K gold band with hammered texture finish",     price:2800,  image:RC(3),  images:[RC(3), "/rings/RC_hand_03.png"],  material:"זהב 14K", isNew:true },
  { id:"r24", category:"rings", nameHe:"להקת נצח יהלומים",         nameEn:"Diamond Eternity Wedding Band",descriptionHe:"להקת יהלומים עגולים בזהב לבן לנצח",         descriptionEn:"Round diamond eternity band in white gold",      price:12000, image:RC(4),  images:[RC(4), "/rings/RC_hand_04.png"],  material:"זהב לבן 14K", isBestseller:true },
  { id:"r25", category:"rings", nameHe:"להקה מקבילה זהב ורד",      nameEn:"Curved Rose Gold Band",        descriptionHe:"להקת זהב ורד מעוקלת לאצבע, עיצוב ייחודי",  descriptionEn:"Elegantly curved rose gold band ring",           price:3100,  image:RC(5),  images:[RC(5), "/rings/RC_hand_05.png"],  material:"זהב ורד 14K" },
  { id:"r26", category:"rings", nameHe:"להקה מבורשת כסף",          nameEn:"Brushed Silver Band",          descriptionHe:"להקת כסף 925 עם גימור מבורשת עדין",         descriptionEn:"925 silver band with brushed matte finish",      price:1400,  image:RC(6),  images:[RC(6), "/rings/RC_hand_06.png"],  material:"כסף 925" },
  { id:"r27", category:"rings", nameHe:"להקה דו-גוון",             nameEn:"Two-Tone Wedding Band",        descriptionHe:"שילוב זהב לבן וצהוב בלהקת נישואין אחת",    descriptionEn:"White and yellow gold two-tone wedding band",    price:4200,  image:RC(7),  images:[RC(7), "/rings/RC_hand_07.png"],  material:"זהב 14K" },
  { id:"r28", category:"rings", nameHe:"להקה שחורה קרמיקה",        nameEn:"Black Ceramic Band",           descriptionHe:"להקת קרמיקה שחורה עם פנים זהב ורד",        descriptionEn:"Black ceramic band with rose gold inner lining",  price:2600,  image:RC(8),  images:[RC(8), "/rings/RC_hand_08.png"],  material:"קרמיקה/זהב ורד" },
  { id:"r29", category:"rings", nameHe:"להקת באגט שקועים",         nameEn:"Channel Set Baguette Band",    descriptionHe:"להקת זהב לבן עם יהלומי באגט שקועים",       descriptionEn:"White gold channel set baguette diamond band",   price:9800,  image:RC(9),  images:[RC(9), "/rings/RC_hand_09.png"],  material:"זהב לבן 18K", isNew:true },
  { id:"r30", category:"rings", nameHe:"להקה מודרנית זהב",         nameEn:"Modern Gold Statement Band",   descriptionHe:"להקת זהב 14K רחבה בעיצוב מינימל מודרני",   descriptionEn:"Wide modern minimalist 14K gold band",           price:3900,  image:RC(10), images:[RC(10), "/rings/RC_hand_10.png"], material:"זהב 14K" },

  { id:"r31", category:"rings", nameHe:"טבעת כרית האלו",           nameEn:"Cushion Halo Engagement Ring", descriptionHe:"יהלום כרית עם האלו יהלומים בזהב לבן",      descriptionEn:"Cushion diamond with white gold halo setting",   price:17000, image:RD(1),  images:[RD(1),  "/rings/RD_hand_01.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"r32", category:"rings", nameHe:"טבעת שלוש אבנות זהב",      nameEn:"Three Stone Yellow Gold Ring", descriptionHe:"שלושה יהלומים גדולים בזהב צהוב 18K",        descriptionEn:"Three large diamonds in 18K yellow gold",        price:21000, image:RD(2),  images:[RD(2),  "/rings/RD_hand_02.png"], material:"זהב 18K" },
  { id:"r33", category:"rings", nameHe:"טבעת אמרלד זהב צהוב",      nameEn:"Emerald Cut Yellow Gold Ring", descriptionHe:"יהלום אמרלד קאט על להקת זהב צהוב עדינה",   descriptionEn:"Emerald cut diamond on slim yellow gold band",   price:19000, image:RD(3),  images:[RD(3),  "/rings/RD_hand_03.png"], material:"זהב 18K", isNew:true },
  { id:"r34", category:"rings", nameHe:"טבעת מרקיז האלו",           nameEn:"Marquise Halo Ring",           descriptionHe:"יהלום מרקיז עם האלו יהלומים בזהב לבן",     descriptionEn:"Marquise diamond with full halo in white gold",  price:18500, image:RD(4),  images:[RD(4),  "/rings/RD_hand_04.png"], material:"זהב לבן 18K" },
  { id:"r35", category:"rings", nameHe:"טבעת אינפיניטי עגול",       nameEn:"Infinity Diamond Ring",        descriptionHe:"יהלום עגול על להקת אינפיניטי זהב לבן",    descriptionEn:"Round diamond on white gold infinity band",      price:7600,  image:RD(5),  images:[RD(5),  "/rings/RD_hand_05.png"], material:"זהב לבן 14K" },
  { id:"r36", category:"rings", nameHe:"טבעת וינטאג' זהב",          nameEn:"Vintage Yellow Gold Ring",     descriptionHe:"טבעת סגנון וינטאג' עם חריטות בזהב צהוב",   descriptionEn:"Vintage style engraved yellow gold ring",        price:8200,  image:RD(6),  images:[RD(6),  "/rings/RD_hand_06.png"], material:"זהב 14K" },
  { id:"r37", category:"rings", nameHe:"טבעת כרית האלו מרובע",      nameEn:"Square Cushion Halo Ring",     descriptionHe:"יהלום כרית מרובע עם האלו יהלומים",         descriptionEn:"Square cushion diamond with pavé halo",          price:15500, image:RD(7),  images:[RD(7),  "/rings/RD_hand_07.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"r39", category:"rings", nameHe:"טבעת עגול צד פייב",         nameEn:"Round Pavé Shoulder Ring",     descriptionHe:"יהלום עגול עם כתפי פייב בזהב לבן",         descriptionEn:"Round diamond with pavé shoulders in white gold", price:14200, image:RD(9),  images:[RD(9),  "/rings/RD_hand_09.png"], material:"זהב לבן 18K" },

  { id:"r42", category:"rings", nameHe:"טבעת כרית צהובה שלוש",      nameEn:"Yellow Cushion Three-Stone",   descriptionHe:"יהלום צהוב כרית עם שני יהלומים לצדדים",    descriptionEn:"Yellow cushion diamond with two side stones",     price:25000, image:RE(2),  images:[RE(2),  "/rings/RE_hand_02.png"], material:"זהב 18K", isBestseller:true },
  { id:"r43", category:"rings", nameHe:"טבעת שני אבנות כחול ורד",   nameEn:"Two-Stone Blue & Rose Gold",   descriptionHe:"יהלום כחול ולבן על להקת זהב ורד מיוחדת",   descriptionEn:"Blue & white diamond two-stone on rose gold",     price:22000, image:RE(3),  images:[RE(3),  "/rings/RE_hand_03.png"], material:"זהב ורד 18K", isNew:true },
  { id:"r44", category:"rings", nameHe:"טבעת כרית האלו מרובע",      nameEn:"Cushion Square Halo Ring",     descriptionHe:"יהלום כרית מרובע עם האלו פייב בזהב לבן",   descriptionEn:"Square cushion diamond with full pavé halo",      price:19500, image:RE(4),  images:[RE(4),  "/rings/RE_hand_04.png"], material:"זהב לבן 18K" },
  { id:"r45", category:"rings", nameHe:"טבעת ארט דקו אמרלד",        nameEn:"Art Deco Emerald Cut Ring",    descriptionHe:"יהלום אמרלד קאט בעיצוב ארט דקו אלגנטי",    descriptionEn:"Emerald cut in elegant Art Deco setting",         price:23000, image:RE(5),  images:[RE(5),  "/rings/RE_hand_05.png"], material:"זהב לבן 18K", isBestseller:true },
  { id:"r46", category:"rings", nameHe:"טבעת פרפר יהלומים",         nameEn:"Butterfly Diamond Ring",       descriptionHe:"עיצוב פרפר ייחודי משובץ יהלומים",          descriptionEn:"Unique butterfly design set with diamonds",       price:17500, image:RE(6),  images:[RE(6),  "/rings/RE_hand_07.png"], material:"זהב לבן 14K", isNew:true },
  { id:"r47", category:"rings", nameHe:"טבעת נחש ספירלה",           nameEn:"Diamond Snake Spiral Ring",    descriptionHe:"טבעת נחש מסתחלת משובצת יהלומים",           descriptionEn:"Spiraling snake ring fully set with diamonds",    price:14000, image:RE(7),  images:[RE(7)],            material:"זהב לבן 14K" },
  { id:"r48", category:"rings", nameHe:"טבעת סוליטר זהב פשוט",      nameEn:"Simple Yellow Gold Solitaire", descriptionHe:"יהלום קטן אלגנטי על להקת זהב צהוב עדינה",  descriptionEn:"Small elegant diamond on delicate yellow gold",   price:4800,  image:RE(8),  images:[RE(8),  "/rings/RE_hand_08.png"], material:"זהב 14K" },
  { id:"r49", category:"rings", nameHe:"להקת נצח ארט דקו",          nameEn:"Art Deco Eternity Band",       descriptionHe:"להקת יהלומים בעיצוב ארט דקו בזהב לבן",    descriptionEn:"Art Deco inspired diamond eternity band",         price:13500, image:RE(9),  images:[RE(9),  "/rings/RE_hand_09.png"], material:"זהב לבן 18K" },
  { id:"r50", category:"rings", nameHe:"טבעת מרקיז שמש יהלומים",    nameEn:"Marquise Sunburst Ring",       descriptionHe:"יהלום מרקיז מרכזי עם פרחי יהלום סביבו",   descriptionEn:"Marquise center diamond with diamond sunburst",   price:28000, image:RE(10), images:[RE(10), "/rings/RE_hand_10.png"], material:"זהב לבן 18K", isBestseller:true },

  /* ══════ NECKLACES ══════ */
  { id:"n1",  category:"necklaces", nameHe:"שרשרת יהלום סוליטר",  nameEn:"Solitaire Diamond Necklace", descriptionHe:"שרשרת זהב 18K עם יהלום סוליטר",    descriptionEn:"18K gold solitaire diamond necklace",   price:6800, image:n(0), images:[n(0),n(1),n(2)], material:m(1), isBestseller:true },
  { id:"n2",  category:"necklaces", nameHe:"שרשרת זהב קובו",      nameEn:"Cuban Gold Chain",           descriptionHe:"שרשרת זהב 18K קובו עבה",           descriptionEn:"Thick 18K gold cuban link chain",       price:9500, image:n(1), images:[n(1),n(2),n(3)], material:m(1), isBestseller:true },
  { id:"n3",  category:"necklaces", nameHe:"שרשרת טניס יהלומים",  nameEn:"Diamond Tennis Necklace",    descriptionHe:"שרשרת טניס זהב לבן עם יהלומים",   descriptionEn:"White gold diamond tennis necklace",    price:22000,image:n(2), images:[n(2),n(3),n(4)], material:m(3), isNew:true },
  { id:"n4",  category:"necklaces", nameHe:"שרשרת לב יהלום",      nameEn:"Diamond Heart Necklace",     descriptionHe:"שרשרת זהב עם תליון לב יהלומים",   descriptionEn:"Gold necklace with diamond heart pendant",price:5200,image:n(3), images:[n(3),n(4),n(5)], material:m(0) },
  { id:"n5",  category:"necklaces", nameHe:"שרשרת ספייגל",        nameEn:"Figaro Chain",               descriptionHe:"שרשרת זהב 14K סגנון פיגרו",       descriptionEn:"14K gold figaro style chain",           price:3800, image:n(4), images:[n(4),n(5),n(6)], material:m(0), isNew:true },
  { id:"n6",  category:"necklaces", nameHe:"שרשרת פנינות",        nameEn:"Pearl Chain Necklace",       descriptionHe:"שרשרת זהב עם תליוני פנינה",       descriptionEn:"Gold necklace with pearl drops",        price:4400, image:n(5), images:[n(5),n(6),n(7)], material:m(0) },
  { id:"n7",  category:"necklaces", nameHe:"שרשרת חוט זהב",       nameEn:"Gold Thread Necklace",       descriptionHe:"שרשרת חוט זהב 18K עדינה",         descriptionEn:"Delicate 18K gold thread necklace",     price:2900, image:n(6), images:[n(6),n(7),n(8)], material:m(1) },
  { id:"n8",  category:"necklaces", nameHe:"שרשרת טניס כסף",      nameEn:"Silver Tennis Necklace",     descriptionHe:"שרשרת טניס כסף 925 עם זירקונים",  descriptionEn:"925 silver tennis necklace with CZ",    price:2200, image:n(7), images:[n(7),n(8),n(0)], material:m(2), isBestseller:true },
  { id:"n9",  category:"necklaces", nameHe:"שרשרת קרוס יהלום",    nameEn:"Diamond Cross Necklace",     descriptionHe:"שרשרת זהב לבן עם צלב יהלומים",   descriptionEn:"White gold diamond cross necklace",     price:7600, image:n(8), images:[n(8),n(0),n(1)], material:m(3) },
  { id:"n10", category:"necklaces", nameHe:"שרשרת אייס",          nameEn:"Ice Chain",                  descriptionHe:"שרשרת זהב לבן מצופה יהלומים",    descriptionEn:"Full iced-out diamond gold chain",      price:35000,image:n(0), images:[n(0),n(1),n(2)], material:m(3), isNew:true },
  { id:"n11", category:"necklaces", nameHe:"שרשרת בייסבול",       nameEn:"Ball Chain Necklace",        descriptionHe:"שרשרת זהב בסגנון בול צ'יין",     descriptionEn:"Gold ball chain necklace",              price:1800, image:n(1), images:[n(1),n(2),n(3)], material:m(0) },
  { id:"n12", category:"necklaces", nameHe:"שרשרת לריאט",         nameEn:"Lariat Necklace",            descriptionHe:"שרשרת לריאט זהב 14K",             descriptionEn:"14K gold lariat necklace",              price:3400, image:n(2), images:[n(2),n(3),n(4)], material:m(0), isBestseller:true },
  { id:"n13", category:"necklaces", nameHe:"שרשרת צ'וקר זהב",     nameEn:"Gold Choker",                descriptionHe:"צ'וקר זהב 18K צמוד לצוואר",      descriptionEn:"18K gold choker necklace",              price:5100, image:n(3), images:[n(3),n(4),n(5)], material:m(1) },
  { id:"n14", category:"necklaces", nameHe:"שרשרת כוכב יהלום",    nameEn:"Diamond Star Necklace",      descriptionHe:"שרשרת זהב לבן עם תליון כוכב",    descriptionEn:"White gold diamond star pendant",       price:4700, image:n(4), images:[n(4),n(5),n(6)], material:m(3), isNew:true },
  { id:"n15", category:"necklaces", nameHe:"שרשרת ירח יהלום",     nameEn:"Diamond Moon Necklace",      descriptionHe:"שרשרת זהב עם תליון ירח ויהלומים",descriptionEn:"Gold necklace with moon & diamond",     price:5900, image:n(5), images:[n(5),n(6),n(7)], material:m(0) },
  { id:"n16", category:"necklaces", nameHe:"שרשרת עדינה 14K",     nameEn:"Delicate 14K Chain",         descriptionHe:"שרשרת זהב 14K דקה ועדינה",       descriptionEn:"Ultra-thin 14K gold chain",             price:1600, image:n(6), images:[n(6),n(7),n(8)], material:m(0) },
  { id:"n17", category:"necklaces", nameHe:"שרשרת קולאר יהלומים", nameEn:"Diamond Collar Necklace",    descriptionHe:"שרשרת קולאר זהב לבן יהלומים",    descriptionEn:"White gold diamond collar necklace",    price:28000,image:n(7), images:[n(7),n(8),n(0)], material:m(3) },
  { id:"n18", category:"necklaces", nameHe:"שרשרת בייגוויר",      nameEn:"Box Chain Necklace",         descriptionHe:"שרשרת זהב 18K בוקס צ'יין",       descriptionEn:"18K gold box chain",                    price:2400, image:n(8), images:[n(8),n(0),n(1)], material:m(1), isNew:true },
  { id:"n19", category:"necklaces", nameHe:"שרשרת פפיון",         nameEn:"Butterfly Necklace",         descriptionHe:"שרשרת זהב עם תליון פפיון יהלום", descriptionEn:"Gold butterfly diamond necklace",       price:6300, image:n(0), images:[n(0),n(1),n(2)], material:m(0) },
  { id:"n20", category:"necklaces", nameHe:"שרשרת אינפיניטי",     nameEn:"Infinity Diamond Necklace",  descriptionHe:"שרשרת זהב לבן עם אינפיניטי יהלום",descriptionEn:"White gold infinity diamond necklace",  price:4200, image:n(1), images:[n(1),n(2),n(3)], material:m(3), isBestseller:true },
  { id:"n21", category:"necklaces", nameHe:"שרשרת ריס",           nameEn:"Rope Chain",                 descriptionHe:"שרשרת זהב 18K רואופ צ'יין",      descriptionEn:"18K gold rope chain",                   price:4600, image:n(2), images:[n(2),n(3),n(4)], material:m(1) },
  { id:"n22", category:"necklaces", nameHe:"שרשרת ורמייל",        nameEn:"Vermeil Necklace",           descriptionHe:"שרשרת כסף מצופה זהב 18K",        descriptionEn:"Silver necklace dipped in 18K gold",    price:2800, image:n(3), images:[n(3),n(4),n(5)], material:m(2), isNew:true },
  { id:"n23", category:"necklaces", nameHe:"שרשרת בראסלט",        nameEn:"Layering Necklace",          descriptionHe:"שרשרת זהב 14K לשכבות",           descriptionEn:"14K gold layering necklace",            price:1900, image:n(4), images:[n(4),n(5),n(6)], material:m(0) },
  { id:"n24", category:"necklaces", nameHe:"שרשרת ספיר לבן",      nameEn:"White Sapphire Necklace",    descriptionHe:"שרשרת זהב לבן עם ספיר לבן",     descriptionEn:"White gold white sapphire necklace",    price:7200, image:n(5), images:[n(5),n(6),n(7)], material:m(3) },
  { id:"n25", category:"necklaces", nameHe:"שרשרת גולד בר",       nameEn:"Gold Bar Necklace",          descriptionHe:"שרשרת זהב 14K עם חפיסת זהב",    descriptionEn:"14K gold bar pendant necklace",         price:3100, image:n(6), images:[n(6),n(7),n(8)], material:m(0) },

  /* ══════ BRACELETS ══════ */
  { id:"b1",  category:"bracelets", nameHe:"צמיד טניס יהלומים",  nameEn:"Diamond Tennis Bracelet",  descriptionHe:"צמיד טניס זהב לבן עם יהלומים",  descriptionEn:"White gold diamond tennis bracelet",  price:25000,image:b(0), images:[b(0),b(1),b(2)], material:m(3), isBestseller:true },
  { id:"b2",  category:"bracelets", nameHe:"צמיד קובו זהב",      nameEn:"Gold Cuban Bracelet",      descriptionHe:"צמיד זהב 18K קובו לינק",        descriptionEn:"18K gold cuban link bracelet",        price:12000,image:b(1), images:[b(1),b(2),b(3)], material:m(1), isBestseller:true },
  { id:"b3",  category:"bracelets", nameHe:"צמיד בנגל זהב",      nameEn:"Gold Bangle",              descriptionHe:"צמיד בנגל זהב 14K קלאסי",       descriptionEn:"Classic 14K gold bangle bracelet",    price:4500, image:b(2), images:[b(2),b(3),b(4)], material:m(0), isNew:true },
  { id:"b4",  category:"bracelets", nameHe:"צמיד חרוזי יהלום",   nameEn:"Diamond Bezel Bracelet",   descriptionHe:"צמיד זהב לבן עם יהלומים",       descriptionEn:"White gold bezel diamond bracelet",   price:8800, image:b(3), images:[b(3),b(4),b(5)], material:m(3) },
  { id:"b5",  category:"bracelets", nameHe:"צמיד ריס זהב",       nameEn:"Gold Rope Bracelet",       descriptionHe:"צמיד זהב 18K בסגנון רואופ",     descriptionEn:"18K gold rope style bracelet",        price:3800, image:b(4), images:[b(4),b(5),b(6)], material:m(1), isNew:true },
  { id:"b6",  category:"bracelets", nameHe:"צמיד פיגרו זהב",     nameEn:"Figaro Gold Bracelet",     descriptionHe:"צמיד זהב 14K פיגרו",            descriptionEn:"14K gold figaro bracelet",             price:3200, image:b(5), images:[b(5),b(6),b(7)], material:m(0) },
  { id:"b7",  category:"bracelets", nameHe:"צמיד צ'ארם יהלום",   nameEn:"Diamond Charm Bracelet",   descriptionHe:"צמיד זהב עם תליוני יהלום",      descriptionEn:"Gold bracelet with diamond charms",   price:6500, image:b(6), images:[b(6),b(7),b(0)], material:m(0) },
  { id:"b8",  category:"bracelets", nameHe:"צמיד אייס פאוט",     nameEn:"Iced-Out Bracelet",        descriptionHe:"צמיד זהב לבן מצופה יהלומים",   descriptionEn:"Fully iced-out white gold bracelet",  price:18000,image:b(7), images:[b(7),b(0),b(1)], material:m(3), isBestseller:true },
  { id:"b9",  category:"bracelets", nameHe:"צמיד כסף טניס",      nameEn:"Silver Tennis Bracelet",   descriptionHe:"צמיד טניס כסף 925 עם זירקונים", descriptionEn:"925 silver tennis bracelet with CZ",  price:1800, image:b(0), images:[b(0),b(1),b(2)], material:m(2) },
  { id:"b10", category:"bracelets", nameHe:"צמיד ריינסטון",      nameEn:"Rhinestone Bracelet",      descriptionHe:"צמיד זהב עם אבני ריינסטון",    descriptionEn:"Gold bracelet with rhinestone accents",price:2200, image:b(1), images:[b(1),b(2),b(3)], material:m(0), isNew:true },
  { id:"b11", category:"bracelets", nameHe:"צמיד פיה זהב",       nameEn:"Gold Snake Bracelet",      descriptionHe:"צמיד זהב 18K בצורת נחש",       descriptionEn:"18K gold snake style bracelet",       price:5400, image:b(2), images:[b(2),b(3),b(4)], material:m(1) },
  { id:"b12", category:"bracelets", nameHe:"צמיד כסף קלאסי",     nameEn:"Classic Silver Bracelet",  descriptionHe:"צמיד כסף 925 קלאסי",           descriptionEn:"Classic 925 silver bracelet",          price:950,  image:b(3), images:[b(3),b(4),b(5)], material:m(2) },
  { id:"b13", category:"bracelets", nameHe:"צמיד קאף זהב",       nameEn:"Gold Cuff Bracelet",       descriptionHe:"צמיד קאף זהב 14K רחב",         descriptionEn:"Wide 14K gold cuff bracelet",          price:4100, image:b(4), images:[b(4),b(5),b(6)], material:m(0), isBestseller:true },
  { id:"b14", category:"bracelets", nameHe:"צמיד פנינות ים",     nameEn:"Freshwater Pearl Bracelet",descriptionHe:"צמיד זהב עם פנינות מים מתוקים", descriptionEn:"Gold bracelet with freshwater pearls", price:3600, image:b(5), images:[b(5),b(6),b(7)], material:m(0) },
  { id:"b15", category:"bracelets", nameHe:"צמיד ורד 14K",       nameEn:"Rose Gold Bracelet",       descriptionHe:"צמיד זהב ורד 14K עדין",        descriptionEn:"Delicate 14K rose gold bracelet",     price:2700, image:b(6), images:[b(6),b(7),b(0)], material:m(4) },
  { id:"b16", category:"bracelets", nameHe:"צמיד פבה זהב",       nameEn:"Pavé Gold Bracelet",       descriptionHe:"צמיד זהב פייב עם יהלומים",     descriptionEn:"Pavé-set diamond gold bracelet",      price:9200, image:b(7), images:[b(7),b(0),b(1)], material:m(0), isNew:true },
  { id:"b17", category:"bracelets", nameHe:"צמיד בוקס צ'יין",    nameEn:"Box Chain Bracelet",       descriptionHe:"צמיד זהב 18K בוקס סגנון",      descriptionEn:"18K gold box chain bracelet",         price:2800, image:b(0), images:[b(0),b(1),b(2)], material:m(1) },
  { id:"b18", category:"bracelets", nameHe:"צמיד אינפיניטי",     nameEn:"Infinity Bracelet",        descriptionHe:"צמיד זהב לבן אינפיניטי יהלום", descriptionEn:"White gold infinity diamond bracelet",price:5800, image:b(1), images:[b(1),b(2),b(3)], material:m(3) },
  { id:"b19", category:"bracelets", nameHe:"צמיד כסף מרובע",     nameEn:"Square Link Bracelet",     descriptionHe:"צמיד כסף 925 חוליות מרובעות",  descriptionEn:"925 silver square link bracelet",     price:1400, image:b(2), images:[b(2),b(3),b(4)], material:m(2) },
  { id:"b20", category:"bracelets", nameHe:"צמיד לינק זהב",      nameEn:"Gold Link Bracelet",       descriptionHe:"צמיד זהב 14K לינק קלאסי",      descriptionEn:"Classic 14K gold link bracelet",      price:3900, image:b(3), images:[b(3),b(4),b(5)], material:m(0) },
  { id:"b21", category:"bracelets", nameHe:"צמיד צ'יין יהלום",   nameEn:"Diamond Chain Bracelet",   descriptionHe:"צמיד שרשרת זהב עם יהלומים",    descriptionEn:"Gold chain bracelet with diamonds",   price:7400, image:b(4), images:[b(4),b(5),b(6)], material:m(0) },
  { id:"b22", category:"bracelets", nameHe:"צמיד ווייב זהב",     nameEn:"Wave Gold Bracelet",       descriptionHe:"צמיד זהב 14K בצורת גל",        descriptionEn:"14K gold wave bracelet",               price:2500, image:b(5), images:[b(5),b(6),b(7)], material:m(0) },
  { id:"b23", category:"bracelets", nameHe:"צמיד זהב לבן רחב",   nameEn:"Wide White Gold Bracelet", descriptionHe:"צמיד זהב לבן 18K רחב יוקרתי",  descriptionEn:"Wide luxurious 18K white gold bracelet",price:6800,image:b(6), images:[b(6),b(7),b(0)], material:m(3), isNew:true },
  { id:"b24", category:"bracelets", nameHe:"צמיד פלטינה",        nameEn:"Platinum Style Bracelet",  descriptionHe:"צמיד זהב לבן בסגנון פלטינה",   descriptionEn:"White gold platinum-style bracelet",  price:8100, image:b(7), images:[b(7),b(0),b(1)], material:m(3) },
  { id:"b25", category:"bracelets", nameHe:"צמיד בנגל יהלום",    nameEn:"Diamond Bangle",           descriptionHe:"צמיד בנגל זהב לבן עם יהלומים", descriptionEn:"White gold diamond bangle bracelet",  price:15000,image:b(0), images:[b(0),b(1),b(2)], material:m(3), isBestseller:true },

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
