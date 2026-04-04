import Logo from '@/components/Logo/Logo'
import Nav from '@/components/Nav/Nav'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />
        <Nav />
      </div>
    </header>
  )
}