import { defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'מוצר',
  type: 'document',
  fields: [
    defineField({
      name: 'nameHe',
      title: 'שם בעברית',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'שם באנגלית',
      type: 'string',
    }),
    defineField({
      name: 'descriptionHe',
      title: 'תיאור בעברית',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'מחיר (₪)',
      type: 'number',
      validation: r => r.required().min(0),
    }),
    defineField({
      name: 'category',
      title: 'קטגוריה',
      type: 'string',
      options: {
        list: [
          { title: 'טבעות', value: 'rings' },
          { title: 'שרשראות', value: 'necklaces' },
          { title: 'צמידים', value: 'bracelets' },
          { title: 'עגילים', value: 'earrings' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'תמונה ראשית',
      type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),
    defineField({
      name: 'images',
      title: 'תמונות נוספות',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'material',
      title: 'חומר',
      type: 'string',
    }),
    defineField({
      name: 'isNew',
      title: 'פריט חדש?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isBestseller',
      title: 'נמכר ביותר?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'inStock',
      title: 'במלאי?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'nameHe', subtitle: 'price', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `₪${subtitle}`, media }
    },
  },
})
