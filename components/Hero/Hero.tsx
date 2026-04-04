'use client'

import React from 'react'

import Section from '../Section/Section'
import CallToActions from '../CallToActions/CallToActions'

import { useScrollScale } from '@/hooks/useScrollScale'
import styles from './Hero.module.css'

const skills = [
  'Design System',
  'Front-end Development',
  'Accessibility-first',
  'AI Workflows',
]

export default function Hero() {
  const scale = useScrollScale()
  
  return (
    <Section id='home' className={styles.hero} style={{ transform: `scale(${scale})`, transformOrigin: 'center top', }}>
      <div className={styles.introText}>
        <p className={styles.intro}>Hello there, I am Giliard Gomes</p>
        <h1 className={styles.headline}>
          Product Designer shaping human-centered digital experiences that matter.
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
        primary={{ label: 'Explore', href: '/work' }}
        secondary={{ label: 'Get in touch', href: '/about' }}
      />
    </Section>
  )
}