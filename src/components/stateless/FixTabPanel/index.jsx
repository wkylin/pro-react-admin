import React from 'react'

const FixTabPanel = React.forwardRef(({ style, children, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    id="scrollContainer"
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
  </div>
))

export default FixTabPanel
