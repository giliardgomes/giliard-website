import styles from './CapitalTag.module.css'

interface Props {
  content: React.ReactNode
  className?: string
  dataSize?: 'sm' | 'md' | 'lg'
}

export default function CapitalTag({ content, className, dataSize = 'md' }: Props) {
  return (
    <div
      className={`${styles.capitalTag} ${className ?? ''}`}
      data-size={dataSize}
    >
      {content}
    </div>
  )
}