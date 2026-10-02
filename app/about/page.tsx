import { sanityFetch } from '@/sanity/lib/live'
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/queries'
import AboutClient, { type AboutContent } from './AboutClient'

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY })

  return <AboutClient content={data as AboutContent | null} />
}
