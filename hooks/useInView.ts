'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.25 , waitForHero = false) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
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

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, waitForHero])

  return { ref, inView }
}