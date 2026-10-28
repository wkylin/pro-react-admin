import batchBStyles from '../batch-b.module.less'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, type TargetAndTransition, type Transition } from 'motion/react'
import clsx from 'clsx'

// Keep package CSS in runtime builds without leaking a style import into declarations.
void batchBStyles

export interface FlipWordsProps {
  words: string[]
  duration?: number
  className?: string
  wordClassName?: string
}

const FlipWords = ({ words, duration = 3000, className, wordClassName }: FlipWordsProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const currentWord = words[currentIndex % words.length] || ''

  useEffect(() => {
    if (words.length < 2) return
    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
      },
      Math.max(16, duration)
    )
    return () => clearInterval(interval)
  }, [words.length, duration])

  if (!words.length) return null

  return (
    <div className={clsx('wui-flip-words', className)}>
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
          className={clsx('wui-flip-word', wordClassName)}
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
              style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
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
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              ))}
              <span style={{ display: 'inline-block' }}>&nbsp;</span>
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default FlipWords
