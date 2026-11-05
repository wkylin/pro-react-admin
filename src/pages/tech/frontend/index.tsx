import pageStyles from '@shared/styles/pageContent.module.less'
import React from 'react'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { Button } from 'antd'
import FixTabPanel from '@shared/ui/FixTabPanel'

const FrontendTech = () => {
  const { redirectTo } = useSafeNavigate()

  return (
    <FixTabPanel fill={false}>
      <div className={pageStyles.content}>
        <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/react')}>
          React
        </Button>
        <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/vue')}>
          Vue
        </Button>
        <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/angular')}>
          Angular
        </Button>
        <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('/tech/frontend/node')}>
          Node
        </Button>
      </div>
    </FixTabPanel>
  )
}

export default FrontendTech
