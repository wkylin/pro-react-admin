import AnimatedIcon from '@stateless/AnimatedIcon'
import React, { useRef, useState } from 'react'
import { FloatButton } from 'antd'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import ScrollProgressBar from '@stateless/ScrollProgressBar'

type ScrollProgressProps = React.ComponentProps<typeof ScrollProgressBar>

interface FixTabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  showScrollProgress?: boolean
  scrollProgressProps?: ScrollProgressProps
  fill?: boolean
}

const FixTabPanel = React.forwardRef<HTMLDivElement, FixTabPanelProps>(
  ({ style, children, className, showScrollProgress = true, scrollProgressProps = {}, fill = true, ...rest }, ref) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null)

    const setRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (wrapperRef.current !== node) {
          wrapperRef.current = node
          setContainerNode(node)
        }

        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

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
        <FloatButton.BackTop target={() => containerNode ?? window} style={{ right: 6, bottom: 2 }}>
          <AnimatedIcon variant="spin" mode="hover">
            <VerticalAlignTopOutlined style={{ fontSize: 20 }} />
          </AnimatedIcon>
        </FloatButton.BackTop>
      </div>
    )
  }
)

FixTabPanel.displayName = 'FixTabPanel'

export default FixTabPanel
