'use client'

import { useRef, useEffect, useState } from 'react'
import Section from '../Section/Section'
import styles from './StackHome.module.css'

const allTags = [
  // Design, UI & Research
  'a11y', 'Accessibility', 'Branding', 'Design System', 'Design Tokens', 'DesignOps', 'Figma',
  'FullStory', 'Google Analytics', 'High-fidelity UI', 'Hotjar', 'Illustrator', 'Motion Graphics',
  'Pendo', 'Prototyping', 'Sketch', 'Typography', 'UI Design', 'User Testing', 'UX Design',
  'UX Research', 'Visual Interaction', 'Visual QA', 'WCAG', 'ZeroHeight',

  // Development, Operations & Tech
  'Agile', 'AI', 'Antigravity', 'Browser Stack', 'Claude Code', 'Codex', 'Confluence', 'CSS',
  'DevTools', 'Git', 'GitHub', 'HTML', 'JavaScript', 'Jira', 'jQuery', 'Kanban', 'Mantine',
  'Material Design', 'Next.js', 'Node.js', 'React', 'Scrum', 'Storybook', 'Styled Components',
  'Tailwind CSS', 'Terminal', 'TypeScript', 'VS Code', 'Vibe Coding', 'WordPress',
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