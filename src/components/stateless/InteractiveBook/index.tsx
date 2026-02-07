import React, { useState, useEffect, useCallback, useRef } from 'react'
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
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [cornerHover, setCornerHover] = useState<'none' | 'next' | 'prev'>('none')
  const dragStartXRef = useRef(0)
  const currentDragXRef = useRef(0)
  const rafIdRef = useRef(0)

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

  // 处理封面拖拽打开
  const handleCoverMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isOpen) return
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
      dragStartXRef.current = e.clientX
      currentDragXRef.current = e.clientX
      setDragOffset(0)
    },
    [isOpen]
  )

  const handleCoverTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isOpen) return
      e.preventDefault()
      e.stopPropagation()
      const touch = e.touches[0]
      setIsDragging(true)
      dragStartXRef.current = touch.clientX
      currentDragXRef.current = touch.clientX
      setDragOffset(0)
    },
    [isOpen]
  )

  // 处理拖拽翻页 - 参考电子书阅读器实现
  const isLastPage = currentPageIndex >= pages.length - 1
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isOpen || isLastPage) return
      e.preventDefault()
      setIsDragging(true)
      dragStartXRef.current = e.clientX
      currentDragXRef.current = e.clientX
      setDragOffset(0)
    },
    [isOpen, isLastPage]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      currentDragXRef.current = e.clientX
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = requestAnimationFrame(() => {
        setDragOffset(currentDragXRef.current - dragStartXRef.current)
      })
    },
    [isDragging]
  )

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = 0
    }

    const deltaX = currentDragXRef.current - dragStartXRef.current
    const threshold = 80 // 翻页阈值

    // 封面未打开时，向左拖拽打开书
    if (!isOpen) {
      if (deltaX < -threshold) {
        setIsOpen(true)
      }
      setIsDragging(false)
      setDragOffset(0)
      dragStartXRef.current = 0
      currentDragXRef.current = 0
      return
    }

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0 && currentPageIndex < pages.length - 1) {
        // 向左拖拽 - 下一页
        const newIndex = currentPageIndex + 1
        setCurrentPageIndex(newIndex)
        onPageChange?.(newIndex)
      } else if (deltaX > 0 && currentPageIndex >= 0) {
        // 向右拖拽 - 上一页
        const newIndex = currentPageIndex - 1
        setCurrentPageIndex(newIndex)
        onPageChange?.(newIndex)
      }
    }

    setIsDragging(false)
    setDragOffset(0)
    dragStartXRef.current = 0
    currentDragXRef.current = 0
  }, [isDragging, isOpen, currentPageIndex, pages.length, onPageChange])

  // 触摸事件处理
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isOpen || isLastPage) return
      e.preventDefault()
      const touch = e.touches[0]
      setIsDragging(true)
      dragStartXRef.current = touch.clientX
      currentDragXRef.current = touch.clientX
      setDragOffset(0)
    },
    [isOpen, isLastPage]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      e.preventDefault()
      currentDragXRef.current = e.touches[0].clientX
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = requestAnimationFrame(() => {
        setDragOffset(currentDragXRef.current - dragStartXRef.current)
      })
    },
    [isDragging]
  )

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return
    handleMouseUp()
  }, [isDragging, handleMouseUp])

  // 添加/移除全局事件监听器
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)

      // 防止文本选择
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.body.style.userSelect = ''
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = 0
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

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
          animate={
            isOpen
              ? 'open'
              : isDragging && dragOffset < 0
                ? undefined // 拖拽时手动控制
                : isHovering
                  ? 'hoverClosed'
                  : 'closed'
          }
          variants={coverVariants}
          style={{
            transformStyle: 'preserve-3d',
            ...(!isOpen && isDragging && dragOffset < 0
              ? {
                  transform: `rotateY(${Math.max(-180, dragOffset * 0.5)}deg)`,
                  transition: 'none',
                }
              : {}),
          }}
          onClick={!isOpen ? handleOpenBook : undefined}
          onMouseDown={handleCoverMouseDown}
          onTouchStart={handleCoverTouchStart}
          onHoverStart={() => !isOpen && !isDragging && setIsHovering(true)}
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

        <div
          className={cn(styles.pages, isDragging && styles.dragging)}
          style={{
            transformStyle: 'preserve-3d',
            cursor: isOpen ? (isLastPage ? 'default' : isDragging ? 'grabbing' : 'grab') : 'default',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {pages.map((page, index) => {
            const isFlipped = index <= currentPageIndex
            const isBuriedLeft = index < currentPageIndex
            // 深度掩埋的页面直接用 visibility 隐藏（保留紧邻的前一页可见，确保左侧永远有内容）
            const isDeeplyBuried = isFlipped && index < currentPageIndex - 1

            // 计算动画 variants（不使用 useMemo，因为它在循环内部）
            const variants = {
              flipped: {
                rotateY: -180,
                zIndex: isBuriedLeft ? index + 1 : pages.length + 10,
                transition: {
                  rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] as const },
                  zIndex: { delay: 0.6 },
                },
              },
              unflipped: {
                rotateY: 0,
                zIndex: pages.length - index,
                transition: {
                  rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] as const },
                  zIndex: { delay: 0.6 },
                },
              },
            }

            // 计算拖拽时的弓起效果
            const isActiveDragPage =
              isDragging &&
              isOpen &&
              ((dragOffset < 0 && index === currentPageIndex + 1) || // 向左拖 → 当前右侧页弓起
                (dragOffset > 0 && index === currentPageIndex)) // 向右拖 → 当前翻开页弓起
            // 弓起角度：基于拖拽偏移量，最大弓起45度
            const curlAngle = isActiveDragPage
              ? Math.min(Math.abs(dragOffset) * 0.25, 45) * (dragOffset < 0 ? -1 : 1)
              : 0
            // 弓起时轻微抬升
            const curlZ = isActiveDragPage ? Math.min(Math.abs(dragOffset) * 0.15, 30) : 0

            return (
              <motion.div
                key={index}
                className={cn(styles.page, isDragging && styles.dragging)}
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  // 用 visibility 代替 opacity 隐藏深层页面，彻底避免闪烁
                  visibility: isDeeplyBuried ? 'hidden' : 'visible',
                  ...(isActiveDragPage
                    ? {
                        transform: `perspective(1200px) rotateY(${curlAngle}deg) translateZ(${curlZ}px)`,
                        transition: 'none',
                        zIndex: 200,
                        boxShadow: `${dragOffset < 0 ? '-' : ''}${Math.min(Math.abs(dragOffset) * 0.1, 15)}px 5px 20px rgba(0,0,0,0.15)`,
                      }
                    : {}),
                }}
                initial="unflipped"
                animate={isActiveDragPage ? undefined : isOpen && isFlipped ? 'flipped' : 'unflipped'}
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
                  {/* 右下角翻页热区 - 下一页 */}
                  {isOpen && !isDragging && index === currentPageIndex + 1 && index <= pages.length - 1 && (
                    <div
                      className={cn(
                        styles.cornerZone,
                        styles.cornerBottomRight,
                        cornerHover === 'next' && styles.cornerActive
                      )}
                      onMouseEnter={() => setCornerHover('next')}
                      onMouseLeave={() => setCornerHover('none')}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCornerHover('none')
                        nextPage(e)
                      }}
                    >
                      <div className={styles.curlEffect} />
                      <div className={styles.curlShadow} />
                      <span className={styles.curlHint}>翻页 →</span>
                    </div>
                  )}
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
                          <span>{page.pageNumber * 2}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* 左下角翻页热区 - 上一页 */}
                  {isOpen && !isDragging && index === currentPageIndex && (
                    <div
                      className={cn(
                        styles.cornerZone,
                        styles.cornerBottomLeft,
                        cornerHover === 'prev' && styles.cornerActive
                      )}
                      onMouseEnter={() => setCornerHover('prev')}
                      onMouseLeave={() => setCornerHover('none')}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCornerHover('none')
                        prevPage(e)
                      }}
                    >
                      <div className={styles.curlEffect} />
                      <div className={styles.curlShadow} />
                      <span className={styles.curlHint}>← 翻页</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}

          <div
            className={styles.backCover}
            style={{
              zIndex: currentPageIndex === pages.length - 1 ? 50 : -1,
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
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
          Click or Drag to Open
        </motion.div>
      )}

      {isOpen && isDragging && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={styles.dragIndicator}
          style={{
            left: '50%',
            x: dragOffset > 0 ? '-100%' : '0%',
          }}
        >
          <div
            className={styles.dragArrow}
            style={{
              transform: dragOffset > 0 ? 'scaleX(-1)' : 'scaleX(1)',
            }}
          >
            →
          </div>
          <div className={styles.dragText}>{Math.abs(dragOffset) > 80 ? '松手翻页' : '继续拖拽'}</div>
        </motion.div>
      )}
    </div>
  )
}
