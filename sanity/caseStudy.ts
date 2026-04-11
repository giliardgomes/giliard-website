import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
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
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'myRole', // Matches your existing data
      title: 'My Role',
      type: 'string',
    }),
    defineField({
      name: 'year', // Added this field so you can edit it in Sanity
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'code' },
        { type: 'htmlBlock' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
    name: 'customHtml',
    title: 'Custom HTML',
    type: 'text',
    description: 'Raw HTML to render on the page',
  }),
    defineField({
      name: 'tools',
      title: 'Tools & Software',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Figma', value: 'figma' },
          { title: 'Adobe Creative Suite', value: 'adobe-cs' },
          { title: 'Framer', value: 'framer' },
          { title: 'Principle', value: 'principle' },
          { title: 'VS Code', value: 'vscode' },
          { title: 'React / Next.js', value: 'react' },
          { title: 'Tailwind CSS', value: 'tailwind' },
          { title: 'GitHub', value: 'github' },
          { title: 'Jira', value: 'jira' },
          { title: 'Linear', value: 'linear' },
          { title: 'Notion', value: 'notion' },
          { title: 'Miro / FigJam', value: 'miro' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, client, media } = selection
      return {
        title: title || 'Untitled',
        subtitle: client || 'No Client',
        media,
      }
    },
  },
})