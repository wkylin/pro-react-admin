import React, { useRef, useEffect, useState } from 'react'
import clsx from 'clsx'
import { motion, useAnimation } from 'motion/react'

const ScratchToReveal = ({ width, height, minScratchPercentage = 50, onComplete, children, className }) => {
  const canvasRef = useRef(null)
  const [isScratching, setIsScratching] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const controls = useAnimation()

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
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
  }, [])

  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left + 16
      const y = clientY - rect.top + 16
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 30, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const checkCompletion = () => {
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
        setIsComplete(true)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        startAnimation()
        if (onComplete) {
          onComplete()
        }
      }
    }
  }

  const startAnimation = () => {
    controls.start({
      scale: [1, 1.5, 1],
      rotate: [0, 10, -10, 10, -10, 0],
      transition: { duration: 0.5 },
    })
  }

  useEffect(() => {
    const handleDocumentMouseMove = (event) => {
      if (!isScratching) return
      scratch(event.clientX, event.clientY)
    }

    const handleDocumentTouchMove = (event) => {
      if (!isScratching) return
      const touch = event.touches[0]
      scratch(touch.clientX, touch.clientY)
    }

    const handleDocumentMouseUp = () => {
      setIsScratching(false)
      checkCompletion()
    }

    const handleDocumentTouchEnd = () => {
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
  }, [isScratching])

  // 鼠标 / 触摸按下处理器：开始 scratch 并立即进行一次擦除
  const handleMouseDown = (event) => {
    setIsScratching(true)
    scratch(event.clientX, event.clientY)
  }

  const handleTouchStart = (event) => {
    const touch = event.touches && event.touches[0]
    if (!touch) return
    setIsScratching(true)
    scratch(touch.clientX, touch.clientY)
  }

  return (
    <motion.div
      className={clsx('relative select-none', className)}
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
        className="absolute top-0 left-0"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      ></canvas>
      {children}
    </motion.div>
  )
}

export default ScratchToReveal
