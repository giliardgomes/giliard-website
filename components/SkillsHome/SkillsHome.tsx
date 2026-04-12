'use client'

import { motion, Variants } from 'framer-motion'
import Section from '../Section/Section'
import Collapse from '../Collapse/Collapse'
import styles from './SkillsHome.module.css'

const skills = [
  { 
    title: 'Design Systems', 
    content: 'I build end-to-end Design Systems, from advanced Figma libraries to production-ready code. I standardize UI components using React and TypeScript, syncing Figma with Storybook and GitHub to provide teams with documented, accessible, and scalable shared components for the entire organization.',
  },
  { 
    title: 'UI/UX Design', 
    content: 'I handle full-cycle product design, creating high-fidelity prototypes based on design system standards. I turn complex flows into simple, polished interfaces that are accessible, responsive, and aligned with the brand..' 
  },
  { 
    title: 'UX Research', 
    content: 'I drive design decisions by combining user interviews, prototype testing, and behavioral analytics. I turn quantitative and qualitative data into clear insights that directly improve the user experience, using tools like Dovetail, Google Analytics, FullStory, Hotjar, Datadog, and more.' 
  },
  { 
    title: 'Front-end Coding', 
    content: 'I turn designs into production code by building interfaces with high visual accuracy. I focus on high-quality code and performance using React, Styled Components, Mantine, HTML, CSS, JavaScript/jQuery, Tailwind, and more.' 
  },
  { 
    title: 'AI workflow', 
    content: 'I improve my daily work by using AI and "Vibe Coding" to build things faster. I integrate these tools into my creative process to speed up prototyping and deliver features quickly, using Claude, Claude Code, Gemini, and Figma AI.' 
  },
  { 
    title: 'Accessibility-first', 
    content: 'I take an accessibility-first approach by following WCAG standards to ensure products work for everyone. I build inclusive, compliant interfaces by integrating proper contrast, keyboard navigation for users with visual and other disabilities directly into my process.' 
  },
  { 
    title: 'Brand Identity', 
    content: 'I create brand identities and visual systems that work across different platforms. I focus on keeping the look and feel consistent so the brand is easy to recognize and always tells a story.' 
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