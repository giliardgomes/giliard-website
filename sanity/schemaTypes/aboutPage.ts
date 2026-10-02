import { defineField, defineType } from 'sanity'
import { richTextBlock } from './richTextBlock'

// Heading + paragraphs for one About page card. Only paragraphs and links,
// so the card keeps the page's typography and reveal animation
export const aboutTextBlock = defineType({
  name: 'aboutTextBlock',
  title: 'Text block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      description: 'Small line under the heading, e.g. "by Google"',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ ...richTextBlock, styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
    }),
  ],
})

// Singleton: a single document with a fixed id, see sanity/structure.ts
export default defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({ name: 'intro', title: 'Intro', type: 'aboutTextBlock' }),
    defineField({ name: 'designStack', title: 'Design stack', type: 'aboutTextBlock' }),
    defineField({ name: 'publicAffairs', title: 'Public and Government Affairs', type: 'aboutTextBlock' }),
    defineField({ name: 'productExpert', title: 'Product Expert', type: 'aboutTextBlock' }),
    defineField({ name: 'justForFun', title: 'Just for fun', type: 'aboutTextBlock' }),
  ],
  preview: {
    prepare: () => ({ title: 'About page' }),
  },
})
