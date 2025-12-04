import React from 'react'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const BackendPage = () => {
  const { redirectTo } = useSafeNavigate()

  return (
    <FixTabPanel>
      <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('/')}>
        Home
      </Button>
      <Button style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend')}>
        Go to Frontend
      </Button>
    </FixTabPanel>
  )
}

export default BackendPage
