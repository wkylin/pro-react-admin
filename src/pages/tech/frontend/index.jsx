import React from 'react'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const FrontendTech = () => {
  const { redirectTo } = useSafeNavigate()

  return (
    <FixTabPanel>
      <Button type='primary' style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/react')}>
        React
      </Button>
      <Button type='primary' style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/vue')}>
        Vue
      </Button>
      <Button type='primary' style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/angular')}>
        Angular
      </Button>
      <Button type='primary' style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/node')}>
        Node
      </Button>
    </FixTabPanel>
  )
}

export default FrontendTech
