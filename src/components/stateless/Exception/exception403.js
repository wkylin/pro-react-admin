import React from 'react'

import { Result } from 'antd'

const Exception403 = () => {
  return (
    <>
      <Result status="403" title="403" subTitle="Sorry, you are not authorized to access this page." />
    </>
  )
}

export default Exception403
