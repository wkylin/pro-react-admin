import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight, RefreshCcw, X, BookOpen } from 'lucide-react'
import { pdfjs } from 'react-pdf'
import pageTurnAudio from '@/assets/audio/page-turn.mp3'
import { BookCoverArtwork, BookPageBlock } from './BookVolume'
import PageFlipRenderer, { type FlipPage, type PageFlipHandle } from './PageFlipRenderer'
import styles from './index.module.less'

// ─── 本地 Worker（Vite 8 asset module） ──────────────────────
// Vite 8 使用 new URL('...', import.meta.url) 解析并复制 worker 文件。
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
  /** 自定义封面标题排版；书脊、内封和无障碍名称仍使用 bookTitle */
  coverTitle?: React.ReactNode
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
  /** 合起时的纸张厚度（px），默认 28，范围 6–64 */
  thickness?: number
  /** 封面、书脊与封底的装帧颜色，默认 #17213a */
  coverColor?: string
  /** 是否显示封面纸纹，默认 false */
  textured?: boolean
  onPageChange?: (pageIndex: number) => void
  enableKeyboard?: boolean
  /** 是否显示底部导航栏，默认 true */
  showNavigation?: boolean
  /** 是否启用悬停书角的预卷页效果，默认 true */
  showCornerFlip?: boolean
  /** 是否启用翻页音效，默认 true */
  enableSound?: boolean
  /** 自定义音效文件 URL，默认使用内置翻页音效 */
  soundSrc?: string
  /**
   * 翻页模式：
   * - 'double': 双页模式（传统书籍展开，左右各一页）
   * - 'single': 单页模式（每次显示一页，适合移动端）
   * - 'auto': 窄屏或容器放不下完整双页时使用单页模式
   * 默认 'auto'
   */
  mode?: 'single' | 'double' | 'auto'
  /** 初始是否打开书籍（直接显示内页），默认 false */
  defaultOpen?: boolean
  /** 受控模式：外部控制书籍开合状态。传入后会覆盖内部 isOpen */
  open?: boolean
  /** 书籍关闭时的回调（用户点击关闭按钮时触发） */
  onClose?: () => void
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
    return (
      <div
        className={styles.imgPlaceholder}
        style={{ width: '100%', height: '100%', background: 'var(--wui-bg-subtle)' }}
      />
    )
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
            background: 'var(--wui-bg-subtle)',
            color: 'var(--wui-text-muted)',
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
            background: 'var(--wui-bg-subtle)',
            color: 'var(--wui-text-muted)',
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
              const base = p.substring(0, idx)
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
          const pdf = await pdfjs.getDocument({ url: candidate }).promise
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
function useImagePreloader(images: string[] | undefined, currentPageIndex: number, singlePage = false) {
  const preloadedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!images || images.length === 0) return

    const startBook = Math.max(0, currentPageIndex - PRELOAD_RANGE)
    const totalSheets = singlePage ? images.length : Math.ceil(images.length / 2)
    const endBook = Math.min(totalSheets - 1, currentPageIndex + PRELOAD_RANGE)

    for (let bi = startBook; bi <= endBook; bi++) {
      if (singlePage) {
        // 单页模式：每个 sheet = 1 张图片
        if (bi < images.length && !preloadedRef.current.has(images[bi])) {
          const img = new Image()
          img.src = images[bi]
          preloadedRef.current.add(images[bi])
        }
      } else {
        // 双页模式：每个 sheet = 2 张图片
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
    }
  }, [images, currentPageIndex, singlePage])
}

