import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const Exception403 = () => {
  const navigate = useNavigate()
  return (
    <FixTabPanel>
      <Result
        status="403"
        title={
          <Button type="primary" ghost onClick={() => navigate('/')}>
            去首页
          </Button>
        }
        subTitle="Sorry, you are not authorized to access this page."
      />
    </FixTabPanel>
  )
}

export default Exception403
