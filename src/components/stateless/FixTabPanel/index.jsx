import React from 'react'

const FixTabPanel = ({ style, children }) => (
  <div style={{ width: '100%', minHeight: 'calc(100vh - 232px)', ...style }}>{children}</div>
)

export default FixTabPanel
