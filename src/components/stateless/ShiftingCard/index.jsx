import React, { useLayoutEffect, useRef } from 'react'
import styles from './index.module.less'
const ShiftingCard = () => {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const card = ref.current
    const { x, y, width, height } = card.getBoundingClientRect()
    const cx = x + width / 2
    const cy = y + height / 2
    const handleMove = (e) => {
      const { pageX, pageY } = e
      const dx = (cx - pageX) / (width / 2)
      const dy = (cy - pageY) / (height / 2)
      e.target.style.setProperty('--dx', dx)
      e.target.style.setProperty('--dy', dy)
    }
    card.addEventListener('mousemove', handleMove)
    return () => card.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div ref={ref} className={styles.shiftingCard}>
      <h3>Shifting Card</h3>
    </div>
  )
}
export default ShiftingCard
