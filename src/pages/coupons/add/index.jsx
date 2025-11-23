import React from 'react'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { Alert, Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { useProTabContext } from '@src/components/hooks/proTabsContext'

const AddCoupons = () => {
  const { activeKey, removeTab } = useProTabContext()
  const { redirectTo } = useSafeNavigate()
  const closeActiveOpenAngular = () => {
    removeTab(activeKey, () => {
      redirectTo('coupons/edit', { replace: true })
    })
  }
  return (
    <FixTabPanel>
      <Button type='link' onClick={closeActiveOpenAngular}>
        关闭当前标签 并打开 Angular标签
      </Button>
      <Alert
        message='Success Tips'
        description='Detailed description and advice about successful copywriting.'
        type='success'
        showIcon
      />
    </FixTabPanel>
  )
}

export default AddCoupons
