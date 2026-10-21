import { useState, type CSSProperties, type ReactNode } from 'react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import styles from './volume.module.less'

export type BookCoverStyle = 'illustrated' | 'classic' | 'leather' | 'golden-jacket' | 'editorial-orange'
export type BookCoverLayout = 'standard' | 'centered' | 'publisher'
export type BookSpineStyle = 'auto' | 'smooth' | 'ribbed' | 'banded' | 'ornate' | 'minimal'

/** 封面装帧：书脊压痕、包边高光，以及可选的纸面颗粒。 */
export function BookCoverFinish({ textured = false }: { textured?: boolean }) {
  return <div aria-hidden="true" className={clsx(styles.coverFinish, textured && styles.textured)} />
}

/** 阅读器与书架共用满幅封面，书名与作者叠在图片上。 */
export function BookCoverArtwork({
  image,
  imagePosition,
  title,
  titleContent,
  label,
  content,
  author,
  subtitle,
  publisher,
  coverStyle = 'illustrated',
  coverLayout = 'standard',
  color,
  fontFamily,
  titleSize,
  titleColor,
  textColor,
  accentColor,
  textAlign,
  titleStyle,
  textured = false,
}: {
  image: string
  imagePosition?: string
  title: string
  titleContent?: ReactNode
  label?: ReactNode
  content?: ReactNode
  author?: ReactNode
  subtitle?: ReactNode
  publisher?: ReactNode
  coverStyle?: BookCoverStyle
  coverLayout?: BookCoverLayout
  color?: string
  fontFamily?: string
  titleSize?: number | string
  titleColor?: string
  textColor?: string
  accentColor?: string
  textAlign?: 'left' | 'center' | 'right'
  titleStyle?: CSSProperties
  textured?: boolean
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null)
  const normalizedTitleSize = typeof titleSize === 'number' ? `${titleSize}px` : titleSize
  return (
    <div
      className={styles.coverArtwork}
      data-cover-style={coverStyle}
      data-cover-layout={coverLayout}
      data-has-cover-label={label != null ? 'true' : undefined}
      style={
        {
          ...(color ? { '--cover-base-color': color } : {}),
          ...(fontFamily ? { '--cover-font-family': fontFamily } : {}),
          ...(normalizedTitleSize ? { '--cover-title-size': normalizedTitleSize } : {}),
          ...(titleColor ? { '--cover-title-color-override': titleColor } : {}),
          ...(textColor ? { '--cover-text-color-override': textColor } : {}),
          ...(accentColor ? { '--cover-accent-override': accentColor } : {}),
          ...(textAlign ? { '--cover-title-align': textAlign } : {}),
        } as CSSProperties
      }
    >
      <div className={styles.artworkImage}>
        {image && failedImage !== image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
            onError={() => setFailedImage(image)}
          />
        )}
      </div>
      <div className={styles.coverDecoration} aria-hidden="true" />
      {label != null && <div className={styles.coverLabel}>{label}</div>}
      <div className={styles.coverHeading} style={titleStyle}>
        {titleContent === undefined
          ? title.split(/(\s+)/).map((part, index) =>
              part.trim() ? (
                <span className={styles.titleWord} key={index}>
                  {part}
                </span>
              ) : (
                part
              )
            )
          : titleContent}
      </div>
      {subtitle != null && <div className={styles.coverSubtitle}>{subtitle}</div>}
      {content != null && <div className={styles.coverContent}>{content}</div>}
      {author != null && <div className={styles.coverAuthor}>{author}</div>}
      {publisher != null && <div className={styles.coverPublisher}>{publisher}</div>}
      <BookCoverFinish textured={textured} />
    </div>
  )
}

