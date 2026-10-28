import type { HTMLAttributes } from 'react'
import styles from './index.module.less'
export interface SkeletonFixProps extends HTMLAttributes<HTMLDivElement> {
  count?: number
  image?: boolean
  shape?: 'circle' | 'square'
  label?: string
}
export default function SkeletonFix({
  count = 3,
  image = true,
  shape = 'square',
  label = 'Loading',
  className = '',
  ...props
}: SkeletonFixProps) {
  return (
    <div {...props} role="status" aria-label={label} className={`${styles.placeholder} ${styles.shimmer} ${className}`}>
      <div aria-hidden="true">
        {image && (
          <div className={styles['faux-image-wrapper']}>
            <div className={styles['faux-image']} style={{ borderRadius: shape === 'circle' ? '50%' : undefined }} />
          </div>
        )}
        {Array.from({ length: Math.max(0, Math.min(100, Math.floor(count))) }, (_, i) => (
          <div key={i} className={styles['faux-text']} style={{ width: `${100 - (i % 3) * 20}%` }} />
        ))}
      </div>
    </div>
  )
}
