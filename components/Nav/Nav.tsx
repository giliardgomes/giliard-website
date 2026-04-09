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
      staggerChildren: 0.25, // Delay between each link
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
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

  useEffect(() => {
    document.documentElement.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [isMenuOpen])

  return (
    <nav className={styles.nav}>
      {/* Desktop/Header List */}
      <motion.ul 
        key={isDesktop ? 'desktop' : 'mobile-header'}
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
                <motion.line 
                  initial={false}
                  animate={{ x1: isMenuOpen ? 13.4 : 0 }}
                  x2="20" y1="1" y2="1" 
                  stroke="var(--color-text)" 
                  strokeWidth="2"
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                />
                <motion.line 
                  initial={false}
                  animate={{ x1: isMenuOpen ? 10 : 0 }}
                  x2="20" y1="9" y2="9" 
                  stroke="var(--color-text)" 
                  strokeWidth="2"
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                />
                <motion.line 
                  initial={false}
                  animate={{ x1: isMenuOpen ? 0 : 10 }}
                  x2="20" y1="17" y2="17" 
                  stroke="var(--color-text)" 
                  strokeWidth="2"
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                />
              </svg>
            </button>
          </motion.li>
        )}
      </motion.ul>

      {/* Mobile Portal List */}
      {mounted && createPortal(
        <AnimatePresence>
          {!isDesktop && isMenuOpen && (
            <motion.div 
              className={styles.mobileMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* This motion.ul MUST be the direct parent of the li for stagger to work */}
              <motion.ul 
                className={styles.mobileLinkContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {links.map((link) => (
                  <motion.li 
                    key={`mobile-${link.name}`} 
                    variants={itemVariants}
                    onClick={() => setIsMenuOpen(false)}
                    className={styles.listItem}
                  >
                    <a href={link.href} className={styles.link}>{link.name}</a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  )
}