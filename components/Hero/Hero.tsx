import React from 'react'
import styles from './Hero.module.css'

const skills = [
  'Design System',
  'Front-end Development',
  'Accessibility-first',
  'AI Workflows',
]

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.introText}>
        <p className={styles.intro}>Hello there, I am Giliard Gomes</p>
        <h1 className={styles.headline}>
          Product Designer shaping human-centered digital experiences that matter.
        </h1>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.tagline}>
        {skills.map((skill, index) => (
          <React.Fragment key={skill}>
            <span className={styles.skill}>{skill}</span>
            {index < skills.length - 1 && (
              <span className={styles.slash}>/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}