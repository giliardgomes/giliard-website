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
  'I design accessible, delightful interfaces focused on UX, building design systems that scale, developing front-end code, and keeping AI as a close ally throughout.',
]

const headlineText = 'Product Designer shaping human-centered digital experiences that matter.'

export default function Hero() {
  const scale = useScrollScale()

  const getRandomGreeting = (exclude?: string) => {
    if (welcomingPhrases.length === 0) return ''
    if (welcomingPhrases.length === 1) return welcomingPhrases[0]

    let nextGreeting = ''
    do {
      const randomIndex = Math.floor(Math.random() * welcomingPhrases.length)
      nextGreeting = welcomingPhrases[randomIndex]
    } while (exclude !== undefined && nextGreeting === exclude)

    return nextGreeting
  }

  const [greeting, setGreeting] = useState('')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const loadRandomGreeting = (exclude?: string) => {
    const nextGreeting = getRandomGreeting(exclude)
    setGreeting(nextGreeting)
  }

  useEffect(() => {
    loadRandomGreeting()
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
    loadRandomGreeting(greeting)
  }

  return (
    <Section id='home' className={styles.hero} style={{ transform: `scale(${scale})`, transformOrigin: 'center top', }}>
      <div className={styles.introText}>
        <p className={styles.intro} onClick={handleIntroClick} role='button' tabIndex={0}>
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
    </Section>
  )
}