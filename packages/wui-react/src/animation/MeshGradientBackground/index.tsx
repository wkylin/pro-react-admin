import React from 'react'
import styles from './index.module.less'
export interface MeshGradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: string
  backgroundColor?: string
}
const MeshGradientBackground = ({
  children,
  gradient,
  backgroundColor,
  style,
  ...props
}: MeshGradientBackgroundProps) => (
  <div {...props} style={{ position: 'relative', height: '100%', overflow: 'hidden', ...style }}>
    <div
      aria-hidden="true"
      className={styles.background}
      style={{ backgroundImage: gradient, backgroundColor, pointerEvents: 'none' }}
    />
    <div style={{ position: 'relative' }}>{children}</div>
  </div>
)
export default MeshGradientBackground
