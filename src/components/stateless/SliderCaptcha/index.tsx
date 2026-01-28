import { useState, useEffect, useRef, useCallback } from 'react'
import AnimatedIcon from '@stateless/AnimatedIcon'
import { RefreshCw, Zap } from 'lucide-react'
import { CaptchaUtils, Difficulty } from './utils'

interface SliderCaptchaProps {
  onSuccess?: () => void
  onFail?: () => void
  onRefresh?: () => void
  difficulty?: Difficulty
}

type CaptchaStatus = 'idle' | 'success' | 'fail'

const SliderCaptcha: React.FC<SliderCaptchaProps> = ({ onSuccess, onFail, onRefresh, difficulty = 'medium' }) => {
  const width = 300
  const height = 180
  const pieceSize = 50

  const getDifficultySettings = () => {
    switch (difficulty) {
      case 'easy':
        return { maxShapes: 3, threshold: 20, tolerance: 5 }
      case 'hard':
        return { maxShapes: 6, threshold: 10, tolerance: 2 }
      default:
        return { maxShapes: 6, threshold: 15, tolerance: 3 }
    }
  }

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

  useEffect(() => {
    callbacksRef.current = { onSuccess, onFail, onRefresh }
  }, [onSuccess, onFail, onRefresh])

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    setStatus('idle')
    setSliderX(0)
    currentXRef.current = 0

    const settings = getDifficultySettings()
    const bg = CaptchaUtils.generateBgCanvas(width, height, difficulty)
    const tx = CaptchaUtils.random(100, width - pieceSize - 10)
    const ty = CaptchaUtils.random(20, height - pieceSize - 20)
    setTargetX(tx)
    setTargetY(ty)

    const shapeType = CaptchaUtils.random(0, settings.maxShapes - 1)

    const [finalBg, piece] = await Promise.all([
      CaptchaUtils.cutHole(bg, tx, ty, pieceSize, shapeType),
      CaptchaUtils.generatePiece(bg, tx, ty, pieceSize, shapeType),
    ])

    setBgUrl(finalBg)
    setPieceUrl(piece)
    setIsRefreshing(false)

    if (callbacksRef.current.onRefresh) callbacksRef.current.onRefresh()
  }, [width, height, pieceSize, difficulty, getDifficultySettings])

  useEffect(() => {
    // 使用 Promise.resolve 延迟调用，避免在 effect 中同步触发 setState
    Promise.resolve().then(() => {
      refresh()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStart = useCallback(
    (clientX: number) => {
      if (status === 'success' || isRefreshing) return
      setIsDragging(true)
      startXRef.current = clientX - currentXRef.current
    },
    [status, isRefreshing]
  )

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return

      let x = clientX - startXRef.current
      if (x < 0) x = 0
      if (x > width - pieceSize) x = width - pieceSize

      const settings = getDifficultySettings()
      const distToTarget = Math.abs(x - targetX)

      if (distToTarget < settings.threshold) {
        x = targetX
      }

      currentXRef.current = x
      setSliderX(x)

      if (x === targetX) {
        setIsDragging(false)
        setStatus('success')
        if (callbacksRef.current.onSuccess) callbacksRef.current.onSuccess()
      }
    },
    [isDragging, width, pieceSize, targetX, getDifficultySettings]
  )

  const handleEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    const settings = getDifficultySettings()
    const finalX = currentXRef.current

    if (Math.abs(finalX - targetX) < settings.tolerance) {
      setStatus('success')
      if (callbacksRef.current.onSuccess) callbacksRef.current.onSuccess()
    } else {
      setStatus('fail')
      if (callbacksRef.current.onFail) callbacksRef.current.onFail()
      setTimeout(() => {
        setStatus('idle')
        setSliderX(0)
        currentXRef.current = 0
      }, 800)
    }
  }, [isDragging, targetX, getDifficultySettings])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleMouseUp = () => handleEnd()
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      handleMove(e.touches[0].clientX)
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

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'border-green-500 bg-green-50'
      case 'fail':
        return 'border-red-500 bg-red-50'
      default:
        return 'border-gray-300 bg-gray-50'
    }
  }

  const getButtonColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500'
      case 'fail':
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }

  const getDifficultyLabel = () => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
  }

  return (
    <div className="w-[340px] rounded-lg bg-white p-5 shadow-lg select-none">
      <div className="mb-4 flex items-center justify-between font-semibold text-gray-800">
        <div className="flex items-center gap-2">
          <span>Slider Captcha</span>
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
            <AnimatedIcon variant="pulse" mode="hover">
              <Zap size={12} />
            </AnimatedIcon>
            {getDifficultyLabel()}
          </span>
        </div>
        <button
          onClick={refresh}
          disabled={isRefreshing}
          className="p-1 text-lg text-blue-500 transition-transform hover:rotate-180 disabled:opacity-50"
        >
          <AnimatedIcon
            variant="spin"
            mode={isRefreshing ? 'auto' : 'idle'}
            className={isRefreshing ? 'animate-spin' : ''}
          >
            <RefreshCw size={18} />
          </AnimatedIcon>
        </button>
      </div>

      <div className="relative mb-4 h-[180px] w-[300px] overflow-hidden rounded border border-gray-300 bg-gray-200">
        {bgUrl && (
          <img src={bgUrl} alt="Background" className="pointer-events-none block h-full w-full" draggable={false} />
        )}

        {pieceUrl && (
          <img
            src={pieceUrl}
            alt="Puzzle piece"
            className={`absolute top-0 left-0 h-[50px] w-[50px] shadow-lg ${
              status === 'success' ? 'pointer-events-none opacity-100' : 'opacity-95 hover:opacity-100'
            } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              transform: `translate3d(${sliderX}px, ${targetY}px, 0) rotate(${isDragging && status !== 'success' ? 2 : 0}deg)`,
              willChange: isDragging ? 'transform' : 'auto',
              transition: status === 'success' ? 'transform 0.3s ease-out' : 'none',
              filter: status === 'fail' ? 'brightness(0.8)' : 'brightness(1)',
            }}
            onMouseDown={(e) => {
              if (status === 'success') return
              e.preventDefault()
              handleStart(e.clientX)
            }}
            onTouchStart={(e) => {
              if (status === 'success') return
              e.preventDefault()
              handleStart(e.touches[0].clientX)
            }}
            draggable={false}
          />
        )}
      </div>

      <div
        className={`relative h-[40px] w-[300px] overflow-hidden rounded-full border text-center text-sm leading-[40px] transition-all duration-300 ${getStatusColor()}`}
      >
        {status === 'idle' && (
          <span className="block text-gray-500 transition-opacity duration-300">Drag to match the piece above</span>
        )}
        {status === 'success' && <span className="block animate-pulse font-bold text-green-600">✓ Verified!</span>}
        {status === 'fail' && <span className="block font-bold text-red-600">✗ Try again</span>}

        <div
          className={`absolute top-0 left-0 z-10 flex h-[40px] w-[44px] items-center justify-center rounded-full text-white shadow-md ${
            status === 'success' ? 'pointer-events-none cursor-default' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
          } ${getButtonColor()} ${status === 'success' ? 'animate-pulse' : ''}`}
          style={{
            transform: `translate3d(${sliderX}px, 0, 0)`,
            willChange: isDragging ? 'transform' : 'auto',
            transition: status === 'success' ? 'background-color 0.3s ease-out' : 'none',
          }}
          onMouseDown={(e) => {
            if (status === 'success') return
            e.preventDefault()
            handleStart(e.clientX)
          }}
          onTouchStart={(e) => {
            if (status === 'success') return
            e.preventDefault()
            handleStart(e.touches[0].clientX)
          }}
        >
          ➤
        </div>
      </div>
    </div>
  )
}

export default SliderCaptcha
