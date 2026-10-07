import React from 'react'

const ToggleButton = ({ on = false, toggle }: { on?: boolean; toggle?: () => void }) => (
  <button onClick={toggle}>{on ? 'Turn Off' : 'Turn On'}</button>
)
export default ToggleButton
