'use client'

import type { ReactNode, CSSProperties } from 'react'
import styles from './index.module.less'

interface ScrollLayoutProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
  headerHeight?: number
  footerHeight?: number
  className?: string
  headerClassName?: string
  footerClassName?: string
  contentClassName?: string
  headerStyle?: CSSProperties
  footerStyle?: CSSProperties
  contentStyle?: CSSProperties
}

const ScrollLayout = ({
  header,
  footer,
  children,
  headerHeight = 60,
  footerHeight = 60,
  className = '',
  headerClassName = '',
  footerClassName = '',
  contentClassName = '',
  headerStyle = {},
  footerStyle = {},
  contentStyle = {},
}: ScrollLayoutProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {header && (
        <header
          className={`${styles.header} ${headerClassName}`}
          style={{ height: `${headerHeight}px`, ...headerStyle }}
        >
          {header}
        </header>
      )}
      <main className={`${styles.content} ${contentClassName}`} style={contentStyle}>
        {children}
      </main>
      {footer && (
        <footer
          className={`${styles.footer} ${footerClassName}`}
          style={{ height: `${footerHeight}px`, ...footerStyle }}
        >
          {footer}
        </footer>
      )}
    </div>
  )
}

export default ScrollLayout
