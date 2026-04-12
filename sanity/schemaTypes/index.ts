import { SchemaTypeDefinition } from 'sanity'
import caseStudy from '../caseStudy'
import page from '../../sanity/schemaTypes/page'
import htmlBlock from './htmlBlock'
import videoBlock from './videoBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseStudy, page, htmlBlock, videoBlock],
}