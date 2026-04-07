'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Collapse.module.css'

interface Props {
  title: string
  content: React.ReactNode
  defaultOpen?: boolean
}

export default function Collapse({ title, content, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const collapse = e.currentTarget.closest(`.${styles.collapse}`) as HTMLElement
    const rect = collapse.getBoundingClientRect()
    const pseudoLeft = rect.left - 32
    const pseudoWidth = rect.width + 64
    const x = ((e.clientX - pseudoLeft) / pseudoWidth) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    collapse.style.setProperty('--origin-x', `${x}%`)
    collapse.style.setProperty('--origin-y', `${y}%`)
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.collapse} data-open={isOpen}>
      <button className={styles.trigger} onClick={handleTriggerClick}>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon} data-open={isOpen} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.body}
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}