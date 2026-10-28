import type { HTMLAttributes, ReactNode } from 'react'
import { theme } from 'antd'
export interface PageContainerProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode
  footer?: ReactNode
}
export default function PageContainer({ children, title, footer, style, ...props }: PageContainerProps) {
  const { token } = theme.useToken()
  return (
    <>
      <section
        {...props}
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: token.colorBgContainer,
          display: 'flex',
          flexDirection: 'column',
          ...style,
        }}
      >
        {title != null && (
          <div
            style={{
              padding: '16px 24px',
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              fontSize: 16,
              fontWeight: 600,
              color: token.colorTextHeading,
              flexShrink: 0,
            }}
          >
            {title}
          </div>
        )}
        <div className="page-container-content" style={{ flex: 1, position: 'relative', padding: 24 }}>
          {children}
        </div>
      </section>
      {footer}
    </>
  )
}
