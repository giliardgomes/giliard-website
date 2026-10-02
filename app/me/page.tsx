"use client"

import Main from "@/components/Main/Main"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import styles from "./aboutPage.module.css"

import Image from 'next/image'
import aboutImg from "@/public/images/giliard-nobg.png";

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
            </div>
            <div className={styles.gridCard}>
              <div className={styles.textBlock}>
                <h1>
                  Hi there, I am Giliard Gomes.
                </h1>
                <p>
                  From Bahia, born and raised in Northeast Brazil. Currently based in Guanambi.
                </p>
                <p style={{ fontSize: "var(--font-size-2xl)" }}>🇧🇷</p>
              </div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.textBlock}>
                <h2>
                  Design stack
                </h2>
                <p>
                  As a Product Designer, my tools nowadays consist of designing high-fidelity UI in Figma and implementing pixel-perfect front-end code.
                </p>
                <p>
                  I also can work on designing for graphic and motion.
                </p>
              </div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.stackGrid}>
              </div>
            </div>
            <div className={styles.gridCard}>
              <h3>Giliard Gomes</h3>
            </div>
            <div className={styles.gridCard}>
              <h3>Giliard Gomes</h3>
            </div>
            <div className={styles.gridCard}>
              <h3>Giliard Gomes</h3>
            </div>
            <div className={styles.gridCard}>
              <h3>Giliard Gomes</h3>
            </div>
            <div className={styles.gridCard}>
              <h3>Giliard Gomes</h3>
            </div>
            <div className={styles.gridCard}>
              <h3>Giliard Gomes</h3>
            </div>
            <div className={styles.gridCard}>
              <h3>Giliard Gomes</h3>
            </div>
            <div className={styles.gridCard}>
              <h3>Giliard Gomes</h3>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}