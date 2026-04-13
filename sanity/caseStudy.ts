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
          { value: 'Figma', title: 'figma' },
          { value: 'Storybook', title: 'storybook' },
          { value: 'ZeroHeight', title: 'zeroheight' },
          { value: 'Adobe Illustrator', title: 'illustrator' },
          { value: 'Adobe Photoshop', title: 'photoshop' },
          { value: 'VS Code', title: 'vscode' },
          { value: 'React / TypeScript', title: 'react' },
          { value: 'CSS', title: 'css' },
          { value: 'HTML', title: 'html' },
          { value: 'JavaScript', title: 'js' },
          { value: 'GitHub', title: 'github' },
          { value: 'Jira', title: 'jira' },
          { value: 'FigJam', title: 'figjam' },
          { value: 'Zoom', title: 'zoom' },
          { value: 'Replit', title: 'replit' },
          { value: 'Lovable', title: 'lovable' },
          { value: 'WordPress', title: 'wordpress' },
          { value: 'Dovetail', title: 'dovetail' },
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
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Overrides the case study title in search results. Keep under 60 characters.',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Overrides the summary in search results. Keep under 160 characters.',
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Overrides the cover image when shared on social. Ideal size: 1200x630.',
        },
      ],
    },),
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