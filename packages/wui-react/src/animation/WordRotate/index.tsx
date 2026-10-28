import batchStyles from '../batch-c.module.less'
void batchStyles
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'

import clsx from 'clsx'

export interface WordRotateProps {
  words: string[]
  duration?: number
  motionProps?: HTMLMotionProps<'span'>
  className?: string
}

const WordRotate = ({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  className,
}: WordRotateProps) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!words.length) return
    const interval = setInterval(
      () => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length)
      },
      Math.max(16, duration)
    )

    return () => clearInterval(interval)
  }, [words, duration])

  if (!words.length) return null

  return (
    <div className="wui-c-2cd02d11 wui-c-03b4dd7f">
      <AnimatePresence mode="wait">
        <motion.span key={words[index % words.length]} className={clsx(className)} {...motionProps}>
          {words[index % words.length]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default WordRotate
