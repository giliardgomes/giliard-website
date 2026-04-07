'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Specifically set to 0.25s as requested
      delayChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
}

const typewriterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const letterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function HomeWork({ cases }: Props) {
  const headingText = "Highlighted work"

  return (
    <Section id="homework" className={styles.homeWork}>
      <motion.div 
        className={styles.wrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.p 
          className={styles.sectionTitle}
          variants={typewriterVariants}
        >
          {headingText.split("").map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </motion.p>

        <motion.div 
          className={styles.posts}
          variants={containerVariants}
        >
          {cases.map((item, index) => (
            <motion.div key={item._id} variants={cardVariants}>
              <Link href={`/work/${item.slug.current}`} className={styles.postCard}>
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
                  <h2 className={styles.title}>
                    <span className={styles.titleText}>{item.title}</span>
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={cardVariants}>
          <CallToActions
            className={styles.viewAll}
            tertiary={{ label: 'View more cases', href: '/work' }}
          />
        </motion.div>
      </motion.div>
    </Section>
  )
}