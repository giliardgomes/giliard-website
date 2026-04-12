import { defineQuery } from 'next-sanity'

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    alternativeTitle,
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
    body[] {
      ...,
      _type == "video" => {
        ...,
        asset {
          ...,
          asset-> {
            url
          }
        }
      }
    },
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
    },
    customHtml,
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

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    featuredImage {
      asset-> {
        url
      }
    },
    body[] {
      ...,
      _type == "video" => {
        ...,
        asset {
          ...,
          asset-> {
            url
          }
        }
      }
    }
  }
`)