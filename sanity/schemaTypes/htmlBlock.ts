import { defineType } from 'sanity'

export default defineType({
  name: 'htmlBlock',
  title: 'HTML Block',
  type: 'object',
  fields: [
    {
      name: 'html',
      title: 'HTML',
      type: 'text',
      description: 'Raw HTML to render on the page',
    },
  ],
})