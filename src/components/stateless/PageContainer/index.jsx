import React from 'react'
import PropTypes from 'prop-types'
import { theme } from 'antd'
import Footer from '@stateless/Footer'

const PageContainer = ({ children, title, footer = <Footer />, className, style }) => {
  const { token } = theme.useToken()

  return (
    <>
      <section
        className={className}
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: token.colorBgContainer,
          display: 'flex',
          flexDirection: 'column',
          ...style,
        }}
      >
        {title && (
          <div
            style={{
              padding: '16px 24px',
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              fontSize: '16px',
              fontWeight: 600,
              color: token.colorTextHeading,
              flexShrink: 0,
            }}
          >
            {title}
          </div>
        )}
        <div
          className="page-container-content"
          style={{
            flex: 1,
            position: 'relative',
            padding: '24px',
          }}
        >
          {children}
        </div>
      </section>
      {footer}
    </>
  )
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default PageContainer
