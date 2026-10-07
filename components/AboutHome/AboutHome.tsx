'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import Section from '../Section/Section'
import CapitalTag from '../CapitalTag/CapitalTag'
import CallToActions from '../CallToActions/CallToActions'
import styles from './AboutHome.module.css'
import aboutImg from "@/public/images/g-home.png";

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
              <Image
                src={aboutImg}
                alt="Giliard Gomes"
                fill
                priority
                placeholder="blur"
                style={{ objectFit: 'cover', objectPosition: 'right bottom' }}
              />
            </motion.div>
          </div>
        </div>

        <motion.div className={styles.divider} variants={textVariants} />

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
      </motion.div>
    </Section>
  )
}