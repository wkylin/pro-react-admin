import FixTabPanel from '@shared/ui/FixTabPanel'
import pageStyles from '@shared/styles/pageContent.module.less'
import React from 'react'
import { Alert } from 'antd'

const ReactDemo = () => (
  <FixTabPanel fill={false}>
    <div className={pageStyles.content}>
      <Alert title="React Demo" description="This is a demo page for React technology stack." type="success" showIcon />
    </div>
  </FixTabPanel>
)

export default ReactDemo
