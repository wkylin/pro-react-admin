import batchStyles from '../batch-c.module.less'
void batchStyles
import React from 'react'

import styles from './index.module.less'

export interface ShinyTextProps {
  text: React.ReactNode
  disabled?: boolean
  speed?: number
  className?: string
}
const ShinyText = ({ text, disabled = false, speed = 5, className = '' }: ShinyTextProps) => {
  const animationDuration = `${Number.isFinite(speed) && speed > 0 ? speed : 5}s`

  return (
    <div
      className={`${styles.shinyText} ${disabled ? styles.disabled : ''} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </div>
  )
}

export default ShinyText