/** 封底图片保持满幅，可叠加简介等自定义内容。 */
export function BookBackCoverArtwork({
  image = '',
  content,
  label = '关于本书',
  title,
  subtitle,
  author,
  publisher,
  coverStyle = 'illustrated',
  coverLayout = 'standard',
  color,
  fontFamily,
  titleColor,
  textColor,
  accentColor,
  textAlign,
  titleStyle,
  imagePosition,
  textured = false,
}: {
  image?: string
  content?: ReactNode
  label?: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
  author?: ReactNode
  publisher?: ReactNode
  coverStyle?: BookCoverStyle
  coverLayout?: BookCoverLayout
  color?: string
  fontFamily?: string
  titleColor?: string
  textColor?: string
  accentColor?: string
  textAlign?: 'left' | 'center' | 'right'
  titleStyle?: CSSProperties
  imagePosition?: string
  textured?: boolean
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null)
  return (
    <div
      className={clsx(styles.coverArtwork, styles.backCoverArtwork)}
      data-cover-style={coverStyle}
      data-cover-layout={coverLayout}
      style={
        {
          ...(color ? { '--cover-base-color': color } : {}),
          ...(fontFamily ? { '--cover-font-family': fontFamily } : {}),
          ...(titleColor ? { '--cover-title-color-override': titleColor } : {}),
          ...(textColor ? { '--cover-text-color-override': textColor } : {}),
          ...(accentColor ? { '--cover-accent-override': accentColor } : {}),
          ...(textAlign ? { '--cover-title-align': textAlign } : {}),
        } as CSSProperties
      }
    >
      <div className={styles.artworkImage}>
        {image && failedImage !== image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
            onError={() => setFailedImage(image)}
          />
        )}
      </div>
      <div className={styles.coverDecoration} aria-hidden="true" />
      <div className={styles.backCoverCopy} data-book-scroll>
        {label != null && <span className={styles.backCoverLabel}>{label}</span>}
        {title != null && <h3 style={titleStyle}>{title}</h3>}
        {subtitle != null && <div className={styles.backCoverSubtitle}>{subtitle}</div>}
        {content != null && <div className={styles.backCoverDescription}>{content}</div>}
      </div>
      {(author != null || publisher != null) && (
        <div className={styles.backCoverFooter}>
          {author != null && <div className={styles.backCoverAuthor}>{author}</div>}
          {publisher != null && <div className={styles.backCoverPublisher}>{publisher}</div>}
        </div>
      )}
      <BookCoverFinish textured={textured} />
    </div>
  )
}

export function BookSpineCopy({
  title,
  subtitle,
  author,
  spineStyle = 'auto',
}: {
  title?: ReactNode
  subtitle?: ReactNode
  author?: ReactNode
  spineStyle?: BookSpineStyle
}) {
  const hideSpineRidges = spineStyle !== 'auto' && spineStyle !== 'ornate'
  const hideEndCaps = spineStyle === 'smooth' || spineStyle === 'minimal'
  return (
    <>
      {spineStyle === 'ornate' && <span aria-hidden="true" className={styles.spineOrnament} />}
      {!hideEndCaps && <span aria-hidden="true" className={clsx(styles.spineEndCap, styles.spineEndCapTop)} />}
      {!hideEndCaps && <span aria-hidden="true" className={clsx(styles.spineEndCap, styles.spineEndCapBottom)} />}
      {!hideSpineRidges && <span aria-hidden="true" className={clsx(styles.spineRidge, styles.spineRidgeInner)} />}
      {!hideSpineRidges && <span aria-hidden="true" className={clsx(styles.spineRidge, styles.spineRidgeOuter)} />}
      <span className={styles.spineCopy}>
        {title != null && <span className={styles.spineTitle}>{title}</span>}
        {subtitle != null && <span className={styles.spineSubtitle}>{subtitle}</span>}
        {author != null && <span className={styles.spineAuthor}>{author}</span>}
      </span>
    </>
  )
}

