import AnimatedIcon from '@stateless/AnimatedIcon'
import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = (
  <AnimatedIcon variant="spin" mode="hover">
    <LoadingOutlined style={{ fontSize: 24 }} spin />
  </AnimatedIcon>
)
const Loading = ({ style = {} }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      ...style,
    }}
  >
    <Spin indicator={antIcon} />
  </div>
)

export default Loading
