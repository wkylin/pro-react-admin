import React, { useEffect } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'monospace'
})

const MermaidHooks = ({ chart }) => {
  useEffect(() => {
    mermaid.contentLoaded()
  }, [])
  return <div className='mermaid'>{chart}</div>
}

export default MermaidHooks
