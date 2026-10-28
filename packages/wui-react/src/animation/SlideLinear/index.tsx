import batchStyles from '../batch-c.module.less'
void batchStyles
import React from 'react'
import styles from './index.module.less'
export type SlideLinearProps = React.HTMLAttributes<HTMLDivElement>
const SlideLinear = ({ children, className, ...props }: SlideLinearProps) => {
  return (
    <div {...props} className={`${styles.slider} ${className || ''}`}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default SlideLinear
