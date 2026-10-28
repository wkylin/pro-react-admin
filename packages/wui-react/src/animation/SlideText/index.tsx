import batchStyles from '../batch-c.module.less'
void batchStyles
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const emptyTitles: string[] = []
export interface SlideTextProps {
  text?: string[]
}

const SlideText = ({ text = emptyTitles }: SlideTextProps) => {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = text

  useEffect(() => {
    if (!titles.length) return
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  if (!titles.length) return null

  return (
    <span className="wui-c-d89972fe wui-c-2cd02d11 wui-c-fdb4af3a wui-c-ca6bf630">
      {titles.map((title, index) => (
        <motion.span
          key={index}
          className="wui-c-da4dbfbc wui-c-e83a7042"
          initial={{ opacity: 0, y: -100 }}
          transition={{ type: 'spring', stiffness: 50 }}
          animate={
            titleNumber % titles.length === index
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {
                  y: titleNumber > index ? -150 : 150,
                  opacity: 0,
                }
          }
        >
          {title}
        </motion.span>
      ))}
    </span>
  )
}

export default SlideText
