import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const Coupons = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }

  return (
    <FixTabPanel>
      <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('/')}>
        Home Coupons
      </Button>
      <Button type="text" style={{ margin: 10 }} onClick={() => redirectTo('coupons/add')}>
        Add Coupons
      </Button>
      <Button style={{ margin: 10 }} onClick={() => redirectTo('coupons/edit?id=1')}>
        Edit Coupons
      </Button>
      <Button type="dashed" style={{ margin: 10 }} onClick={() => redirectTo('coupons/detail?id=2')}>
        Detail Coupons
      </Button>
    </FixTabPanel>
  )
}

export default Coupons
