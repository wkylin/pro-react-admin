import React from 'react'
import RouteWithSubRoutes from '@stateless/RouteWithSubRoutes'
import { useNavigate, useMatch } from 'react-router-dom'
import CustomSwitch from '@stateless/CustomSwitch'
import { Button } from 'antd'

const Coupons = ({ routes = [] }) => {
  const navigate = useNavigate()
  const { url } = useMatch()
  const redirectTo = (path) => {
    navigate(path)
  }

  return (
    <>
      <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo(`${url}/add`)}>
        Add Coupons
      </Button>
      <Button style={{ margin: 10 }} onClick={() => redirectTo(`${url}/edit`)}>
        Edit Coupons
      </Button>
      <Button type="dashed" style={{ margin: 10 }} onClick={() => redirectTo(`${url}/detail`)}>
        Detail Coupons
      </Button>

      <CustomSwitch>
        {/* <Route path="/" element={<div>Route</div>} /> */}
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </CustomSwitch>
    </>
  )
}

export default Coupons
