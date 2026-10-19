import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight, RefreshCcw, Rotate3D, X, BookOpen } from 'lucide-react'
import { pdfjs } from 'react-pdf'
import pageTurnAudio from '@/assets/audio/page-turn.mp3'
import {
  BookBackCoverArtwork,
  BookCoverArtwork,
  BookPageBlock,
  BookSpineCopy,
  BookTurnover3D,
  type BookCoverLayout,
  type BookSpineStyle,
  type BookCoverStyle,
} from './BookVolume'
import PageFlipRenderer, { type FlipPage, type PageFlipHandle } from './PageFlipRenderer'
import styles from './index.module.less'

// ─── 本地 Worker（Webpack 5 asset module） ──────────────────────
// Webpack 5 使用 new URL('...', import.meta.url) 解析并复制 worker 文件。
// 降级：若运行时出错则回退到 unpkg CDN
try {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()
} catch {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return clsx(inputs)
}

function normalizeAngle(angle: number) {
  return ((((angle + 180) % 360) + 360) % 360) - 180
}

function getCoverBaseColor(style: BookCoverStyle) {
  if (style === 'classic') return '#17181d'
  if (style === 'leather') return '#70282d'
  if (style === 'golden-jacket') return '#e5a21b'
  if (style === 'editorial-orange') return '#efeee8'
  return '#17213a'
}

function getVerticalPagePadding(padding: string | undefined, pageWidth: number) {
  const defaultTop = 14
  const defaultBottom = 10
  if (!padding) return defaultTop + defaultBottom

  const values = padding.split(/\s+/).filter(Boolean)
  if (!values.length) return defaultTop + defaultBottom
  const parseLength = (value: string, fallback: number) => {
    const match = value.match(/^(-?(?:\d+(?:\.\d*)?|\.\d+))(px|rem|em|%)?$/i)
    if (!match) return fallback
    const amount = Number(match[1])
    const unit = match[2]?.toLowerCase()
    const pixels = unit === 'rem' || unit === 'em' ? amount * 16 : unit === '%' ? (amount * pageWidth) / 100 : amount
    return Math.max(0, pixels)
  }

  const top = parseLength(values[0], defaultTop)
  const bottomValue = values.length === 1 ? values[0] : values.length === 2 ? values[0] : values[2]
  const bottom = parseLength(bottomValue, defaultBottom)
  return top + bottom
}

function scalePagePadding(pageWidth: number, ratio: number, min: number, max: number) {
  return `${Math.round(Math.min(max, Math.max(min, pageWidth * ratio)))}px`
}

function normalizePagePaddingValue(value: string | number | undefined, fallback: string) {
  if (typeof value === 'number') return `${Math.max(0, value)}px`
  return value?.trim() || fallback
}

export interface BookPage {
  title?: string
  content: React.ReactNode
  backContent?: React.ReactNode
  pageNumber: number
}

export interface InteractiveBookProps {
  coverImage: string
  /** 封面图片裁切位置，CSS object-position 值 */
  coverImagePosition?: string
  /** 封面标签、主标题下方简介、作者与出版信息 */
  coverLabel?: React.ReactNode
  coverContent?: React.ReactNode
  coverAuthor?: React.ReactNode
  /** 封底图片 URL，铺满整个封底 */
  backCoverImage?: string
  /** 封底图片裁切位置，CSS object-position 值 */
  backCoverImagePosition?: string
  /** 封底标签、标题、副标题、简介、作者与出版信息 */
  backCoverLabel?: React.ReactNode
  backCoverTitle?: React.ReactNode
  backCoverSubtitle?: React.ReactNode
  backCoverContent?: React.ReactNode
  backCoverAuthor?: React.ReactNode
  backCoverPublisher?: React.ReactNode
  /** 封底可独立设置装帧、排版与颜色；未设置时沿用封面 */
  backCoverStyle?: BookCoverStyle
  backCoverLayout?: BookCoverLayout
  backCoverColor?: string
  backCoverFontFamily?: string
  backCoverTitleColor?: string
  backCoverTextColor?: string
  backCoverAccentColor?: string
  backCoverTextAlign?: 'left' | 'center' | 'right'
  backCoverTitleStyle?: React.CSSProperties
  /** 是否单独显示封底纸纹；未设置时沿用 textured */
  backCoverTextured?: boolean
  bookTitle?: string
  /** 自定义封面标题排版；书脊、内封和无障碍名称仍使用 bookTitle */
  coverTitle?: React.ReactNode
  /** 封面标题下方的副标题与出版信息 */
  coverSubtitle?: React.ReactNode
  coverPublisher?: React.ReactNode
  /** 封面装帧：插画、黑金精装、酒红皮革、金色书衣或橙白编辑风 */
  coverStyle?: BookCoverStyle
  /** 封面排版布局；titleStyle 可进一步覆盖标题字体与位置 */
  coverLayout?: BookCoverLayout
  coverFontFamily?: string
  coverTitleSize?: number | string
  coverTitleColor?: string
  coverTextColor?: string
  coverAccentColor?: string
  coverTextAlign?: 'left' | 'center' | 'right'
  coverTitleStyle?: React.CSSProperties
  /** 书脊文案默认使用 bookTitle，可单独添加副标题和作者 */
  spineTitle?: React.ReactNode
  spineSubtitle?: React.ReactNode
  spineAuthor?: React.ReactNode
  spineColor?: string
  spineTextColor?: string
  spineAccentColor?: string
  /** 书脊装饰：auto 按装帧匹配，也可选光滑、压纹、横带、古典或极简 */
  spineStyle?: BookSpineStyle
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
  /** 封面、书脊与封底的基础装帧颜色；未设置时按 coverStyle 选择 */
  coverColor?: string
  /** 合起时的垂直倾斜角（deg），默认 4，范围 0–30 */
  tilt?: number
  /** 合起时的水平旋转角（deg），默认 24，范围 0–60 */
  rotation?: number
  /** 启用合起时的 3D 拖动与视角快捷按钮，默认 true */
  enable3DViewControls?: boolean
  /** 内页边距，接受 CSS padding 简写或 px 数值；默认值随书页宽度按比例缩放 */
  pagePadding?: string | number
  /** 内页水平边距；外侧与书脊侧可分别设置，支持 px 数值或 CSS 长度。pagePadding 设置后优先使用 pagePadding */
  pageSidePadding?: { outer?: string | number; gutter?: string | number }
  /** 内页字体，可传 CSS font-family 字体栈 */
  fontFamily?: string
  /** 内页纸张颜色 */
  paperColor?: string
  /** 内页文字颜色 */
  textColor?: string
  /** 页眉、页码等次要文字颜色 */
  mutedColor?: string
  /** 内页分隔线和纸张边缘颜色 */
  ruleColor?: string
  /** 每张目录页显示的章节数上限，默认 6；页面较矮时会自动减少 */
  contentsPerPage?: number
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
  /** 外部请求打开内页或合回封面；整书翻到封面后可再次点击封面阅读 */
  open?: boolean
  /** 书籍关闭时的回调（用户点击关闭按钮时触发） */
  onClose?: () => void
}

