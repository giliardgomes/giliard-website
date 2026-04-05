import React from 'react'
import styles from './Section.module.css'

interface Props {
  children: React.ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}

const Section = React.forwardRef<HTMLElement, Props>(
  ({ children, id, className, style }, ref) => {
    return (
      <section
        id={id}
        className={`${styles.section} ${className ?? ''}`}
        style={style}
        ref={ref}
      >
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section