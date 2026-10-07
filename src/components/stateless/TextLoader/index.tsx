import React, { useState, useEffect } from 'react'

import { motion, AnimatePresence, type TargetAndTransition, type Transition } from 'motion/react'

type LoadingTextProps = {
  text: string
  dots: string
}

type TextLoaderProps = {
  messages: string[]
  interval?: number
  dotCount?: number
  direction?: 'vertical' | 'horizontal'
}

export function LoadingText({ text, dots }: LoadingTextProps) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 10 } satisfies TargetAndTransition}
          animate={{ opacity: 1, y: 0 } satisfies TargetAndTransition}
          exit={{ opacity: 0, y: -10 } satisfies TargetAndTransition}
          transition={{ duration: 0.3 } satisfies Transition}
          className="w-full text-lg font-medium"
        >
          {text}
          {dots}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const TextLoader = ({ messages, interval = 2000, dotCount = 3, direction = 'vertical' }: TextLoaderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const messageInterval: ReturnType<typeof setInterval> = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, interval)

    const dotInterval: ReturnType<typeof setInterval> = setInterval(() => {
      setDots((prev) => (prev.length >= dotCount ? '' : `${prev}.`))
    }, 500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(dotInterval)
    }
  }, [messages.length, interval, dotCount])

  if (direction === 'horizontal') {
    return (
      <div className="flex w-full items-center justify-start gap-3 rounded-xs border px-3 py-2">
        <motion.div
          className="text-primary-foreground size-5 rounded-full border-[3px] border-t-transparent md:size-6"
          animate={{ rotate: 360 } satisfies TargetAndTransition}
          transition={
            {
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            } satisfies Transition
          }
        />
        <LoadingText text={messages[currentIndex]} dots={dots} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-1">
      <motion.div
        className="text-primary-foreground size-10 rounded-full border-[3px] border-t-transparent md:size-12"
        animate={{ rotate: 360 } satisfies TargetAndTransition}
        transition={
          {
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          } satisfies Transition
        }
      />
      <LoadingText text={messages[currentIndex]} dots={dots} />
    </div>
  )
}

export default TextLoader
