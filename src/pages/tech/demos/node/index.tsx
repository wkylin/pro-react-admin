import pageStyles from '@shared/styles/pageContent.module.less'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Alert } from 'antd'
import FixTabPanel from '@shared/ui/FixTabPanel'

const NodeDemo = () => {
  const [searchParams] = useSearchParams()

  const id = searchParams.get('id')

  const params = useParams()

  return (
    <FixTabPanel fill={false}>
      <div className={pageStyles.content}>
        <Alert
          title="Node.js Demo"
          description="This is a demo page for Node.js technology stack."
          type="success"
          showIcon
        />
        <div>useParams: {JSON.stringify(params, null, 2)}</div>
        <span>Search Id: {id}</span>
      </div>
    </FixTabPanel>
  )
}

export default NodeDemo
