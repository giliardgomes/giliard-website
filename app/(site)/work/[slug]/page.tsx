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
      <figure className={styles.figure}>
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ''}
          width={1200}
          height={675}
          className={styles.bodyImage}
        />
        {value.caption && (
          <figcaption className={styles.caption}>{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className={styles.bodyH2}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className={styles.bodyH3}>{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className={styles.bodyP}>{children}</p>
    ),
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  
  // Fetches data based on the updated CASE_STUDY_BY_SLUG_QUERY
  const caseStudy = await client.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug })

  if (!caseStudy) {
    return (
      <Main>
        <p>Case study not found.</p>
      </Main>
    )
  }

  const meta = [
  caseStudy.client && { label: 'Client', value: caseStudy.client },
  caseStudy.myRole && { label: 'Role',   value: caseStudy.myRole },
  caseStudy.year   && { label: 'Year',   value: caseStudy.year },
  caseStudy.tools?.length && { label: 'Tools', value: caseStudy.tools },
].filter(Boolean)

  return (
    <Main>
      <article className={styles.post}>
        <div className={styles.postInfo}>
          {/* Main Title & Summary */}
          <h1 className={styles.title}>{caseStudy.title}</h1>
          {caseStudy.summary && (
            <p className={styles.subtitle}>{caseStudy.summary}</p>
          )}

          {/* Metadata Section (Client, Role, Year, Tools) */}
          {meta.length > 0 && (
            <dl className={styles.meta}>
              {meta.map(({ label, value }) => (
                <div key={label} className={styles.metaRow}>
                  <dt className={styles.metaLabel}>{label}</dt>
                  <dd className={styles.metaValue}>
                    {/* If value is an array (Tools), render badges. Otherwise, render text. */}
                    {Array.isArray(value) ? (
                      <div className={styles.toolsList}>
                        {value.map((tool) => (
                          <span key={tool} className={styles.toolBadge}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className={styles.textValue}>{value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className={styles.postContent}>
          {/* Hero / Cover Image */}
          {caseStudy.coverImage && (
            <div className={styles.featuredImage}>
              <Image
                src={urlFor(caseStudy.coverImage).width(1200).height(800).url()}
                alt={caseStudy.title}
                width={1200}
                height={800}
                className={styles.thumb}
                priority
              />
            </div>
          )}

          {/* Main Content Body */}
          {caseStudy.body && (
            <div className={styles.postBody}>
              <PortableText
                value={caseStudy.body}
                components={portableTextComponents}
              />
            </div>
          )}
        </div>
      </article>
    </Main>
  )
}