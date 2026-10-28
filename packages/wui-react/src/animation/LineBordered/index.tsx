import React from 'react'
import clsx from 'clsx'
import styles from './index.module.less'
export interface LineBorderedProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: React.ReactNode
}
const LineBordered = ({ text, children, className, ...props }: LineBorderedProps) => (
  <span {...props} className={clsx(styles.lineBordered, className)}>
    {children ?? text}
  </span>
)
export default LineBordered
