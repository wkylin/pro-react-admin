import React from 'react'

const ToggleButton = ({ on, toggle }) => <button onClick={toggle}>{on ? 'Turn Off' : 'Turn On'}</button>
export default ToggleButton
