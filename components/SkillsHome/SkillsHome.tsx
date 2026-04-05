import Section from '../Section/Section'
import Collapse from '../Collapse/Collapse'
import styles from './SkillsHome.module.css'

const skills = [
  {
    title: 'Design System',
    content: 'Building scalable, token-based design systems from scratch — component libraries, documentation, and cross-team adoption strategies.',
  },
  {
    title: 'UI/UX Design',
    content: 'End-to-end product design from discovery to high-fidelity prototypes. Focused on clarity, consistency, and delightful interactions.',
  },
  {
    title: 'UX Research',
    content: 'User interviews, usability testing, and data-informed design decisions. Turning insights into actionable design improvements.',
  },
  {
    title: 'Front-end Development',
    content: 'React, Next.js, TypeScript, and CSS — bridging the gap between design and engineering with production-ready implementations.',
  },
  {
    title: 'AI-driven',
    content: 'Integrating AI tools into design and development workflows — from prototyping with LLMs to building AI-powered product features.',
  },
  {
    title: 'Accessibility-first',
    content: 'WCAG-compliant design and development. Building products that work for everyone, regardless of ability or device.',
  },
  {
    title: 'Graphic & Branding',
    content: 'Visual identity, typography, and brand systems that communicate clearly and leave a lasting impression.',
  },
]

export default function SkillsHome() {
  return (
    <Section id="skills" className={styles.skillsHome}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <p className={styles.label}>What I do</p>
        </div>
        <div className={styles.list}>
          {skills.map((skill) => (
            <Collapse
              key={skill.title}
              title={skill.title}
              content={skill.content}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}