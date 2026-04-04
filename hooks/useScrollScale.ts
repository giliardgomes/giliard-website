'use client'

import { useEffect, useState } from 'react'

export function useScrollScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
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