import React from 'react'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { Result, Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const Exception403 = () => {
  const { redirectTo } = useSafeNavigate()
  return (
    <FixTabPanel>
      <Result
        status='403'
        title={
          <Button type='primary' ghost onClick={() => redirectTo('/')}>
            去首页
          </Button>
        }
        subTitle='Sorry, you are not authorized to access this page.'
      />
    </FixTabPanel>
  )
}

export default Exception403
