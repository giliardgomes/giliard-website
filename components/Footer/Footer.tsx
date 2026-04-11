'use client'

import React, { useState } from 'react'
import Logo from '../Logo/Logo'
import styles from './Footer.module.css'

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    
    const topElement = document.getElementById('top') || document.body
    topElement.setAttribute('tabindex', '-1')
    topElement.focus({ preventScroll: true })
  }

  const [copied, setCopied] = useState(false)

  const handleEmailClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    await navigator.clipboard.writeText('hello@giliard.com.br')
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
    window.location.href = 'mailto:hello@giliard.com.br'
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-labelledby="footer-navigation">      
      <div className={styles.wrapper}>
        <div className={styles.top}>

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
          
          <nav className={styles.footerSection} aria-label="Contact information">
            <h3>Get in touch</h3>
            <ul className={styles.linksFooter}>
              <li className={styles.emailLink} title='Click to copy email'>
              <a
                  href='mailto:hello@giliard.com.br'
                  onClick={handleEmailClick}
                  aria-label={copied ? 'Email copied to clipboard' : 'Send email to hello@giliard.com.br'}
                >
                  {copied ? 'COPIED' : 'hello@giliard.com.br'}
                </a>
              </li>
            </ul>
          </nav>

          <nav className={styles.footerSection} aria-label="Social media">
            <h3>Let's connect</h3>
            <ul className={`${styles.linksFooter} ${styles.socialLinks}`}>
                <li>
                  <a href='https://linkedin.com/in/giliardgomes' target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label='LinkedIn'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.58214 16H0.264286V5.31786H3.58214V16ZM1.92143 3.86071C0.860714 3.86071 0 2.98214 0 1.92143C0 1.41183 0.202436 0.923111 0.562773 0.562773C0.923111 0.202436 1.41183 0 1.92143 0C2.43102 0 2.91975 0.202436 3.28008 0.562773C3.64042 0.923111 3.84286 1.41183 3.84286 1.92143C3.84286 2.98214 2.98214 3.86071 1.92143 3.86071ZM15.9964 16H12.6857V10.8C12.6857 9.56071 12.6607 7.97143 10.9607 7.97143C9.23571 7.97143 8.97143 9.31786 8.97143 10.7107V16H5.65714V5.31786H8.83929V6.775H8.88571C9.32857 5.93571 10.4107 5.05 12.025 5.05C15.3821 5.05 16 7.26072 16 10.1321V16H15.9964Z" fill="currentColor"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href='https://figma.com/@giliard' target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label='Figma'>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 2.99375C0 1.34063 1.34063 0 2.99375 0H8.13125C9.78438 0 11.125 1.34063 11.125 2.99375C11.125 4.04063 10.5875 4.9625 9.77188 5.49687C10.5875 6.03125 11.125 6.95312 11.125 8C11.125 9.65312 9.78438 10.9937 8.13125 10.9937H8.06563C7.29063 10.9937 6.58437 10.7 6.05312 10.2156V12.975C6.05312 14.65 4.67813 16 3.00938 16C1.35938 16 0 14.6625 0 13.0063C0 11.9594 0.5375 11.0375 1.35 10.5031C0.5375 9.96875 0 9.04688 0 8C0 6.95312 0.5375 6.03125 1.35 5.49687C0.5375 4.9625 0 4.04063 0 2.99375ZM5.07188 5.9875H2.99375C1.88125 5.9875 0.98125 6.8875 0.98125 8C0.98125 9.10625 1.875 10.0062 2.98125 10.0125C2.98438 10.0125 2.99063 10.0125 2.99375 10.0125H5.07188V5.9875ZM6.05312 8C6.05312 9.1125 6.95312 10.0125 8.06563 10.0125H8.13125C9.24063 10.0125 10.1438 9.1125 10.1438 8C10.1438 6.8875 9.24063 5.9875 8.13125 5.9875H8.06563C6.95312 5.9875 6.05312 6.8875 6.05312 8ZM2.99375 10.9937C2.99063 10.9937 2.98438 10.9937 2.98125 10.9937C1.875 11 0.98125 11.9 0.98125 13.0063C0.98125 14.1156 1.89375 15.0188 3.00938 15.0188C4.14375 15.0188 5.07188 14.1 5.07188 12.975V10.9937H2.99375ZM2.99375 0.98125C1.88125 0.98125 0.98125 1.88125 0.98125 2.99375C0.98125 4.10625 1.88125 5.00625 2.99375 5.00625H5.07188V0.98125H2.99375ZM6.05312 5.00625H8.13125C9.24063 5.00625 10.1438 4.10625 10.1438 2.99375C10.1438 1.88125 9.24063 0.98125 8.13125 0.98125H6.05312V5.00625Z" fill="currentColor"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href='https://github.com/giliardgomes' target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label='GitHub'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.89677 0C3.42258 0 0 3.48382 0 8.07266C0 11.7418 2.25161 14.8815 5.46774 15.9865C5.88064 16.0626 6.02581 15.8012 6.02581 15.5862C6.02581 15.3811 6.01613 14.2496 6.01613 13.5548C6.01613 13.5548 3.75806 14.0511 3.28387 12.5689C3.28387 12.5689 2.91613 11.6061 2.3871 11.358C2.3871 11.358 1.64839 10.8385 2.43871 10.8485C2.43871 10.8485 3.24194 10.9146 3.68387 11.7021C4.39032 12.9791 5.57419 12.6119 6.03548 12.3935C6.10968 11.8642 6.31935 11.4969 6.55161 11.2786C4.74839 11.0734 2.92903 10.8055 2.92903 7.62271C2.92903 6.71288 3.17419 6.25631 3.69032 5.67402C3.60645 5.45897 3.33226 4.5723 3.77419 3.42757C4.44839 3.21252 6 4.32086 6 4.32086C6.64516 4.13559 7.33871 4.03964 8.02581 4.03964C8.7129 4.03964 9.40645 4.13559 10.0516 4.32086C10.0516 4.32086 11.6032 3.20921 12.2774 3.42757C12.7194 4.57561 12.4452 5.45897 12.3613 5.67402C12.8774 6.25962 13.1935 6.71619 13.1935 7.62271C13.1935 10.8154 11.2935 11.0701 9.49032 11.2786C9.7871 11.5399 10.0387 12.0362 10.0387 12.8137C10.0387 13.9287 10.029 15.3083 10.029 15.5796C10.029 15.7946 10.1774 16.056 10.5871 15.9799C13.8129 14.8815 16 11.7418 16 8.07266C16 3.48382 12.371 0 7.89677 0Z" fill="currentColor"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href='https://bsky.app/profile/giliard.com.br' 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.socialLink} 
                    aria-label='Bluesky'
                  >
                    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.50253 1.94477C5.32398 3.31047 7.28265 6.08563 8 7.57634C8.71735 6.08875 10.676 3.31359 12.4975 1.94477C13.8105 0.957209 15.9376 0.194665 15.9376 2.62606C15.9376 3.11046 15.66 6.70441 15.4979 7.28882C14.9302 9.31394 12.8655 9.83272 11.0285 9.51708C14.2378 10.064 15.055 11.8766 13.2897 13.6892C9.93996 17.1331 8.47719 12.8266 8.10292 11.7235C8.0499 11.5703 8.02183 11.4797 8 11.4797C7.97817 11.4797 7.9501 11.5734 7.89708 11.7235C7.52281 12.8266 6.05692 17.1331 2.71033 13.6892C0.948148 11.8766 1.76218 10.064 4.97154 9.51708C3.1345 9.83272 1.06979 9.31394 0.505263 7.2857C0.339961 6.70129 0.0623779 3.10733 0.0623779 2.62293C0.0623779 0.19154 2.18947 0.954084 3.50253 1.94164V1.94477Z" fill="#FAFAFA"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href='https://dribbble.com/giliardgomes' 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.socialLink} 
                    aria-label='Dribble'
                  >
                    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.75 0C3.47813 0 0 3.47813 0 7.75C0 12.0219 3.47813 15.5 7.75 15.5C12.0219 15.5 15.5 12.0219 15.5 7.75C15.5 3.47813 12.0219 0 7.75 0ZM12.875 3.575C13.7969 4.7 14.3562 6.1375 14.3687 7.7C14.15 7.65312 11.9625 7.20938 9.75937 7.4875C9.57812 7.05 9.40938 6.6625 9.17813 6.1875C11.625 5.1875 12.7344 3.76562 12.875 3.57812V3.575ZM12.1375 2.80938C12.0188 2.97813 11.0219 4.31875 8.66875 5.2C7.58437 3.20625 6.38125 1.56875 6.2 1.325C8.3 0.81875 10.5125 1.36563 12.1406 2.80938H12.1375ZM4.93437 1.76875C5.10938 2.00937 6.29062 3.64688 7.3875 5.59688C4.29062 6.41875 1.5625 6.40625 1.26875 6.40312C1.7 4.35 3.08437 2.64375 4.93437 1.76875ZM1.13125 7.75937C1.13125 7.69062 1.13125 7.625 1.13437 7.55625C1.425 7.5625 4.63125 7.60313 7.9375 6.61562C8.12813 6.9875 8.30938 7.3625 8.475 7.7375C6.08125 8.4125 3.90625 10.3469 2.83437 12.1844C1.775 11.0125 1.13125 9.45937 1.13125 7.75937ZM3.6875 12.9812C4.37813 11.5687 6.25625 9.74375 8.925 8.83125C9.85313 11.2469 10.2375 13.2719 10.3375 13.85C8.20937 14.7563 5.65 14.5094 3.6875 12.9781V12.9812ZM11.45 13.2469C11.3812 12.8438 11.0312 10.9062 10.1625 8.52812C12.2375 8.19687 14.0594 8.74063 14.2844 8.8125C13.9906 10.6531 12.9312 12.2437 11.4469 13.25L11.45 13.2469Z" fill="#FAFAFA"/>
                    </svg>
                  </a>
                </li>
            </ul>
          </nav>

        </div>
        <div className={styles.bottom}>
          <Logo height={32} width={51.89} href='#top' onClick={scrollToTop} />
          
          <div className={styles.copyright}>
            <span>Designed and Coded by Giliard Gomes © {currentYear}</span>
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