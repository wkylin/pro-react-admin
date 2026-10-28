import type { HTMLAttributes } from 'react'
import styles from './index.module.less'
export type AlignCenterProps = HTMLAttributes<HTMLDivElement>
export default function AlignCenter({ children, className = '', ...props }: AlignCenterProps) {
  return (
    <div className={`${styles.alignCenter} ${className}`} {...props}>
      {children}
    </div>
  )
}
