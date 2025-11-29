import React from 'react'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const Products = () => {
  const { redirectTo } = useSafeNavigate()

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
