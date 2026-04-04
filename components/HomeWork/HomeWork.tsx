import styles from './HomeWork.module.css'

import Section from '../Section/Section'

export default function HomeWork() {
  return (
    <Section id='homework' className={styles.homeWork}>
        <div className={styles.wrapper}>
            Homework
        </div>
    </Section>
  )
}