import { client } from '@/sanity/lib/client'
import { CASE_STUDY_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'

const builder = imageUrlBuilder(client)

import Main from "@/components/Main/Main"
import Header from "@/components/Header/Header"

function urlFor(source: any) {
  return builder.image(source)
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = await client.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug })

  if (!caseStudy) {
    return <main><h1>Case study not found</h1></main>
  }

  return (
    <>
      <Header />
      <Main>
        {caseStudy.coverImage && (
          <Image
            src={urlFor(caseStudy.coverImage).width(1200).height(630).url()}
            alt={caseStudy.title}
            width={1200}
            height={630}
            priority
          />
        )}
        <h1>{caseStudy.title}</h1>
        {caseStudy.client && <p>{caseStudy.client}</p>}
        {caseStudy.summary && <p>{caseStudy.summary}</p>}
        {caseStudy.tags && (
          <ul>
            {caseStudy.tags.map((tag: string) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        {caseStudy.body && (
          <PortableText value={caseStudy.body} />
        )}
      </Main>
    </>
  )
}