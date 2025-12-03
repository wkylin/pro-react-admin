import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import clsx from 'clsx'

const FlipWords = ({ words, duration = 3000, className, wordClassName }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentWord = words[currentIndex] || ''

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, duration)
    return () => clearInterval(interval)
  }, [words.length, duration])

  return (
    <div className={clsx('relative inline-block px-2', className)}>
      <AnimatePresence mode='popLayout'>
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10
          }}
          exit={{
            opacity: 0,
            y: -40,
            x: 40,
            filter: 'blur(8px)',
            scale: 2,
            position: 'absolute'
          }}
          className={clsx('z-10 inline-block text-left text-[var(--foreground)]', wordClassName)}
          key={currentWord + currentIndex}
        >
          {currentWord.split(' ').map((word, wordIndex) => (
            <motion.span
              key={word + wordIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: wordIndex * 0.3,
                duration: 0.3
              }}
              className='inline-block whitespace-nowrap'
            >
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={word + letterIndex + letter}
                  initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: wordIndex * 0.3 + letterIndex * 0.05,
                    duration: 0.2
                  }}
                  className='inline-block'
                >
                  {letter}
                </motion.span>
              ))}
              <span className='inline-block'>&nbsp;</span>
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default FlipWords
