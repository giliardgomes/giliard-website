'use client'

import Image from 'next/image'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { useInView } from '@/hooks/useInView'
import Section from '../Section/Section'
import CallToActions from '../CallToActions/CallToActions'
import styles from './HomeWork.module.css'

const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source)
}

interface CaseStudy {
  _id: string
  title: string
  slug: { current: string }
  coverImage: any
}

interface Props {
  cases: CaseStudy[]
}

export default function HomeWork({ cases }: Props) {
  const { ref, inView } = useInView()

  return (
    <Section
      ref={ref}
      id="homework"
      className={`${styles.homeWork} ${inView ? styles.visible : ''}`}
    >
      <div className={styles.wrapper}>
        <p className={styles.sectionTitle}>Highlighted work</p>
        <div className={styles.posts}>
          {cases.map((item, index) => (
            <Link key={item._id} href={`/work/${item.slug.current}`} className={styles.postCard}>
              <div className={styles.imageWrapper}>
                {item.coverImage && (
                  <Image
                    src={urlFor(item.coverImage).width(720).height(405).url()}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
              <div className={styles.titlePost}>
                <span className={styles.counter}>{index + 1}</span>
                <h2 className={styles.title}>{item.title}</h2>
              </div>
            </Link>
          ))}
        </div>
        <CallToActions
          className={styles.viewAll}
          tertiary={{ label: 'View more cases', href: '/work' }}
        />
      </div>
    </Section>
  )
}