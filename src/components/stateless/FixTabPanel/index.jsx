import React, { useRef } from 'react'
import { FloatButton } from 'antd'
import { VerticalAlignTopOutlined } from '@ant-design/icons'

const FixTabPanel = React.forwardRef(({ style, children, className, ...rest }, ref) => {
  const innerRef = useRef(null)

  const setRef = (node) => {
    innerRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }

  return (
    <div
      ref={setRef}
      {...rest}
      className={`fix-tab-panel-scroll-container ${className || ''}`}
      style={{
        width: '100%',
        height: 'calc(100vh - 204px)',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        ...style,
      }}
    >
      {children}
      <FloatButton.BackTop target={() => innerRef.current}>
        <VerticalAlignTopOutlined style={{ fontSize: 20 }} />
      </FloatButton.BackTop>
    </div>
  )
})

export default FixTabPanel
