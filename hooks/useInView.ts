'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.01, waitForHero = false) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If waitForHero is true, check if Hero section is fully out of view
          if (waitForHero) {
            const heroSection = document.getElementById('home')
            if (heroSection) {
              const heroBounds = heroSection.getBoundingClientRect()
              // Only set inView if Hero is fully scrolled out (bottom <= 0)
              if (heroBounds.bottom <= 0) {
                setInView(true)
              }
            } else {
              setInView(true) // No hero, proceed normally
            }
          } else {
            setInView(true)
          }
        } else {
          // if scrolled back above the element, remove the class
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