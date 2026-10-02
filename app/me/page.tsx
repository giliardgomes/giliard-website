"use client"

import Main from "@/components/Main/Main"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import styles from "./aboutPage.module.css"

import Image from 'next/image'
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
  { src: vscodeImg, alt: "Visual Studio Code" },
  { src: githubImg, alt: "GitHub" },
  { src: codexImg, alt: "Codex" },
  { src: antigravity, alt: "Antigravity" },
  { src: sketchImg, alt: "Sketch" },
  { src: photoshopImg, alt: "Adobe Photoshop" },
  { src: illustratorImg, alt: "Adobe Illustrator" },
]

export default function ContactPage() {
  return (
    <>
      <Header />
      <Main className={styles.contactPage}>
        <div className={styles.aboutWrapper}>
          <div className={styles.aboutGrid}>
            <div className={styles.gridCard}>
              <Image
                  src={aboutImg}
                  alt="Giliard Gomes"
                  className={styles.imgAbout}
                />
                <div className={styles.flare} />
            </div>
            <div className={styles.gridCard}>
              <div className={styles.textBlock}>
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
                {stackIcons.map((icon) => (
                  <Image src={icon.src} alt={icon.alt} className={styles.toolIcon} key={icon.alt} />
                ))}
              </div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.photoCollage}>
                <Image src={hqImg} alt="Giliard at the Quorum office" className={`${styles.collageImage} ${styles.hqImage}`} />
                <Image src={dcImg} alt="Giliard in Washington, D.C." className={`${styles.collageImage} ${styles.dcImage}`} />
              </div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.textBlock}>
                <h2>
                  Building for government and public affairs
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
              <Image src={peImg} alt="Giliard at PE event" className={styles.peImage} />
            </div>
            <div className={styles.gridCard}>
              <div className={styles.funIcon}>
                <p>⚽️</p>
              </div>
              <div className={styles.funIcon}>
                <p>🎬</p>
              </div>
              <div className={styles.funIcon}>
                <p>🍕</p>
              </div>
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