import { useState, type CSSProperties, type ReactNode } from 'react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import styles from './volume.module.less'

/** 封面装帧：书脊压痕、包边高光，以及可选的纸面颗粒。 */
export function BookCoverFinish({ textured = false }: { textured?: boolean }) {
  return <div aria-hidden="true" className={clsx(styles.coverFinish, textured && styles.textured)} />
}

/** 阅读器与书架共用满幅封面，书名与作者叠在图片上。 */
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

/** 封底图片保持满幅，可叠加简介等自定义内容。 */
export function BookBackCoverArtwork({
  image = '',
  content,
  title,
  author,
  textured = false,
}: {
  image?: string
  content?: ReactNode
  title: string
  author: string
  textured?: boolean
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null)
  return (
    <div className={clsx(styles.coverArtwork, styles.backCoverArtwork)}>
      <div className={styles.artworkImage}>
        {image && failedImage !== image && (
          <img src={image} alt="" decoding="async" draggable={false} onError={() => setFailedImage(image)} />
        )}
      </div>
      <div className={styles.backCoverCopy} data-book-scroll>
        <span className={styles.backCoverLabel}>关于本书</span>
        <h3>{title}</h3>
        {content != null && <div className={styles.backCoverDescription}>{content}</div>}
      </div>
      <p className={styles.backCoverAuthor}>{author}</p>
      <BookCoverFinish textured={textured} />
    </div>
  )
}

/** 独立的完整书体用于翻转；两面分别装配封底与封面。 */
export function BookTurnover3D({
  front,
  back,
  title,
  onComplete,
}: {
  front: ReactNode
  back: ReactNode
  title: string
  onComplete: () => void
}) {
  return (
    <motion.div
      className={styles.turnoverBook}
      initial={{ rotateX: 4, rotateY: 24, y: 0 }}
      animate={{ rotateX: 4, rotateY: 156, y: [0, -10, 0] }}
      transition={{ duration: 0.85, ease: [0.22, 0.65, 0.3, 1] }}
      onAnimationComplete={onComplete}
      aria-hidden="true"
      inert
    >
      <div className={styles.turnoverBack}>{back}</div>
      <div className={styles.turnoverFront}>{front}</div>
      <div className={styles.turnoverForeEdge} />
      <div className={styles.turnoverTopEdge} />
      <div className={styles.turnoverBottomEdge} />
      <div className={styles.turnoverSpine}>
        <span>{title}</span>
      </div>
    </motion.div>
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
