import Hero from '@/components/Hero/Hero'
import AboutHome from '@/components/HomeWork/HomeWork'
import WorkSummary from '@/components/AboutHome/AboutHome'

import { client } from '@/sanity/lib/client'
import { FEATURED_CASE_STUDIES_QUERY } from '@/sanity/lib/queries'

export default async function Home() {
  const cases = await client.fetch(FEATURED_CASE_STUDIES_QUERY)

  return (
    <>
      <Hero />
      <AboutHome cases={cases} />
      <WorkSummary />
    </>
  )
}