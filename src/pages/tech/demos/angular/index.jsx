import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const AngularDemo = () => {
  const [searchParams] = useSearchParams()
  const term = searchParams.get('id')
  return (
    <FixTabPanel>
      <Alert
        title="Angular Demo"
        description="This is a demo page for Angular technology stack."
        type="success"
        showIcon
      />
      <span>Search Id: {term}</span>
    </FixTabPanel>
  )
}

export default AngularDemo
