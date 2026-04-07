'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import styles from './Nav.module.css'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1]
    } 
  },
}

export default function Nav() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const links = [
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    setMounted(true)
    const checkRes = () => {
      const desktop = window.innerWidth > 768
      setIsDesktop(desktop)
      if (desktop) setIsMenuOpen(false)
    }

    checkRes()
    window.addEventListener('resize', checkRes)
    return () => window.removeEventListener('resize', checkRes)
  }, [])

  return (
    <nav className={styles.nav}>
      <motion.ul 
        className={styles.list}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.li variants={itemVariants} className={styles.listItem}>
          <ThemeToggle />
        </motion.li>

        {isDesktop && links.map((link) => (
          <motion.li key={link.name} variants={itemVariants} className={styles.listItem}>
            <a href={link.href} className={styles.link}>{link.name}</a>
          </motion.li>
        ))}

        {!isDesktop && (
          <motion.li variants={itemVariants} className={styles.listItem}>
            <button 
              className={styles.menuButton} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="1" x2="20" y2="1" stroke="var(--color-text)" strokeWidth="2"/>
                <line x1="0" y1="9" x2="20" y2="9" stroke="var(--color-text)" strokeWidth="2"/>
                <line 
                  x1={isMenuOpen ? "0" : "10"} 
                  y1="17" 
                  x2="20" 
                  y2="17" 
                  stroke="var(--color-text)" 
                  strokeWidth="2" 
                  style={{ transition: '0.3s cubic-bezier(0.25, 1, 0.5, 1)' }}
                />
              </svg>
            </button>
          </motion.li>
        )}

        {mounted && createPortal(
          <AnimatePresence>
            {!isDesktop && isMenuOpen && (
              <motion.div 
                className={styles.mobileMenu}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* We wrap links in a div or fragment since <ul> 
                   isn't wrapping them in the portal root 
                */}
                <div className={styles.mobileLinkContainer}>
                  {links.map((link) => (
                    <motion.li 
                      key={link.name} 
                      variants={itemVariants}
                      onClick={() => setIsMenuOpen(false)}
                      className={styles.listItem}
                    >
                      <a href={link.href} className={styles.link}>{link.name}</a>
                    </motion.li>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </motion.ul>
    </nav>
  )
}