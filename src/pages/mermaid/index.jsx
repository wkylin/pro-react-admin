import React from 'react'
import MermaidHooks from '@stateful/mermaidHooks'
import FixTabPanel from '@stateless/FixTabPanel'

const gitChart = `gitGraph
  commit
  commit
  branch develop
  commit
  commit
  commit
  checkout main
  commit
  commit
`
const Mermaid = () => (
  <>
    <FixTabPanel>
      <h2>Meraid: http://https://mermaid.js.org/</h2>

      <h3>演示1:Git Diagram </h3>
      <MermaidHooks chart={gitChart} />
    </FixTabPanel>
  </>
)

export default Mermaid