export default function InteractiveBook({
  coverImage = '',
  bookTitle = 'Book Title',
  coverTitle,
  bookAuthor = 'Author Name',
  pages = [],
  className,
  width = 350,
  height = 500,
  thickness = 28,
  coverColor = '#17213a',
  textured = false,
  pageImages,
  pdfUrl,
  onPageChange,
  enableKeyboard = true,
  showNavigation = true,
  showCornerFlip = true,
  enableSound = true,
  soundSrc,
  mode = 'auto',
  defaultOpen = false,
  open: controlledOpen,
  onClose,
}: InteractiveBookProps) {
  const reducedMotion = !!useReducedMotion()
  const bookDepth = Number.isFinite(thickness) ? Math.min(64, Math.max(6, thickness)) : 28
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = controlledOpen ?? internalOpen
  const [currentFace, setCurrentFace] = useState(0)
  const [atEnd, setAtEnd] = useState(false)
  const [isTurning, setIsTurning] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const lastReportedPage = useRef(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const sizeProbeRef = useRef<HTMLDivElement>(null)
  const flipRef = useRef<PageFlipHandle>(null)
  const coverPointerRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [layout, setLayout] = useState({
    availableWidth: 0,
    outerWidth: 0,
    pageWidth: typeof width === 'number' ? width : 350,
    pageHeight: typeof height === 'number' ? height : 500,
  })
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const probe = sizeProbeRef.current
    if (!container || !probe) return
    const observer = new ResizeObserver((entries) => {
      setLayout((previous) => {
        const entry = entries.find((item) => item.target === container)
        const next = {
          availableWidth: entry?.contentRect.width ?? previous.availableWidth,
          outerWidth: entry?.borderBoxSize[0]?.inlineSize ?? previous.outerWidth,
          pageWidth: Math.max(1, probe.offsetWidth),
          pageHeight: Math.max(1, probe.offsetHeight),
        }
        return Object.keys(next).every((key) => next[key] === previous[key]) ? previous : next
      })
    })
    observer.observe(container)
    observer.observe(probe)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px)')
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const isSinglePage =
    mode === 'single' ||
    (mode === 'auto' && (mobile || (layout.outerWidth > 0 && layout.outerWidth < layout.pageWidth * 2 + 120)))
  const effectiveWidth = Math.max(
    1,
    Math.floor(
      Math.min(
        layout.pageWidth,
        layout.availableWidth > 0 ? layout.availableWidth / (isSinglePage ? 1 : 2) : layout.pageWidth
      )
    )
  )
  const effectiveHeight = Math.round((effectiveWidth * layout.pageHeight) / layout.pageWidth)
  const playPageTurnSound = useCallback(() => {
    if (!enableSound || !audioRef.current) return
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
  }, [enableSound])

  const { pdfImages, pdfLoading, pdfError } = usePdfToImages(pdfUrl, effectiveWidth - 24)
  const isPdfMode = !!pdfUrl
  const resolvedImages = isPdfMode ? pdfImages : pageImages
  const isImageMode = !!resolvedImages?.length
  const faces: BookPage[] = isImageMode
    ? resolvedImages!.map((_, index) => ({ pageNumber: index + 1, content: null }))
    : pages.flatMap((page, index) => [
        { title: page.title, content: page.content, pageNumber: index * 2 + 1 },
        { content: page.backContent, pageNumber: index * 2 + 2 },
      ])
  const hasContent = faces.length > 0 && (!isPdfMode || isImageMode)
  const faceCount = faces.length
  const chapters = isImageMode ? [] : faces.filter((face) => face.title)
  const firstOpenPage = 1
  const endPage = faceCount + (isSinglePage ? 1 : 2 + (faceCount % 2))
  const lastOpenPage = isSinglePage ? endPage : endPage - 1
  const startPage =
    isOpen && !isClosing
      ? atEnd
        ? lastOpenPage
        : isSinglePage
          ? currentFace + 1
          : currentFace === 0
            ? 1
            : Math.floor((currentFace - 1) / 2) * 2 + 3
      : 0
  const visibleStartPage = Math.min(faceCount, currentFace + 1)
  const visibleEndPage = Math.min(faceCount, visibleStartPage + (isSinglePage || currentFace === 0 ? 0 : 1))
  const readingProgress = faceCount ? Math.round((visibleEndPage / faceCount) * 100) : 0
  useImagePreloader(resolvedImages, currentFace, true)

  const reportPage = (page: number) => {
    if (page === 0 || page > endPage) {
      setCurrentFace(0)
      setAtEnd(false)
      setIsClosing(false)
      if (isOpen) {
        setInternalOpen(false)
        onClose?.()
      }
      return
    }
    const face = Math.max(0, Math.min(faceCount - 1, page - (isSinglePage ? 1 : 2)))
    setCurrentFace(face)
    setAtEnd(page >= lastOpenPage)
    const index = isSinglePage ? page - 2 : Math.floor((page - 3) / 2)
    if (index !== lastReportedPage.current) {
      lastReportedPage.current = index
      onPageChange?.(index)
    }
  }
  const reportTurning = (turning: boolean) => {
    setIsTurning(turning)
    if (turning) playPageTurnSound()
  }
  const openBook = () => setInternalOpen(true)
  const closeBook = () => {
    setIsClosing(true)
    flipRef.current?.goTo(0)
  }
  const restartBook = () => flipRef.current?.goTo(firstOpenPage)
  const nextPage = () => {
    if (!isTurning && !atEnd) flipRef.current?.next()
  }
  const previousPage = () => {
    if (!isTurning && (currentFace > 0 || atEnd)) flipRef.current?.previous()
  }

  useEffect(() => {
    if (!hasContent) return
    const page = flipRef.current?.getPage() ?? 0
    if (isOpen && !isClosing && page === 0) flipRef.current?.next()
    else if (!isOpen && page > 0) flipRef.current?.goTo(0)
  }, [isOpen, isClosing, hasContent, isSinglePage])

  const keyboardRef = useRef({ nextPage, previousPage, closeBook, restartBook, lastOpenPage })
  useEffect(() => {
    keyboardRef.current = { nextPage, previousPage, closeBook, restartBook, lastOpenPage }
  })
  useEffect(() => {
    if (!enableKeyboard || !isOpen || !hasContent) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]'))
      )
        return
      const dialog = [...document.querySelectorAll('[role="dialog"][aria-modal="true"]')]
        .reverse()
        .find((element) => element.getClientRects().length && getComputedStyle(element).visibility === 'visible')
      if (dialog && !dialog.contains(containerRef.current)) return
      const actions: Record<string, () => void> = {
        ArrowLeft: keyboardRef.current.previousPage,
        ArrowRight: keyboardRef.current.nextPage,
        Escape: keyboardRef.current.closeBook,
        Home: keyboardRef.current.restartBook,
        End: () => flipRef.current?.goTo(keyboardRef.current.lastOpenPage),
      }
      if (actions[event.key]) {
        event.preventDefault()
        actions[event.key]()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableKeyboard, isOpen, hasContent])

  const frontMatter = (
    <div className={styles.innerContent}>
      <div className={styles.frontMatterHeader}>{chapters.length ? '目录' : '扉页'}</div>
      <div className={styles.frontMatterIntro}>
        <h2 className={styles.innerTitle}>{bookTitle}</h2>
        <p className={styles.innerAuthor}>{bookAuthor}</p>
      </div>
      {chapters.length ? (
        <ol className={styles.contentsList} aria-label="章节目录" data-book-scroll>
          {chapters.map((chapter) => (
            <li key={chapter.pageNumber}>
              <span>{chapter.title}</span>
              <span className={styles.contentsFolio}>{String(chapter.pageNumber).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div
          className={styles.frontispiece}
          aria-hidden="true"
          style={coverImage ? { backgroundImage: `url(${coverImage})` } : undefined}
        />
      )}
      <div className={styles.frontMatterFooter}>
        <span>{chapters.length ? `${chapters.length} 章` : '图文阅读'}</span>
        <span>{faceCount} 页</span>
      </div>
    </div>
  )
  const flipPages: FlipPage[] = [
    {
      key: 'cover',
      density: 'hard',
      className: cn(styles.sheet, styles.coverSheet),
      content: (
        <BookCoverArtwork
          image={coverImage}
          title={bookTitle}
          titleContent={coverTitle}
          author={bookAuthor}
          textured={textured}
        />
      ),
    },
    ...(!isSinglePage
      ? [
          {
            key: 'front-matter',
            density: 'hard' as const,
            className: styles.sheet,
            content: frontMatter,
          },
        ]
      : []),
    ...faces.map((face, index) => ({
      key: `page-${index}`,
      className: styles.sheet,
      content: (
        <div className={styles.pageSurface}>
          <div className={styles.pageLayout}>
            <div className={styles.runningHead}>{bookTitle}</div>
            <div className={styles.pageContent}>
              {isImageMode ? (
                <div className={styles.pageImage}>
                  <LazyPageImage
                    key={resolvedImages![index]}
                    src={resolvedImages![index]}
                    shouldLoad={Math.abs(index - currentFace) <= PRELOAD_RANGE * 2}
                    alt={`第 ${index + 1} 页`}
                  />
                </div>
              ) : (
                <>
                  {face.title && <h3 className={styles.pageTitle}>{face.title}</h3>}
                  <div className={styles.pageText} data-book-scroll>
                    {face.content}
                  </div>
                </>
              )}
            </div>
            <div className={styles.pageFooter}>
              <span>{bookAuthor}</span>
              <span className={styles.pageNumber}>{String(index + 1).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      ),
    })),
    ...(!isSinglePage && faceCount % 2
      ? [{ key: 'blank', className: styles.sheet, content: <div className={styles.pageSurface} /> }]
      : []),
    {
      key: 'end',
      density: 'hard',
      className: styles.sheet,
      content: (
        <div className={styles.backCoverInner}>
          <BookOpen className={styles.endIcon} size={28} aria-hidden="true" />
          <p className={styles.endText}>读完了</p>
          <p className={styles.endTitle}>{bookTitle}</p>
          <button onClick={restartBook} className={styles.restartButton}>
            <RefreshCcw size={14} />
            从头阅读
          </button>
        </div>
      ),
    },
    {
      key: 'back-cover',
      density: 'hard',
      className: cn(styles.sheet, styles.coverSheet),
      content: (
        <div className={styles.backCoverTitle}>
          <BookOpen size={30} />
          <span>{bookTitle}</span>
          <small>{bookAuthor}</small>
        </div>
      ),
    },
  ]

  return (
    <div
      ref={containerRef}
      className={cn(styles.container, isSinglePage && styles.singlePageContainer, className)}
      data-interactive-book
      style={
        {
          maxWidth: typeof width === 'number' ? width * 2 + 120 : '100%',
          minHeight: effectiveHeight + (isSinglePage ? 100 : 140),
          '--book-depth': `${bookDepth}px`,
          '--book-color': coverColor,
        } as React.CSSProperties
      }
    >
      <div ref={sizeProbeRef} className={styles.sizeProbe} style={{ width, height }} aria-hidden="true" />
      {!hasContent ? (
        <div className={styles.emptyState} style={{ width: effectiveWidth, height: effectiveHeight }}>
          {isPdfMode && pdfError ? (
            <>
              <strong>PDF 加载失败</strong>
              <small>{pdfError}</small>
            </>
          ) : isPdfMode && (pdfLoading || !pdfImages.length) ? (
            'PDF 加载中…'
          ) : (
            '暂无内容'
          )}
        </div>
      ) : (
        <div
          className={cn(styles.bookViewport, isSinglePage && styles.singlePageViewport)}
          style={{ width: effectiveWidth * (isSinglePage ? 1 : 2), height: effectiveHeight }}
        >
          <div
            className={cn(styles.bookWrapper, isOpen && styles.open, isSinglePage && styles.singlePage)}
            style={
              {
                width: effectiveWidth * (isSinglePage ? 1 : 2),
                height: effectiveHeight,
                '--page-width': `${effectiveWidth}px`,
              } as React.CSSProperties
            }
          >
            <div className={styles.spreadBoards} aria-hidden="true">
              <div />
              <div />
            </div>
            <div className={styles.closedVolume} aria-hidden="true">
              <div className={styles.volumeBackBoard} />
              <div className={styles.bindingSpine}>
                <span>{bookTitle}</span>
              </div>
              <BookPageBlock depth={bookDepth} />
            </div>
            <PageFlipRenderer
              key={`${isSinglePage}-${faceCount}`}
              ref={flipRef}
              pages={flipPages}
              width={effectiveWidth}
              height={effectiveHeight}
              single={isSinglePage}
              startPage={startPage}
              interactive={isOpen}
              showCorners={showCornerFlip}
              reducedMotion={reducedMotion}
              onFlip={reportPage}
              onTurning={reportTurning}
            />
            {!isOpen && (
              <button
                className={styles.closedCoverTrigger}
                aria-label={`打开《${bookTitle}》`}
                onClick={openBook}
                onPointerDown={(event) => {
                  coverPointerRef.current = event.clientX
                }}
                onPointerUp={(event) => {
                  if (coverPointerRef.current !== null && event.clientX < coverPointerRef.current - 25) openBook()
                  coverPointerRef.current = null
                }}
                onPointerCancel={() => {
                  coverPointerRef.current = null
                }}
              />
            )}
          </div>
        </div>
      )}
      <AnimatePresence>
        {hasContent && showNavigation && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 12, x: '-50%' }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className={styles.navigation}
            role="group"
            aria-label="书籍阅读控制"
          >
            <button
              onClick={previousPage}
              disabled={isTurning || (currentFace === 0 && !atEnd)}
              className={styles.navButton}
              title="上一页"
            >
              <ChevronLeft size={20} />
            </button>
            <div className={styles.navInfo}>
              <span className={styles.navPage} aria-live="polite" aria-atomic="true">
                {visibleStartPage === visibleEndPage ? visibleStartPage : `${visibleStartPage}–${visibleEndPage}`}
                <span className={styles.navTotal}> / {faceCount}</span>
              </span>
              <div
                className={styles.readingProgress}
                role="progressbar"
                aria-label="阅读进度"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={readingProgress}
              >
                <span style={{ width: `${readingProgress}%` }} />
              </div>
            </div>
            <button onClick={nextPage} disabled={isTurning || atEnd} className={styles.navButton} title="下一页">
              <ChevronRight size={20} />
            </button>
            <div className={styles.navDivider} />
            <button onClick={closeBook} className={styles.closeNavButton} title="合上书籍">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {hasContent && isOpen && !showNavigation && (
        <button className={styles.closeButton} title="合上书籍" onClick={closeBook}>
          <X size={18} />
        </button>
      )}
      {hasContent && !isOpen && (
        <div className={styles.hint}>
          <BookOpen size={15} aria-hidden="true" />
          点击封面，或拖动书角翻开
        </div>
      )}
      {enableSound && <audio ref={audioRef} src={soundSrc || pageTurnAudio} preload="auto" />}
    </div>
  )
}
