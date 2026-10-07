'use client'
import AnimatedIcon from '@stateless/AnimatedIcon'
import { useState, useEffect, useRef, useCallback, type MouseEvent, type TouchEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'motion/react'
import { GitMerge } from 'lucide-react'
import clsx from 'clsx'

type CompareProps = {
  firstImage?: string
  secondImage?: string
  className?: string
  firstImageClassName?: string
  secondImageClassname?: string
  initialSliderPercentage?: number
  slideMode?: 'hover' | 'drag'
  showHandlebar?: boolean
  autoplay?: boolean
  autoplayDuration?: number
}

const Compare = ({
  firstImage = '',
  secondImage = '',
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = 'hover',
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) => {
  const x = useMotionValue(initialSliderPercentage)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<number | null>(null)

  // Map x to style values
  const left = useTransform(x, (value) => `${value}%`)
  const clipPath = useTransform(x, (value) => `inset(0 ${100 - value}% 0 0)`)

  const startAutoplay = useCallback(() => {
    if (!autoplay) return

    const startTime = Date.now()
    const animate = () => {
      const elapsedTime = Date.now() - startTime
      const progress = (elapsedTime % (autoplayDuration * 2)) / autoplayDuration
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100

      x.set(percentage)
      autoplayRef.current = requestAnimationFrame(animate)
    }

    animate()
  }, [autoplay, autoplayDuration, x])

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      cancelAnimationFrame(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [startAutoplay, stopAutoplay])

  function mouseEnterHandler() {
    stopAutoplay()
  }

  function mouseLeaveHandler() {
    if (slideMode === 'hover') {
      x.set(initialSliderPercentage)
    }
    if (slideMode === 'drag') {
      setIsDragging(false)
    }
    startAutoplay()
  }

  const handleStart = useCallback(() => {
    if (slideMode === 'drag') {
      setIsDragging(true)
    }
  }, [slideMode])

  const handleEnd = useCallback(() => {
    if (slideMode === 'drag') {
      setIsDragging(false)
    }
  }, [slideMode])

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return
      if (slideMode === 'hover' || (slideMode === 'drag' && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect()
        const mouseX = clientX - rect.left
        const percent = (mouseX / rect.width) * 100
        x.set(Math.max(0, Math.min(100, percent)))
      }
    },
    [slideMode, isDragging, x]
  )

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      handleStart()
    },
    [handleStart]
  )
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd])
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => handleMove(e.clientX), [handleMove])

  const handleTouchStart = useCallback(
    (_e: TouchEvent<HTMLDivElement>) => {
      if (!autoplay) {
        handleStart()
      }
    },
    [handleStart, autoplay]
  )

  const handleTouchEnd = useCallback(() => {
    if (!autoplay) {
      handleEnd()
    }
  }, [handleEnd, autoplay])

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (!autoplay) {
        handleMove(e.touches[0].clientX)
      }
    },
    [handleMove, autoplay]
  )

  return (
    <div
      ref={sliderRef}
      className={clsx('h-[160px] w-[360px] overflow-hidden', className)}
      style={{
        position: 'relative',
        cursor: slideMode === 'drag' ? 'grab' : 'col-resize',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="absolute top-0 z-30 m-auto h-full w-px bg-linear-to-b from-transparent from-5% via-indigo-500 to-transparent to-95%"
          style={{
            left,
            top: '0',
            zIndex: 40,
          }}
          transition={{ duration: 0 }}
        >
          <div className="absolute top-1/2 left-0 z-20 h-full w-36 -translate-y-1/2 bg-linear-to-r from-indigo-400 via-transparent to-transparent [mask-image:radial-gradient(100px_at_left,white,transparent)] opacity-50" />
          <div className="absolute top-1/2 left-0 z-10 h-1/2 w-10 -translate-y-1/2 bg-linear-to-r from-cyan-400 via-transparent to-transparent [mask-image:radial-gradient(50px_at_left,white,transparent)] opacity-100" />
          <div className="absolute top-1/2 -right-10 h-3/4 w-10 -translate-y-1/2 [mask-image:radial-gradient(100px_at_left,white,transparent)]"></div>
          {showHandlebar && (
            <div className="absolute top-1/2 -right-2.5 z-30 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-md bg-white shadow-[0px_-1px_0px_0px_#FFFFFF40]">
              <AnimatedIcon variant="spin" mode="hover">
                <GitMerge className="h-4 w-4 text-black" />
              </AnimatedIcon>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none relative z-20 h-full w-full overflow-hidden">
        <AnimatePresence initial={false}>
          {firstImage ? (
            <motion.div
              className={clsx(
                'absolute inset-0 z-20 h-full w-full shrink-0 overflow-hidden select-none',
                firstImageClassName
              )}
              style={{
                clipPath,
              }}
              transition={{ duration: 0 }}
            >
              <img
                alt="first image"
                src={firstImage}
                className={clsx('absolute inset-0 z-20 h-full w-full shrink-0 select-none', firstImageClassName)}
                draggable={false}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        {secondImage ? (
          <motion.img
            className={clsx('absolute top-0 left-0 z-19 h-full w-full select-none', secondImageClassname)}
            alt="second image"
            src={secondImage}
            draggable={false}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default Compare
