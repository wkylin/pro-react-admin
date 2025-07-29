import React from 'react'
import styles from './index.module.less'

const RadioInput = ({ text = '单选', checked = false }) => {
  return (
    <div className={styles.radioContainer}>
      {text}
      <span className={checked ? styles.checked : styles.checkmark} />
    </div>
  )
}

export default RadioInput
