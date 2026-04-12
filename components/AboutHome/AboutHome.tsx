'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import Section from '../Section/Section'
import CapitalTag from '../CapitalTag/CapitalTag'
import CallToActions from '../CallToActions/CallToActions'
import styles from './AboutHome.module.css'
import aboutImg from "@/public/images/about.png";

const logos = [
  { src: '/images/logos/uber.svg', alt: 'Uber', width: 46 },
  { src: '/images/logos/toyota.svg', alt: 'Toyota', width: 97 },
  { src: '/images/logos/stripe.svg', alt: 'Stripe', width: 39 },
  { src: '/images/logos/mastercard.svg', alt: 'Mastercard', width: 93 },
  { src: '/images/logos/walmart.svg', alt: 'Walmart', width: 67 },
  { src: '/images/logos/expedia.svg', alt: 'Expedia', width: 80 },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
}

export default function AboutHome() {
  const sectionRef = useRef<HTMLElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)
  const prevThemeRef = useRef<string | null>(null)
  const [animateLogs, setAnimateLogs] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          entry.target.classList.add(styles.exited)
        } else {
          entry.target.classList.remove(styles.exited)
        }
      },
      { threshold: 0 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimateLogs(true) },
      { threshold: 0.2 }
    )
    if (logosRef.current) observer.observe(logosRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleDragStart = () => {
    prevThemeRef.current = document.documentElement.getAttribute('data-theme')
    document.documentElement.setAttribute('data-theme', 'dark')
  }

  const handleDragEnd = () => {
    if (prevThemeRef.current !== null) {
      document.documentElement.setAttribute('data-theme', prevThemeRef.current)
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }
  
  return (
    <Section id="about" className={styles.aboutHome} ref={sectionRef}>
      <motion.div 
        className={styles.wrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className={styles.aboutMe}>
          <motion.h3 className={styles.label} variants={textVariants}>
            About
          </motion.h3>
          <div className={styles.content}>
            <div className={styles.text}>
              <motion.p variants={textVariants}>
                With over a decade of experience shaping digital products, with <strong>8+ years</strong> dedicated to UI/UX, design systems, and front-end development.
              </motion.p>
              <motion.p variants={textVariants}>
                Currently at <strong>Quorum</strong>, building industry-leading software for Government and Public Affairs.
              </motion.p>
              <motion.div variants={textVariants}>
                <CallToActions link={{ label: 'Read more', href: '/about' }} />
              </motion.div>
            </div>
            
            <motion.div 
              className={styles.picture} 
              variants={textVariants}
              style={{ position: 'relative', backgroundColor: 'transparent' }}
            >
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: 'transparent', 
                  color: 'var(--color-accent)', 
                  textAlign: 'center',
                  padding: '24px',
                  zIndex: 0,
                  userSelect: 'none'
                }}
              >
                <svg width="80" height="60" viewBox="209 267 358 262" fill="currentColor" style={{ marginBottom: '16px', opacity: 0.9 }}>
                  <path d="m 357.85714,268.79075 23.39286,18.57143 0,35.71429 -56.96429,59.64285 -6.42857,0 -42.67857,-20.35714 0,-6.42857 92.14286,-35.35714 0,-8.21429 -110.89286,25 -7.5,0 -38.21428,-38.92857 3.57142,-8.92857 157.14286,0 z" />
                  <path d="m 363.57143,357.00504 -40.35715,49.28571 40.00001,-27.85714 -18.92857,56.42857 22.41071,-30.71428 0,98.39285 13.83929,25.17857 0,-147.67857 c -9.31467,-3.10369 -15.26628,-10.4112 -16.96429,-23.03571 z" />
                  <path d="m 418.58929,268.79075 -23.39286,18.57143 0,35.71429 56.96429,59.64285 6.42857,0 42.67857,-20.35714 0,-6.42857 -92.14286,-35.35714 0,-8.21429 110.89286,25 7.5,0 38.21428,-38.92857 -3.57142,-8.92857 -157.14286,0 z" />
                  <path d="m 412.875,357.00504 40.35715,49.28571 -40.00001,-27.85714 18.92857,56.42857 -22.41071,-30.71428 0,98.39285 -13.83929,25.17857 0,-147.67857 c 9.31467,-3.10369 15.26628,-10.4112 16.96429,-23.03571 z" />
                </svg>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', opacity: 0.7 }}>When you're lost in the darkness</p>
                <p style={{ margin: 'var(--spacing-xs) 0 0', fontWeight: '800', fontSize: 'var(--font-size-md)', color: 'var(--color-text)', fontFamily: 'var(--font-serif)' }}>Look for the light.</p>
              </div>

              <motion.div 
                drag 
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.6}
                whileDrag={{ scale: 1.05, rotate: -2, zIndex: 10 }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1, touchAction: 'none' }}
              >
                <Image
                  src={aboutImg}
                  alt="Giliard Gomes"
                  fill
                  priority
                  placeholder="blur"
                  style={{ objectFit: 'cover', pointerEvents: 'none' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div className={styles.trusted} variants={textVariants}>
          <CapitalTag dataSize="xs" content="Work trusted by teams at" />
          <div className={styles.logos} ref={logosRef}>
            <div className={styles.logosTrack} data-animate={animateLogs}>
              {(isMobile ? [...logos, ...logos] : logos).map((logo, i) => (
                <img 
                  key={isMobile ? `${logo.alt}-${i}` : logo.alt} 
                  src={logo.src} 
                  alt={logo.alt} 
                  height={16} 
                  width={logo.width} 
                  className={styles.logo} 
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div className={styles.divider} variants={textVariants} />

      </motion.div>
    </Section>
  )
}