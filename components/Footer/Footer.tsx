'use client'

import React from 'react'
import Logo from '../Logo/Logo'
import styles from './Footer.module.css'

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    
    // Accessibility: Move focus to a top-level element
    const topElement = document.getElementById('top') || document.body
    topElement.setAttribute('tabindex', '-1')
    topElement.focus({ preventScroll: true })
  }

  return (
    <footer className={styles.footer} aria-labelledby="footer-navigation">      
      <div className={styles.wrapper}>
        <div className={styles.top}>

          {/* Browse Section */}
          <nav className={styles.footerSection} aria-label="Quick links">
            <h3>Browse</h3>
            <ul className={styles.linksFooter}>
              <li><a href='/work'>Work</a></li>
              <li><a href='/about'>About</a></li>
              <li><a href='/contact'>Contact</a></li>
              <li><a href='/product-expert'>Product Expert</a></li>
              <li><a href='/privacy-policy'>Privacy Policy</a></li>
            </ul>
          </nav>
          
          {/* Contact Section */}
          <nav className={styles.footerSection} aria-label="Contact information">
            <h3>Get in touch</h3>
            <ul className={styles.linksFooter}>
              <li>
                <a href='mailto:hello@giliard.com.br' className={styles.emailLink}>
                  hello@giliard.com.br
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Section */}
          <nav className={styles.footerSection} aria-label="Social media">
            <h3>Let's connect</h3>
            <ul className={`${styles.linksFooter} ${styles.socialLinks}`}>
                <li>
                  <a href='https://linkedin.com' target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label='LinkedIn'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.58214 16H0.264286V5.31786H3.58214V16ZM1.92143 3.86071C0.860714 3.86071 0 2.98214 0 1.92143C0 1.41183 0.202436 0.923111 0.562773 0.562773C0.923111 0.202436 1.41183 0 1.92143 0C2.43102 0 2.91975 0.202436 3.28008 0.562773C3.64042 0.923111 3.84286 1.41183 3.84286 1.92143C3.84286 2.98214 2.98214 3.86071 1.92143 3.86071ZM15.9964 16H12.6857V10.8C12.6857 9.56071 12.6607 7.97143 10.9607 7.97143C9.23571 7.97143 8.97143 9.31786 8.97143 10.7107V16H5.65714V5.31786H8.83929V6.775H8.88571C9.32857 5.93571 10.4107 5.05 12.025 5.05C15.3821 5.05 16 7.26072 16 10.1321V16H15.9964Z" fill="currentColor"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href='https://figma.com' target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label='Figma'>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 2.99375C0 1.34063 1.34063 0 2.99375 0H8.13125C9.78438 0 11.125 1.34063 11.125 2.99375C11.125 4.04063 10.5875 4.9625 9.77188 5.49687C10.5875 6.03125 11.125 6.95312 11.125 8C11.125 9.65312 9.78438 10.9937 8.13125 10.9937H8.06563C7.29063 10.9937 6.58437 10.7 6.05312 10.2156V12.975C6.05312 14.65 4.67813 16 3.00938 16C1.35938 16 0 14.6625 0 13.0063C0 11.9594 0.5375 11.0375 1.35 10.5031C0.5375 9.96875 0 9.04688 0 8C0 6.95312 0.5375 6.03125 1.35 5.49687C0.5375 4.9625 0 4.04063 0 2.99375ZM5.07188 5.9875H2.99375C1.88125 5.9875 0.98125 6.8875 0.98125 8C0.98125 9.10625 1.875 10.0062 2.98125 10.0125C2.98438 10.0125 2.99063 10.0125 2.99375 10.0125H5.07188V5.9875ZM6.05312 8C6.05312 9.1125 6.95312 10.0125 8.06563 10.0125H8.13125C9.24063 10.0125 10.1438 9.1125 10.1438 8C10.1438 6.8875 9.24063 5.9875 8.13125 5.9875H8.06563C6.95312 5.9875 6.05312 6.8875 6.05312 8ZM2.99375 10.9937C2.99063 10.9937 2.98438 10.9937 2.98125 10.9937C1.875 11 0.98125 11.9 0.98125 13.0063C0.98125 14.1156 1.89375 15.0188 3.00938 15.0188C4.14375 15.0188 5.07188 14.1 5.07188 12.975V10.9937H2.99375ZM2.99375 0.98125C1.88125 0.98125 0.98125 1.88125 0.98125 2.99375C0.98125 4.10625 1.88125 5.00625 2.99375 5.00625H5.07188V0.98125H2.99375ZM6.05312 5.00625H8.13125C9.24063 5.00625 10.1438 4.10625 10.1438 2.99375C10.1438 1.88125 9.24063 0.98125 8.13125 0.98125H6.05312V5.00625Z" fill="currentColor"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href='https://github.com' target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label='GitHub'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.89677 0C3.42258 0 0 3.48382 0 8.07266C0 11.7418 2.25161 14.8815 5.46774 15.9865C5.88064 16.0626 6.02581 15.8012 6.02581 15.5862C6.02581 15.3811 6.01613 14.2496 6.01613 13.5548C6.01613 13.5548 3.75806 14.0511 3.28387 12.5689C3.28387 12.5689 2.91613 11.6061 2.3871 11.358C2.3871 11.358 1.64839 10.8385 2.43871 10.8485C2.43871 10.8485 3.24194 10.9146 3.68387 11.7021C4.39032 12.9791 5.57419 12.6119 6.03548 12.3935C6.10968 11.8642 6.31935 11.4969 6.55161 11.2786C4.74839 11.0734 2.92903 10.8055 2.92903 7.62271C2.92903 6.71288 3.17419 6.25631 3.69032 5.67402C3.60645 5.45897 3.33226 4.5723 3.77419 3.42757C4.44839 3.21252 6 4.32086 6 4.32086C6.64516 4.13559 7.33871 4.03964 8.02581 4.03964C8.7129 4.03964 9.40645 4.13559 10.0516 4.32086C10.0516 4.32086 11.6032 3.20921 12.2774 3.42757C12.7194 4.57561 12.4452 5.45897 12.3613 5.67402C12.8774 6.25962 13.1935 6.71619 13.1935 7.62271C13.1935 10.8154 11.2935 11.0701 9.49032 11.2786C9.7871 11.5399 10.0387 12.0362 10.0387 12.8137C10.0387 13.9287 10.029 15.3083 10.029 15.5796C10.029 15.7946 10.1774 16.056 10.5871 15.9799C13.8129 14.8815 16 11.7418 16 8.07266C16 3.48382 12.371 0 7.89677 0Z" fill="currentColor"/>
                    </svg>
                  </a>
                </li>
            </ul>
          </nav>

        </div>
        <div className={styles.bottom}>
          {/* Passed onClick and href down to Logo */}
          <Logo height={32} width="auto" href='#top' onClick={scrollToTop} />
          
          <div className={styles.copyright}>
            <span>© 2026</span>
            <a 
              className={styles.backToTop} 
              href='#top' 
              onClick={scrollToTop} 
              aria-label='Back to top'
            >
              <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="currentColor"/>
                <path d="M8.5 4H9.5V14H8.5V4Z" fill="currentColor"/>
                <path d="M13.8535 8.14648L13.1465 8.85352L9 4.70703L4.85352 8.85352L4.14648 8.14648L9 3.29297L13.8535 8.14648Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}