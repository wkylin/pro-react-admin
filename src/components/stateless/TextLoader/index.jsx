import React, { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'motion/react'

export function LoadingText ({ text, dots }) {
  return (
    <div className='relative'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className='w-full text-lg font-medium'
        >
          {text}
          {dots}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const TextLoader = ({ messages, interval = 2000, dotCount = 3, direction = 'vertical' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, interval)

    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= dotCount ? '' : `${prev}.`))
    }, 500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(dotInterval)
    }
  }, [messages.length, interval, dotCount])

  if (direction === 'horizontal') {
    return (
      <div className='flex w-full items-center justify-start gap-3 rounded-xs border px-3 py-2'>
        <motion.div
          className='text-primary-foreground size-5 rounded-full border-[3px] border-t-transparent md:size-6'
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear'
          }}
        />
        <LoadingText text={messages[currentIndex]} dots={dots} />
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 py-1'>
      <motion.div
        className='text-primary-foreground size-10 rounded-full border-[3px] border-t-transparent md:size-12'
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear'
        }}
      />
      <LoadingText text={messages[currentIndex]} dots={dots} />
    </div>
  )
}

export default TextLoader
