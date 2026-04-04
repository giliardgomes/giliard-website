import styles from './Section.module.css'

interface Props {
  children: React.ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}

export default function Section({ children, id, className, style }: Props) {
  return (
    <section id={id} className={`${styles.section} ${className || ''}`}  style={style}>
      {children}
    </section>
  )
}