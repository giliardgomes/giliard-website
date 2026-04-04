'use client'

import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDarkMode = stored === 'dark' || (!stored && prefersDark)
    setIsDark(isDarkMode)
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label="Toggle dark mode"
      data-mounted={mounted}
    >
      <span className={styles.icon}>
        {mounted ? (isDark ? '☀️' : '🌙') : null}
      </span>
    </button>
  )
}