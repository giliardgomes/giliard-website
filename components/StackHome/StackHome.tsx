'use client'

import { useRef, useEffect, useState } from 'react'
import Section from '../Section/Section'
import styles from './StackHome.module.css'

const allTags = [
  // Design & UI
  'Design System', 'Design Tokens', 'Figma', 'Sketch', 'Illustrator', 'UI Design', 'UX Design',
  'Branding', 'Visual Interaction', 'Motion', 'Lottie', 'Prototyping', 'High-fidelity UI', 'Microinteractions', 'Iconography', 'Typography',

  // Development & Styling
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Less', 'Styled Components', 
  'Tailwind CSS', 'Mantine', 'CSS Variables', 'Vite', 'Storybook', 'jQuery', 'Material-UI', 'VS Code',

  // Research & Analytics
  'UX Research', 'User Testing', 'User Surveys', 'Dovetail', 'Pendo', 'Hotjar', 
  'FullStory', 'Google Analytics',

  // Infrastructure & CMS
  'Node.js', 'Vercel', 'Sanity', 'WordPress', 'GitHub', 'Git', 'ZeroHeight', 'Terminal',

  // Accessibility & QA
  'Accessibility', 'WCAG', 'a11y', 'Visual QA', 'DevTools', 'Browser Stack', 

  // Management & Operations
  'Jira', 'Confluence', 'Airtable', 'DesignOps', 'Agile', 'Scrum', 'Kanban',

  // Emerging Tech
  'Claude Code', 'Vibe Coding', 'AI',
];

const shuffleArray = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5)
}

function MarqueeRow({ tags, reverse = false }: { tags: string[], reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const isHovered = useRef(false)
  const lastX = useRef(0)

  const doubled = [...tags, ...tags]
  const DURATION = 200000

  useEffect(() => {
    if (!trackRef.current) return

    const keyframes = reverse
      ? [{ transform: 'translateX(-50%)' }, { transform: 'translateX(0)' }]
      : [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }]

    animationRef.current = trackRef.current.animate(keyframes, {
      duration: DURATION,
      iterations: Infinity,
      easing: 'linear',
    })

    return () => animationRef.current?.cancel()
  }, [reverse])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    lastX.current = e.pageX
    if (animationRef.current) animationRef.current.pause()
    trackRef.current?.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !animationRef.current || !trackRef.current) return

    const deltaX = e.pageX - lastX.current
    lastX.current = e.pageX

    const trackWidth = trackRef.current.scrollWidth / 2
    const timeDelta = (deltaX / trackWidth) * DURATION
    const currentPos = animationRef.current.currentTime as number
    
    animationRef.current.currentTime = reverse 
      ? currentPos + timeDelta 
      : currentPos - timeDelta
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false)
    trackRef.current?.releasePointerCapture(e.pointerId)
    
    if (animationRef.current) {
      animationRef.current.play()
      animationRef.current.playbackRate = isHovered.current ? 0.1 : 1
    }
  }

  const handleMouseEnter = () => {
    isHovered.current = true
    if (animationRef.current && !isDragging) {
      animationRef.current.playbackRate = 0.1
    }
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    if (animationRef.current && !isDragging) {
      animationRef.current.playbackRate = 1
    }
  }

  return (
    <div className={styles.marqueeWrapper}>
      <div
        ref={trackRef}
        className={styles.marqueeTrack}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-dragging={isDragging}
        style={{ 
          touchAction: 'none',
          userSelect: 'none',
          display: 'flex',
          width: 'max-content'
        }}
      >
        {doubled.map((tag, i) => (
          <span key={i} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function StackHome() {
  const [rows, setRows] = useState<string[][]>([])

  useEffect(() => {
    const shuffled = shuffleArray(allTags)
    
    setRows([
      shuffled,
      [...shuffled.slice(6), ...shuffled.slice(0, 6)],
      [...shuffled.slice(12), ...shuffled.slice(0, 12)],
      [...shuffled.slice(3), ...shuffled.slice(0, 3)],
    ])
  }, [])

  // @ts-ignore
  if (rows.length === 0) return <Section id="stack" className={styles.stackHome} />

  return (
    <Section id="stack" className={styles.stackHome}>
      <div className={styles.rows}>
        <MarqueeRow tags={rows[0]} />
        <MarqueeRow tags={rows[1]} reverse />
        <MarqueeRow tags={rows[2]} />
        <MarqueeRow tags={rows[3]} reverse />
      </div>
    </Section>
  )
}