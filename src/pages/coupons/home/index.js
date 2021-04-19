import React, { useEffect } from 'react'
import { Alert } from 'antd'

import httpFetch from '@/service/fetch'

console.log('httpFetch', httpFetch);
const HomeCoupons = () => {
  useEffect(() => {
    // console.log('$fetch', httpFetch('/todos/1'))
    // httpFetch('api/todos/1')
    //   .then((res) => console.log('res==>>', res))
    //   .catch((error) => console.log(error))
    httpFetch('/todos/1')
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
