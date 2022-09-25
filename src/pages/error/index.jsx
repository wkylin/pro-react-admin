import React from 'react'
import FixTabPanel from '@src/components/stateless/FixTabPanel'

const Error = () => {
  const error = { error: 'error' }
  return (
    <FixTabPanel>
      <h3>Cool! Hi, React && Ant Design</h3>
      {error.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </FixTabPanel>
  )
}

export default Error
