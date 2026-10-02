"use client"

import Main from "@/components/Main/Main"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import styles from "./aboutPage.module.css"

import Image from 'next/image'
import { useEffect, useRef, useState } from "react"
import aboutImg from "@/public/images/giliard-nobg.png";
import hqImg from "@/public/images/hq.webp";
import dcImg from "@/public/images/dc.jpeg";
import figmaImg from "@/public/images/figma.png";
import antigravity from "@/public/images/antigravity.png";
import illustratorImg from "@/public/images/ai.png";
import claudeImg from "@/public/images/claude.png";
import codexImg from "@/public/images/codex.png";
import githubImg from "@/public/images/github.png";
import photoshopImg from "@/public/images/ps.png";
import sketchImg from "@/public/images/sketch.png";
import vscodeImg from "@/public/images/vs.png";
import peImg from "@/public/images/pe.webp";

const stackIcons = [
  { src: figmaImg, alt: "Figma" },
  { src: claudeImg, alt: "Claude" },
  { src: vscodeImg, alt: "VS Code" },
  { src: githubImg, alt: "GitHub" },
  { src: codexImg, alt: "Codex" },
  { src: antigravity, alt: "Antigravity" },
  { src: sketchImg, alt: "Sketch" },
  { src: photoshopImg, alt: "Photoshop" },
  { src: illustratorImg, alt: "Illustrator" },
]

const funEmojis = ["⚽️", "🎬", "🍕", "📺", "🏈", "🍔", "✈️", "🌿", "🏀", "🎮"]

// Pick a random emoji not currently shown
function pickEmoji(shown: string[]) {
  const options = funEmojis.filter((emoji) => !shown.includes(emoji))
  return options[Math.floor(Math.random() * options.length)]
}

function FunIcons() {
  const [shown, setShown] = useState(funEmojis.slice(0, 3))

  // Randomize after mount to avoid a hydration mismatch
  useEffect(() => {
    setShown((current) => current.reduce<string[]>((picked) => [...picked, pickEmoji(picked)], []))
  }, [])

  const turn = useRef(0)

  // Only one icon swaps per bounce cycle, taking turns left to right
  const swap = (index: number) => {
    if (turn.current !== index) return
    turn.current = (index + 1) % 3
    setShown((current) => current.map((emoji, i) => (i === index ? pickEmoji(current) : emoji)))
  }

  return (
    <>
      {shown.map((emoji, index) => (
        <div className={styles.funIcon} key={index} onAnimationIteration={() => swap(index)}>
          <p key={emoji}>{emoji}</p>
        </div>
      ))}
    </>
  )
}

export default function ContactPage() {
  const gridRef = useRef<HTMLDivElement>(null)

  // Mark cards as visible once they scroll into view; CSS handles the reveal
  useEffect(() => {
    const cards = gridRef.current?.children
    if (!cards) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        (entry.target as HTMLElement).dataset.visible = ""
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.2 })

    Array.from(cards).forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <Main className={styles.contactPage}>
        <div className={styles.aboutWrapper}>
          <div className={styles.aboutGrid} ref={gridRef}>
            <div className={styles.gridCard}>
              <picture className={styles.imgHeading}>
                <Image
                  src={aboutImg}
                  alt="Giliard Gomes"
                  className={styles.imgAbout}
                />
              </picture>
              <div className={styles.flare} />
            </div>
            <div className={styles.gridCard}>
              <div className={styles.textBlock} style={{ marginBlock: "auto" }}>
                <h1>
                  Hi there, I am Giliard Gomes.
                </h1>
                <p>
                  From Bahia, born and raised in Northeast Brazil. Currently based in Guanambi.
                </p>
                <p style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-text-muted)" }}>🇧🇷  🌴</p>
              </div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.textBlock}>
                <h2>
                  Design stack
                </h2>
                <p>
                  As a Product Designer, the tools that I use the most currently consist of a set of design and prototyping tools, primarily Figma, for creating high-fidelity UI designs and implementing pixel-perfect front-end code using React/TypeScript, HTML, CSS, and more.
                </p>
                <p>
                  Exploring also on designing for graphic and motion.
                </p>
              </div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.stackGrid}>
                {stackIcons.map((icon, index) => (
                  <div className={styles.stackTools} key={icon.alt} style={{ "--i": index } as React.CSSProperties}>
                    <Image src={icon.src} alt={icon.alt} className={styles.toolIcon} />
                    <span>{icon.alt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.photoCollage}>
                <picture className={`${styles.collageImage} ${styles.dcImage}`}>
                  <Image src={dcImg} alt="Giliard in Washington, D.C." />
                </picture>
                <picture className={`${styles.collageImage} ${styles.hqImage}`}>
                  <Image src={hqImg} alt="Giliard at the Quorum office" />
                </picture>
              </div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.textBlock}>
                <h2>
                  Building for Public and Government Affairs
                </h2>
                <p>
                  Currently, I work for an American company called Quorum, a leading provider of Public Affairs software. Working primarily with the Grassroots Advocacy, I build experiences for organizations and government agencies to engage with their communities and stakeholders effectively.
                </p>
                <p>
                  I also lead the Desgin System initiative from visual craft to front-end implementation, ensuring a cohesive and efficient design language across our products.
                </p>
              </div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.fullFlare}></div>
              <div className={styles.textBlock}>
                <h2>
                  Certified Diamond Product Expert
                  <span>by Google</span>
                </h2>
                <p>
                  Member of Google's Product Experts Program since 2012. The program aims to recognize valuable help from users in the Google Communities (previously called Help Forums).
                </p>
                <p>
                  <a href="https://productexperts.withgoogle.com/directory/77c8d27b-e2ce-4179-b672-8eb67f2a4c1b" target="_blank" rel="noopener noreferrer">
                    View public profile
                  </a>
                </p>
              </div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.heightFlare}></div>
              <div className={styles.peFrame}>
                <Image src={peImg} alt="Giliard at PE event" className={styles.peImage} />
              </div>
            </div>
            <div className={styles.gridCard}>
              <FunIcons />
            </div>
            <div className={styles.gridCard}>
              <div className={styles.textBlock}>
                <h2>
                  Just for fun
                </h2>
                <p>
                  Beyond work, design and digital products, I am someone who enjoys filmmaking and great TV series. I’m always sharing my thoughts on what I’ve been watching on <a href="https://letterboxd.com/giliard" target="_blank" rel="noopener noreferrer">Letterboxd</a> and <a href="https://bingers.app/@giliard" target="_blank" rel="noopener noreferrer">Bingers</a>.</p>
                <p>Also, a big sports fan; A passionate Flamenguista.</p>
              </div>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}