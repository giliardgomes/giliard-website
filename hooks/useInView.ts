// hooks/useInView.ts
'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.25, waitForHero = false) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf: number

    raf = requestAnimationFrame(() => {
      // Check immediately — handles back navigation where element
      // is already in viewport before IntersectionObserver fires
      const rect = el.getBoundingClientRect()
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

      if (alreadyVisible && !waitForHero) {
        setInView(true)
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (waitForHero) {
              const heroSection = document.getElementById('about')
              if (heroSection) {
                const heroBounds = heroSection.getBoundingClientRect()
                if (heroBounds.bottom <= 0) {
                  setInView(true)
                }
              } else {
                setInView(true)
              }
            } else {
              setInView(true)
            }
          } else {
            if (entry.boundingClientRect.top > 0) {
              setInView(false)
            }
          }
        },
        { threshold }
      )

      observer.observe(el)
      // Store observer for cleanup
      ;(el as any).__observer = observer
    })

    return () => {
      cancelAnimationFrame(raf)
      const observer = (el as any).__observer
      if (observer) observer.disconnect()
    }
  }, [threshold, waitForHero])

  return { ref, inView }
}