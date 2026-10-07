import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, type TargetAndTransition, type Transition } from 'motion/react'
import clsx from 'clsx'

interface FlipWordsProps {
  words: string[]
  duration?: number
  className?: string
  wordClassName?: string
}

const FlipWords = ({ words, duration = 3000, className, wordClassName }: FlipWordsProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const currentWord = words[currentIndex] || ''

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, duration)
    return () => clearInterval(interval)
  }, [words.length, duration])

  return (
    <div className={clsx('relative inline-block px-2', className)}>
      <AnimatePresence mode="popLayout">
        <motion.div
          initial={
            {
              opacity: 0,
              y: 10,
            } satisfies TargetAndTransition
          }
          animate={
            {
              opacity: 1,
              y: 0,
            } satisfies TargetAndTransition
          }
          transition={
            {
              type: 'spring',
              stiffness: 100,
              damping: 10,
            } satisfies Transition
          }
          exit={
            {
              opacity: 0,
              y: -40,
              x: 40,
              filter: 'blur(8px)',
              scale: 2,
              position: 'absolute',
            } satisfies TargetAndTransition
          }
          className={clsx('z-10 inline-block text-left text-(--foreground)', wordClassName)}
          key={currentWord + currentIndex}
        >
          {currentWord.split(' ').map((word, wordIndex) => (
            <motion.span
              key={word + wordIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' } satisfies TargetAndTransition}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' } satisfies TargetAndTransition}
              transition={
                {
                  delay: wordIndex * 0.3,
                  duration: 0.3,
                } satisfies Transition
              }
              className="inline-block whitespace-nowrap"
            >
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={word + letterIndex + letter}
                  initial={{ opacity: 0, y: 10, filter: 'blur(8px)' } satisfies TargetAndTransition}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' } satisfies TargetAndTransition}
                  transition={
                    {
                      delay: wordIndex * 0.3 + letterIndex * 0.05,
                      duration: 0.2,
                    } satisfies Transition
                  }
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default FlipWords
