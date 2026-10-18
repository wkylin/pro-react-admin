import { useState, useEffect, useRef, useCallback, useMemo, type KeyboardEvent } from 'react'
import { RefreshCw, Zap } from 'lucide-react'
import AnimatedIcon from '../AnimatedIcon'
import styles from './index.module.less'
import { CaptchaUtils, type Difficulty } from './utils'

export type { Difficulty as SliderCaptchaDifficulty } from './utils'

export interface SliderCaptchaProps {
  onSuccess?: () => void
  onFail?: () => void
  onRefresh?: () => void
  difficulty?: Difficulty
}

type CaptchaStatus = 'idle' | 'success' | 'fail'

const SliderCaptcha = ({ onSuccess, onFail, onRefresh, difficulty = 'medium' }: SliderCaptchaProps) => {
  const width = 300
  const height = 180
  const pieceSize = 50

  const difficultySettings = useMemo(() => {
    switch (difficulty) {
      case 'easy':
        return { maxShapes: 3, threshold: 20, tolerance: 5 }
      case 'hard':
        return { maxShapes: 6, threshold: 10, tolerance: 2 }
      default:
        return { maxShapes: 6, threshold: 15, tolerance: 3 }
    }
  }, [difficulty])

  const [bgUrl, setBgUrl] = useState('')
  const [pieceUrl, setPieceUrl] = useState('')
  const [targetX, setTargetX] = useState(0)
  const [targetY, setTargetY] = useState(0)
  const [sliderX, setSliderX] = useState(0)
  const [status, setStatus] = useState<CaptchaStatus>('idle')
  const [isDragging, setIsDragging] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const startXRef = useRef(0)
  const currentXRef = useRef(0)
  const callbacksRef = useRef({ onSuccess, onFail, onRefresh })
  const completedRef = useRef(false)
  const mountedRef = useRef(false)
  const refreshSequenceRef = useRef(0)
  const failTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    callbacksRef.current = { onSuccess, onFail, onRefresh }
  }, [onSuccess, onFail, onRefresh])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      refreshSequenceRef.current += 1
      if (failTimerRef.current !== null) clearTimeout(failTimerRef.current)
    }
  }, [])

  // ─── 响应式缩放（适配移动端） ─────────────────
  const canvasAreaRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef(1)
  const [displayScale, setDisplayScale] = useState(1)

  useEffect(() => {
    const el = canvasAreaRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      if (w > 0) {
        const s = w / width
        scaleRef.current = s
        setDisplayScale((prev) => (Math.abs(prev - s) < 0.001 ? prev : s))
      }
    }
    measure()
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(measure)
      ro.observe(el)
      return () => ro.disconnect()
    }

    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [width])

  const refresh = useCallback(async () => {
    const refreshSequence = ++refreshSequenceRef.current
    if (failTimerRef.current !== null) {
      clearTimeout(failTimerRef.current)
      failTimerRef.current = null
    }
    completedRef.current = false
    setIsRefreshing(true)
    setStatus('idle')
    setSliderX(0)
    currentXRef.current = 0

    const bg = CaptchaUtils.generateBgCanvas(width, height, difficulty)
    const tx = CaptchaUtils.random(100, width - pieceSize - 10)
    const ty = CaptchaUtils.random(20, height - pieceSize - 20)
    setTargetX(tx)
    setTargetY(ty)

    const shapeType = CaptchaUtils.random(0, difficultySettings.maxShapes - 1)

    try {
      const [finalBg, piece] = await Promise.all([
        CaptchaUtils.cutHole(bg, tx, ty, pieceSize, shapeType),
        CaptchaUtils.generatePiece(bg, tx, ty, pieceSize, shapeType),
      ])

      if (!mountedRef.current || refreshSequence !== refreshSequenceRef.current) return
      setBgUrl(finalBg)
      setPieceUrl(piece)
      callbacksRef.current.onRefresh?.()
    } catch {
      if (!mountedRef.current || refreshSequence !== refreshSequenceRef.current) return
      setBgUrl('')
      setPieceUrl('')
    } finally {
      if (mountedRef.current && refreshSequence === refreshSequenceRef.current) {
        setIsRefreshing(false)
      }
    }
  }, [width, height, pieceSize, difficulty, difficultySettings])

  useEffect(() => {
    let cancelled = false
    Promise.resolve().then(() => {
      if (!cancelled) void refresh()
    })
    return () => {
      cancelled = true
    }
  }, [refresh])

  const completeSuccess = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    setIsDragging(false)
    setStatus('success')
    callbacksRef.current.onSuccess?.()
  }, [])

  const handleStart = useCallback(
    (clientX: number) => {
      if (status === 'success' || isRefreshing || completedRef.current) return
      setIsDragging(true)
      startXRef.current = clientX - currentXRef.current * scaleRef.current
    },
    [status, isRefreshing]
  )

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return

      let x = (clientX - startXRef.current) / scaleRef.current
      if (x < 0) x = 0
      if (x > width - pieceSize) x = width - pieceSize

      const distToTarget = Math.abs(x - targetX)

      if (distToTarget < difficultySettings.threshold) {
        x = targetX
      }

      currentXRef.current = x
      setSliderX(x)

      if (x === targetX) {
        completeSuccess()
      }
    },
    [completeSuccess, isDragging, width, pieceSize, targetX, difficultySettings]
  )

  const handleEnd = useCallback(() => {
    if (!isDragging || completedRef.current) return
    setIsDragging(false)

    const finalX = currentXRef.current

    if (Math.abs(finalX - targetX) < difficultySettings.tolerance) {
      completeSuccess()
    } else {
      setStatus('fail')
      callbacksRef.current.onFail?.()
      if (failTimerRef.current !== null) clearTimeout(failTimerRef.current)
      failTimerRef.current = setTimeout(() => {
        if (!mountedRef.current) return
        setStatus('idle')
        setSliderX(0)
        currentXRef.current = 0
        failTimerRef.current = null
      }, 800)
    }
  }, [completeSuccess, isDragging, targetX, difficultySettings])

  const handleSliderKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (status === 'success' || isRefreshing || completedRef.current) return

      const max = width - pieceSize
      const step = Math.max(1, Math.round(max / 30))
      let next = currentXRef.current

      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = Math.min(max, next + step)
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = Math.max(0, next - step)
      else if (event.key === 'Home') next = 0
      else if (event.key === 'End') next = max
      else return

      event.preventDefault()
      if (Math.abs(next - targetX) < difficultySettings.threshold) next = targetX
      currentXRef.current = next
      setSliderX(next)
      if (next === targetX) completeSuccess()
    },
    [completeSuccess, difficultySettings.threshold, isRefreshing, pieceSize, status, targetX, width]
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleMouseUp = () => handleEnd()
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      if (touch) handleMove(touch.clientX)
    }
    const handleTouchEnd = () => handleEnd()

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleMove, handleEnd])

  const getTrackClassName = () => {
    switch (status) {
      case 'success':
        return styles.trackSuccess
      case 'fail':
        return styles.trackFail
      default:
        return styles.trackIdle
    }
  }

  const getSliderClassName = () => {
    switch (status) {
      case 'success':
        return styles.sliderSuccess
      case 'fail':
        return styles.sliderFail
      default:
        return ''
    }
  }

  const getDifficultyLabel = () => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <span>Slider Captcha</span>
          <span className={styles.difficulty}>
            <AnimatedIcon variant="pulse" mode="hover">
              <Zap size={12} />
            </AnimatedIcon>
            {getDifficultyLabel()}
          </span>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={isRefreshing}
          className={styles.refreshButton}
          aria-label="Refresh captcha"
        >
          <AnimatedIcon variant="spin" mode={isRefreshing ? 'auto' : 'idle'}>
            <RefreshCw size={18} />
          </AnimatedIcon>
        </button>
      </div>

      <div ref={canvasAreaRef} className={styles.canvasArea} style={{ aspectRatio: `${width} / ${height}` }}>
        {bgUrl && <img src={bgUrl} alt="" aria-hidden className={styles.backgroundImage} draggable={false} />}

        {pieceUrl && (
          <img
            src={pieceUrl}
            alt=""
            aria-hidden
            className={`${styles.puzzlePiece} ${status === 'success' ? styles.puzzlePieceSuccess : ''} ${
              status === 'fail' ? styles.puzzlePieceFail : ''
            } ${isDragging ? styles.puzzlePieceDragging : ''}`}
            style={{
              width: pieceSize * displayScale,
              height: pieceSize * displayScale,
              touchAction: 'none',
              transform: `translate3d(${sliderX * displayScale}px, ${targetY * displayScale}px, 0) rotate(${isDragging && status !== 'success' ? 2 : 0}deg)`,
              willChange: isDragging ? 'transform' : 'auto',
              transition: status === 'success' ? 'transform 0.3s ease-out' : 'none',
            }}
            onMouseDown={(e) => {
              if (status === 'success') return
              e.preventDefault()
              handleStart(e.clientX)
            }}
            onTouchStart={(e) => {
              if (status === 'success') return
              e.preventDefault()
              const touch = e.touches[0]
              if (touch) handleStart(touch.clientX)
            }}
            draggable={false}
          />
        )}
      </div>

      <div className={`${styles.track} ${getTrackClassName()}`} aria-live="polite">
        {status === 'idle' && <span className={styles.statusText}>Drag to match the piece above</span>}
        {status === 'success' && <span className={`${styles.statusText} ${styles.statusSuccess}`}>✓ Verified!</span>}
        {status === 'fail' && <span className={`${styles.statusText} ${styles.statusFail}`}>✗ Try again</span>}

        <div
          className={`${styles.slider} ${getSliderClassName()} ${isDragging ? styles.sliderDragging : ''}`}
          style={{
            transform: `translate3d(${sliderX * displayScale}px, 0, 0)`,
            willChange: isDragging ? 'transform' : 'auto',
            transition: status === 'success' ? 'background-color 0.3s ease-out' : 'none',
            touchAction: 'none',
          }}
          onMouseDown={(e) => {
            if (status === 'success') return
            e.preventDefault()
            handleStart(e.clientX)
          }}
          onTouchStart={(e) => {
            if (status === 'success') return
            e.preventDefault()
            const touch = e.touches[0]
            if (touch) handleStart(touch.clientX)
          }}
          onKeyDown={handleSliderKeyDown}
          role="slider"
          tabIndex={0}
          aria-label="Move the puzzle piece into the matching space"
          aria-valuemin={0}
          aria-valuemax={width - pieceSize}
          aria-valuenow={Math.round(sliderX)}
          aria-valuetext={status === 'success' ? 'Verified' : `${Math.round(sliderX)} of ${width - pieceSize}`}
        >
          ➤
        </div>
      </div>
    </div>
  )
}

export { SliderCaptcha }
export default SliderCaptcha
