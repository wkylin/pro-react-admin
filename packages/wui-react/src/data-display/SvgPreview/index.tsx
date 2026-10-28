import AnimatedIcon from '../../AnimatedIcon'
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from 'react'
import { Button } from 'antd'
import { sanitizeSvg } from './sanitize'
import { ZoomIn as ZoomInOutlined } from 'lucide-react'
import { ZoomOut as ZoomOutOutlined } from 'lucide-react'
import { RotateCcw as SyncOutlined } from 'lucide-react'
import { Download as DownloadOutlined } from 'lucide-react'
import { Maximize as FullscreenOutlined } from 'lucide-react'
import { Minimize as FullscreenExitOutlined } from 'lucide-react'

const defaultBg = '#1e1e1e'

type Position = {
  x: number
  y: number
}

type PositionWithScale = Position & {
  __scale?: number
}

export type SvgPreviewProps = {
  onError?: (error: unknown) => void
  onStatus?: (message: string) => void
  svgSource?: string
  svgUrl?: string
  SvgComponent?: ComponentType<SVGProps<SVGSVGElement>> | null
  downloadName?: string
  background?: string
}

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void
  mozRequestFullScreen?: () => Promise<void> | void
  msRequestFullscreen?: () => Promise<void> | void
}

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null
  msFullscreenElement?: Element | null
  webkitExitFullscreen?: () => Promise<void> | void
  mozCancelFullScreen?: () => Promise<void> | void
  msExitFullscreen?: () => Promise<void> | void
}

