import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import Image from 'next/image'

import Main from '@/components/Main/Main'
import { createPortableTextComponents } from '@/components/PortableTextComponents'

import styles from './page.module.css'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  const { data: page } = await sanityFetch({
    query: PAGE_BY_SLUG_QUERY,
    params: { slug },
  })

  if (!page) notFound()

  const components = createPortableTextComponents(styles)

  return (
    <Main className={`${styles.page}${!page.featuredImage?.asset?.url ? ` ${styles.pageNoImage}` : ''}`}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1>{page.title}</h1>
        </div>
        <div className={styles.text}>
          {page.body && (
            <PortableText value={page.body} components={components} />
          )}
        </div>
      </div>
      {page.featuredImage?.asset?.url && (
        <picture className={styles.featuredImage}>
          <Image
            src={page.featuredImage.asset.url}
            alt={page.title}
            width={1200}
            height={630}
            priority
          />
        </picture>
      )}
    </Main>
  )
}