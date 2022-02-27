import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const Loading = ({ tip = 'Loading' }) => {
  return <Spin indicator={antIcon} tip={tip} />
}

export default Loading
