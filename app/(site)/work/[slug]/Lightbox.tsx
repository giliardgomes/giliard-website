'use client'

import { useEffect, useCallback } from 'react'
import styles from './Lightbox.module.css'

import { X } from 'lucide-react'

interface LightboxProps {
  src: string
  alt?: string
  type?: 'image' | 'video'
  onClose: () => void
}

export default function Lightbox({ src, alt, type = 'image', onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        <X size={20} />
      </button>

      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {type === 'image' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ''} className={styles.media} />
        ) : (
          <video src={src} controls autoPlay loop className={styles.media} />
        )}
      </div>
    </div>
  )
}