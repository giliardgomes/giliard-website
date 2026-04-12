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
      name: 'alternativeTitle',
      title: 'Alternative Title',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
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
      of: [
        { type: 'block' },
        { type: 'code' },
        { type: 'htmlBlock' },
        { type: 'video' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'myRole',
      title: 'My Role',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Product Designer', value: 'Product Designer' },
          { title: 'Front-end Developer', value: 'Front-end Developer' },
          { title: 'Graphic Designer', value: 'Graphic Designer' },
        ],
      },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'tools',
      title: 'Tools & Software',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Figma', value: 'figma' },
          { title: 'Storybook', value: 'storybook' },
          { title: 'ZeroHeight', value: 'zeroheight' },
          { title: 'Adobe Illustrator', value: 'illustrator' },
          { title: 'Adobe Photoshop', value: 'photoshop' },
          { title: 'VS Code', value: 'vscode' },
          { title: 'React / TypeScript', value: 'react' },
          { title: 'CSS', value: 'css' },
          { title: 'HTML', value: 'html' },
          { title: 'JavaScript', value: 'js' },
          { title: 'GitHub', value: 'github' },
          { title: 'Jira', value: 'jira' },
          { title: 'FigJam', value: 'figjam' },
          { title: 'Zoom', value: 'zoom' },
          { title: 'Replit', value: 'replit' },
          { title: 'Lovable', value: 'lovable' },
          { title: 'WordPress', value: 'wordpress' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
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