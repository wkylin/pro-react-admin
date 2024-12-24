import React from 'react'

const FixTabPanel = React.forwardRef(({ style, children }, ref) => (
  <div
    ref={ref}
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
