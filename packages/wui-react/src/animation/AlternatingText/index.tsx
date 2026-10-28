import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

export interface AlternatingTextProps {
  alternateText?: readonly React.ReactNode[]
  placeholder?: React.ReactNode
  interval?: number
}

const AlternatingText = ({
  alternateText = [],
  placeholder = null,
  interval: intervalMs = 2000,
}: AlternatingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (alternateText.length <= 1) return

    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => (prev + 1) % alternateText.length)
      },
      Math.max(1, intervalMs)
    ) // 2秒切换一次

    return () => clearInterval(interval)
  }, [alternateText.length, intervalMs])

  return <span className={styles.alternating}>{alternateText[currentIndex % alternateText.length] ?? placeholder}</span>
}

export default AlternatingText
