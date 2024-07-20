import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import { Map } from '@pansy/react-amap'

const ReactAmap = () => (
  <FixTabPanel>
    <div style={{ height: 500 }}>
      <Map center={[108.484886, 34.293777]} />
    </div>
  </FixTabPanel>
)

export default ReactAmap
