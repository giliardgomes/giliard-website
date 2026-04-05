import Section from '../Section/Section'
import styles from './AboutHome.module.css'

import CapitalTag from '../CapitalTag/CapitalTag'

export default function AboutHome({ }) {
  return (
    <Section
      id="work-summary"
      className={styles.aboutHome}
    >
      <div className={styles.wrapper}>
        <CapitalTag dataSize='sm' content="About me" />
        <h2>Currently</h2>
      </div>
    </Section>
  )
}