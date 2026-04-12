import Hero from '@/components/Hero/Hero'
import AboutHome from '@/components/HomeWork/HomeWork'
import WorkSummary from '@/components/AboutHome/AboutHome'
import SkillsHome from '@/components/SkillsHome/SkillsHome'
import Main from '@/components/Main/Main'
import StackHome from '@/components/StackHome/StackHome'

import { client } from '@/sanity/lib/client'

const query = `*[_type == "caseStudy"] | order(_createdAt desc) [0...2] {
  _id,
  title,
  alternativeTitle,
  slug,
  coverImage
}`

export default async function Home() {
  const cases = await client.fetch(query)

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