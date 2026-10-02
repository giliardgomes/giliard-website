import { sanityFetch } from '@/sanity/lib/live'
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/queries'
import AboutClient, { type AboutContent } from './AboutClient'

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY })

  return <AboutClient content={data as AboutContent | null} />
}
