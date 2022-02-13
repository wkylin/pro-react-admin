import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Alert } from 'antd'
const DetailCoupons = () => {
  const [searchParams] = useSearchParams()

  const id = searchParams.get('id')

  const params = useParams()

  return (
    <>
      <Alert message="送券活动单" description="--详情--" type="info" showIcon />
      <div>useParams: {JSON.stringify(params, null, 2)}</div>
      <span>Search Id: {id}</span>
    </>
  )
}

export default DetailCoupons
