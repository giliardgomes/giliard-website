import { SchemaTypeDefinition } from 'sanity'
import caseStudy from '../caseStudy'
import page from '../../sanity/schemaTypes/page'
import htmlBlock from './htmlBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseStudy, page, htmlBlock],
}