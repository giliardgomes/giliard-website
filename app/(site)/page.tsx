import Hero from '@/components/Hero/Hero'
import AboutHome from '@/components/HomeWork/HomeWork'
import WorkSummary from '@/components/AboutHome/AboutHome'
import SkillsHome from '@/components/SkillsHome/SkillsHome'
import Main from '@/components/Main/Main'
import StackHome from '@/components/StackHome/StackHome'

import { client } from '@/sanity/lib/client'
import { FEATURED_CASE_STUDIES_QUERY } from '@/sanity/lib/queries'
import Footer from '@/components/Footer/Footer'

export default async function Home() {
  const cases = await client.fetch(FEATURED_CASE_STUDIES_QUERY)

  return (
    <>
      <Main>
        <Hero />
        <WorkSummary />
        <AboutHome cases={cases} />
        <SkillsHome />
        <StackHome />
      </Main>
    </>
  )
}