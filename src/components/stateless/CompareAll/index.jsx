'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GitMerge } from 'lucide-react'
import clsx from 'clsx'

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
  autoplayDuration = 5000
}) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage)
  const [isDragging, setIsDragging] = useState(false)

  const sliderRef = useRef(null)

  const [isMouseOver, setIsMouseOver] = useState(false)

  const autoplayRef = useRef(null)

  const startAutoplay = useCallback(() => {
    if (!autoplay) return

    const startTime = Date.now()
    const animate = () => {
      const elapsedTime = Date.now() - startTime
      const progress = (elapsedTime % (autoplayDuration * 2)) / autoplayDuration
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100

      setSliderXPercent(percentage)
      autoplayRef.current = setTimeout(animate, 16) // ~60fps
    }

    animate()
  }, [autoplay, autoplayDuration])

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [startAutoplay, stopAutoplay])

  function mouseEnterHandler () {
    setIsMouseOver(true)
    stopAutoplay()
  }

  function mouseLeaveHandler () {
    setIsMouseOver(false)
    if (slideMode === 'hover') {
      setSliderXPercent(initialSliderPercentage)
    }
    if (slideMode === 'drag') {
      setIsDragging(false)
    }
    startAutoplay()
  }

  const handleStart = useCallback(
    (clientX) => {
      if (slideMode === 'drag') {
        setIsDragging(true)
      }
    },
    [slideMode]
  )

  const handleEnd = useCallback(() => {
    if (slideMode === 'drag') {
      setIsDragging(false)
    }
  }, [slideMode])

  const handleMove = useCallback(
    (clientX) => {
      if (!sliderRef.current) return
      if (slideMode === 'hover' || (slideMode === 'drag' && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const percent = (x / rect.width) * 100
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)))
        })
      }
    },
    [slideMode, isDragging]
  )

  const handleMouseDown = useCallback((e) => handleStart(e.clientX), [handleStart])
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd])
  const handleMouseMove = useCallback((e) => handleMove(e.clientX), [handleMove])

  const handleTouchStart = useCallback(
    (e) => {
      if (!autoplay) {
        handleStart(e.touches[0].clientX)
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
    (e) => {
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
        cursor: slideMode === 'drag' ? 'grab' : 'col-resize'
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
          className='absolute top-0 z-30 m-auto h-full w-px bg-linear-to-b from-transparent from-5% via-indigo-500 to-transparent to-95%'
          style={{
            left: `${sliderXPercent}%`,
            top: '0',
            zIndex: 40
          }}
          transition={{ duration: 0 }}
        >
          <div className='absolute top-1/2 left-0 z-20 h-full w-36 -translate-y-1/2 bg-linear-to-r from-indigo-400 via-transparent to-transparent opacity-50 [mask-image:radial-gradient(100px_at_left,white,transparent)]' />
          <div className='absolute top-1/2 left-0 z-10 h-1/2 w-10 -translate-y-1/2 bg-linear-to-r from-cyan-400 via-transparent to-transparent opacity-100 [mask-image:radial-gradient(50px_at_left,white,transparent)]' />
          <div className='absolute top-1/2 -right-10 h-3/4 w-10 -translate-y-1/2 [mask-image:radial-gradient(100px_at_left,white,transparent)]' />
          {showHandlebar && (
            <div className='absolute top-1/2 -right-2.5 z-30 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-md bg-white shadow-[0px_-1px_0px_0px_#FFFFFF40]'>
              <GitMerge className='h-4 w-4 text-black' />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className='pointer-events-none relative z-20 h-full w-full overflow-hidden'>
        <AnimatePresence initial={false}>
          {firstImage
            ? (
              <motion.div
                className={clsx(
                  'absolute inset-0 z-20 h-full w-full shrink-0 overflow-hidden select-none',
                  firstImageClassName
                )}
                style={{
                  clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`
                }}
                transition={{ duration: 0 }}
              >
                <img
                  alt='first image'
                  src={firstImage}
                  className={clsx('absolute inset-0 z-20 h-full w-full shrink-0 select-none', firstImageClassName)}
                  draggable={false}
                />
              </motion.div>
              )
            : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {secondImage
          ? (
            <motion.img
              className={clsx('absolute top-0 left-0 z-19 h-full w-full select-none', secondImageClassname)}
              alt='second image'
              src={secondImage}
              draggable={false}
            />
            )
          : null}
      </AnimatePresence>
    </div>
  )
}

export default Compare
