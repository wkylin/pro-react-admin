import React from 'react'
import styles from './index.module.less'
const IsometricCard = ({ text }) => {
  return (
    <div className={styles.isometricCard}>
      <p>{text}</p>
    </div>
  )
}

export default IsometricCard
