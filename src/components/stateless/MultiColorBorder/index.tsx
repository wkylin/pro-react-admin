import React from 'react'

import styles from './index.module.less'

const MultiColorBorder = ({ text, wrapperStyles = { color: '#fff' }, contentStyles = { color: '#fff' } }) => (
  <>
    <section
      className={styles.multiWrapper}
      style={{
        ...wrapperStyles,
      }}
    >
      <section className={styles.multiContent} style={{ ...contentStyles }}>
        {text}
      </section>
    </section>
  </>
)

export default MultiColorBorder
