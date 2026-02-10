import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight, RefreshCcw, X, BookOpen } from 'lucide-react'
import { pdfjs } from 'react-pdf'
import styles from './index.module.less'

// ─── 本地 Worker（兼容 Vite / Webpack 5） ──────────────────────
// Vite：原生支持 new URL('...', import.meta.url)，构建时自动拷贝 worker 文件
// Webpack 5：同样支持该语法（asset module），可正常解析
// 降级：若运行时出错则回退到 unpkg CDN
try {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()
} catch {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
}

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
  /**
   * 图片模式：传入图片 URL 数组，每张图片对应书的一面。
   * 两张图片组成一个书页（正面 + 背面），即 pageImages[0] 和 pageImages[1] 是第一个书页，以此类推。
   * 传入后会忽略 pages 中的 content/backContent，改为渲染图片。
   */
  pageImages?: string[]
  /**
   * PDF 模式：传入 PDF 文件的 URL。
   * 使用 react-pdf 渲染，每两页 PDF 组成一个书页（正面 + 背面）。
   * 优先级：pdfUrl > pageImages > pages（JSX 内容）。
   */
  pdfUrl?: string
  className?: string
  width?: number | string
  height?: number | string
  onPageChange?: (pageIndex: number) => void
  enableKeyboard?: boolean
}

// ─── 图片懒加载组件 ────────────────────────────────
// 仅当页面接近当前翻到的位置时才加载图片，避免几百张图片同时请求
const PRELOAD_RANGE = 2 // 预加载当前页 ±2 范围的图片

const LazyPageImage: React.FC<{
  src: string
  shouldLoad: boolean
  alt?: string
}> = ({ src, shouldLoad, alt = '' }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (!shouldLoad) {
    return <div className={styles.imgPlaceholder} style={{ width: '100%', height: '100%', background: '#f5f5f5' }} />
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {!loaded && !error && (
        <div
          className={styles.imgPlaceholder}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f9f9f9',
            color: '#bbb',
            fontSize: 14,
          }}
        >
          加载中...
        </div>
      )}
      {error ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafafa',
            color: '#ccc',
            fontSize: 13,
          }}
        >
          图片加载失败
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          draggable={false}
        />
      )}
    </div>
  )
}

