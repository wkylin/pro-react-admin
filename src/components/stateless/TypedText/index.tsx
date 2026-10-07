import React, { memo, useState, useEffect } from 'react'
import styles from './index.module.less'
const TypedText = ({ children, delay = 110 }) => {
  const [revealedLetters, setRevealedLetters] = useState(0)
  const interval = setInterval(() => setRevealedLetters((l) => l + 1), delay)

  useEffect(() => {
    if (revealedLetters === children.length) clearInterval(interval)
    return () => clearInterval(interval)
  }, [children, interval, revealedLetters])

  return (
    <>
      {children.substring(0, revealedLetters)}
      <span className={styles.typedCursorBlink}>|</span>
    </>
  )
}

export default memo(TypedText)
