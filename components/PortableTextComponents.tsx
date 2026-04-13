import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import type { PortableTextComponents } from '@portabletext/react'

interface LightboxItem {
  src: string
  alt?: string
  type?: 'image' | 'video'
}

export function createPortableTextComponents(
  styles: any,
  urlFor?: (source: any) => any,
  onOpenLightbox?: (item: LightboxItem) => void
): PortableTextComponents {
  return {
    types: {
      image: urlFor
        ? ({ value }: { value: any }) => {
            const src = urlFor(value).width(1600).url()
            const alt = value.alt || ''

            return (
              <figure
                className={styles.figure}
                onClick={() => onOpenLightbox?.({ src, alt, type: 'image' })}
                style={onOpenLightbox ? { cursor: 'zoom-in' } : undefined}
              >
                <Image
                  src={urlFor(value).width(1200).url()}
                  alt={alt}
                  width={1200}
                  height={675}
                  className={styles.bodyImage}
                  style={{ pointerEvents: 'none' }}
                />
                {value.caption && (
                  <figcaption className={styles.caption}>{value.caption}</figcaption>
                )}
              </figure>
            )
          }
        : undefined,

      code: ({ value }: { value: { code: string; language?: string } }) => (
        <SyntaxHighlighter
          language={value.language || 'typescript'}
          style={oneDark}
        >
          {value.code}
        </SyntaxHighlighter>
      ),

      htmlBlock: ({ value }: { value: { html: string } }) => (
        <div dangerouslySetInnerHTML={{ __html: value.html }} />
      ),

      video: ({ value }: { value: { asset: { asset: { url: string } } | null; caption?: string } }) => {
        const url = value.asset?.asset?.url
        if (!url) return null

        return (
          <figure
            className={styles.figure}
            onClick={() => onOpenLightbox?.({ src: url, type: 'video' })}
            style={onOpenLightbox ? { cursor: 'zoom-in' } : undefined}
          >
            <video
              src={url}
              controls={false}
              autoPlay
              muted
              className={styles.bodyVideo}
              style={{ pointerEvents: 'none' }}
            />
            {value.caption && (
              <figcaption className={styles.caption}>{value.caption}</figcaption>
            )}
          </figure>
        )
      },
    },

    block: {
      h2: ({ children }: any) => <h2 className={styles.bodyH2}>{children}</h2>,
      h3: ({ children }: any) => <h3 className={styles.bodyH3}>{children}</h3>,
      normal: ({ children }: any) => <p className={styles.bodyP}>{children}</p>,
    },
  }
}