import batchStyles from '../batch-c.module.less'
void batchStyles
import React, { memo, useState, useEffect } from 'react'
import styles from './index.module.less'
export interface TypedTextProps {
  children: string
  delay?: number
}
const TypedText = ({ children, delay = 110 }: TypedTextProps) => {
  const [revealedLetters, setRevealedLetters] = useState(0)
  useEffect(() => {
    setRevealedLetters(0)
    let count = 0
    const timer = setInterval(
      () => {
        count += 1
        setRevealedLetters(count)
        if (count >= children.length) clearInterval(timer)
      },
      Math.max(1, delay)
    )
    if (!children.length) clearInterval(timer)
    return () => clearInterval(timer)
  }, [children, delay])
  return (
    <span aria-label={children}>
      <span aria-hidden="true">
        {children.substring(0, revealedLetters)}
        <span className={styles.typedCursorBlink}>|</span>
      </span>
    </span>
  )
}
export default memo(TypedText)
