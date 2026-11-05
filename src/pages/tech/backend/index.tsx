import pageStyles from '@shared/styles/pageContent.module.less'
import React from 'react'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { Button } from 'antd'
import FixTabPanel from '@shared/ui/FixTabPanel'

const BackendStack = () => {
  const { redirectTo } = useSafeNavigate()

  return (
    <FixTabPanel fill={false}>
      <div className={pageStyles.content}>
        <Button type="primary" onClick={() => redirectTo('/tech/backend/node')} style={{ margin: 10 }}>
          Node
        </Button>
        <Button onClick={() => redirectTo('/tech/backend/java')} style={{ margin: 10 }}>
          Java
        </Button>
        <Button onClick={() => redirectTo('/tech/backend/go')} type="dashed" style={{ margin: 10 }}>
          Go
        </Button>
      </div>
    </FixTabPanel>
  )
}

export default BackendStack
