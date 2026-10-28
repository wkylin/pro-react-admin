import batchStyles from '../batch-c.module.less'
void batchStyles
import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
export interface StarBackgroundProps extends React.HTMLAttributes<HTMLElement> {
  color?: string
  count?: number
  mediumCount?: number
  bigCount?: number
}
export default function StarBackground({
  color = '#333',
  count = 1400,
  mediumCount = 400,
  bigCount = 200,
  className,
  ...props
}: StarBackgroundProps) {
  const [shadows, setShadows] = useState(['', '', ''])
  useEffect(() => {
    setShadows(
      [count, mediumCount, bigCount].map((n) =>
        Array.from(
          { length: Math.min(5000, Math.max(0, n)) },
          () => `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px ${color}`
        ).join(', ')
      )
    )
  }, [color, count, mediumCount, bigCount])
  return (
    <section {...props} aria-hidden="true" className={`wui-star-background ${className || ''}`}>
      {[styles.stars, styles.medium, styles.big].map((c, i) => (
        <section key={i} className={c} style={{ '--box-shadow': shadows[i] || 'none' } as React.CSSProperties} />
      ))}
    </section>
  )
}
