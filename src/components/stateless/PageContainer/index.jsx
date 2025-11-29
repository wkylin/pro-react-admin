import React from 'react'
import { theme } from 'antd'
import Footer from '@stateless/Footer'

const PageContainer = ({ children, footer = <Footer />, className, style }) => {
  const { token } = theme.useToken()

  return (
    <>
      <section
        className={className}
        style={{
          position: 'relative',
          zIndex: 1,
          transform: 'translate3d(0, 0, 0)',
          backgroundColor: token.colorBgContainer,
          ...style,
        }}
      >
        {children}
      </section>
      {footer}
    </>
  )
}

export default PageContainer
