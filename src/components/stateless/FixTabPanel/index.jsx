import React, { useRef, useState } from 'react'
import { FloatButton } from 'antd'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import ScrollProgressBar from '@stateless/ScrollProgressBar'

const FixTabPanel = React.forwardRef(
  ({ style, children, className, showScrollProgress = true, scrollProgressProps = {}, fill = true, ...rest }, ref) => {
    const wrapperRef = useRef(null)
    const [containerNode, setContainerNode] = useState(null)

    const setRef = (node) => {
      wrapperRef.current = node
      setContainerNode(node)
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
        className={`fix-tab-panel-scroll-container ${fill ? 'fix-tab-panel-fill' : ''} ${className || ''}`}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflowY: 'auto',
          overflowX: 'hidden',
          ...style,
        }}
      >
        {showScrollProgress && containerNode && (
          <ScrollProgressBar
            container={containerNode}
            position="fixed" // sticky
            {...scrollProgressProps}
          />
        )}

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            height: fill ? '100%' : 'auto',
            padding: '5px',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </div>

        <FloatButton.BackTop target={() => containerNode} style={{ right: 6, bottom: 2 }}>
          <VerticalAlignTopOutlined style={{ fontSize: 20 }} />
        </FloatButton.BackTop>
      </div>
    )
  }
)

FixTabPanel.displayName = 'FixTabPanel'

export default FixTabPanel
