import Image from 'next/image'
import Section from '../Section/Section'
import CapitalTag from '../CapitalTag/CapitalTag'
import CallToActions from '../CallToActions/CallToActions'
import styles from './AboutHome.module.css'

const logoUber = '/images/logos/uber.svg'
const logoToyota = '/images/logos/toyota.svg'
const logoStripe = '/images/logos/stripe.svg'
const logoMastercard = '/images/logos/mastercard.svg'
const logoWalmart = '/images/logos/walmart.svg'
const logoExpedia = '/images/logos/expedia.svg'

const logos = [
  { src: logoUber, alt: 'Uber', width: 46 },
  { src: logoToyota, alt: 'Toyota', width: 97 },
  { src: logoStripe, alt: 'Stripe', width: 39 },
  { src: logoMastercard, alt: 'Mastercard', width: 93 },
  { src: logoWalmart, alt: 'Walmart', width: 67 },
  { src: logoExpedia, alt: 'Expedia', width: 80 },
]

export default function AboutHome() {
  return (
    <Section id="about" className={styles.aboutHome}>
      <div className={styles.wrapper}>
        <div className={styles.aboutMe}>
          <h3 className={styles.label}>About</h3>
          <div className={styles.content}>
            <div className={styles.text}>
              <p>
                Working for over a decade shaping digital products — 8+ years focused on user experience, design systems, and front-end craft.
              </p>
              <p>
                Currently working at Quorum, an American tech company, leading provider of Government and Public Affairs software.
              </p>
              <div className={styles.trusted}>
                <CapitalTag dataSize="sm" content="Trusted by teams at" />
                <div className={styles.logos}>
                  {logos.map((logo) => (
                    <img
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      height={16}
                      width={logo.width}
                      className={styles.logo}
                    />
                  ))}
                </div>
              </div>
              <CallToActions
                link={{ label: 'Read more', href: '/about' }}
              />
            </div>
            <div className={styles.picture}>
              <Image
                src="https://giliard.com.br/wp-content/themes/shaped/img/hero.png"
                alt="Giliard Gomes"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        <hr className={styles.divider} />
      </div>
    </Section>
  )
}