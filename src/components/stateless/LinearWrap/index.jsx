import React from 'react'
import styles from './index.module.less'
const LinearWrap = ({ children }) => {
  return (
    <section className={styles.linearWrap}>
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
      <section>{children}</section>
    </section>
  )
}
export default LinearWrap