/** 独立的完整书体用于翻转；两面分别装配封底与封面。 */
export function BookTurnover3D({
  front,
  back,
  title,
  spineTitle,
  spineSubtitle,
  spineAuthor,
  spineStyle = 'auto',
  coverStyle = 'illustrated',
  tilt = 4,
  rotation = 24,
  endRotation,
  onComplete,
}: {
  front: ReactNode
  back: ReactNode
  title: string
  spineTitle?: ReactNode
  spineSubtitle?: ReactNode
  spineAuthor?: ReactNode
  spineStyle?: BookSpineStyle
  coverStyle?: BookCoverStyle
  tilt?: number
  rotation?: number
  endRotation?: number
  onComplete: () => void
}) {
  return (
    <motion.div
      className={styles.turnoverBook}
      data-cover-style={coverStyle}
      initial={{ rotateX: tilt, rotateY: rotation, y: 0 }}
      animate={{ rotateX: tilt, rotateY: endRotation ?? 180 - rotation, y: [0, -10, 0] }}
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
      <div className={styles.turnoverSpine} data-cover-style={coverStyle} data-spine-style={spineStyle}>
        <BookSpineCopy
          title={spineTitle ?? title}
          subtitle={spineSubtitle}
          author={spineAuthor}
          spineStyle={spineStyle}
        />
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
  coverStyle?: BookCoverStyle
  coverLayout?: BookCoverLayout
  coverImagePosition?: string
  coverTitle?: ReactNode
  coverAuthor?: ReactNode
  coverLabel?: ReactNode
  coverContent?: ReactNode
  coverSubtitle?: ReactNode
  coverPublisher?: ReactNode
  coverFontFamily?: string
  coverTitleSize?: number | string
  coverTitleColor?: string
  coverTextColor?: string
  coverAccentColor?: string
  coverTextAlign?: 'left' | 'center' | 'right'
  coverTitleStyle?: CSSProperties
  spineTitle?: ReactNode
  spineSubtitle?: ReactNode
  spineAuthor?: ReactNode
  spineColor?: string
  spineTextColor?: string
  spineAccentColor?: string
  spineStyle?: BookSpineStyle
}

export function BookCover3D({
  coverImage,
  title,
  author,
  coverColor,
  thickness = 36,
  textured = false,
  coverStyle = 'illustrated',
  coverLayout = 'standard',
  coverImagePosition,
  coverTitle,
  coverAuthor,
  coverLabel,
  coverContent,
  coverSubtitle,
  coverPublisher,
  coverFontFamily,
  coverTitleSize,
  coverTitleColor,
  coverTextColor,
  coverAccentColor,
  coverTextAlign,
  coverTitleStyle,
  spineTitle,
  spineSubtitle,
  spineAuthor,
  spineColor,
  spineTextColor,
  spineAccentColor,
  spineStyle = 'auto',
}: BookCover3DProps) {
  const resolvedCoverAuthor = coverAuthor === undefined ? author : coverAuthor
  const resolvedCoverColor =
    coverColor ??
    (coverStyle === 'classic'
      ? '#17181d'
      : coverStyle === 'leather'
        ? '#70282d'
        : coverStyle === 'golden-jacket'
          ? '#e5a21b'
          : coverStyle === 'editorial-orange'
            ? '#efeee8'
            : '#17213a')
  return (
    <div className={styles.coverScene} aria-hidden="true">
      <div
        className={styles.closedBook}
        data-cover-style={coverStyle}
        style={
          {
            '--book-depth': `${thickness}px`,
            '--book-color': resolvedCoverColor,
            '--spine-color': spineColor ?? resolvedCoverColor,
            ...(spineTextColor ? { '--spine-text-override': spineTextColor } : {}),
            ...(spineAccentColor ? { '--spine-accent-override': spineAccentColor } : {}),
          } as CSSProperties
        }
      >
        <div className={styles.backBoard} />
        <div className={styles.bindingSpine} data-cover-style={coverStyle} data-spine-style={spineStyle}>
          <BookSpineCopy
            title={spineTitle ?? title}
            subtitle={spineSubtitle}
            author={spineAuthor}
            spineStyle={spineStyle}
          />
        </div>
        <BookPageBlock depth={thickness} />
        <div className={styles.frontBoard}>
          <BookCoverArtwork
            image={coverImage}
            imagePosition={coverImagePosition}
            title={title}
            titleContent={coverTitle}
            label={coverLabel}
            content={coverContent}
            author={resolvedCoverAuthor}
            subtitle={coverSubtitle}
            publisher={coverPublisher}
            coverStyle={coverStyle}
            coverLayout={coverLayout}
            color={resolvedCoverColor}
            fontFamily={coverFontFamily}
            titleSize={coverTitleSize}
            titleColor={coverTitleColor}
            textColor={coverTextColor}
            accentColor={coverAccentColor}
            textAlign={coverTextAlign}
            titleStyle={coverTitleStyle}
            textured={textured}
          />
        </div>
      </div>
    </div>
  )
}
