import React from 'react'
import { Alert } from 'antd'
import { useSearchParams } from '@hooks'

const EditCoupons = () => {
  const query = useSearchParams()
  const term = query.get('id')
  return (
    <>
      <Alert message="送券活动单" description="--编辑--" type="info" showIcon />
      <span>Search Id: {term}</span>
    </>
  )
}

export default EditCoupons
