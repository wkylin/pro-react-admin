import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight, RefreshCcw, X, BookOpen } from 'lucide-react'
import styles from './index.module.less'

function cn(...inputs: (string | undefined | null | false)[]) {
  return clsx(inputs)
}

export interface BookPage {
  title?: string
  content: React.ReactNode
  backContent?: React.ReactNode
  pageNumber: number
}

export interface InteractiveBookProps {
  coverImage: string
  bookTitle?: string
  bookAuthor?: string
  pages: BookPage[]
  className?: string
  width?: number | string
  height?: number | string
}

export default function InteractiveBook({
  coverImage,
  bookTitle = 'Book Title',
  bookAuthor = 'Author Name',
  pages,
  className,
  width = 350,
  height = 500,
}: InteractiveBookProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPageIndex, setCurrentPageIndex] = useState(-1)
  const [isHovering, setIsHovering] = useState(false)

  const handleOpenBook = () => setIsOpen(true)
  const handleCloseBook = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    setCurrentPageIndex(-1)
  }

  const nextPage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1)
    }
  }

  const prevPage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentPageIndex >= 0) {
      setCurrentPageIndex((prev) => prev - 1)
    }
  }

  const restartBook = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentPageIndex(-1)
  }

  // Cover Z-Index Variants
  const coverVariants = {
    closed: {
      rotateY: 0,
      zIndex: 100,
      transition: {
        rotateY: { duration: 0.8, ease: [0.645, 0.045, 0.355, 1] as const },
        zIndex: { delay: 0.8 },
      },
    },
    hoverClosed: {
      rotateY: -15,
      zIndex: 100,
      transition: {
        rotateY: { duration: 0.4, ease: 'easeOut' as const },
        zIndex: { delay: 0 },
      },
    },
    open: {
      rotateY: -180,
      zIndex: 0,
      transition: {
        rotateY: { duration: 0.8, ease: [0.645, 0.045, 0.355, 1] as const },
        zIndex: { delay: 0.8 },
      },
    },
  }

  return (
    <div
      className={cn(styles.container, className)}
      style={{
        width: typeof width === 'number' ? width * 2 + 100 : '100%',
        height: typeof height === 'number' ? height + 150 : 'auto',
      }}
    >
      <div className={cn(styles.bookWrapper, isOpen && styles.open)} style={{ width, height }}>
        {/* Front Cover */}
        <motion.div
          className={styles.cover}
          initial="closed"
          animate={isOpen ? 'open' : isHovering ? 'hoverClosed' : 'closed'}
          variants={coverVariants}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={!isOpen ? handleOpenBook : undefined}
          onHoverStart={() => !isOpen && setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* Front Face (Cover Image) */}
          <div className={styles.coverFace} style={{ transform: 'translateZ(0.5px)' }}>
            {/* Image Background */}
            <div className={styles.coverImage} style={{ backgroundImage: `url(${coverImage})` }} />

            {/* Overlay Gradient */}
            <div className={styles.overlay} />

            {/* Title & Author on Cover */}
            <div className={styles.title}>
              <h1 className={styles.bookTitle}>{bookTitle}</h1>
              <p className={styles.bookAuthor}>{bookAuthor}</p>
            </div>

            {/* Spine Highlight */}
            <div className={styles.spine} />
            <div className={styles.spineLine} />
          </div>

          {/* Back Face (Inner Left) */}
          <div className={styles.innerCover} style={{ transform: 'rotateY(180deg) translateZ(0.5px)' }}>
            <div className={styles.innerContent}>
              <h2 className={styles.innerTitle}>{bookTitle}</h2>
              <div className={styles.spineHighlight} />
              <p className={styles.edition}>Interactive Edition</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCloseBook}
              className={styles.closeButton}
              title="Close Book"
            >
              <X size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Pages Stack */}
        <div className={styles.pages} style={{ transformStyle: 'preserve-3d' }}>
          {pages.map((page, index) => {
            const isFlipped = index <= currentPageIndex
            const isBuriedLeft = index < currentPageIndex

            const variants = {
              flipped: {
                rotateY: -180,
                zIndex: index + 1,
                opacity: isBuriedLeft ? 0 : 1,
                transition: {
                  rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] as const },
                  zIndex: { delay: 0.6 },
                  opacity: { delay: 0.5, duration: 0.4, ease: 'easeOut' as const },
                },
              },
              unflipped: {
                rotateY: 0,
                zIndex: pages.length - index,
                opacity: 1,
                transition: {
                  rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] as const },
                  zIndex: { delay: 0 },
                  opacity: { delay: 0, duration: 0.2 },
                },
              },
            }

            return (
              <motion.div
                key={index}
                className={styles.page}
                style={{ transformStyle: 'preserve-3d' }}
                initial="unflipped"
                animate={isOpen && isFlipped ? 'flipped' : 'unflipped'}
                variants={variants}
              >
                {/* Front Face (Right Side) */}
                <div className={styles.pageFront} style={{ transform: 'translateZ(0.5px)' }}>
                  <div className={styles.pageContent}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className={styles.pageText}
                    >
                      <div className={styles.pageNumber}>PAGE {page.pageNumber * 2 - 1}</div>
                      {page.title && <h3 className={styles.pageTitle}>{page.title}</h3>}
                      <div className={styles.pageText}>{page.content}</div>
                    </motion.div>
                  </div>
                  <div className={styles.leftShadow} />
                  <div className={styles.leftBorder} />
                </div>

                {/* Back Face (Left Side) */}
                <div className={styles.pageBack} style={{ transform: 'rotateY(180deg) translateZ(0.5px)' }}>
                  <div className={styles.rightShadow} />
                  <div className={styles.rightBorder} />

                  <div className={styles.backContent}>
                    <div className={styles.backText}>
                      <div className={styles.backPageNumber}>PAGE {page.pageNumber * 2}</div>
                      {page.backContent ? (
                        <div className={styles.backText}>{page.backContent}</div>
                      ) : (
                        <div className={styles.pageNumberOnly}>
                          <span>{page.pageNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Back Cover (Static) */}
          <div className={styles.backCover} style={{ transform: 'translateZ(-1px)', zIndex: -1 }}>
            <div className={styles.backCover}>
              <p className={styles.endText}>The End</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartBook}
                className={styles.restartButton}
              >
                <RefreshCcw size={14} /> Read Again
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, transform: 'translateX(-50%)' }}
            animate={{ opacity: 1, y: 0, transform: 'translateX(-50%)' }}
            exit={{ opacity: 0, y: 20, transform: 'translateX(-50%)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={cn(styles.navigation)}
          >
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPage}
              disabled={currentPageIndex < 0}
              className={styles.navButton}
              title="Previous Page"
            >
              <ChevronLeft size={20} />
            </motion.button>

            <div className={styles.navInfo}>
              <span className={styles.navPage}>
                {currentPageIndex < 0 ? 'START' : `${Math.min(currentPageIndex + 1, pages.length)} / ${pages.length}`}
              </span>
              <span className={styles.navStatus}>{currentPageIndex < 0 ? 'Cover' : 'Reading'}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPage}
              disabled={currentPageIndex >= pages.length - 1}
              className={styles.navButton}
              title="Next Page"
            >
              <ChevronRight size={20} />
            </motion.button>

            <div className={styles.navDivider} />

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,0,0,0.1)' }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCloseBook}
              className={styles.closeNavButton}
              title="Close Book"
            >
              <BookOpen size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className={styles.hint}
        >
          Click to Open
        </motion.div>
      )}
    </div>
  )
}
