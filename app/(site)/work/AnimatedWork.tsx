"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import styles from "./workPage.module.css"

import Section from "@/components/Section/Section"

import { useEntranceAnimation } from "@/hooks/useEntranceAnimation"

const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

interface Props {
  cases: any[];
}

export default function AnimatedWork({ cases }: Props) {
  const controls = useEntranceAnimation();
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Collect unique tags across all cases
  const allTags = Array.from(
    new Set(cases.flatMap((item) => item.tags ?? []))
  )

  const filteredCases = activeFilter
    ? cases.filter((item) => item.tags?.includes(activeFilter))
    : cases

  return (
    <Section className={styles.layout}>

      <motion.div
        className={styles.heading}
        initial="hidden"
        animate={controls}
        variants={headingVariants}
      >
        <motion.h1 className={styles.title} variants={itemVariants}>
          Selected Work
        </motion.h1>

        <motion.div className={styles.filters} variants={itemVariants}>
          <button
            className={`${styles.filterBtn} ${!activeFilter ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter(null)}
          >
            {!activeFilter && (
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true">
                <path d="M1 4.5L4.5 8.5L11.5 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            All cases
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.filterBtn} ${activeFilter === tag ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              {activeFilter === tag && (
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true">
                  <path d="M1 4.5L4.5 8.5L11.5 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {tag}
            </button>
          ))}
        </motion.div>
      </motion.div>

      <motion.ul
        className={styles.grid}
        initial="hidden"
        animate={controls}
        variants={gridVariants}
      >
        <AnimatePresence mode="popLayout">
          {filteredCases.map((item: any) => (
            <motion.li
              key={item._id}
              variants={itemVariants}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              layout
            >
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
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

    </Section>
  );
}