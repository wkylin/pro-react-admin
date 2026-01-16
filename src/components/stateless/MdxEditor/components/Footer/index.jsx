import React, { memo } from 'react'
import styles from './index.module.less'

function Footer({ cursorPos, stats }) {
  return (
    <footer className={`${styles.mdxFooter} mdxFooter`}>
      <span>{cursorPos}</span>
      <span>{stats}</span>
    </footer>
  )
}

export default memo(Footer)
