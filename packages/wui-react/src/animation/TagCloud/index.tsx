import batchStyles from '../batch-c.module.less'
void batchStyles
import React from 'react'
import styles from './index.module.less'
export interface TagCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: readonly React.ReactNode[]
}
export default function TagCloud({ items = [], children, className, ...props }: TagCloudProps) {
  return (
    <div {...props} className={`wui-tag-cloud ${className || ''}`}>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {children}
      <div aria-hidden="true" className={styles.mask} />
    </div>
  )
}
