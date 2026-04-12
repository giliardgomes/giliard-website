'use client'

import { useEffect, useState } from 'react'

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

  const handleIntroClick = () => {
    setGreeting(getRandomGreeting(greeting))
  }

  return (
    <Section id='home' className={styles.hero}>
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
          <p
            className={styles.intro}
            onClick={handleIntroClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleIntroClick()
            }}
            role='button'
            tabIndex={0}
          >
            {displayedText}{isTyping && <span className={styles.cursor}>|</span>}
          </p>
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
          primary={{ label: 'Explore', scrollTo: 'about' }}
          secondary={{ label: 'Get in touch', href: '/contact' }}
        />
      </div>
    </Section>
  )
}