import Logo from '@/components/Logo/Logo'
import Nav from '@/components/Nav/Nav'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header id='top' className={styles.header}>
      <div className={styles.inner}>
        <Logo height={64} width={103.78} />
        <Nav />
      </div>
    </header>
  )
}