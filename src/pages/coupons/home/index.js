import React, { useEffect } from 'react'
import { Alert } from 'antd'

import { getFetch } from '@src/service'

const HomeCoupons = () => {
  useEffect(() => {
    getFetch('/wkylin/angular-json-server/react')
      .then((res) => console.log('res==>>', res))
      .catch((error) => console.log(error))
  }, [])

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
