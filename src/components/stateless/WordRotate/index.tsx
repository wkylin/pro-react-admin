import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'

import clsx from 'clsx'

interface WordRotateProps {
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
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.span key={words[index]} className={clsx(className)} {...motionProps}>
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default WordRotate
