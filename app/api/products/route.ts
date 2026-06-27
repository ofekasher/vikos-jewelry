import { NextResponse } from "next/server";
import { client, urlFor } from "@/lib/sanity";

export async function GET() {
  try {
    const raw = await client.fetch(`*[_type == "product"] | order(_createdAt asc) {
      _id, nameHe, nameEn, descriptionHe, price,
      category, image, images, material, isNew, isBestseller, inStock
    }`);

    // ממיר תמונות Sanity ל-URL רגיל
    const products = raw.map((p: any) => ({
      id: p._id,
      nameHe: p.nameHe,
      nameEn: p.nameEn,
      descriptionHe: p.descriptionHe,
      price: p.price,
      category: p.category,
      image: p.image ? urlFor(p.image).width(800).url() : "",
      images: p.images ? p.images.map((img: any) => urlFor(img).width(800).url()) : [],
      material: p.material,
      isNew: p.isNew,
      isBestseller: p.isBestseller,
      inStock: p.inStock ?? true,
    }));

    return NextResponse.json(products);
  } catch {
    return NextResponse.json([], { status: 200 }); // fallback שקט
  }
}
