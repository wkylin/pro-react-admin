import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

const AlternatingText = ({ alternateText = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (alternateText.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % alternateText.length)
    }, 2000) // 2秒切换一次

    return () => clearInterval(interval)
  }, [alternateText.length])

  return <span className={styles.alternating}>{alternateText[currentIndex] || 'Text goes here'}</span>
}

export default AlternatingText
