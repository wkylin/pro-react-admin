import React from 'react'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { Button } from 'antd'
import FixTabPanel from '@shared/ui/FixTabPanel'

const FrontendStack = () => {
  const { redirectTo } = useSafeNavigate()

  return (
    <FixTabPanel>
      <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/react')}>
        React
      </Button>
      <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/vue')}>
        Vue
      </Button>
      <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/angular')}>
        Angular
      </Button>
    </FixTabPanel>
  )
}

export default FrontendStack
