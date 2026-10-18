import { useState, type CSSProperties, type ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './volume.module.less'

/** 封面装帧：书脊压痕、包边高光，以及可选的纸面颗粒。 */
export function BookCoverFinish({ textured = false }: { textured?: boolean }) {
  return <div aria-hidden="true" className={clsx(styles.coverFinish, textured && styles.textured)} />
}

/** 阅读器与书架共用封面排版，插图和书名各自保留清晰的空间。 */
export function BookCoverArtwork({
  image,
  title,
  titleContent,
  author,
  textured = false,
}: {
  image: string
  title: string
  titleContent?: ReactNode
  author: string
  textured?: boolean
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null)
  return (
    <div className={styles.coverArtwork}>
      <div className={styles.artworkImage}>
        {image && failedImage !== image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailedImage(image)}
          />
        )}
      </div>
      <div className={styles.coverHeading}>
        {titleContent ??
          title.split(/(\s+)/).map((part, index) =>
            part.trim() ? (
              <span className={styles.titleWord} key={index}>
                {part}
              </span>
            ) : (
              part
            )
          )}
      </div>
      <p className={styles.coverAuthor}>{author}</p>
      <BookCoverFinish textured={textured} />
    </div>
  )
}

export function BookPageBlock({ depth, left = false }: { depth: number; left?: boolean }) {
  if (depth <= 0) return null
  return (
    <div
      aria-hidden="true"
      className={clsx(styles.paperBlock, left && styles.leftBlock)}
      style={{ '--block-depth': `${Math.max(depth, 0.2)}px` } as CSSProperties}
    >
      <div className={styles.paperSurface} />
      <div className={styles.foreEdge} />
      <div className={styles.topEdge} />
      <div className={styles.bottomEdge} />
    </div>
  )
}

interface BookCover3DProps {
  coverImage: string
  title: string
  author: string
  coverColor?: string
  thickness?: number
  textured?: boolean
}

export function BookCover3D({
  coverImage,
  title,
  author,
  coverColor = '#17213a',
  thickness = 36,
  textured = false,
}: BookCover3DProps) {
  return (
    <div className={styles.coverScene} aria-hidden="true">
      <div
        className={styles.closedBook}
        style={{ '--book-depth': `${thickness}px`, '--book-color': coverColor } as CSSProperties}
      >
        <div className={styles.backBoard} />
        <div className={styles.bindingSpine}>
          <span>{title}</span>
        </div>
        <BookPageBlock depth={thickness} />
        <div className={styles.frontBoard}>
          <BookCoverArtwork image={coverImage} title={title} author={author} textured={textured} />
        </div>
      </div>
    </div>
  )
}
