import styles from './CaseStudy.module.css'

interface MetaItem {
  label: string
  value: string | string[]
}

interface MetaDataProps {
  meta: MetaItem[]
}

const MetaData = ({ meta }: MetaDataProps) => {
  if (!meta || meta.length === 0) return null

  return (
    <dl className={styles.meta}>
      {meta.map(({ label, value }) => (
        <div key={label} className={styles.metaRow}>
          <dt className={styles.metaLabel}>{label}</dt>
          <dd className={styles.metaValue}>
            {Array.isArray(value) ? (
              <div className={styles.toolsList}>
                {value.map((tool) => (
                  <span key={tool} className={styles.toolBadge}>
                    {tool}
                  </span>
                ))}
              </div>
            ) : (
              <span className={styles.textValue}>{value}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default MetaData