import type { Metadata } from 'next'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { CASE_STUDY_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import CaseStudyClient from './CaseStudyClient'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await client.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug })

  const ogImage = data?.coverImage
    ? urlFor(data.coverImage).width(1200).height(630).url()
    : undefined

  return {
    title: data?.seo?.metaTitle ?? data?.title ?? 'Case Study',
    description: data?.seo?.metaDescription ?? data?.summary ?? '',
    alternates: {
      canonical: `https://giliard.com.br/work/${slug}`,
    },
    openGraph: {
      title: data?.seo?.metaTitle ?? data?.title,
      description: data?.seo?.metaDescription ?? data?.summary,
      url: `https://giliard.com.br/work/${slug}`,
      images: data?.seo?.ogImage
        ? [urlFor(data.seo.ogImage).width(1200).height(630).url()]
        : ogImage
        ? [ogImage]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: data?.seo?.metaTitle ?? data?.title,
      description: data?.seo?.metaDescription ?? data?.summary,
    },
  }
}

export default function CaseStudyPage({ params }: Props) {
  return <CaseStudyClient params={params} />
}