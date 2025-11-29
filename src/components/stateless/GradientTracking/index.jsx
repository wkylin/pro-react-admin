import React, { useLayoutEffect, useRef } from 'react'

import styles from './index.module.less'

const GradientTracking = () => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const btn = ref.current
    const handleMove = (e) => {
      const rect = e.target.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      btn.style.setProperty('--x', x + 'px')
      btn.style.setProperty('--y', y + 'px')
    }

    btn.addEventListener('mousemove', handleMove)
    return () => {
      btn.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return (
    <button className={styles.gradientTracking} ref={ref}>
      <span>Hover me</span>
    </button>
  )
}

export default GradientTracking
