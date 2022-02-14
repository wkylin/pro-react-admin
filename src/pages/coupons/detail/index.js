import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert } from 'antd'
const DetailCoupons = () => {
  const [searchParams] = useSearchParams()

  const id = searchParams.get('id')

  return (
    <>
      <Alert
        message="Success Tips"
        description="Detailed description and advice about successful copywriting."
        type="success"
        showIcon
      />
      <span>Search Id: {id}</span>
    </>
  )
}

export default DetailCoupons
