import { defineQuery } from 'next-sanity'

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    summary,
    tags,
    coverImage,
    featured,
    publishedAt
  }
`)

export const CASE_STUDY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    summary,
    coverImage,
    body,
    tools,
    myRole, // Ensure this matches the schema name
    year    // Now this will correctly fetch the year
  }
`)

export const FEATURED_CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    summary,
    tags,
    coverImage,
    publishedAt
  }
`)