import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const SITE_URL = 'https://giliard.com.br'

async function getCaseStudySlugs(): Promise<string[]> {
  return client.fetch(`*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`)
    .then((results: { slug: string }[]) => results.map((r) => r.slug))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getCaseStudySlugs()

  const caseStudies = slugs.map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...caseStudies,
  ]
}