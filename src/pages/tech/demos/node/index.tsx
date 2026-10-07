import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Alert } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const NodeDemo = () => {
  const [searchParams] = useSearchParams()

  const id = searchParams.get('id')

  const params = useParams()

  return (
    <FixTabPanel>
      <Alert
        title="Node.js Demo"
        description="This is a demo page for Node.js technology stack."
        type="success"
        showIcon
      />
      <div>useParams: {JSON.stringify(params, null, 2)}</div>
      <span>Search Id: {id}</span>
    </FixTabPanel>
  )
}

export default NodeDemo
