'use client'

import { useRef, useEffect } from 'react'
import Section from '../Section/Section'
import styles from './StackHome.module.css'

const allTags = [
  'Design System',
  'Visual Interaction',
  'Prototyping',
  'High-fidelity',
  'UX Research',
  'User Testing',
  'HTML',
  'CSS',
  'JavaScript',
  'jQuery',
  'React',
  'Confluence',
  'TypeScript',
  'Visual QA',
  'Branding',
  'Jira',
  'Illustrator',
  'Figma',
  'Storybook',
  'GitHub',
  'ZeroHeight',
  'Accessibility',
  'Claude Code',
  'Tailwind',
  'Photoshop',
]

const row1 = allTags
const row2 = [...allTags.slice(6), ...allTags.slice(0, 6)]
const row3 = [...allTags.slice(12), ...allTags.slice(0, 12)]
const row4 = [...allTags.slice(3), ...allTags.slice(0, 3)]

function MarqueeRow({ tags, reverse = false }: { tags: string[], reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const doubled = [...tags, ...tags]

  useEffect(() => {
    if (!trackRef.current) return

    const keyframes = reverse
      ? [{ transform: 'translateX(-50%)' }, { transform: 'translateX(0)' }]
      : [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }]

    animationRef.current = trackRef.current.animate(keyframes, {
      duration: 72000,
      iterations: Infinity,
      easing: 'linear',
    })

    return () => animationRef.current?.cancel()
  }, [reverse])

  const handleMouseEnter = () => {
    if (animationRef.current) animationRef.current.playbackRate = 0.1
  }

  const handleMouseLeave = () => {
    if (animationRef.current) animationRef.current.playbackRate = 1
  }

  return (
    <div className={styles.marqueeWrapper}>
      <div
        ref={trackRef}
        className={styles.marqueeTrack}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {doubled.map((tag, i) => (
          <span key={i} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function StackHome() {
  return (
    <Section id="stack" className={styles.stackHome}>
      <div className={styles.rows}>
        <MarqueeRow tags={row1} />
        <MarqueeRow tags={row2} reverse />
        <MarqueeRow tags={row3} />
        <MarqueeRow tags={row4} reverse />
      </div>
    </Section>
  )
}