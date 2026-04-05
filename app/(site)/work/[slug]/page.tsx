import { client } from '@/sanity/lib/client'
import { CASE_STUDY_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import Main from '@/components/Main/Main'
import styles from './CaseStudy.module.css'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <div className={styles.bodyImage}>
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ''}
          width={1200}
          height={675}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    ),
  },
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
      {caseStudy.coverImage && (
        <Image
          className={styles.featuredImage}
          src={urlFor(caseStudy.coverImage).width(1600).height(900).url()}
          alt={caseStudy.title}
          width={1600}
          height={900}
          priority
        />
      )}
      <Main>
        <div className={styles.post}>
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
            <PortableText
              value={caseStudy.body}
              components={portableTextComponents}
            />
          )}
        </div>
      </Main>
    </>
  )
}