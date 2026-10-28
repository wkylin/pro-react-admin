import React from 'react'
import clsx from 'clsx'
import styles from './index.module.less'
export interface IsometricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode
}
const IsometricCard = ({ text, children, className, ...props }: IsometricCardProps) => (
  <div {...props} className={clsx(styles.isometricCard, className)}>
    {children ?? <p>{text}</p>}
  </div>
)
export default IsometricCard
