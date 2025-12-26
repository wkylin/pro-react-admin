import React from 'react'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { Alert, Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { useProTabContext } from '@app-hooks/proTabsContext'

const VueDemo = () => {
  const { activeKey, removeTab } = useProTabContext()
  const { redirectTo } = useSafeNavigate()
  const closeActiveOpenAngular = () => {
    removeTab(activeKey, () => {
      redirectTo('/tech/frontend/angular', { replace: true })
    })
  }
  return (
    <FixTabPanel>
      <Button type='link' onClick={closeActiveOpenAngular}>
        关闭当前标签 并打开 Angular标签
      </Button>
      <Alert
        title='Success Tips'
        description='Detailed description and advice about successful copywriting.'
        type='success'
        showIcon
      />
    </FixTabPanel>
  )
}

export default VueDemo
