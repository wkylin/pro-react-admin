import React from 'react'
// import RouteWithSubRoutes from 'stateless/RouteWithSubRoutes'
import { useHistory, useRouteMatch } from 'react-router-dom'
// import CustomSwitch from 'stateless/CustomSwitch'
import { Button } from 'antd'

const Coupons = ({ routes = [] }) => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const redirectTo = (path) => {
    history.push(path)
  }

  return (
    <>
      <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo(`${url}/home`)}>
        Home Coupons
      </Button>
      <Button style={{ margin: 10 }} onClick={() => redirectTo(`${url}/add`)}>
        Add Coupons
      </Button>
      <Button type="dashed" style={{ margin: 10 }} onClick={() => redirectTo(`${url}/detail`)}>
        Detail Coupons
      </Button>

      {/* <CustomSwitch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </CustomSwitch> */}
    </>
  )
}

export default Coupons
