import React, { useEffect, useState } from 'react'
import { Alert, Tag } from 'antd'

import { getFetch } from '@src/service'

const HomeCoupons = () => {
  const [stackList, setStackList] = useState([])

  useEffect(() => {
    getFetch('/wkylin/angular-json-server/react')
      .then((res) => setStackList(res.data))
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

      <h5 style={{ margin: '30px 0 5px 0' }}>技术栈：</h5>
      {stackList.map((item, index) => (
        <Tag key={index} color="success">
          React: v17.0.2
        </Tag>
      ))}
    </>
  )
}

export default HomeCoupons
