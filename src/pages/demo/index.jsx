import React from 'react'

import FixTabPanel from '@stateless/FixTabPanel'

const viteEnvMode = import.meta.env.MODE ?? 'webapck env'
const viteEnvVariableValue = import.meta.env.VITE_GREETINGS ?? 'webapck env'

const ProDemo = () => {
  return (
    <FixTabPanel>
      <h3>Vite Env</h3>
      <h3>import.meta.env:</h3>
      <pre>
        <code>{JSON.stringify(import.meta.env, null, 2)}</code>
      </pre>
      <h4>Mode: {viteEnvMode}</h4>
      <h4>Variable value: {viteEnvVariableValue}</h4>
    </FixTabPanel>
  )
}

export default ProDemo
