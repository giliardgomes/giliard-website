import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import type { PortableTextComponents } from '@portabletext/react'

export function createPortableTextComponents(
  styles: any,
  urlFor?: (source: any) => any,
): PortableTextComponents {
  return {
    types: {
      image: urlFor
        ? ({ value }: { value: any }) => (
            <figure className={styles.figure}>
              <Image
                src={urlFor(value).width(1200).url()}
                alt={value.alt || ''}
                width={1200}
                height={675}
                className={styles.bodyImage}
              />
              {value.caption && (
                <figcaption className={styles.caption}>{value.caption}</figcaption>
              )}
            </figure>
          )
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
    },
    block: {
      h2: ({ children }: any) => <h2 className={styles.bodyH2}>{children}</h2>,
      h3: ({ children }: any) => <h3 className={styles.bodyH3}>{children}</h3>,
      normal: ({ children }: any) => <p className={styles.bodyP}>{children}</p>,
    },
  }
}