import React from 'react'

const ToggleMessage = ({ on = false }: { on?: boolean }) => <p>{on ? 'The button is ON' : 'The button is OFF'}</p>
export default ToggleMessage
