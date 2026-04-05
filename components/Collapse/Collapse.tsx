'use client'

import { useState } from 'react'
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
  const pseudoLeft = rect.left - 32   // accounts for left: -2rem
  const pseudoWidth = rect.width + 64 // accounts for width: calc(100% + 4rem)
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
      {isOpen && (
        <div className={styles.body}>
          {content}
        </div>
      )}
    </div>
  )
}