'use client'

import { useEffect, useRef, useState } from 'react'

import Section from '../Section/Section'
import CallToActions from '../CallToActions/CallToActions'

import { useScrollScale } from '@/hooks/useScrollScale'
import styles from './Hero.module.css'

const welcomingPhrases = [
  'Hello, I\'m a',
  'Hi, I\'m a',
  'Howdy, I\'m a',
  'Hey, I\'m a',
  'Welcome, I\'m a',
  'Greetings, I\'m a',
  'I am Giliard, a',
  'One does not simply walk into Mordor, but I\'m a',
  'May the force be with you, I\'m a',
  'This is the way, I\'m a',
  'Don\'t panic, I\'m a',
  'Hello there, I\'m a',
  'Cheers, I\'m a',
  'E aí, I\'m a',
  'I am the one who knocks, I\'m a',
]

const skills = [
  'From accessible, delightful UX to high-quality front-end code, I craft interfaces that are as functional as they are polished by leveraging AI in my workflows.',
]

const MIN_STARS = 10
const MAX_STARS = 20

const headlineText = 'Product Designer crafting scalable interfaces through design and code.'

// Moved outside the component — does not depend on any state or props
const getRandomGreeting = (exclude?: string): string => {
  if (welcomingPhrases.length === 0) return ''
  if (welcomingPhrases.length === 1) return welcomingPhrases[0]

  let nextGreeting = ''
  do {
    const randomIndex = Math.floor(Math.random() * welcomingPhrases.length)
    nextGreeting = welcomingPhrases[randomIndex]
  } while (exclude !== undefined && nextGreeting === exclude)

  return nextGreeting
}

export default function Hero() {
  const scale = useScrollScale()
  const heroRef = useRef<HTMLElement>(null)
  const starsRef = useRef<HTMLSpanElement[]>([])

  const [greeting, setGreeting] = useState('')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Inlined to avoid stale closure warning — only runs once on mount
  useEffect(() => {
    setGreeting(getRandomGreeting())
  }, [])

  useEffect(() => {
    if (!greeting) return

    setDisplayedText('')
    setIsTyping(true)

    let currentIndex = 1
    setDisplayedText(greeting.slice(0, currentIndex))

    const interval = setInterval(() => {
      currentIndex += 1
      if (currentIndex <= greeting.length) {
        setDisplayedText(greeting.slice(0, currentIndex))
      } else {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [greeting])

  // Track the pointer so the dot pattern can be highlighted around it
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let frame = 0
    const handlePointerMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect()
        hero.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
        hero.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
      })
    }

    hero.addEventListener('pointermove', handlePointerMove)
    return () => {
      hero.removeEventListener('pointermove', handlePointerMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Every second, light up 10-20 random dots of the background grid like twinkling stars
  useEffect(() => {
    const hero = heroRef.current
    const stars = starsRef.current
    if (!hero || stars.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const GRID = 36 // matches background-size in Hero.module.css

    const twinkle = () => {
      const cols = Math.floor(hero.clientWidth / GRID)
      const rows = Math.floor(hero.clientHeight / GRID)
      const count = MIN_STARS + Math.floor(Math.random() * (MAX_STARS - MIN_STARS + 1))

      // Pick distinct grid cells so two stars never land on the same dot
      const cells = new Set<number>()
      while (cells.size < Math.min(count, cols * rows)) {
        cells.add(Math.floor(Math.random() * cols * rows))
      }

      Array.from(cells).forEach((cell, i) => {
        const x = (cell % cols) * GRID + GRID / 2
        const y = Math.floor(cell / cols) * GRID + GRID / 2
        const star = stars[i]

        star.style.transform = `translate(${x}px, ${y}px)`
        star.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], {
          duration: 1000,
          easing: 'ease-in-out',
        })
      })
    }

    twinkle()
    const interval = setInterval(twinkle, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleIntroClick = () => {
    setGreeting(getRandomGreeting(greeting))
  }

  return (
    <Section id='home' className={styles.hero} ref={heroRef}>
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <span
          key={i}
          ref={(el) => { if (el) starsRef.current[i] = el }}
          className={styles.star}
          aria-hidden='true'
        />
      ))}
      <div
        id='hero-content'
        className={styles.heroContent}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          top: 0,
        }}
      >
        <div className={styles.introText}>
          <h1 className={styles.headline}>
            {headlineText}
          </h1>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.tagline}>
          {skills.map((skill) => (
            <span key={skill} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
        <CallToActions
          className={styles.ctaEntrance}
          primary={{ label: 'View work', scrollTo: 'homework' }}
          secondary={{ label: 'Get in touch', href: '/contact' }}
        />
      </div>
    </Section>
  )
}