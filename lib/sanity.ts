import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

export async function getProducts() {
  return client.fetch(`*[_type == "product"] | order(_createdAt asc) {
    _id,
    nameHe,
    nameEn,
    descriptionHe,
    price,
    category,
    image,
    images,
    material,
    isNew,
    isBestseller,
    inStock
  }`)
}
