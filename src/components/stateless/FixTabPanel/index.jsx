import React, { useRef, useState, useEffect } from 'react'
import { FloatButton } from 'antd'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import ScrollProgressBar from '@stateless/ScrollProgressBar'

const FixTabPanel = React.forwardRef(
  ({ style, children, className, showScrollProgress = true, scrollProgressProps = {}, fill = false, ...rest }, ref) => {
    const innerRef = useRef(null)
    const [scrollContainer, setScrollContainer] = useState(null)

    const setRef = (node) => {
      innerRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    useEffect(() => {
      if (innerRef.current) {
        setScrollContainer(innerRef.current)
      }
    }, [])

    return (
      <div
        ref={setRef}
        {...rest}
        className={`fix-tab-panel-scroll-container ${fill ? 'fix-tab-panel-fill' : ''} ${className || ''}`}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflowX: 'hidden',
          overflowY: 'auto',
          padding: '5px',
          ...style
        }}
      >
        {showScrollProgress && (
          <ScrollProgressBar
            container={scrollContainer}
            position='fixed' // sticky
            {...scrollProgressProps}
          />
        )}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: fill ? '100%' : 'auto'
          }}
        >
          {children}
        </div>
        <FloatButton.BackTop target={() => innerRef.current} style={{ right: 6, bottom: 2 }}>
          <VerticalAlignTopOutlined style={{ fontSize: 20 }} />
        </FloatButton.BackTop>
      </div>
    )
  }
)

export default FixTabPanel
