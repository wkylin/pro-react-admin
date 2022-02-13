import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert } from 'antd'
const DetailCoupons = () => {
  const [searchParams] = useSearchParams()

  const id = searchParams.get('id')

  return (
    <>
      <Alert message='送券活动单' description='--详情--' type='info' showIcon />
      <span>Search Id: {id}</span>
    </>
  )
}

export default DetailCoupons
