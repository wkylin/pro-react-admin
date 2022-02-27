import React from 'react'
import { Alert } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const AddCoupons = () => {
  return (
    <FixTabPanel>
      <Alert
        message="Success Tips"
        description="Detailed description and advice about successful copywriting."
        type="success"
        showIcon
      />
    </FixTabPanel>
  )
}

export default AddCoupons