function SvgPreview({
  svgSource = '',
  svgUrl = '',
  SvgComponent = null,
  downloadName = 'diagram.svg',
  background = defaultBg,
  onError,
  onStatus,
}: SvgPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)

  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')
  const feedback = useRef({ onError, onStatus })
  feedback.current = { onError, onStatus }
  const message = {
    info: (text: string) => {
      setStatus(text)
      feedback.current.onStatus?.(text)
    },
    success: (text: string) => {
      setStatus(text)
      feedback.current.onStatus?.(text)
    },
    error: (text: string) => {
      setStatus(text)
    },
  }
  const [scale, setScale] = useState(0.6)
  const scaleRef = useRef(scale)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const positionRef = useRef<PositionWithScale>(position)
  const [isDragging, setIsDragging] = useState(false)
  const isDraggingRef = useRef(isDragging)
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 })
  const startPosRef = useRef(startPos)

  useEffect(() => {
    scaleRef.current = scale
  }, [scale])
  useEffect(() => {
    positionRef.current = position
  }, [position])
  useEffect(() => {
    isDraggingRef.current = isDragging
  }, [isDragging])
  useEffect(() => {
    startPosRef.current = startPos
  }, [startPos])

  useEffect(() => {
    const controller = new AbortController()
    setContent('')
    const apply = (source: string) => {
      if (controller.signal.aborted) return
      const sanitized = sanitizeSvg(source)
      setContent(sanitized)
      if (source && !sanitized) feedback.current.onError?.(new Error('Invalid SVG'))
    }
    if (!SvgComponent) {
      if (svgUrl) {
        void fetch(svgUrl, { signal: controller.signal })
          .then((response) => {
            if (!response.ok) throw new Error(`SVG request failed: ${response.status}`)
            return response.text()
          })
          .then(apply)
          .catch((error) => {
            if (!controller.signal.aborted) feedback.current.onError?.(error)
          })
      } else apply(svgSource)
    }
    return () => controller.abort()
  }, [svgUrl, svgSource, SvgComponent])

  // center on mount / when content changes
  useEffect(() => {
    const el = containerRef.current
    const inner = innerRef.current
    if (!el || !inner) return
    const svg = inner.querySelector('svg')
    if (!svg) return
    // apply rendering hints
    try {
      svg.setAttribute('shape-rendering', 'geometricPrecision')
      svg.setAttribute('text-rendering', 'geometricPrecision')
      svg.style.imageRendering = 'optimizeQuality'
    } catch (e) {
      feedback.current.onError?.(e)
    }

    const cRect = el.getBoundingClientRect()
    const sRect = svg.getBoundingClientRect()
    const cx = (cRect.width - sRect.width) / 2
    const cy = (cRect.height - sRect.height) / 2
    positionRef.current = { x: cx, y: cy }
    setPosition({ x: cx, y: cy })
    positionRef.current.__scale = scaleRef.current
  }, [content, SvgComponent])

  // native handlers for drag/touch/wheel
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      isDraggingRef.current = true
      const x = e.clientX - positionRef.current.x
      const y = e.clientY - positionRef.current.y
      setStartPos({ x, y })
      startPosRef.current = { x, y }
    }

    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return
      const t = e.touches[0]
      setIsDragging(true)
      isDraggingRef.current = true
      const x = t.clientX - positionRef.current.x
      const y = t.clientY - positionRef.current.y
      setStartPos({ x, y })
      startPosRef.current = { x, y }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !e.touches || e.touches.length === 0) return
      e.preventDefault()
      const t = e.touches[0]
      setPosition({ x: t.clientX - startPosRef.current.x, y: t.clientY - startPosRef.current.y })
    }

    const onTouchEnd = () => {
      setIsDragging(false)
      isDraggingRef.current = false
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const curScale = positionRef.current?.__scale || scaleRef.current
      const factor = e.deltaY < 0 ? 1.12 : 0.88
      const ns = Math.min(5, Math.max(0.1, curScale * factor))
      const ratio = ns / curScale
      const curPos = positionRef.current || { x: 0, y: 0 }
      const newX = mx - (mx - curPos.x) * ratio
      const newY = my - (my - curPos.y) * ratio
      positionRef.current = { x: newX, y: newY }
      setPosition({ x: newX, y: newY })
      positionRef.current.__scale = ns
      scaleRef.current = ns
      setScale(ns)
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('wheel', onWheel, { passive: false })

    // mousemove / up on window to track dragging
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      setPosition({ x: e.clientX - startPosRef.current.x, y: e.clientY - startPosRef.current.y })
    }
    const onMouseUp = () => {
      isDraggingRef.current = false
      setIsDragging(false)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('wheel', onWheel)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  const handleZoomIn = () => {
    setScale((prev) => {
      const ns = Math.min(prev + 0.2, 5)
      scaleRef.current = ns
      return ns
    })
  }
  const handleZoomOut = () => {
    setScale((prev) => {
      const ns = Math.max(prev - 0.2, 0.1)
      scaleRef.current = ns
      return ns
    })
  }
  const handleReset = () => {
    setScale(0.6)
    scaleRef.current = 0.6
    setPosition({ x: 0, y: 0 })
    message.info('视图已重置')
  }

  const prepareSvgForDownload = (raw: string): string => {
    const safe = sanitizeSvg(raw)
    if (!safe) throw new Error('No SVG content')
    const doc = new DOMParser().parseFromString(safe, 'image/svg+xml')
    const rect = doc.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('width', '100%')
    rect.setAttribute('height', '100%')
    rect.setAttribute('fill', /^#[a-f\d]{3,8}$/i.test(background) ? background : '#ffffff')
    doc.documentElement.prepend(rect)
    return new XMLSerializer().serializeToString(doc.documentElement)
  }

  const handleDownload = async () => {
    try {
      let raw = content
      // if no raw string but a SvgComponent is rendered, serialize the rendered SVG DOM
      if (!raw && SvgComponent && innerRef.current) {
        try {
          const svgNode = innerRef?.current?.querySelector('svg')
          if (svgNode) {
            const cloned = svgNode.cloneNode(true) as SVGSVGElement
            if (!cloned.getAttribute('xmlns')) {
              cloned.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            }
            const ser = new XMLSerializer().serializeToString(cloned)
            raw = ser
          }
        } catch (e) {
          feedback.current.onError?.(e)
        }
      }
      if (!raw) throw new Error('no svg content')
      const svg = prepareSvgForDownload(raw)
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      try {
        a.href = url
        a.download = downloadName
        document.body.appendChild(a)
        a.click()
      } finally {
        a.remove()
        URL.revokeObjectURL(url)
      }
      message.success('SVG 下载已开始')
    } catch (e) {
      feedback.current.onError?.(e)
      message.error('下载失败')
    }
  }

  // fullscreen handling
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onFsChange = () => {
      try {
        const fullscreenDocument = document as FullscreenDocument
        const isFs = !!(
          fullscreenDocument.fullscreenElement ||
          fullscreenDocument.webkitFullscreenElement ||
          fullscreenDocument.msFullscreenElement
        )
        // temporarily disable transform transitions to avoid layout/paint thrash when entering/exiting fullscreen
        try {
          const el = innerRef.current
          if (el) {
            const prev = el.style.transition
            el.style.transition = 'none'
            el.style.transition = prev || ''
          }
        } catch (e) {
          feedback.current.onError?.(e)
        }
        setIsFullscreen(isFs)
      } catch (e) {
        feedback.current.onError?.(e)
      }
    }
    document.addEventListener('fullscreenchange', onFsChange)
    document.addEventListener('webkitfullscreenchange', onFsChange)
    document.addEventListener('mozfullscreenchange', onFsChange)
    document.addEventListener('MSFullscreenChange', onFsChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      document.removeEventListener('webkitfullscreenchange', onFsChange)
      document.removeEventListener('mozfullscreenchange', onFsChange)
      document.removeEventListener('MSFullscreenChange', onFsChange)
    }
  }, [])

  const enterFullscreen = async (el: FullscreenElement | null): Promise<void> => {
    if (!el) return
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen
    if (req) {
      try {
        await req.call(el)
      } catch (e) {
        feedback.current.onError?.(e)
      }
    }
  }

  const exitFullscreen = async () => {
    const fullscreenDocument = document as FullscreenDocument
    const exit =
      fullscreenDocument.exitFullscreen ||
      fullscreenDocument.webkitExitFullscreen ||
      fullscreenDocument.mozCancelFullScreen ||
      fullscreenDocument.msExitFullscreen
    if (exit) {
      try {
        await exit.call(document)
      } catch (e) {
        feedback.current.onError?.(e)
      }
    }
  }

  const toggleFullscreen = async () => {
    try {
      const el = innerRef.current
      if (el) {
        const prev = el.style.transition
        el.style.transition = 'none'
        if (!isFullscreen) {
          await enterFullscreen(containerRef.current || document.documentElement)
        } else {
          await exitFullscreen()
        }
        el.style.transition = prev || ''
        return
      }
    } catch (e) {
      feedback.current.onError?.(e)
    }

    if (!isFullscreen) {
      await enterFullscreen(containerRef.current || document.documentElement)
    } else {
      await exitFullscreen()
    }
  }

  return (
    <div style={{ height: '100%', minHeight: 300, position: 'relative' }}>
      <span role="status">{status}</span>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === '+' || event.key === '=') {
            event.preventDefault()
            handleZoomIn()
          } else if (event.key === '-') {
            event.preventDefault()
            handleZoomOut()
          } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault()
            setPosition((position) => ({
              x: position.x + (event.key === 'ArrowLeft' ? -20 : event.key === 'ArrowRight' ? 20 : 0),
              y: position.y + (event.key === 'ArrowUp' ? -20 : event.key === 'ArrowDown' ? 20 : 0),
            }))
          }
        }}
        role="application"
        aria-label="SVG viewer"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: background,
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative',
        }}
      >
        <div
          ref={innerRef}
          style={{
            transformOrigin: '0 0',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            willChange: 'transform',
          }}
        >
          {SvgComponent ? (
            <SvgComponent style={{ width: '100%', height: '100%' }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>
      </div>
      <div
        role="toolbar"
        aria-label="SVG controls"
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          zIndex: 1200,
          background: 'rgba(0,0,0,0.45)',
          padding: '6px 10px',
          borderRadius: 10,
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
        }}
      >
        <Button
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <ZoomOutOutlined />
            </AnimatedIcon>
          }
          aria-label="Zoom out"
          onClick={handleZoomOut}
          type="text"
          style={{ color: '#fff' }}
        />
        <div style={{ color: '#fff', minWidth: 56, textAlign: 'center', fontWeight: 500 }}>
          {Math.round(scale * 100)}%
        </div>
        <Button
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <ZoomInOutlined />
            </AnimatedIcon>
          }
          aria-label="Zoom in"
          onClick={handleZoomIn}
          type="text"
          style={{ color: '#fff' }}
        />
        <Button
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <SyncOutlined />
            </AnimatedIcon>
          }
          aria-label="Reset view"
          onClick={handleReset}
          type="text"
          style={{ color: '#fff' }}
        />
        <Button
          icon={
            isFullscreen ? (
              <AnimatedIcon variant="spin" mode="hover">
                <FullscreenExitOutlined />
              </AnimatedIcon>
            ) : (
              <AnimatedIcon variant="spin" mode="hover">
                <FullscreenOutlined />
              </AnimatedIcon>
            )
          }
          aria-label="Toggle fullscreen"
          onClick={toggleFullscreen}
          type="text"
          style={{ color: '#fff' }}
        />
        <Button
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <DownloadOutlined />
            </AnimatedIcon>
          }
          aria-label="Download SVG"
          onClick={handleDownload}
          type="primary"
          size="small"
        >
          下载
        </Button>
      </div>
    </div>
  )
}

export default SvgPreview
