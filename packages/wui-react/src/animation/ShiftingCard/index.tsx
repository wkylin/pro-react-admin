import batchStyles from '../batch-c.module.less'
void batchStyles
import React, { useEffect, useRef } from 'react'
import styles from './index.module.less'

export type ShiftingCardProps = React.HTMLAttributes<HTMLDivElement>
const ShiftingCard = ({ children, className, ...props }: ShiftingCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return

    const handleMove = (event: MouseEvent) => {
      const { x, y, width = 240, height = 360 } = card.getBoundingClientRect()
      const cx = x + (width || 240) / 2
      const cy = y + (height || 360) / 2
      const { clientX: pageX, clientY: pageY } = event
      const dx = (cx - pageX) / ((width || 240) / 2)
      const dy = (cy - pageY) / ((height || 360) / 2)
      card.style.setProperty('--dx', String(dx))
      card.style.setProperty('--dy', String(dy))
    }

    const handleLeave = () => {
      card.style.setProperty('--dx', '0')
      card.style.setProperty('--dy', '0')
    }

    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)

    return () => {
      card.removeEventListener('mousemove', handleMove)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div {...props} ref={ref} className={`${styles.shiftingCard} ${className || ''}`}>
      {children}
    </div>
  )
}

export default ShiftingCard
