import React from 'react'
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
            overflow: 'auto',
            padding: '24px',
            position: 'relative',
          }}
        >
          {children}
        </div>
        <style>{`
          .page-container-content::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .page-container-content::-webkit-scrollbar-track {
            background: transparent;
          }
          .page-container-content::-webkit-scrollbar-thumb {
            background-color: ${token.colorFillSecondary};
            border-radius: 3px;
          }
          .page-container-content::-webkit-scrollbar-thumb:hover {
            background-color: ${token.colorFill};
          }
        `}</style>
      </section>
      {footer}
    </>
  )
}

export default PageContainer
