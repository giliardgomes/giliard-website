import { defineQuery } from 'next-sanity'

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    summary,
    tags,
    coverImage {
      asset-> {
        url
      }
    },
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
    myRole,
    year,
    "prev": *[_type == "caseStudy" && _createdAt < ^._createdAt] | order(_createdAt desc)[0] {
      title,
      "slug": slug.current
    },
    "next": *[_type == "caseStudy" && _createdAt > ^._createdAt] | order(_createdAt asc)[0] {
      title,
      "slug": slug.current
    }
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