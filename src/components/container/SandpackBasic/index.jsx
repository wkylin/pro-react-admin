import React from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'

const SandpackBasic = () => {
  return (
    <Sandpack
      template='react'
      options={{
        // layout: "preview",
        showNavigator: true
      }}
      files={{
        '/App.js': `export default function App() {
  return <h1>Hello Sandpack</h1>
}`,
        '/Button.js': {
          code: `export default () => {
  return <button>Hello</button>
};`,
          readOnly: true,
          active: true,
          hidden: false
        }
      }}
    />
  )
}

export default SandpackBasic
