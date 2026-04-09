'use client'

import { motion, Variants } from 'framer-motion'
import Section from '../Section/Section'
import Collapse from '../Collapse/Collapse'
import styles from './SkillsHome.module.css'

const skills = [
  { 
    title: 'Design Systems', 
    content: 'Architecting scalable, token-based libraries and comprehensive documentation that bridge the gap between Figma and code, ensuring cross-team consistency.' 
  },
  { 
    title: 'UI/UX Design', 
    content: 'Full-cycle product design focused on visual interaction and high-fidelity prototyping. Transforming complex user flows into intuitive, polished interfaces.' 
  },
  { 
    title: 'UX Research', 
    content: 'Driving data-informed decisions through user testing and behavioral analytics. Leveraging tools like Hotjar and Dovetail to turn insights into actionable design.' 
  },
  { 
    title: 'Front-end Engineering', 
    content: 'Bridging the gap between pure design and production code. Engineering pixel-perfect, responsive interfaces using HTML, CSS, and React, while maintaining high standards for performance and code quality.' 
  },
  { 
    title: 'AI & Emerging Tech', 
    content: 'Optimizing workflows with AI-driven development and Vibe Coding. Integrating LLMs into the creative process to accelerate prototyping and feature delivery.' 
  },
  { 
    title: 'Accessibility & QA', 
    content: 'An accessibility-first approach rooted in WCAG standards. Committed to building inclusive, a11y-compliant products through rigorous visual and technical QA.' 
  },
  { 
    title: 'Brand Identity', 
    content: 'Crafting cohesive visual systems and brand languages that resonate across platforms, ensuring every touchpoint communicates a clear, lasting narrative.' 
  },
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