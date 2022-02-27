import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Alert } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const DetailCoupons = () => {
  const [searchParams] = useSearchParams()

  const id = searchParams.get('id')

  const params = useParams()

  return (
    <FixTabPanel>
      <Alert
        message="Success Tips"
        description="Detailed description and advice about successful copywriting."
        type="success"
        showIcon
      />
      <div>useParams: {JSON.stringify(params, null, 2)}</div>
      <span>Search Id: {id}</span>
    </FixTabPanel>
  )
}

export default DetailCoupons
