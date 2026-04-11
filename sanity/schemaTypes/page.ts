import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' },
           { type: 'code' },
           { type: 'htmlBlock' },
      ],
    }),
    defineField({
    name: 'featuredImage',
    title: 'Featured Image',
    type: 'image',
    options: { hotspot: true },
  }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug' },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled',
        subtitle: slug?.current ? `/${slug.current}` : 'No slug',
      }
    },
  },
})