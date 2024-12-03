import React from 'react'
import styles from './index.module.less'
const SlideLinear = ({children}) => {
  return (
    <div className={styles.slider}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default SlideLinear
