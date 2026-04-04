import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li><ThemeToggle /></li>
        <li><a href="/work" className={styles.link}>Work</a></li>
      </ul>
    </nav>
  )
}