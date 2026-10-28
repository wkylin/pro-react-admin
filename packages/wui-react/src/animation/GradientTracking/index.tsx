import React from 'react'
import clsx from 'clsx'
import styles from './index.module.less'
export interface GradientTrackingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const GradientTracking = ({ children, className, onMouseMove, type = 'button', ...props }: GradientTrackingProps) => (
  <button
    {...props}
    type={type}
    className={clsx(styles.gradientTracking, className)}
    onMouseMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
      event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
      onMouseMove?.(event)
    }}
  >
    <span>{children}</span>
  </button>
)
export default GradientTracking
