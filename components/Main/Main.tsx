import styles from './Main.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function Main({ children, className }: Props) {
  return (
    <main className={`${styles.main} ${className || ''}`}>
      {children}
    </main>
  )
}