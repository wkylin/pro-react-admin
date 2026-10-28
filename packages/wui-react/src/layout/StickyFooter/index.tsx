import type { CSSProperties, HTMLAttributes } from 'react'
import styles from '../layout.module.less'
export interface StickyFooterProps extends HTMLAttributes<HTMLDivElement> {
  heightValue?: CSSProperties['height']
  bottom?: CSSProperties['bottom']
}
export default function StickyFooter({
  children,
  className = '',
  heightValue = '100dvh',
  bottom = 0,
  style,
  ...props
}: StickyFooterProps) {
  return (
    <div className={styles.stickyFooter} style={{ height: heightValue, ...style }} {...props}>
      <div className={`${styles.fixedFooter} ${className}`} style={{ height: heightValue, bottom }}>
        {children}
      </div>
    </div>
  )
}
