'use client'

import { motion, Variants } from 'framer-motion'
import Section from '../Section/Section'
import Collapse from '../Collapse/Collapse'
import styles from './SkillsHome.module.css'

const skills = [
  { title: 'Design System', content: 'Building scalable, token-based design systems from scratch — component libraries, documentation, and cross-team adoption strategies.' },
  { title: 'UI/UX Design', content: 'End-to-end product design from discovery to high-fidelity prototypes. Focused on clarity, consistency, and delightful interactions.' },
  { title: 'UX Research', content: 'User interviews, usability testing, and data-informed design decisions. Turning insights into actionable design improvements.' },
  { title: 'Front-end Development', content: 'React, Next.js, TypeScript, and CSS — bridging the gap between design and engineering with production-ready implementations.' },
  { title: 'AI-driven', content: 'Integrating AI tools into design and development workflows — from prototyping with LLMs to building AI-powered product features.' },
  { title: 'Accessibility-first', content: 'WCAG-compliant design and development. Building products that work for everyone, regardless of ability or device.' },
  { title: 'Graphic & Branding', content: 'Visual identity, typography, and brand systems that communicate clearly and leave a lasting impression.' },
]

// Typewriter variants for the heading
const typewriterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Adjust speed of typing here
    },
  },
}

const letterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// Collapses variants
const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.1, 
      ease: [0.25, 1, 0.5, 1]
    }
  },
}

export default function SkillsHome() {
  const headingText = "What I do"
  
  return (
    <Section id="skills" className={styles.skillsHome}>
      <div className={styles.wrapper}>
        
        {/* Animated Typewriter Heading */}
        <div className={styles.heading}>
          <motion.p 
            className={styles.label}
            variants={typewriterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 1 }} // Trigger only when fully in view
          >
            {headingText.split("").map((letter, index) => (
              <motion.span 
                key={`${letter}-${index}`} 
                variants={letterVariants}
              >
                {letter}
              </motion.span>
            ))}
          </motion.p>
        </div>
        
        <div className={styles.list}>
          {skills.map((skill) => (
            <motion.div 
              key={skill.title} 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Collapse
                title={skill.title}
                content={<p className={styles.skillContent}>{skill.content}</p>}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}