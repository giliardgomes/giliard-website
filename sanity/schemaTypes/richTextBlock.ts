import { defineArrayMember } from 'sanity'

// Standard text block with a link annotation that can open in a new tab
export const richTextBlock = defineArrayMember({
  type: 'block',
  marks: {
    annotations: [
      {
        name: 'link',
        title: 'Link',
        type: 'object',
        fields: [
          {
            name: 'href',
            title: 'URL',
            type: 'url',
            validation: (Rule) =>
              Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }),
          },
          {
            name: 'blank',
            title: 'Open in new tab',
            type: 'boolean',
            initialValue: false,
          },
        ],
      },
    ],
  },
})
