import batchStyles from '../batch-c.module.less'
void batchStyles
import React, { useState, useEffect } from 'react'

import { motion, AnimatePresence, type TargetAndTransition, type Transition } from 'motion/react'

export type LoadingTextProps = {
  text: string
  dots: string
}

export type TextLoaderProps = {
  messages: string[]
  interval?: number
  dotCount?: number
  direction?: 'vertical' | 'horizontal'
}

export function LoadingText({ text, dots }: LoadingTextProps) {
  return (
    <div className="wui-c-d89972fe">
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 10 } satisfies TargetAndTransition}
          animate={{ opacity: 1, y: 0 } satisfies TargetAndTransition}
          exit={{ opacity: 0, y: -10 } satisfies TargetAndTransition}
          transition={{ duration: 0.3 } satisfies Transition}
          className="wui-c-6da6a3c3 wui-c-42536e69 wui-c-2689f395"
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
    if (!messages.length) return
    const messageInterval: ReturnType<typeof setInterval> = setInterval(
      () => {
        setCurrentIndex((prev) => (prev + 1) % messages.length)
      },
      Math.max(16, interval)
    )

    const dotInterval: ReturnType<typeof setInterval> = setInterval(() => {
      setDots((prev) => (prev.length >= Math.max(0, Math.min(100, dotCount)) ? '' : `${prev}.`))
    }, 500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(dotInterval)
    }
  }, [messages.length, interval, dotCount])

  if (!messages.length) return null

  if (direction === 'horizontal') {
    return (
      <div className="wui-c-60fbb771 wui-c-6da6a3c3 wui-c-3960ffc2 wui-c-4b5cc19b wui-c-1004c0c3 wui-c-1e99f5dd wui-c-ca6bcd4b wui-c-0e17f2bd wui-c-03b4dd7f">
        <motion.div
          className="wui-c-add63bc6 wui-c-ac204c10 wui-c-7dc987b6 wui-c-30ac6a91 wui-c-61574210"
          animate={{ rotate: 360 } satisfies TargetAndTransition}
          transition={
            {
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            } satisfies Transition
          }
        />
        <LoadingText text={messages[currentIndex % messages.length] || ''} dots={dots} />
      </div>
    )
  }

  return (
    <div className="wui-c-60fbb771 wui-c-8dddea07 wui-c-3960ffc2 wui-c-86843cf1 wui-c-0c3bc985 wui-c-660d2eff">
      <motion.div
        className="wui-c-7bbb00f9 wui-c-ac204c10 wui-c-7dc987b6 wui-c-30ac6a91 wui-c-63a9f0c1"
        animate={{ rotate: 360 } satisfies TargetAndTransition}
        transition={
          {
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          } satisfies Transition
        }
      />
      <LoadingText text={messages[currentIndex % messages.length] || ''} dots={dots} />
    </div>
  )
}

export default TextLoader
