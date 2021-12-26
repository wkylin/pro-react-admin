import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Coupons = ({ routes = [] }) => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }

  return (
    <>
      <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('')}>
        Home Coupons
      </Button>
      <Button type="text" style={{ margin: 10 }} onClick={() => redirectTo('add')}>
        Add Coupons
      </Button>
      <Button style={{ margin: 10 }} onClick={() => redirectTo('edit/1')}>
        Edit Coupons
      </Button>
      <Button type="dashed" style={{ margin: 10 }} onClick={() => redirectTo('detail/2')}>
        Detail Coupons
      </Button>
      <Outlet />
    </>
  )
}

export default Coupons
