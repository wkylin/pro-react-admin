import React from 'react'
import styles from './index.module.less'

const SkeletonFix = () => {
  return (
    <div className={`${styles.placeholder} ${styles.shimmer}`}>
      <div className={styles['faux-image-wrapper']}>
        <div className={styles['faux-image']}></div>
      </div>
      <div className={styles['faux-text']}></div>
      <div className={`${styles['faux-text']} ${styles.short}`}></div>
      <div className={`${styles['faux-text']} ${styles['min-short']}`}></div>
    </div>
  )
}

export default SkeletonFix
