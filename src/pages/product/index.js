import React from 'react'
import { useNavigate, matchRoutes } from 'react-router-dom'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import routers from '@routers'
const Products = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }
  // 匹配当前层级路由树
  const mathchs = matchRoutes(routers, location)

  console.log('mathchs', mathchs)

  return (
    <FixTabPanel>
      <Button type="primary" onClick={() => redirectTo('coupons/add')} style={{ margin: 10 }}>
        Add Coupons
      </Button>
      <Button onClick={() => redirectTo('coupons/edit?id=1')} style={{ margin: 10 }}>
        Edit Coupons
      </Button>
      <Button onClick={() => redirectTo('coupons/detail?id=2')} type="dashed" style={{ margin: 10 }}>
        Detail Coupons
      </Button>
    </FixTabPanel>
  )
}

export default Products
