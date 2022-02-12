import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Products = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }

  return (
    <>
      <Button type="primary" onClick={() => redirectTo(`coupons/add`)} style={{ margin: 10 }}>
        Add Coupons
      </Button>
      <Button onClick={() => redirectTo(`coupons/edit?id=2`)} style={{ margin: 10 }}>
        Edit Coupons
      </Button>
      <Button onClick={() => redirectTo(`coupons/detail?id=2`)} type="dashed" style={{ margin: 10 }}>
        Detail Coupons
      </Button>
    </>
  )
}

export default Products
