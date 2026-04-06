import styles from './CapitalTag.module.css'

interface Props {
  content: React.ReactNode
  className?: string
  dataSize?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function CapitalTag({ content, className, dataSize = 'xs' }: Props) {
  return (
    <div
      className={`${styles.capitalTag} ${className ?? ''}`}
      data-size={dataSize}
    >
      {content}
    </div>
  )
}