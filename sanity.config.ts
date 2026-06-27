'use client'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { productSchema } from './sanity/schemas/product'

export default defineConfig({
  name: 'vikos-jewelry',
  title: 'Vikos Jewelry — ניהול תוכן',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: [productSchema],
  },
})
