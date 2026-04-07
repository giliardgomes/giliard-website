'use client'
import { motion } from 'framer-motion'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import styles from './Nav.module.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.25,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Nav() {
  const links = [
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={styles.nav}>
      <motion.ul 
        className={styles.list}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.li variants={itemVariants}>
          <ThemeToggle />
        </motion.li>

        {links.map((link) => (
          <motion.li key={link.name} variants={itemVariants}>
            <a href={link.href} className={styles.link}>{link.name}</a>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  )
}