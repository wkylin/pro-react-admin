import React from 'react'
import { Alert } from 'antd'

const HomeCoupons = ({ routes = [] }) => {
  return (
    <>
      <Alert
        message="Informational Notes"
        description="Additional description and information about copywriting."
        type="info"
        showIcon
      />
    </>
  )
}

export default HomeCoupons
