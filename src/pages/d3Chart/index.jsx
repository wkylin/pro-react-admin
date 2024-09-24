import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import ScatterPlot from './scatter'

const data = [
  { x: 30, y: 20 },
  { x: 85, y: 60 },
  { x: 50, y: 80 },
  { x: 20, y: 50 },
  { x: 90, y: 90 }
]
const D3Chart = () => (
  <FixTabPanel>
    <h3>Scatter Plot with D3 and React</h3>
    <ScatterPlot data={data} />
  </FixTabPanel>
)

export default D3Chart
