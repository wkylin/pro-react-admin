import React from 'react'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { Alert, Button } from 'antd'
import FixTabPanel from '@shared/ui/FixTabPanel'
import { useProTabContext } from '@layouts/proTabs/context'

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
      <Button type="link" onClick={closeActiveOpenAngular}>
        关闭当前标签 并打开 Angular标签
      </Button>
      <Alert
        title="Success Tips"
        description="Detailed description and advice about successful copywriting."
        type="success"
        showIcon
      />
    </FixTabPanel>
  )
}

export default VueDemo