// ─── 图片懒加载组件 ────────────────────────────────
// 仅当页面接近当前翻到的位置时才加载图片，避免几百张图片同时请求
const PRELOAD_RANGE = 2 // 预加载当前页 ±2 范围的图片

const LazyPageImage: React.FC<{
  src?: string
  shouldLoad: boolean
  alt?: string
  loadingText?: string
  failureMessage?: string
}> = ({ src, shouldLoad, alt = '', loadingText = '加载中...', failureMessage }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (!shouldLoad || !src || failureMessage) {
    return (
      <div
        className={styles.imgPlaceholder}
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
        {failureMessage ?? (shouldLoad ? loadingText : '')}
      </div>
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
          {loadingText}
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

type PdfLoadingTask = ReturnType<typeof pdfjs.getDocument>
type PdfDocumentProxy = Awaited<PdfLoadingTask['promise']>
type PdfLoadState = {
  images: Array<string | undefined>
  pageCount: number
  loading: boolean
  error: string | null
  pageErrors: Record<number, string>
}

const PDF_PRELOAD_AHEAD = 2

function buildPdfCandidates(originalUrl: string) {
  const candidates = [originalUrl]
  try {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin || ''
      const pathname = window.location.pathname || '/'
      const storybookIndex = pathname.indexOf('/storybook')
      if (storybookIndex !== -1) {
        const base = pathname.substring(0, storybookIndex)
        candidates.push(`${base}/storybook${originalUrl}`)
        if (origin) candidates.push(`${origin}${base}/storybook${originalUrl}`)
      } else {
        const parts = pathname.split('/').filter(Boolean)
        if (parts.length >= 2) {
          const repoPrefix = `/${parts[0]}/${parts[1]}`
          candidates.push(`${repoPrefix}/storybook${originalUrl}`)
          if (origin) candidates.push(`${origin}${repoPrefix}/storybook${originalUrl}`)
        }
      }
    }
  } catch {
    // Keep the original URL if the runtime location is unavailable.
  }
  return [...new Set(candidates)]
}

// Load PDF metadata once, then rasterize the visible pages and the next two pages on demand.
function usePdfToImages(
  pdfUrl: string | undefined,
  renderWidth: number | undefined,
  currentPageIndex: number,
  singlePage: boolean
) {
  const [state, setState] = useState<PdfLoadState>({
    images: [],
    pageCount: 0,
    loading: false,
    error: null,
    pageErrors: {},
  })
  const documentRef = useRef<{ url: string; pdf: PdfDocumentProxy; loadingTask: PdfLoadingTask } | null>(null)
  const imageCacheRef = useRef(new Map<number, { width: number; src: string }>())
  const renderTasksRef = useRef(new Map<number, { width: number; cancel: () => void }>())

  useEffect(() => {
    let cancelled = false
    let loadingTask: PdfLoadingTask | null = null

    for (const task of renderTasksRef.current.values()) task.cancel()
    renderTasksRef.current.clear()
    for (const cachedImage of imageCacheRef.current.values()) URL.revokeObjectURL(cachedImage.src)
    imageCacheRef.current.clear()
    documentRef.current = null
    queueMicrotask(() => {
      if (!cancelled) {
        setState({
          images: [],
          pageCount: 0,
          loading: !!pdfUrl,
          error: null,
          pageErrors: {},
        })
      }
    })

    if (!pdfUrl) {
      return () => {
        cancelled = true
      }
    }

    const loadDocument = async () => {
      let lastError: unknown
      for (const candidate of buildPdfCandidates(pdfUrl)) {
        if (cancelled) return
        const task = pdfjs.getDocument({ url: candidate })
        loadingTask = task
        try {
          const pdf = await task.promise
          if (cancelled) {
            void task.destroy().catch(() => {})
            return
          }
          documentRef.current = { url: pdfUrl, pdf, loadingTask: task }
          setState({
            images: Array.from({ length: pdf.numPages }),
            pageCount: pdf.numPages,
            loading: false,
            error: null,
            pageErrors: {},
          })
          return
        } catch (error) {
          lastError = error
          try {
            await task.destroy()
          } catch {
            // The failed loading task may already be destroyed by PDF.js.
          }
        }
      }

      if (!cancelled) {
        console.error('[InteractiveBook] PDF document load failed:', lastError)
        setState({
          images: [],
          pageCount: 0,
          loading: false,
          error: lastError instanceof Error ? lastError.message : String(lastError ?? 'Unknown PDF error'),
          pageErrors: {},
        })
      }
    }

    void loadDocument()
    return () => {
      cancelled = true
      for (const task of renderTasksRef.current.values()) task.cancel()
      renderTasksRef.current.clear()
      for (const cachedImage of imageCacheRef.current.values()) URL.revokeObjectURL(cachedImage.src)
      imageCacheRef.current.clear()
      if (documentRef.current?.url === pdfUrl) {
        const task = documentRef.current.loadingTask
        documentRef.current = null
        void task.destroy().catch(() => {})
      } else if (loadingTask) {
        void loadingTask.destroy().catch(() => {})
      }
    }
  }, [pdfUrl])

  useEffect(() => {
    const loadedDocument = documentRef.current
    if (!pdfUrl || loadedDocument?.url !== pdfUrl || state.pageCount === 0) return

    const pageCount = Math.min(state.pageCount, loadedDocument.pdf.numPages)
    const startIndex = Math.max(0, Math.min(pageCount - 1, Math.floor(currentPageIndex)))
    const visibleCount = singlePage ? 1 : 2
    const requestEnd = Math.min(pageCount, startIndex + visibleCount + PDF_PRELOAD_AHEAD)
    const requestedIndices = Array.from({ length: requestEnd - startIndex }, (_, offset) => startIndex + offset)
    const keepStart = Math.max(0, startIndex - PDF_PRELOAD_AHEAD)
    const keepIndices = new Set(Array.from({ length: requestEnd - keepStart }, (_, offset) => keepStart + offset))
    const visibleIndices = requestedIndices.slice(0, Math.min(visibleCount, requestedIndices.length))
    const width = Math.max(1, Math.floor(renderWidth ?? 1))
    let cancelled = false

    for (const [index, task] of renderTasksRef.current) {
      if (!keepIndices.has(index) || task.width !== width) {
        task.cancel()
        renderTasksRef.current.delete(index)
      }
    }
    for (const [index, cachedImage] of imageCacheRef.current) {
      if (!keepIndices.has(index) || cachedImage.width !== width) {
        imageCacheRef.current.delete(index)
        URL.revokeObjectURL(cachedImage.src)
      }
    }

    setState((previous) => {
      if (previous.pageCount !== pageCount) return previous
      const images = previous.images.slice()
      let changed = false
      for (let index = 0; index < images.length; index += 1) {
        const cachedImage = keepIndices.has(index) ? imageCacheRef.current.get(index) : undefined
        const nextImage = cachedImage?.width === width ? cachedImage.src : undefined
        if (images[index] !== nextImage) {
          images[index] = nextImage
          changed = true
        }
      }
      return changed ? { ...previous, images } : previous
    })

    const renderRequestedPages = async () => {
      const pendingImages = new Map<number, string>()
      const pendingErrors = new Map<number, string>()
      const publishResults = () => {
        if (cancelled || (pendingImages.size === 0 && pendingErrors.size === 0)) return
        const renderedImages = [...pendingImages]
        const renderErrors = [...pendingErrors]
        pendingImages.clear()
        pendingErrors.clear()
        setState((previous) => {
          if (previous.pageCount !== pageCount) return previous
          const images = previous.images.slice()
          const pageErrors = { ...previous.pageErrors }
          for (const [index, src] of renderedImages) {
            if (keepIndices.has(index)) images[index] = src
            delete pageErrors[index]
          }
          for (const [index, message] of renderErrors) pageErrors[index] = message
          return { ...previous, images, pageErrors }
        })
      }
      const publishWhenVisibleReady = () => {
        if (
          visibleIndices.every(
            (visibleIndex) => imageCacheRef.current.has(visibleIndex) || pendingErrors.has(visibleIndex)
          )
        ) {
          publishResults()
        }
      }

      for (const index of requestedIndices) {
        if (cancelled) return
        const cachedImage = imageCacheRef.current.get(index)
        if (cachedImage?.width === width) continue

        let page: Awaited<ReturnType<PdfDocumentProxy['getPage']>> | null = null
        let canvas: HTMLCanvasElement | null = null
        let renderTask: ReturnType<Awaited<ReturnType<PdfDocumentProxy['getPage']>>['render']> | null = null
        let taskEntry: { width: number; cancel: () => void } | null = null
        try {
          page = await loadedDocument.pdf.getPage(index + 1)
          if (cancelled) return
          const baseViewport = page.getViewport({ scale: 1 })
          const scale = Math.min(3, Math.max(0.25, (width / baseViewport.width) * 2))
          const viewport = page.getViewport({ scale })
          canvas = document.createElement('canvas')
          canvas.width = Math.ceil(viewport.width)
          canvas.height = Math.ceil(viewport.height)
          const context = canvas.getContext('2d', { alpha: false })
          if (!context) throw new Error('无法创建 PDF 页面画布')
          context.fillStyle = '#fdfbf7'
          context.fillRect(0, 0, canvas.width, canvas.height)
          renderTask = page.render({ canvas, canvasContext: context, viewport })
          taskEntry = { width, cancel: () => renderTask?.cancel() }
          renderTasksRef.current.set(index, taskEntry)
          await renderTask.promise
          if (cancelled) return

          const blob = await new Promise<Blob>((resolve, reject) => {
            canvas?.toBlob(
              (result) => (result ? resolve(result) : reject(new Error('PDF 页面图片编码失败'))),
              'image/webp',
              0.92
            )
          })
          if (cancelled) return
          const src = URL.createObjectURL(blob)
          imageCacheRef.current.set(index, { width, src })
          pendingImages.set(index, src)
          pendingErrors.delete(index)
          publishWhenVisibleReady()
        } catch (error) {
          if (!cancelled && !(error instanceof Error && error.name === 'RenderingCancelledException')) {
            pendingErrors.set(index, error instanceof Error ? error.message : String(error))
            publishWhenVisibleReady()
          }
        } finally {
          if (taskEntry && renderTasksRef.current.get(index) === taskEntry) renderTasksRef.current.delete(index)
          page?.cleanup()
          if (canvas) {
            canvas.width = 0
            canvas.height = 0
          }
        }
      }
      publishResults()
    }

    void renderRequestedPages()
    return () => {
      cancelled = true
      for (const index of requestedIndices) {
        const task = renderTasksRef.current.get(index)
        if (task?.width === width) {
          task.cancel()
          renderTasksRef.current.delete(index)
        }
      }
    }
  }, [pdfUrl, renderWidth, currentPageIndex, singlePage, state.pageCount])

  return {
    pdfImages: state.images,
    pdfPageCount: state.pageCount,
    pdfLoading: state.loading,
    pdfError: state.error,
    pdfPageErrors: state.pageErrors,
  }
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
  coverImagePosition,
  coverLabel,
  coverContent,
  coverAuthor,
  backCoverImage,
  backCoverImagePosition,
  backCoverLabel,
  backCoverTitle,
  backCoverSubtitle,
  backCoverContent,
  backCoverAuthor,
  backCoverPublisher,
  backCoverStyle,
  backCoverLayout,
  backCoverColor,
  backCoverFontFamily,
  backCoverTitleColor,
  backCoverTextColor,
  backCoverAccentColor,
  backCoverTextAlign,
  backCoverTitleStyle,
  backCoverTextured,
  bookTitle = 'Book Title',
  coverTitle,
  coverSubtitle,
  coverPublisher,
  coverStyle = 'illustrated',
  coverLayout = 'standard',
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
  bookAuthor = 'Author Name',
  pages = [],
  className,
  width = 350,
  height = 500,
  thickness = 28,
  coverColor,
  tilt = 4,
  rotation = 24,
  enable3DViewControls = true,
  pagePadding,
  pageSidePadding,
  fontFamily,
  paperColor,
  textColor,
  mutedColor,
  ruleColor,
  contentsPerPage = 6,
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
  const resolvedCoverColor = coverColor ?? getCoverBaseColor(coverStyle)
  const resolvedBackCoverColor = backCoverColor ?? coverColor ?? getCoverBaseColor(backCoverStyle ?? coverStyle)
  const resolvedBackCoverTitle = backCoverTitle === undefined ? bookTitle : backCoverTitle
  const resolvedBackCoverAuthor = backCoverAuthor === undefined ? bookAuthor : backCoverAuthor
  const resolvedCoverAuthor = coverAuthor === undefined ? bookAuthor : coverAuthor
  const resolvedSpineTitle = spineTitle ?? bookTitle
  const resolvedSpineTextColor =
    spineTextColor ??
    (coverStyle === 'illustrated'
      ? '#f4f7fd'
      : coverStyle === 'golden-jacket'
        ? '#842c2e'
        : coverStyle === 'editorial-orange'
          ? '#4b2b29'
          : '#f1e4bc')
  const resolvedSpineAccentColor =
    spineAccentColor ??
    coverAccentColor ??
    (coverStyle === 'golden-jacket' ? '#8c3030' : coverStyle === 'editorial-orange' ? '#ef5b25' : '#d2ae62')
  const rawCoverTitleSize = typeof coverTitleSize === 'number' ? `${coverTitleSize}px` : coverTitleSize?.trim()
  const coverTitleSizeValue =
    rawCoverTitleSize && /^\d+(?:\.\d+)?$/.test(rawCoverTitleSize) ? `${rawCoverTitleSize}px` : rawCoverTitleSize
  const bookTilt = Number.isFinite(tilt) ? Math.min(30, Math.max(0, tilt)) : 4
  const bookRotation = Number.isFinite(rotation) ? Math.min(60, Math.max(0, rotation)) : 24
  const [previewAngles, setPreviewAngles] = useState(() => ({ pitch: bookTilt, yaw: -bookRotation }))
  const [isDraggingView, setIsDraggingView] = useState(false)
  const requestedChapterLimit = Number.isFinite(contentsPerPage) ? Math.max(1, Math.floor(contentsPerPage)) : 6
  const [view, setView] = useState<'front' | 'pages' | 'back'>((controlledOpen ?? defaultOpen) ? 'pages' : 'front')
  const isOpen = view !== 'front'
  const atBackCover = view === 'back'
  const [currentFace, setCurrentFace] = useState(0)
  const [currentEnginePage, setCurrentEnginePage] = useState(0)
  const [atEnd, setAtEnd] = useState(false)
  const [isTurning, setIsTurning] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isTurningBook, setIsTurningBook] = useState(false)
  const turnoverRef = useRef(false)
  const turnoverFrameRef = useRef(0)
  const lastReportedPage = useRef(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const sizeProbeRef = useRef<HTMLDivElement>(null)
  const flipRef = useRef<PageFlipHandle>(null)
  const bookWrapperRef = useRef<HTMLDivElement>(null)
  const coverTriggerRef = useRef<HTMLButtonElement>(null)
  const viewDragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    startPitch: number
    startYaw: number
    moved: boolean
  } | null>(null)
  const suppressCoverClickRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [layout, setLayout] = useState({
    availableWidth: 0,
    outerWidth: 0,
    pageWidth: typeof width === 'number' ? width : 350,
    pageHeight: typeof height === 'number' ? height : 500,
  })
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    setPreviewAngles({ pitch: bookTilt, yaw: -bookRotation })
  }, [bookTilt, bookRotation])

  useEffect(() => () => cancelAnimationFrame(turnoverFrameRef.current), [])

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
  const normalizedPagePadding = typeof pagePadding === 'number' ? `${Math.max(0, pagePadding)}px` : pagePadding?.trim()
  const pagePaddingTop = scalePagePadding(effectiveWidth, 0.04, 14, 22)
  const defaultPagePaddingOuter = scalePagePadding(effectiveWidth, 0.065, 22, 36)
  const pagePaddingBottom = scalePagePadding(effectiveWidth, 0.03, 10, 18)
  const defaultPagePaddingGutter = scalePagePadding(effectiveWidth, 0.09, 30, 46)
  const pagePaddingOuter = normalizePagePaddingValue(pageSidePadding?.outer, defaultPagePaddingOuter)
  const pagePaddingGutter = normalizePagePaddingValue(pageSidePadding?.gutter, defaultPagePaddingGutter)
  const resolvedPagePadding =
    normalizedPagePadding || `${pagePaddingTop} ${pagePaddingOuter} ${pagePaddingBottom} ${pagePaddingGutter}`
  const resolvedLeftPagePadding =
    normalizedPagePadding || `${pagePaddingTop} ${pagePaddingGutter} ${pagePaddingBottom} ${pagePaddingOuter}`
  const verticalPagePadding = getVerticalPagePadding(resolvedPagePadding, effectiveWidth)
  const heightBasedChapterLimit = Math.max(1, Math.floor((effectiveHeight - 199 - verticalPagePadding) / 41))
  const chapterLimit = Math.min(requestedChapterLimit, heightBasedChapterLimit)
  const playPageTurnSound = useCallback(() => {
    if (!enableSound || !audioRef.current) return
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
  }, [enableSound])

  const { pdfImages, pdfPageCount, pdfLoading, pdfError, pdfPageErrors } = usePdfToImages(
    pdfUrl,
    effectiveWidth - 24,
    currentFace,
    isSinglePage
  )
  const isPdfMode = !!pdfUrl
  const resolvedImages = isPdfMode ? pdfImages : pageImages
  const imageCount = isPdfMode ? pdfPageCount : (pageImages?.length ?? 0)
  const isImageMode = imageCount > 0
  const faces: BookPage[] = isImageMode
    ? Array.from({ length: imageCount }, (_, index) => ({ pageNumber: index + 1, content: null }))
    : pages.flatMap((page, index) => [
        { title: page.title, content: page.content, pageNumber: index * 2 + 1 },
        { content: page.backContent, pageNumber: index * 2 + 2 },
      ])
  const hasContent = faces.length > 0 && (!isPdfMode || isImageMode)
  const faceCount = faces.length
  const chapters = isImageMode
    ? []
    : faces.flatMap((face, faceIndex) =>
        face.title ? [{ title: face.title, pageNumber: face.pageNumber, faceIndex }] : []
      )
  const contentsPages: Array<typeof chapters> = []
  if (chapters.length === 0) {
    contentsPages.push([])
  } else {
    for (let index = 0; index < chapters.length; index += chapterLimit) {
      contentsPages.push(chapters.slice(index, index + chapterLimit))
    }
  }
  const contentsPageCount = contentsPages.length
  const firstFacePage = 1 + contentsPageCount
  const firstOpenPage = 1
  const previousFirstFacePageRef = useRef(firstFacePage)
  const contentsLayoutChanged = previousFirstFacePageRef.current !== firstFacePage
  const currentPageForLayout =
    contentsLayoutChanged && currentEnginePage > 0
      ? currentEnginePage < previousFirstFacePageRef.current
        ? Math.min(currentEnginePage, contentsPageCount)
        : firstFacePage + currentFace
      : currentEnginePage || firstOpenPage
  useEffect(() => {
    previousFirstFacePageRef.current = firstFacePage
  }, [firstFacePage])
  const endBlankPageCount = !isSinglePage && (firstFacePage + faceCount) % 2 === 1 ? 1 : 0
  const endPage = firstFacePage + faceCount + endBlankPageCount
  const lastOpenPage = isSinglePage ? endPage : endPage - 1
  const backCoverPage = endPage + 1
  const startPage =
    isOpen && !isClosing
      ? atBackCover
        ? backCoverPage
        : atEnd
          ? lastOpenPage
          : Math.min(currentPageForLayout, lastOpenPage)
      : 0
  const visibleStartPage = Math.min(faceCount, currentFace + 1)
  const visibleFaceStart = Math.max(firstFacePage, currentEnginePage)
  const visibleFaceEnd = Math.min(firstFacePage + faceCount, currentEnginePage + (isSinglePage ? 1 : 2))
  const visibleFaceCount = Math.max(0, visibleFaceEnd - visibleFaceStart)
  const visibleEndPage = Math.min(faceCount, visibleStartPage + Math.max(0, visibleFaceCount - 1))
  const readingContentsOnly =
    currentEnginePage > 0 &&
    currentEnginePage < firstFacePage &&
    (isSinglePage || currentEnginePage + 1 < firstFacePage)
  const contentsStartPage = Math.min(contentsPageCount, Math.max(1, currentEnginePage))
  const contentsEndPage = Math.min(contentsPageCount, contentsStartPage + (isSinglePage ? 0 : 1))
  const contentsPageLabel =
    contentsPageCount > 1 && contentsStartPage !== contentsEndPage
      ? `目录 ${contentsStartPage}–${contentsEndPage}`
      : `目录 ${contentsStartPage}/${contentsPageCount}`
  const readingProgress = faceCount && !readingContentsOnly ? Math.round((visibleEndPage / faceCount) * 100) : 0
  useImagePreloader(isPdfMode ? undefined : pageImages, currentFace, true)

  const reportPage = (page: number) => {
    setCurrentEnginePage(page)
    if (page === 0) {
      setCurrentFace(0)
      setAtEnd(false)
      setIsClosing(false)
      setView('front')
      if (isOpen && !turnoverRef.current) onClose?.()
      return
    }
    if (page === backCoverPage) {
      setView('back')
      setCurrentFace(Math.max(0, faceCount - 1))
      setAtEnd(true)
      return
    }
    setView('pages')
    const face = Math.max(0, Math.min(faceCount - 1, page - firstFacePage))
    setCurrentFace(face)
    setAtEnd(page >= lastOpenPage)
    const index = Math.floor(face / 2)
    if (page >= firstFacePage && index !== lastReportedPage.current) {
      lastReportedPage.current = index
      onPageChange?.(index)
    }
  }
  const reportTurning = (turning: boolean) => {
    setIsTurning(turning)
    if (turning) playPageTurnSound()
  }
  const openBook = () => {
    if (controlledOpen === false || isTurningBook) return
    setView('pages')
    flipRef.current?.next()
  }
  const anglePresets = [
    { label: '正面', yaw: 0, pitch: bookTilt },
    { label: '3/4', yaw: -bookRotation, pitch: bookTilt },
    { label: '书脊', yaw: 90, pitch: bookTilt },
    { label: '封底', yaw: -180, pitch: bookTilt },
    { label: '俯视', yaw: -bookRotation, pitch: -48 },
  ]
  const handleCoverPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!enable3DViewControls || event.button !== 0 || !event.isPrimary) return
    suppressCoverClickRef.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
    viewDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startPitch: previewAngles.pitch,
      startYaw: previewAngles.yaw,
      moved: false,
    }
  }
  const handleCoverPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = viewDragRef.current
    if (!enable3DViewControls || !drag || drag.pointerId !== event.pointerId) return
    const deltaX = event.clientX - drag.startX
    const deltaY = event.clientY - drag.startY
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return
    drag.moved = true
    setIsDraggingView(true)
    setPreviewAngles({
      yaw: normalizeAngle(drag.startYaw + deltaX * 0.75),
      pitch: Math.max(-65, Math.min(65, drag.startPitch + deltaY * 0.55)),
    })
  }
  const handleCoverPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = viewDragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    if (drag.moved) {
      suppressCoverClickRef.current = true
      event.preventDefault()
    }
    viewDragRef.current = null
    setIsDraggingView(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const handleCoverPointerCancel = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (viewDragRef.current?.pointerId !== event.pointerId) return
    viewDragRef.current = null
    setIsDraggingView(false)
  }
  const finishTurnover = () => {
    if (!turnoverRef.current) return
    // Swap the engine behind the completed 3D book, without turning through the pages.
    flipRef.current?.goTo(0, false)
    turnoverRef.current = false
    // The engine paints its new static page on its next frame. Keep the 3D book
    // visible until that frame and the wrapper's new pose have both been committed.
    turnoverFrameRef.current = requestAnimationFrame(() => {
      bookWrapperRef.current?.getBoundingClientRect()
      turnoverFrameRef.current = requestAnimationFrame(() => {
        setIsTurningBook(false)
        turnoverFrameRef.current = requestAnimationFrame(() => coverTriggerRef.current?.focus({ preventScroll: true }))
      })
    })
  }
  const turnToFrontCover = () => {
    if (isTurning || isTurningBook || !atBackCover) return
    turnoverRef.current = true
    if (reducedMotion) finishTurnover()
    else setIsTurningBook(true)
  }
  const closeBook = () => {
    if (turnoverRef.current) {
      finishTurnover()
      onClose?.()
      return
    }
    setIsClosing(true)
    flipRef.current?.goTo(0)
  }
  const restartBook = () => {
    if (!isTurningBook) flipRef.current?.goTo(firstOpenPage)
  }
  const nextPage = () => {
    if (!isTurning && !isTurningBook && !atBackCover) flipRef.current?.next()
  }
  const previousPage = () => {
    if (!isTurning && !isTurningBook && (currentEnginePage > firstOpenPage || atEnd || atBackCover)) {
      flipRef.current?.previous()
    }
  }

  const controlledActionsRef = useRef({ openBook, closeBook })
  useEffect(() => {
    controlledActionsRef.current = { openBook, closeBook }
  })
  useEffect(() => {
    if (!hasContent || controlledOpen === undefined) return
    const page = flipRef.current?.getPage() ?? 0
    if (controlledOpen && page === 0) controlledActionsRef.current.openBook()
    else if (!controlledOpen && page > 0) controlledActionsRef.current.closeBook()
  }, [controlledOpen, hasContent])

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
        End: () => {
          if (!turnoverRef.current) flipRef.current?.goTo(keyboardRef.current.lastOpenPage)
        },
      }
      if (actions[event.key]) {
        event.preventDefault()
        actions[event.key]()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableKeyboard, isOpen, hasContent])

  const renderContentsPage = (pageChapters: typeof chapters, contentsIndex: number) => (
    <div className={styles.innerContent}>
      <div className={styles.frontMatterHeader}>
        {chapters.length ? (contentsIndex === 0 ? '目录' : `目录（续 ${contentsIndex + 1}）`) : '扉页'}
      </div>
      {contentsIndex === 0 && (
        <div className={styles.frontMatterIntro}>
          <h2 className={styles.innerTitle}>{bookTitle}</h2>
          <p className={styles.innerAuthor}>{bookAuthor}</p>
        </div>
      )}
      {chapters.length ? (
        <ol className={styles.contentsList} aria-label={`章节目录，第 ${contentsIndex + 1} 页`} data-book-scroll>
          {pageChapters.map((chapter) => (
            <li key={chapter.pageNumber}>
              <button
                type="button"
                className={styles.contentsLink}
                aria-label={`跳转至第 ${chapter.pageNumber} 页：${chapter.title}`}
                onClick={() => flipRef.current?.goTo(firstFacePage + chapter.faceIndex, false)}
              >
                <span title={chapter.title}>{chapter.title}</span>
                <span className={styles.contentsFolio}>{String(chapter.pageNumber).padStart(2, '0')}</span>
              </button>
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
        <span>{chapters.length ? `目录 第 ${contentsIndex + 1} 页` : '图文阅读'}</span>
      </div>
    </div>
  )
  const contentsPageElements = contentsPages.map((pageChapters, index) => renderContentsPage(pageChapters, index))
  const pdfPageRenderStart = Math.max(0, currentFace - PDF_PRELOAD_AHEAD)
  const pdfPageRenderEnd = currentFace + (isSinglePage ? 1 : 2) + PDF_PRELOAD_AHEAD
  const frontArtwork = (
    <BookCoverArtwork
      image={coverImage}
      imagePosition={coverImagePosition}
      title={bookTitle}
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
  )
  const backArtwork = (
    <BookBackCoverArtwork
      image={backCoverImage}
      imagePosition={backCoverImagePosition}
      label={backCoverLabel}
      title={resolvedBackCoverTitle}
      subtitle={backCoverSubtitle}
      content={backCoverContent}
      author={resolvedBackCoverAuthor}
      publisher={backCoverPublisher}
      coverStyle={backCoverStyle ?? coverStyle}
      coverLayout={backCoverLayout ?? coverLayout}
      color={resolvedBackCoverColor}
      fontFamily={backCoverFontFamily ?? coverFontFamily}
      titleColor={backCoverTitleColor}
      textColor={backCoverTextColor}
      accentColor={backCoverAccentColor}
      textAlign={backCoverTextAlign}
      titleStyle={backCoverTitleStyle}
      textured={backCoverTextured ?? textured}
    />
  )
  const flipPages: FlipPage[] = [
    {
      key: 'cover',
      density: 'hard',
      className: cn(styles.sheet, styles.coverSheet),
      content: frontArtwork,
    },
    ...contentsPageElements.map((content, index) => ({
      key: `front-matter-${index}`,
      density: index === 0 ? ('hard' as const) : ('soft' as const),
      className: index === 0 ? cn(styles.sheet, styles.innerCoverSheet) : styles.sheet,
      content,
    })),
    ...faces.map((face, index) => ({
      key: `page-${index}`,
      className: styles.sheet,
      content:
        isPdfMode && (index < pdfPageRenderStart || index >= pdfPageRenderEnd) ? (
          <div className={styles.pageSurface} />
        ) : (
          <div className={styles.pageSurface}>
            <div className={styles.pageLayout}>
              <div className={styles.runningHead}>{bookTitle}</div>
              <div className={styles.pageContent}>
                {isImageMode ? (
                  <div className={styles.pageImage}>
                    <LazyPageImage
                      key={`${index}-${resolvedImages?.[index] ?? 'pending'}`}
                      src={resolvedImages?.[index]}
                      shouldLoad={isPdfMode || Math.abs(index - currentFace) <= PRELOAD_RANGE * 2}
                      alt={`第 ${index + 1} 页`}
                      loadingText={isPdfMode ? 'PDF 页面渲染中…' : '加载中...'}
                      failureMessage={isPdfMode ? pdfPageErrors[index] : undefined}
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
    ...(endBlankPageCount
      ? [{ key: 'blank', className: styles.sheet, content: <div className={styles.pageSurface} /> }]
      : []),
    {
      key: 'end',
      density: 'hard',
      className: cn(styles.sheet, styles.innerCoverSheet),
      content: (
        <div className={cn(styles.pageSurface, styles.backCoverInner)}>
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
      className: cn(styles.sheet, styles.coverSheet, styles.backCoverSheet),
      content: backArtwork,
    },
  ]

  return (
    <div
      ref={containerRef}
      className={cn(styles.container, isSinglePage && styles.singlePageContainer, className)}
      data-interactive-book
      data-book-view={view}
      aria-busy={isTurningBook}
      style={
        {
          maxWidth: typeof width === 'number' ? width * 2 + 120 : '100%',
          minHeight: effectiveHeight + (isSinglePage ? 100 : 140),
          '--book-depth': `${bookDepth}px`,
          '--book-color': resolvedCoverColor,
          '--spine-color': spineColor ?? resolvedCoverColor,
          '--spine-text-override': resolvedSpineTextColor,
          '--spine-accent-override': resolvedSpineAccentColor,
          ...(coverFontFamily ? { '--cover-font-family': coverFontFamily } : {}),
          ...(coverTitleSizeValue ? { '--cover-title-size': coverTitleSizeValue } : {}),
          ...(coverTitleColor ? { '--cover-title-color-override': coverTitleColor } : {}),
          ...(coverTextColor ? { '--cover-text-color-override': coverTextColor } : {}),
          ...(coverAccentColor ? { '--cover-accent-override': coverAccentColor } : {}),
          '--cover-title-align': coverTextAlign ?? (coverLayout === 'standard' ? 'left' : 'center'),
          ...(paperColor ? { '--reading-paper': paperColor } : {}),
          ...(textColor ? { '--reading-ink': textColor, '--reading-body': textColor } : {}),
          ...(mutedColor ? { '--reading-muted': mutedColor } : {}),
          ...(ruleColor ? { '--reading-rule': ruleColor, '--reading-border': ruleColor } : {}),
          ...(fontFamily ? { '--book-font-family': fontFamily } : {}),
          '--book-page-padding': resolvedPagePadding,
          '--book-left-page-padding': resolvedLeftPagePadding,
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
          ) : isPdfMode && (pdfLoading || !pdfPageCount) ? (
            'PDF 加载中…'
          ) : (
            '暂无内容'
          )}
        </div>
      ) : (
        <div
          className={cn(styles.bookViewport, isSinglePage && styles.singlePageViewport)}
          data-interactive-book-viewport
          data-book-open={String(isOpen)}
          style={
            {
              width: effectiveWidth * (isSinglePage ? 1 : 2),
              height: effectiveHeight,
              '--page-width': `${effectiveWidth}px`,
            } as React.CSSProperties
          }
        >
          <div
            ref={bookWrapperRef}
            className={cn(
              styles.bookWrapper,
              isOpen && styles.open,
              isSinglePage && styles.singlePage,
              isTurningBook && styles.turnoverHidden
            )}
            inert={isTurningBook}
            aria-hidden={isTurningBook || undefined}
            data-view-dragging={isDraggingView || undefined}
            data-book-preview-surface
            style={
              {
                width: effectiveWidth * (isSinglePage ? 1 : 2),
                height: effectiveHeight,
                '--page-width': `${effectiveWidth}px`,
                '--book-tilt': `${bookTilt}deg`,
                '--book-rotation': `${bookRotation}deg`,
                '--book-preview-pitch': `${previewAngles.pitch}deg`,
                '--book-preview-yaw': `${previewAngles.yaw}deg`,
              } as React.CSSProperties
            }
          >
            <div className={styles.spreadBoards} aria-hidden="true">
              <div />
              <div />
            </div>
            <div className={styles.closedVolume} aria-hidden="true">
              <div className={styles.volumeBackBoard}>
                <div className={styles.volumeBackArtwork}>{backArtwork}</div>
              </div>
              <div className={styles.bindingSpine} data-cover-style={coverStyle} data-spine-style={spineStyle}>
                <BookSpineCopy
                  title={resolvedSpineTitle}
                  subtitle={spineSubtitle}
                  author={spineAuthor}
                  spineStyle={spineStyle}
                />
              </div>
              <BookPageBlock depth={bookDepth} />
            </div>
            <PageFlipRenderer
              key={`${isSinglePage}-${faceCount}-${contentsPageCount}`}
              ref={flipRef}
              pages={flipPages}
              width={effectiveWidth}
              height={effectiveHeight}
              single={isSinglePage}
              startPage={startPage}
              interactive={isOpen && !isTurningBook}
              showCorners={showCornerFlip}
              reducedMotion={reducedMotion}
              onFlip={reportPage}
              onTurning={reportTurning}
            />
            {!isOpen && (
              <button
                ref={coverTriggerRef}
                className={cn(styles.closedCoverTrigger, enable3DViewControls && styles.rotatableCover)}
                aria-label={enable3DViewControls ? `拖动旋转封面或点击打开《${bookTitle}》` : `打开《${bookTitle}》`}
                onClick={(event) => {
                  if (event.detail > 0 && suppressCoverClickRef.current) {
                    suppressCoverClickRef.current = false
                    event.preventDefault()
                    return
                  }
                  suppressCoverClickRef.current = false
                  openBook()
                }}
                onPointerDown={handleCoverPointerDown}
                onPointerMove={handleCoverPointerMove}
                onPointerUp={handleCoverPointerUp}
                onPointerCancel={handleCoverPointerCancel}
              />
            )}
          </div>
          {isTurningBook && (
            <BookTurnover3D
              front={frontArtwork}
              back={backArtwork}
              title={bookTitle}
              spineTitle={resolvedSpineTitle}
              spineSubtitle={spineSubtitle}
              spineAuthor={spineAuthor}
              spineStyle={spineStyle}
              coverStyle={coverStyle}
              tilt={bookTilt}
              rotation={bookRotation}
              onComplete={finishTurnover}
            />
          )}
        </div>
      )}
      {hasContent && !isOpen && enable3DViewControls && (
        <nav className={styles.angleControls} aria-label="书本 3D 视角">
          {anglePresets.map((preset) => {
            const yawDifference = normalizeAngle(previewAngles.yaw - preset.yaw)
            const isSelected = Math.abs(yawDifference) < 2 && Math.abs(previewAngles.pitch - preset.pitch) < 2
            return (
              <button
                key={preset.label}
                type="button"
                className={cn(styles.angleControl, isSelected && styles.angleControlActive)}
                aria-pressed={isSelected}
                onClick={() => setPreviewAngles({ pitch: preset.pitch, yaw: preset.yaw })}
              >
                {preset.label}
              </button>
            )
          })}
        </nav>
      )}
      {hasContent && !isOpen && (
        <div className={styles.hint}>
          <BookOpen size={15} aria-hidden="true" />
          {enable3DViewControls ? '拖动封面旋转视角，点击封面打开' : '点击封面打开阅读'}
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
              disabled={isTurning || isTurningBook || (currentEnginePage <= firstOpenPage && !atEnd && !atBackCover)}
              className={styles.navButton}
              title="上一页"
            >
              <ChevronLeft size={20} />
            </button>
            <div className={styles.navInfo}>
              <span className={styles.navPage} aria-live="polite" aria-atomic="true">
                {atBackCover ? (
                  '封底'
                ) : readingContentsOnly ? (
                  contentsPageLabel
                ) : (
                  <>
                    {visibleStartPage === visibleEndPage ? visibleStartPage : `${visibleStartPage}–${visibleEndPage}`}
                    <span className={styles.navTotal}> / {faceCount}</span>
                  </>
                )}
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
            {atBackCover ? (
              <button
                onClick={turnToFrontCover}
                disabled={isTurning || isTurningBook}
                className={styles.returnCoverButton}
              >
                <Rotate3D size={17} />
                翻到封面
              </button>
            ) : (
              <button
                onClick={nextPage}
                disabled={isTurning || isTurningBook}
                className={styles.navButton}
                title={atEnd ? '翻到封底' : '下一页'}
              >
                <ChevronRight size={20} />
              </button>
            )}
            <div className={styles.navDivider} />
            <button onClick={closeBook} disabled={isTurningBook} className={styles.closeNavButton} title="合上书籍">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {hasContent && atBackCover && !showNavigation && (
        <div className={styles.backCoverActions}>
          <button className={styles.returnCoverButton} onClick={turnToFrontCover} disabled={isTurning || isTurningBook}>
            <Rotate3D size={17} />
            翻到封面
          </button>
        </div>
      )}
      {hasContent && isOpen && !showNavigation && (
        <button className={styles.closeButton} title="合上书籍" onClick={closeBook} disabled={isTurningBook}>
          <X size={18} />
        </button>
      )}
      {enableSound && <audio ref={audioRef} src={soundSrc || pageTurnAudio} preload="auto" />}
    </div>
  )
}
