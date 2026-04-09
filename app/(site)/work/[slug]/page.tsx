'use client'

import { useState, useEffect, use } from 'react'
import { client } from '@/sanity/lib/client'
import { CASE_STUDY_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import Main from '@/components/Main/Main'
import MetaData from './MetaData'
import styles from './CaseStudy.module.css'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

const Skeleton = () => (
  <div className={styles.skeletonWrapper}>
    <div className={styles.skeletonTitle} />
    <div className={styles.skeletonSubtitle} />
    <div className={styles.skeletonHero} />
    <div className={styles.skeletonText} />
    <div className={styles.skeletonText} />
  </div>
)

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
    h2: ({ children }: any) => <h2 className={styles.bodyH2}>{children}</h2>,
    h3: ({ children }: any) => <h3 className={styles.bodyH3}>{children}</h3>,
    normal: ({ children }: any) => <p className={styles.bodyP}>{children}</p>,
  },
}

export const useIsDesktop = (breakpoint = 1024) => {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkRes = () => setIsDesktop(window.innerWidth > breakpoint)
    checkRes()
    window.addEventListener('resize', checkRes)
    return () => window.removeEventListener('resize', checkRes)
  }, [breakpoint])

  return isDesktop
}

interface Props {
  params: Promise<{ slug: string }>
}

export default function CaseStudyPage({ params }: Props) {
  const { slug } = use(params)
  // Use undefined for initial loading state
  const [caseStudy, setCaseStudy] = useState<any>(undefined)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    client.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug }).then((data) => {
      setCaseStudy(data || null)
    })
  }, [slug])

  // 1. Loading State
  if (caseStudy === undefined) {
    return (
      <Main>
        <div className={styles.post}>
          <Skeleton />
        </div>
      </Main>
    )
  }

  // 2. Not Found State
  if (caseStudy === null) {
    return (
      <Main>
        <p>Case study not found.</p>
      </Main>
    )
  }

  // 3. Loaded State
  const meta = [
    caseStudy.client && { label: 'Client', value: caseStudy.client },
    caseStudy.myRole && { label: 'Role', value: caseStudy.myRole },
    caseStudy.year && { label: 'Year', value: caseStudy.year },
    caseStudy.tools?.length && { label: 'Tools', value: caseStudy.tools },
  ].filter(Boolean) as { label: string; value: any }[]

  return (
    <Main className={styles.mainPost}>
      <article className={styles.post}>
        <div className={styles.postInfo}>
          <h1 className={styles.title}>{caseStudy.title}</h1>
          {caseStudy.summary && (
            <p className={styles.subtitle}>{caseStudy.summary}</p>
          )}

          {isDesktop && meta.length > 0 && <MetaData meta={meta} />}
        </div>

        <div className={styles.postContent}>
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

          {caseStudy.body && (
            <div className={styles.postBody}>
              <PortableText
                value={caseStudy.body}
                components={portableTextComponents}
              />
            </div>
          )}

          {!isDesktop && meta.length > 0 && <MetaData meta={meta} />}
        </div>
      </article>

      <div className={styles.browsePosts}>
        {caseStudy.prev ? (
          <a href={`/work/${caseStudy.prev.slug}`} className={styles.prevLink}>
            <span className={styles.navLabel}>Previous</span>
            <span className={styles.navTitle}>{caseStudy.prev.title}</span>
          </a>
        ) : (
          <div />
        )}

        {caseStudy.next && (
          <a href={`/work/${caseStudy.next.slug}`} className={styles.nextLink}>
            <span className={styles.navLabel}>Next</span>
            <span className={styles.navTitle}>{caseStudy.next.title}</span>
          </a>
        )}
      </div>
    </Main>
  )
}