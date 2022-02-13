import React from 'react'
import { useParams } from 'react-router-dom'
import { Alert } from 'antd'
import { useSearchParams } from '@hooks'

const DetailCoupons = () => {
  const query = useSearchParams()
  const term = query.get('id')

  const params = useParams()

  return (
    <>
      <Alert message="送券活动单" description="--详情--" type="info" showIcon />
      <span>Search Id: {term}</span>

      <div>useParams: {JSON.stringify(params, null, 2)}</div>
    </>
  )
}

export default DetailCoupons
