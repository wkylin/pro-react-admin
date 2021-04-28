import React from 'react'
import { Pagination } from 'antd'
const BasicInfo = () => {
  return (
    <>
      <Pagination defaultCurrent={6} total={500} />
    </>
  )
}

export default BasicInfo
