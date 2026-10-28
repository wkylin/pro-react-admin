import type { HTMLAttributes, ReactNode } from 'react'
import styles from '../display.module.less'
export interface GradientStatItem {
  id: string
  label?: ReactNode
  value: ReactNode
}
export interface GradientStatsProps extends HTMLAttributes<HTMLElement> {
  items?: readonly (GradientStatItem | string)[]
}
export default function GradientStats({ items = [], className = '', ...props }: GradientStatsProps) {
  return (
    <section {...props} className={`${styles.stats} ${className}`}>
      {items.map((item) => (
        <div key={typeof item === 'string' ? item : item.id} className={styles.stat}>
          <strong>{typeof item === 'string' ? item : item.value}</strong>
          {typeof item !== 'string' && item.label && <div>{item.label}</div>}
        </div>
      ))}
    </section>
  )
}
