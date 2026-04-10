import Link from 'next/link'
import Image from 'next/image'
import Main from "@/components/Main/Main"
import { client } from '@/sanity/lib/client'
import { CASE_STUDIES_QUERY } from '@/sanity/lib/queries'
import styles from './workPage.module.css'

export default async function WorkPage() {
  const cases = await client.fetch(CASE_STUDIES_QUERY)

  return (
    <Main>
      <section className={styles.layout}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Selected Work</h1>

          {/* Filter pills — wire up interactivity later if needed */}
          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${styles.filterBtnActive}`}>
              {/* checkmark icon */}
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true">
                <path d="M1 4.5L4.5 8.5L11.5 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All cases
            </button>
            <button className={styles.filterBtn}>Product Design</button>
            <button className={styles.filterBtn}>Front-end</button>
            <button className={styles.filterBtn}>Branding</button>
          </div>
        </div>

        <ul className={styles.grid}>
          {cases.map((item: any) => (
            <li key={item._id}>
              <Link href={`/work/${item.slug.current}`} className={styles.postRow}>
                <div className={styles.postImage}>
                  {item.coverImage?.asset?.url && (
                    <Image
                      src={item.coverImage.asset.url}
                      alt={item.title}
                      fill
                      className={styles.postImageImg}
                    />
                  )}
                </div>
                <div className={styles.postText}>
                  <h2 className={styles.postTitle}>{item.title}</h2>
                  {item.summary && (
                    <p className={styles.postSummary}>{item.summary}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Main>
  )
}