// ─── PDF → 图片 hook：使用 pdfjs 离屏渲染每页，输出 data-URL 数组 ────
// 完全在 DOM 之外完成，不受任何 CSS 3D transform / backface-visibility 影响
function usePdfToImages(pdfUrl: string | undefined, renderWidth: number | undefined) {
  const [state, setState] = useState<{
    images: string[]
    loading: boolean
    error: string | null
  }>({ images: [], loading: false, error: null })
  const taskRef = useRef<{ url: string; width: number | undefined } | null>(null)

  const imagesCount = state.images.length

  useEffect(() => {
    if (!pdfUrl) return

    // 相同参数不重复渲染
    if (taskRef.current?.url === pdfUrl && taskRef.current?.width === renderWidth && imagesCount > 0) return
    taskRef.current = { url: pdfUrl, width: renderWidth }

    let cancelled = false

    // 用 microtask 推迟 setState，避免 "set-state-in-effect" 同步调用
    queueMicrotask(() => {
      if (!cancelled) setState({ images: [], loading: true, error: null })
    })

    const run = async () => {
      // 给出一组候选 URL，遇到 404 或网络错误时按顺序尝试
      const buildCandidates = (orig: string) => {
        const c: string[] = [orig]
        try {
          if (typeof window !== 'undefined') {
            const origin = window.location.origin || ''
            const p = window.location.pathname || '/'
            const idx = p.indexOf('/storybook')
            if (idx !== -1) {
              const base = p.substring(0, idx) // 不包含 /storybook
              c.push(`${base}/storybook${orig}`)
              if (origin) c.push(`${origin}${base}/storybook${orig}`)
            } else {
              const parts = p.split('/').filter(Boolean)
              if (parts.length >= 2) {
                const repoPrefix = `/${parts[0]}/${parts[1]}`
                c.push(`${repoPrefix}/storybook${orig}`)
                if (origin) c.push(`${origin}${repoPrefix}/storybook${orig}`)
              }
            }
          }
        } catch {
          // ignore
        }
        return c
      }

      const candidates = buildCandidates(pdfUrl)

      let lastErr: any = null
      for (const candidate of candidates) {
        if (cancelled) return
        try {
          const pdf = await pdfjs.getDocument(candidate).promise
          const urls: string[] = []

          for (let i = 1; i <= pdf.numPages; i++) {
            if (cancelled) return
            const page = await pdf.getPage(i)
            const baseViewport = page.getViewport({ scale: 1 })
            // 按容器宽度等比缩放，×2 保证清晰度
            const scale = renderWidth ? (renderWidth / baseViewport.width) * 2 : 2
            const viewport = page.getViewport({ scale })

            const canvas = document.createElement('canvas')
            canvas.width = viewport.width
            canvas.height = viewport.height
            const ctx = canvas.getContext('2d')!
            // 先填充淡黄纸张底色，避免白色背景
            ctx.fillStyle = '#fdfbf7'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            await page.render({ canvas, canvasContext: ctx, viewport }).promise
            urls.push(canvas.toDataURL('image/png'))
          }

          if (!cancelled) {
            setState({ images: urls, loading: false, error: null })
          }
          return
        } catch (err) {
          lastErr = err
          // 若是最后一个候选仍失败，则报告错误
          continue
        }
      }

      if (!cancelled) {
        console.error('[InteractiveBook] PDF render error (all candidates failed):', lastErr)
        setState({ images: [], loading: false, error: lastErr instanceof Error ? lastErr.message : String(lastErr) })
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [pdfUrl, renderWidth, imagesCount])

  return { pdfImages: state.images, pdfLoading: state.loading, pdfError: state.error }
}

// ─── 预加载 hook：提前把相邻页的图片载入浏览器缓存 ──
function useImagePreloader(images: string[] | undefined, currentPageIndex: number) {
  const preloadedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!images || images.length === 0) return

    // 每个书页对应 2 张图片，计算需要预加载的图片索引范围
    const startBook = Math.max(0, currentPageIndex - PRELOAD_RANGE)
    const endBook = Math.min(Math.ceil(images.length / 2) - 1, currentPageIndex + PRELOAD_RANGE)

    for (let bi = startBook; bi <= endBook; bi++) {
      const frontIdx = bi * 2
      const backIdx = bi * 2 + 1
      for (const idx of [frontIdx, backIdx]) {
        if (idx < images.length && !preloadedRef.current.has(images[idx])) {
          const img = new Image()
          img.src = images[idx]
          preloadedRef.current.add(images[idx])
        }
      }
    }
  }, [images, currentPageIndex])
}

