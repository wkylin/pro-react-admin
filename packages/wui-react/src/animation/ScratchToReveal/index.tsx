import batchBStyles from '../batch-b.module.less'
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from 'react'
import clsx from 'clsx'
import { motion, useAnimation, useReducedMotion } from 'motion/react'

// Keep package CSS in runtime builds without leaking a style import into declarations.
void batchBStyles

export interface ScratchToRevealProps {
  width: number
  height: number
  minScratchPercentage?: number
  onComplete?: () => void
  children: ReactNode
  className?: string
  revealLabel?: string
}

const ScratchToReveal = ({
  width,
  height,
  minScratchPercentage = 50,
  onComplete,
  children,
  className,
  revealLabel = 'Reveal content',
}: ScratchToRevealProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScratching, setIsScratching] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const controls = useAnimation()
  const reducedMotion = useReducedMotion()
  const completedRef = useRef(false)
  const reveal = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    setIsComplete(true)
    setIsScratching(false)
    const canvas = canvasRef.current
    canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
    if (!reducedMotion) void controls.start({ scale: [1, 1.05, 1], transition: { duration: 0.3 } })
    onComplete?.()
  }, [controls, onComplete, reducedMotion])
  useEffect(() => () => controls.stop(), [controls])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas && !completedRef.current) {
      // 关键优化：添加willReadFrequently: true
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, '#A97CF8')
        gradient.addColorStop(0.5, '#F38CB8')
        gradient.addColorStop(1, '#FDCC92')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [width, height])

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = ((clientX - rect.left) * canvas.width) / rect.width
      const y = ((clientY - rect.top) * canvas.height) / rect.height
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 30, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  const checkCompletion = useCallback(() => {
    if (isComplete) return // Check if already completed

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      const totalPixels = pixels.length / 4
      let clearPixels = 0

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearPixels++
      }

      const percentage = (clearPixels / totalPixels) * 100

      if (percentage >= minScratchPercentage) {
        reveal()
      }
    }
  }, [isComplete, minScratchPercentage, reveal])

  useEffect(() => {
    const handleDocumentMouseMove = (event: MouseEvent) => {
      if (!isScratching) return
      scratch(event.clientX, event.clientY)
    }

    const handleDocumentTouchMove = (event: TouchEvent) => {
      if (!isScratching) return
      const touch = event.touches[0]
      if (touch) scratch(touch.clientX, touch.clientY)
    }

    const handleDocumentMouseUp = () => {
      if (!isScratching) return
      setIsScratching(false)
      checkCompletion()
    }

    const handleDocumentTouchEnd = () => {
      if (!isScratching) return
      setIsScratching(false)
      checkCompletion()
    }

    document.addEventListener('mousedown', handleDocumentMouseMove)
    document.addEventListener('mousemove', handleDocumentMouseMove)
    document.addEventListener('touchstart', handleDocumentTouchMove)
    document.addEventListener('touchmove', handleDocumentTouchMove)
    document.addEventListener('mouseup', handleDocumentMouseUp)
    document.addEventListener('touchend', handleDocumentTouchEnd)
    document.addEventListener('touchcancel', handleDocumentTouchEnd)

    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseMove)
      document.removeEventListener('mousemove', handleDocumentMouseMove)
      document.removeEventListener('touchstart', handleDocumentTouchMove)
      document.removeEventListener('touchmove', handleDocumentTouchMove)
      document.removeEventListener('mouseup', handleDocumentMouseUp)
      document.removeEventListener('touchend', handleDocumentTouchEnd)
      document.removeEventListener('touchcancel', handleDocumentTouchEnd)
    }
  }, [isScratching, scratch, checkCompletion])

  // 鼠标 / 触摸按下处理器：开始 scratch 并立即进行一次擦除
  const handleMouseDown = (event: ReactMouseEvent<HTMLCanvasElement>) => {
    if (completedRef.current || reducedMotion) return
    setIsScratching(true)
    scratch(event.clientX, event.clientY)
  }

  const handleTouchStart = (event: ReactTouchEvent<HTMLCanvasElement>) => {
    const touch = event.touches && event.touches[0]
    if (!touch) return
    if (completedRef.current || reducedMotion) return
    setIsScratching(true)
    scratch(touch.clientX, touch.clientY)
  }

  return (
    <motion.div
      className={clsx('wui-scratch', className)}
      style={{
        width,
        height,
        cursor:
          "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+'), auto",
      }}
      animate={controls}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        aria-hidden="true"
        style={{ display: isComplete ? 'none' : undefined }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      ></canvas>
      <div aria-hidden={!isComplete} inert={!isComplete}>
        {children}
      </div>
      {!isComplete && (
        <button type="button" onClick={reveal} style={{ position: 'absolute', right: 8, bottom: 8, zIndex: 1 }}>
          {revealLabel}
        </button>
      )}
      <span
        role="status"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)' }}
      >
        {isComplete ? 'Content revealed' : ''}
      </span>
    </motion.div>
  )
}

export default ScratchToReveal
