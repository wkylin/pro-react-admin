import React, { useRef } from 'react'
import SandpackBasic from '@container/SandpackBasic'
import FixTabPanel from '@stateless/FixTabPanel'

const SandBox = () => {
  return (
    <FixTabPanel>
      <SandpackBasic />
    </FixTabPanel>
  )
}

export default SandBox
