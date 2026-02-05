import React, { useState, useEffect, useCallback, useDeferredValue } from 'react'
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
  onPageChange?: (pageIndex: number) => void
  enableKeyboard?: boolean
}

export default function InteractiveBook({
  coverImage = '',
  bookTitle = 'Book Title',
  bookAuthor = 'Author Name',
  pages = [],
  className,
  width = 350,
  height = 500,
  onPageChange,
  enableKeyboard = true,
}: InteractiveBookProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPageIndex, setCurrentPageIndex] = useState(-1)
  const [isHovering, setIsHovering] = useState(false)

  const deferredPageIndex = useDeferredValue(currentPageIndex)

  const handleOpenBook = useCallback(() => {
    setIsOpen(true)
  }, [])
  const handleCloseBook = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    setCurrentPageIndex(-1)
  }, [])

  const nextPage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (currentPageIndex < pages.length - 1) {
        const newIndex = currentPageIndex + 1
        setCurrentPageIndex(newIndex)
        onPageChange?.(newIndex)
      }
    },
    [currentPageIndex, pages.length, onPageChange]
  )

  const prevPage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (currentPageIndex >= 0) {
        const newIndex = currentPageIndex - 1
        setCurrentPageIndex(newIndex)
        onPageChange?.(newIndex)
      }
    },
    [currentPageIndex, onPageChange]
  )

  const restartBook = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setCurrentPageIndex(-1)
      onPageChange?.(-1)
    },
    [onPageChange]
  )

  // 键盘支持
  useEffect(() => {
    if (!enableKeyboard || !isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          prevPage(e as any)
          break
        case 'ArrowRight':
          e.preventDefault()
          nextPage(e as any)
          break
        case 'Escape':
          e.preventDefault()
          handleCloseBook(e as any)
          break
        case 'Home':
          e.preventDefault()
          setCurrentPageIndex(-1)
          onPageChange?.(-1)
          break
        case 'End':
          e.preventDefault()
          setCurrentPageIndex(pages.length - 1)
          onPageChange?.(pages.length - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableKeyboard, isOpen, nextPage, prevPage, handleCloseBook, pages.length, onPageChange])

  if (!pages || pages.length === 0) {
    return (
      <div className={cn(styles.container, className)} style={{ width, height }}>
        <div className={styles.emptyState}>
          <p>暂无内容</p>
        </div>
      </div>
    )
  }

  const coverVariants = {
    closed: {
      rotateY: 0,
      zIndex: 100,
      transition: {
        rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] as const },
        zIndex: { delay: 0.6 },
      },
    },
    hoverClosed: {
      rotateY: -15,
      zIndex: 100,
      transition: {
        rotateY: { duration: 0.3, ease: 'easeOut' as const },
        zIndex: { delay: 0 },
      },
    },
    open: {
      rotateY: -180,
      zIndex: 0,
      transition: {
        rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] as const },
        zIndex: { delay: 0.6 },
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
          <div className={styles.coverFace} style={{ transform: 'translateZ(0.5px)' }}>
            {/* Image Background */}
            <div className={styles.coverImage} style={{ backgroundImage: `url(${coverImage})` }} />

            <div className={styles.overlay} />

            <div className={styles.title}>
              <h1 className={styles.bookTitle}>{bookTitle}</h1>
              <p className={styles.bookAuthor}>{bookAuthor}</p>
            </div>

            <div className={styles.spine} />
            <div className={styles.spineLine} />
          </div>

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

        <div className={styles.pages} style={{ transformStyle: 'preserve-3d' }}>
          {pages.map((page, index) => {
            const isFlipped = index <= deferredPageIndex
            const isBuriedLeft = index < deferredPageIndex

            // 计算动画 variants（不使用 useMemo，因为它在循环内部）
            const variants = {
              flipped: {
                rotateY: -180,
                zIndex: index + 1,
                opacity: isBuriedLeft ? 0 : 1,
                transition: {
                  rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] as const },
                  zIndex: { delay: 0.6 },
                  opacity: { delay: 0.2, duration: 0.3, ease: 'easeOut' as const },
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

          <div
            className={styles.backCover}
            style={{
              zIndex: deferredPageIndex === pages.length - 1 ? 50 : -1,
            }}
          >
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
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
