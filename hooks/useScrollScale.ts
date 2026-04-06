'use client'

import { useEffect, useState } from 'react'

export function useScrollScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home')
      if (!heroSection) return

      const heroBounds = heroSection.getBoundingClientRect()
      const heroHeight = heroSection.offsetHeight

      // Stop scaling once Hero is fully out of view
      if (heroBounds.bottom <= 0) {
        setScale(1)
        return
      }

      const scrollY = window.scrollY
      const vh = window.innerHeight
      const progress = Math.min(scrollY / vh, 1)
      const newScale = 1 - progress * 0.10
      setScale(newScale)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scale
}