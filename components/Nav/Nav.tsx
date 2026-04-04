import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li><a href="/work" className={styles.link}>Work</a></li>
        <li><a href="/about" className={styles.link}>About</a></li>
        <li><a href="/contact" className={styles.link}>Contact</a></li>
      </ul>
    </nav>
  )
}