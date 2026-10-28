import batchStyles from '../batch-c.module.less'
void batchStyles
import React, { useEffect, useMemo, useState } from 'react'
import { motion, type Variants } from 'motion/react'
import clsx from 'clsx'

export interface TypeWriterProps {
  text: string | string[]
  speed?: number
  initialDelay?: number
  waitTime?: number
  deleteSpeed?: number
  loop?: boolean
  className?: string
  showCursor?: boolean
  hideCursorOnType?: boolean
  cursorChar?: string
  cursorClassName?: string
  cursorAnimationVariants?: Variants
}

const TypeWriter = ({
  text,
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = '|',
  cursorClassName = 'wui-type-cursor',
  cursorAnimationVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Infinity,
        repeatDelay: 0.4,
        repeatType: 'reverse',
      },
    },
  },
}: TypeWriterProps) => {
  const [displayText, setDisplayText] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0)

  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  useEffect(() => {
    setDisplayText('')
    setCurrentIndex(0)
    setIsDeleting(false)
    setCurrentTextIndex(0)
  }, [text])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    const currentText = texts[currentTextIndex] || ''
    if (!texts.length) return

    const startTyping = () => {
      if (isDeleting) {
        if (displayText === '') {
          setIsDeleting(false)
          if (currentTextIndex === texts.length - 1 && !loop) {
            return
          }
          setCurrentTextIndex((currentTextIndex + 1) % texts.length)
          setCurrentIndex(0)
          timeout = setTimeout(() => {}, waitTime)
        } else {
          timeout = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1))
          }, deleteSpeed)
        }
      } else if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, speed)
      } else if (texts.length > 1 && (loop || currentTextIndex < texts.length - 1)) {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, waitTime)
      }
    }

    if (currentIndex === 0 && !isDeleting && displayText === '') {
      timeout = setTimeout(startTyping, initialDelay)
    } else {
      startTyping()
    }

    return () => {
      if (timeout !== undefined) clearTimeout(timeout)
    }
  }, [currentIndex, displayText, isDeleting, speed, deleteSpeed, waitTime, texts, currentTextIndex, loop, initialDelay])

  return (
    <div aria-label={texts.join(' ')} className={`wui-type-writer ${className || ''}`}>
      <span aria-hidden="true">{displayText}</span>
      {showCursor && (
        <motion.span
          aria-hidden="true"
          variants={cursorAnimationVariants}
          className={clsx(
            cursorClassName,
            hideCursorOnType && (currentIndex < (texts[currentTextIndex] || '').length || isDeleting)
              ? 'wui-cursor-hidden'
              : ''
          )}
          initial="initial"
          animate="animate"
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  )
}

export default TypeWriter
