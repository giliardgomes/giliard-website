'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.01) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
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
  }, [threshold])

  return { ref, inView }
}