import React from 'react'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const BackendStack = () => {
  const { redirectTo } = useSafeNavigate()

  return (
    <FixTabPanel>
      <Button type='primary' onClick={() => redirectTo('/tech/backend/node')} style={{ margin: 10 }}>
        Node
      </Button>
      <Button onClick={() => redirectTo('/tech/backend/java')} style={{ margin: 10 }}>
        Java
      </Button>
      <Button onClick={() => redirectTo('/tech/backend/go')} type='dashed' style={{ margin: 10 }}>
        Go
      </Button>
    </FixTabPanel>
  )
}

export default BackendStack
