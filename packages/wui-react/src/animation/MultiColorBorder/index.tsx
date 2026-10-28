import React from 'react'

import styles from './index.module.less'

export type MultiColorBorderStyle = React.CSSProperties & { [key: `--${string}`]: string | number | undefined }
export interface MultiColorBorderProps {
  text?: React.ReactNode
  children?: React.ReactNode
  wrapperStyles?: MultiColorBorderStyle
  contentStyles?: MultiColorBorderStyle
}
const MultiColorBorder = ({ text, children, wrapperStyles = {}, contentStyles = {} }: MultiColorBorderProps) => (
  <>
    <section
      className={styles.multiWrapper}
      style={{
        ...wrapperStyles,
      }}
    >
      <section className={styles.multiContent} style={{ ...contentStyles }}>
        {children ?? text}
      </section>
    </section>
  </>
)

export default MultiColorBorder
