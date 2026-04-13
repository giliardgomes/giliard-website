'use client'

import { useState, useEffect, use, useCallback } from 'react'
import { client } from '@/sanity/lib/client'
import { CASE_STUDY_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'

import Main from '@/components/Main/Main'
import { createPortableTextComponents } from '@/components/PortableTextComponents'
import MetaData from './MetaData'
import Lightbox from './Lightbox'
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
    <div className={styles.skeletonText} />
  </div>
)

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

interface LightboxItem {
  src: string
  alt?: string
  type?: 'image' | 'video'
}

interface Props {
  params: Promise<{ slug: string }>
}

export default function CaseStudyClient({ params }: Props) {
  const { slug } = use(params)
  const [caseStudy, setCaseStudy] = useState<any>(undefined)
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null)
  const isDesktop = useIsDesktop()

  const openLightbox = useCallback((item: LightboxItem) => setLightbox(item), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])

  const components = createPortableTextComponents(styles, urlFor, openLightbox)

  useEffect(() => {
    let isMounted = true
    client.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug }).then((data) => {
      if (isMounted) setCaseStudy(data || null)
    })
    return () => { isMounted = false }
  }, [slug])

  if (caseStudy === undefined) {
    return (
      <Main className={styles.mainPost}>
        <div className={styles.post}>
          <Skeleton />
        </div>
      </Main>
    )
  }

  if (caseStudy === null) {
    return (
      <Main className={styles.mainPost}>
        <section className={styles.post}>
          <p>Case study not found.</p>
        </section>
      </Main>
    )
  }

  const meta = [
    caseStudy.client && { label: 'Company', value: caseStudy.client },
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

        <div className={styles.postContent} id="post">
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
              <PortableText value={caseStudy.body} components={components} />
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

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          type={lightbox.type}
          onClose={closeLightbox}
        />
      )}
    </Main>
  )
}