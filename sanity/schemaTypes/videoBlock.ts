import { defineType } from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    {
      name: 'asset',
      title: 'Video file',
      type: 'file',
      options: { accept: 'video/*' },
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'caption',
      fileName: 'asset.originalFilename',
    },
    prepare({ title, fileName }) {
      return {
        title: title || fileName || 'Video',
      }
    },
  },
})