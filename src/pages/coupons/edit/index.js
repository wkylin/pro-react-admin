import React from 'react'
import { Alert } from 'antd'
import { useUrlSearchParams } from '@hooks'

const EditCoupons = () => {
  const query = useUrlSearchParams()
  const term = query.get('id')
  return (
    <>
      <Alert
        message="Success Tips"
        description="Detailed description and advice about successful copywriting."
        type="success"
        showIcon
      />
      <span>Search Id: {term}</span>
    </>
  )
}

export default EditCoupons
