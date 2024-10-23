import React, { useLayoutEffect, useRef } from 'react'
import styles from './index.module.less'

const ShiftingCard = () => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const card = ref.current
    const { x, y, width = 240, height = 360 } = card.getBoundingClientRect()
    const cx = x + (width || 240) / 2
    const cy = y + (height || 360) / 2

    const handleMove = (e) => {
      const { pageX, pageY } = e
      const dx = (cx - pageX) / ((width || 240) / 2)
      const dy = (cy - pageY) / ((height || 360) / 2)
      card.style.setProperty('--dx', dx)
      card.style.setProperty('--dy', dy)
    }

    const handleLeave = () => {
      card.style.setProperty('--dx', 0)
      card.style.setProperty('--dy', 0)
    }

    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)

    return () => {
      card.removeEventListener('mousemove', handleMove)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div ref={ref} className={styles.shiftingCard}>
      <h3>Shifting Card</h3>
    </div>
  )
}

export default ShiftingCard