export default function InteractiveBook({
  coverImage = '',
  bookTitle = 'Book Title',
  bookAuthor = 'Author Name',
  pages = [],
  className,
  width = 350,
  height = 500,
  pageImages,
  pdfUrl,
  onPageChange,
  enableKeyboard = true,
}: InteractiveBookProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPageIndex, setCurrentPageIndex] = useState(-1)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isTopHalf, setIsTopHalf] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const [cornerHover, setCornerHover] = useState<'none' | 'next' | 'prev'>('none')
  const dragStartXRef = useRef(0)
  const dragStartYRef = useRef(0)
  const currentDragXRef = useRef(0)
  const currentDragYRef = useRef(0)
  const rafIdRef = useRef(0)

  // ─── PDF → 图片 ─────────────────────────────────
  const pdfRenderWidth = typeof width === 'number' ? width - 24 : undefined
  const { pdfImages, pdfLoading, pdfError } = usePdfToImages(pdfUrl, pdfRenderWidth)
  const isPdfMode = !!(pdfUrl && pdfUrl.length > 0)

  // ─── 统一图片源：PDF 转换后的图片 或 用户传入的图片 ───
  const resolvedImages = isPdfMode ? (pdfImages.length > 0 ? pdfImages : undefined) : pageImages
  const isImageMode = !!(resolvedImages && resolvedImages.length > 0)

  const totalBookPages = isImageMode ? Math.ceil(resolvedImages!.length / 2) : pages.length
  const bookPages: BookPage[] = isImageMode
    ? new Array(Math.max(totalBookPages, 0)).fill(0).map((_, i) => ({ pageNumber: i + 1 }) as BookPage)
    : pages

  // 预加载相邻页图片
  useImagePreloader(resolvedImages, currentPageIndex)

  const handleOpenBook = () => {
    setIsOpen(true)
  }

  const handleCloseBook = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    setCurrentPageIndex(-1)
  }

  const nextPage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentPageIndex < totalBookPages - 1) {
      const newIndex = currentPageIndex + 1
      setCurrentPageIndex(newIndex)
      onPageChange?.(newIndex)
    }
  }

  const prevPage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentPageIndex >= 0) {
      const newIndex = currentPageIndex - 1
      setCurrentPageIndex(newIndex)
      onPageChange?.(newIndex)
    }
  }

  const restartBook = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentPageIndex(-1)
    onPageChange?.(-1)
  }

  // 处理封面拖拽打开
  const handleCoverMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    dragStartXRef.current = e.clientX
    currentDragXRef.current = e.clientX
    setDragOffset(0)
  }

  const handleCoverTouchStart = (e: React.TouchEvent) => {
    if (isOpen) return
    e.preventDefault()
    e.stopPropagation()
    const touch = e.touches[0]
    setIsDragging(true)
    dragStartXRef.current = touch.clientX
    currentDragXRef.current = touch.clientX
    setDragOffset(0)
  }

  // 处理拖拽翻页

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isOpen) return
    e.preventDefault()
    setIsDragging(true)

    // Determine if drag started in top or bottom half
    const rect = (e.currentTarget as Element).getBoundingClientRect()
    const relativeY = e.clientY - rect.top
    setIsTopHalf(relativeY < rect.height / 2)

    dragStartXRef.current = e.clientX
    dragStartYRef.current = e.clientY
    currentDragXRef.current = e.clientX
    currentDragYRef.current = e.clientY
    setDragOffset(0)
    setDragOffsetY(0)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    currentDragXRef.current = e.clientX
    currentDragYRef.current = e.clientY
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = requestAnimationFrame(() => {
      setDragOffset(currentDragXRef.current - dragStartXRef.current)
      setDragOffsetY(currentDragYRef.current - dragStartYRef.current)
    })
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = 0
    }

    const deltaX = currentDragXRef.current - dragStartXRef.current
    // 降低触发翻页的阈值，提高响应灵敏度
    const threshold = 30

    if (!isOpen) {
      if (deltaX < -threshold) {
        setIsOpen(true)
      }
      setIsDragging(false)
      setDragOffset(0)
      setDragOffsetY(0)
      dragStartXRef.current = 0
      dragStartYRef.current = 0
      currentDragXRef.current = 0
      currentDragYRef.current = 0
      return
    }

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0 && currentPageIndex < totalBookPages - 1) {
        const newIndex = currentPageIndex + 1
        setCurrentPageIndex(newIndex)
        onPageChange?.(newIndex)
      } else if (deltaX > 0 && currentPageIndex >= 0) {
        const newIndex = currentPageIndex - 1
        setCurrentPageIndex(newIndex)
        onPageChange?.(newIndex)
      }
    }

    setIsDragging(false)
    setDragOffset(0)
    setDragOffsetY(0)
    dragStartXRef.current = 0
    dragStartYRef.current = 0
    currentDragXRef.current = 0
    currentDragYRef.current = 0
  }

  // 触摸处理
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isOpen) return
    e.preventDefault()
    const touch = e.touches[0]
    setIsDragging(true)

    // Determine if drag started in top or bottom half
    const rect = (e.currentTarget as Element).getBoundingClientRect()
    const relativeY = touch.clientY - rect.top
    setIsTopHalf(relativeY < rect.height / 2)

    dragStartXRef.current = touch.clientX
    dragStartYRef.current = touch.clientY
    currentDragXRef.current = touch.clientX
    currentDragYRef.current = touch.clientY
    setDragOffset(0)
    setDragOffsetY(0)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const touch = e.touches[0]
    currentDragXRef.current = touch.clientX
    currentDragYRef.current = touch.clientY
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = requestAnimationFrame(() => {
      setDragOffset(currentDragXRef.current - dragStartXRef.current)
      setDragOffsetY(currentDragYRef.current - dragStartYRef.current)
    })
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    handleMouseUp()
  }

  // 用 ref 保存最新的事件处理函数，避免 useEffect 依赖变化
  const handlersRef = useRef({
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
    nextPage,
    prevPage,
    handleCloseBook,
  })
  useEffect(() => {
    handlersRef.current = {
      handleMouseMove,
      handleMouseUp,
      handleTouchMove,
      handleTouchEnd,
      nextPage,
      prevPage,
      handleCloseBook,
    }
  })

  // 全局事件监听
  useEffect(() => {
    if (isDragging) {
      const onMouseMove = (e: MouseEvent) => handlersRef.current.handleMouseMove(e)
      const onMouseUp = () => handlersRef.current.handleMouseUp()
      const onTouchMove = (e: TouchEvent) => handlersRef.current.handleTouchMove(e)
      const onTouchEnd = () => handlersRef.current.handleTouchEnd()
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('touchmove', onTouchMove, { passive: false })
      document.addEventListener('touchend', onTouchEnd)
      document.body.style.userSelect = 'none'

      return () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListener('touchmove', onTouchMove)
        document.removeEventListener('touchend', onTouchEnd)
        document.body.style.userSelect = ''
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
          rafIdRef.current = 0
        }
      }
    }
  }, [isDragging])

  // 键盘支持
  useEffect(() => {
    if (!enableKeyboard || !isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          handlersRef.current.prevPage(e as unknown as React.MouseEvent)
          break
        case 'ArrowRight':
          e.preventDefault()
          handlersRef.current.nextPage(e as unknown as React.MouseEvent)
          break
        case 'Escape':
          e.preventDefault()
          handlersRef.current.handleCloseBook(e as unknown as React.MouseEvent)
          break
        case 'Home':
          e.preventDefault()
          setCurrentPageIndex(-1)
          onPageChange?.(-1)
          break
        case 'End':
          e.preventDefault()
          setCurrentPageIndex(totalBookPages - 1)
          onPageChange?.(totalBookPages - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableKeyboard, isOpen, totalBookPages, onPageChange])

  // 空内容状态
  if ((!pages || pages.length === 0) && !isImageMode) {
    // PDF 正在加载 / 转换中
    if (isPdfMode && (pdfLoading || pdfImages.length === 0)) {
      return (
        <div className={cn(styles.container, className)} style={{ width, height }}>
          <div className={styles.emptyState} style={{ flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 14, color: '#999' }}>PDF 加载中…</div>
          </div>
        </div>
      )
    }
    // PDF 加载失败
    if (isPdfMode && pdfError) {
      return (
        <div className={cn(styles.container, className)} style={{ width, height }}>
          <div className={styles.emptyState} style={{ flexDirection: 'column', gap: 8 }}>
            <div style={{ color: '#ef4444', fontWeight: 500 }}>PDF 加载失败</div>
            <div style={{ fontSize: 12, color: '#999' }}>{pdfError}</div>
          </div>
        </div>
      )
    }
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

  // 判断某个书页是否在可见范围内，用于图片懒加载
  const isPageNearby = (bookPageIndex: number) => Math.abs(bookPageIndex - currentPageIndex) <= PRELOAD_RANGE

  const renderPagesContainer = () => (
    <div
      className={cn(styles.pages, isDragging && styles.dragging)}
      style={{
        transformStyle: 'preserve-3d',
        cursor: isOpen ? (isDragging ? 'grabbing' : 'pointer') : 'default',
        userSelect: isDragging ? 'none' : undefined,
        WebkitUserSelect: isDragging ? 'none' : undefined,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {bookPages.map((page, index) => {
        const isFlipped = index <= currentPageIndex
        const isBuriedLeft = index < currentPageIndex
        const isDeeplyBuried = isFlipped && index < currentPageIndex - 1

        const variants = {
          flipped: {
            rotateY: -180,
            zIndex: isBuriedLeft ? index + 1 : bookPages.length + 10,
            transition: {
              rotateY: {
                duration: 0.6,
                ease: [0.645, 0.045, 0.355, 1] as const,
              },
              // 若是刚翻过去的顶层页，立即提升层级；若是被压住的旧页，延迟层级调整
              zIndex: { delay: isBuriedLeft ? 0.6 : 0 },
            },
          },
          unflipped: {
            rotateY: 0,
            zIndex: bookPages.length - index,
            transition: {
              rotateY: {
                duration: 0.6,
                ease: [0.645, 0.045, 0.355, 1] as const,
              },
              zIndex: { delay: 0.6 },
            },
          },
        }

        // 计算动态样式以模拟纸张弯曲
        const isActiveDragPage =
          isDragging &&
          isOpen &&
          ((dragOffset < 0 && index === currentPageIndex + 1) || (dragOffset > 0 && index === currentPageIndex))

        // 降低容器整体旋转幅度，主要依靠折角（Flap）效果
        // 关键逻辑修复：如果是向右拖拽（左页），基准旋转角度应为 -180，必须在此基础上进行这一微调，否则会直接跳到右侧
        let pageTransform = ''
        if (isActiveDragPage) {
          const curlStrength = Math.min(Math.abs(dragOffset) * 0.1, 15)
          if (dragOffset < 0) {
            // 右页向左翻：0 -> -15
            pageTransform = `perspective(1200px) rotateY(${-curlStrength}deg)`
          } else {
            // 左页向右翻：-180 -> -165 (即 -180 + 15)
            pageTransform = `perspective(1200px) rotateY(${-180 + curlStrength}deg)`
          }
        }
        const curlZ = isActiveDragPage ? Math.min(Math.abs(dragOffset) * 0.15, 30) : 0

        // 计算折角几何 (Turn.js 风格算法)
        let hx = 0,
          hy = 0
        let safeDx = 0,
          safeDy = 0

        if (isActiveDragPage) {
          const r2 = dragOffset * dragOffset + dragOffsetY * dragOffsetY
          // Use a small epsilon to avoid division by zero
          safeDy = Math.abs(dragOffsetY) < 1 ? (dragOffsetY >= 0 ? 1 : -1) : dragOffsetY
          safeDx = Math.abs(dragOffset) < 1 ? (dragOffset >= 0 ? 1 : -1) : dragOffset
          hx = Math.abs(r2 / (2 * safeDx))
          hy = Math.abs(r2 / (2 * safeDy))
        }

        const W = typeof width === 'number' ? width : 300
        const H = typeof height === 'number' ? height : 500

        // Helper: Construct polygon for the "Body" (Remaining Page) and "Ear" (The corner triangle)
        const getFoldPolygons = (isTR: boolean, isBR: boolean, isTL: boolean, isBL: boolean) => {
          const chx = Math.min(hx, W * 2)
          const chy = Math.min(hy, H * 2)

          let body = ''
          let ear = ''
          let foldAxis = ''
          let origin = ''

          if (isTR) {
            // Top-Right: Peeling towards Left-Bottom
            body = `polygon(0% 0%, calc(100% - ${chx}px) 0%, 100% ${chy}px, 100% 100%, 0% 100%)`
            ear = `polygon(100% 0%, calc(100% - ${chx}px) 0%, 100% ${chy}px)`
            foldAxis = `${chx}, ${chy}, 0`
            origin = `100% ${chy}px`
          } else if (isBR) {
            // Bottom-Right
            body = `polygon(0% 0%, 100% 0%, 100% calc(100% - ${chy}px), calc(100% - ${chx}px) 100%, 0% 100%)`
            ear = `polygon(100% 100%, 100% calc(100% - ${chy}px), calc(100% - ${chx}px) 100%)`
            foldAxis = `${chx}, ${-chy}, 0`
            origin = `100% calc(100% - ${chy}px)`
          } else if (isTL) {
            // Top-Left
            body = `polygon(${chx}px 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${chy}px)`
            ear = `polygon(0% 0%, ${chx}px 0%, 0% ${chy}px)`
            foldAxis = `${-chx}, ${chy}, 0`
            origin = `0% ${chy}px`
          } else if (isBL) {
            // Bottom-Left
            body = `polygon(0% 0%, 100% 0%, 100% 100%, ${chx}px 100%, 0% calc(100% - ${chy}px))`
            ear = `polygon(0% 100%, ${chx}px 100%, 0% calc(100% - ${chy}px))`
            foldAxis = `${-chx}, ${-chy}, 0`
            origin = `0% calc(100% - ${chy}px)`
          }
          return { body, ear, foldAxis, origin }
        }

        let frontClipPath = undefined
        let backClipPath = undefined
        let flapStyle: React.CSSProperties | undefined = undefined
        let flapContent = null

        // 图片索引
        const frontImgIdx = index * 2
        const backImgIdx = index * 2 + 1
        const shouldLoadImages = isPageNearby(index)

        // 提取内容渲染逻辑以便在折角（Flap）中复用
        const renderFrontInner = () => (
          <>
            {isImageMode && resolvedImages ? (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div className={styles.pageNumber}>PAGE {frontImgIdx + 1}</div>
                {frontImgIdx < resolvedImages.length ? (
                  <LazyPageImage
                    src={resolvedImages[frontImgIdx]}
                    shouldLoad={shouldLoadImages}
                    alt={`第 ${frontImgIdx + 1} 页`}
                  />
                ) : (
                  <div className={styles.pageNumberOnly}>
                    <span>{frontImgIdx + 1}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.pageText}>
                <div className={styles.pageNumber}>PAGE {page.pageNumber * 2 - 1}</div>
                {page.title && <h3 className={styles.pageTitle}>{page.title}</h3>}
                <div className={styles.pageText}>{page.content}</div>
              </div>
            )}
          </>
        )

        const renderBackInner = () => (
          <>
            {isImageMode && resolvedImages ? (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div className={styles.backPageNumber}>PAGE {backImgIdx + 1}</div>
                {backImgIdx < resolvedImages.length ? (
                  <LazyPageImage
                    src={resolvedImages[backImgIdx]}
                    shouldLoad={shouldLoadImages}
                    alt={`第 ${backImgIdx + 1} 页`}
                  />
                ) : (
                  <div className={styles.pageNumberOnly}>
                    <span>{backImgIdx + 1}</span>
                  </div>
                )}
              </div>
            ) : (
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
            )}
          </>
        )

        if (isActiveDragPage) {
          let poly = null
          if (dragOffset < 0) {
            // Drag Right -> Left (Peeling Page N, revealing Back)
            poly = getFoldPolygons(isTopHalf, !isTopHalf, false, false)
            frontClipPath = poly.body

            flapStyle = {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 50,
              pointerEvents: 'none',
              clipPath: poly.ear,
              transformOrigin: poly.origin,
              transform: `rotate3d(${poly.foldAxis}, 180deg)`,
              backfaceVisibility: 'visible',
              boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
            }

            // Flap shows the Back Content of the current page
            flapContent = (
              <div className={styles.pageBack} style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'visible' }}>
                <div className={styles.rightShadow} />
                <div className={styles.rightBorder} />
                <div className={styles.backContent}>{renderBackInner()}</div>
              </div>
            )
          } else {
            // Drag Left -> Right (Peeling Page N-1, revealing Front)
            // 左页向右翻：切掉左侧角（Visual Left），也就是 PageBack 的坐标系中的 TL/BL
            // 修正前：使用了 TR/BR，导致切掉了书脊（Visual Right）
            // 修正后：使用 TL/BL
            poly = getFoldPolygons(false, false, isTopHalf, !isTopHalf)
            backClipPath = poly.body

            flapStyle = {
              position: 'absolute',
              top: 0,
              // 【关键修正】对于左侧裁剪 (TL/BL)，Ear 是左边的三角形，left: 0 应该没问题，但需要确保 poly.ear 也是基于左上角的
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 50,
              pointerEvents: 'none',
              clipPath: poly.ear,
              transformOrigin: poly.origin,
              transform: `rotate3d(${poly.foldAxis}, 180deg)`,
              backfaceVisibility: 'visible',
              boxShadow: '2px 0 10px rgba(0,0,0,0.1)', // 修正阴影方向
            }

            // Flap shows the Front Content of the left page
            flapContent = (
              <div className={styles.pageFront} style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'visible' }}>
                <div className={styles.leftShadow} />
                <div className={styles.leftBorder} />
                <div className={styles.pageContent}>{renderFrontInner()}</div>
              </div>
            )
          }
        }

        return (
          <motion.div
            key={index}
            className={cn(styles.page, isDragging && styles.dragging)}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              visibility: isDeeplyBuried ? 'hidden' : 'visible',
              ...(isActiveDragPage
                ? {
                    transform: `${pageTransform} translateZ(${curlZ}px)`,
                    transition: 'none',
                    zIndex: 200,
                    boxShadow: `
                      ${dragOffset < 0 ? '-' : ''}${Math.min(Math.abs(dragOffset) * 0.15, 25)}px 10px 30px rgba(0,0,0,0.3),
                      ${dragOffset < 0 ? '-' : ''}2px 0 5px rgba(0,0,0,0.1) inset
                    `,
                  }
                : {}),
            }}
            initial="unflipped"
            animate={isActiveDragPage ? undefined : isOpen && isFlipped ? 'flipped' : 'unflipped'}
            variants={variants}
          >
            {/* ─── 正面 ─── */}
            <div
              className={styles.pageFront}
              style={{
                transform: 'translateZ(0.5px)',
                clipPath: frontClipPath,
              }}
            >
              <div className={styles.pageContent}>
                {isImageMode && resolvedImages ? (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div className={styles.pageNumber}>PAGE {frontImgIdx + 1}</div>
                    {frontImgIdx < resolvedImages.length ? (
                      <LazyPageImage
                        src={resolvedImages[frontImgIdx]}
                        shouldLoad={shouldLoadImages}
                        alt={`第 ${frontImgIdx + 1} 页`}
                      />
                    ) : (
                      <div className={styles.pageNumberOnly}>
                        <span>{frontImgIdx + 1}</span>
                      </div>
                    )}
                  </div>
                ) : (
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
                )}
              </div>
              <div className={styles.leftShadow} />
              <div className={styles.leftBorder} />
              {/* 右下角翻页热区 */}
              {isOpen && !isDragging && index === currentPageIndex + 1 && index <= bookPages.length - 1 && (
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

            {/* ─── 背面 ─── */}
            <div
              className={styles.pageBack}
              style={{
                transform: 'rotateY(180deg) translateZ(0.5px)',
                cursor: isOpen && !isDragging && index === currentPageIndex ? 'pointer' : undefined,
                clipPath: backClipPath,
              }}
            >
              <div className={styles.rightShadow} />
              <div className={styles.rightBorder} />

              <div className={styles.backContent}>
                {isImageMode && resolvedImages ? (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div className={styles.backPageNumber}>PAGE {backImgIdx + 1}</div>
                    {backImgIdx < resolvedImages.length ? (
                      <LazyPageImage
                        src={resolvedImages[backImgIdx]}
                        shouldLoad={shouldLoadImages}
                        alt={`第 ${backImgIdx + 1} 页`}
                      />
                    ) : (
                      <div className={styles.pageNumberOnly}>
                        <span>{backImgIdx + 1}</span>
                      </div>
                    )}
                  </div>
                ) : (
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
                )}
              </div>
              {/* 左下角翻页热区 */}
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

            {/* ─── 折角翻页效果（独立层，不受 clip-path 影响） ─── */}
            {/* 右侧拖拽：在正面层上方显示折角 */}
            {isActiveDragPage && dragOffset < 0 && flapStyle && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: 'translateZ(1px)',
                  pointerEvents: 'none',
                  zIndex: 300,
                }}
              >
                <div style={flapStyle}>
                  {flapContent}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: isTopHalf
                        ? 'linear-gradient(45deg, rgba(0,0,0,0.05) 0%, transparent 40%)'
                        : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, transparent 40%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>
            )}
            {/* 左侧拖拽：在背面层上方显示折角 */}
            {isActiveDragPage && dragOffset > 0 && flapStyle && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: 'rotateY(180deg) translateZ(1px)',
                  pointerEvents: 'none',
                  zIndex: 300,
                }}
              >
                <div style={flapStyle}>
                  {flapContent}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: isTopHalf
                        ? 'linear-gradient(-45deg, rgba(0,0,0,0.05) 0%, transparent 40%)'
                        : 'linear-gradient(225deg, rgba(0,0,0,0.05) 0%, transparent 40%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )

  return (
    <div
      className={cn(styles.container, className)}
      style={{
        width: typeof width === 'number' ? width * 2 + 300 : '100%',
        height: typeof height === 'number' ? height + 240 : 'auto',
      }}
    >
      <div className={cn(styles.bookWrapper, isOpen && styles.open)} style={{ width, height }}>
        {/* ─── 封面 ─── */}
        <motion.div
          className={styles.cover}
          initial="closed"
          animate={isOpen ? 'open' : isDragging && dragOffset < 0 ? undefined : isHovering ? 'hoverClosed' : 'closed'}
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

        {/* ─── 书页 ─── */}
        {renderPagesContainer()}

        {/* ─── 封底 ─── */}
        <div
          className={styles.backCover}
          style={{
            zIndex: currentPageIndex === totalBookPages - 1 ? 50 : -1,
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

      {/* ─── 导航栏 ─── */}
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
                {currentPageIndex < 0
                  ? 'START'
                  : `${Math.min(currentPageIndex + 1, totalBookPages)} / ${totalBookPages}`}
              </span>
              <span className={styles.navStatus}>{currentPageIndex < 0 ? 'Cover' : 'Reading'}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPage}
              disabled={currentPageIndex >= totalBookPages - 1}
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

      {/* ─── 提示 ─── */}
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

      {/* ─── 拖拽指示器 ─── */}
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
