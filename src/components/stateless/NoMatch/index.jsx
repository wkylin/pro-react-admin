import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Result, Flex, Typography } from 'antd'
import { HomeOutlined, RollbackOutlined } from '@ant-design/icons'
import useSafeNavigate from '@hooks/useSafeNavigate'

const { Text, Paragraph } = Typography

const NoMatch = () => {
  const location = useLocation()
  const { redirectTo, goBack } = useSafeNavigate()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Result
        status="404"
        title="页面未找到"
        subTitle={
          <Flex vertical gap="small" align="center" style={{ marginTop: 16 }}>
            <Paragraph style={{ marginBottom: 0 }}>
              抱歉，您访问的页面 <Text code>{location.pathname}</Text> 不存在或已被移除。
            </Paragraph>
            <Text type="secondary" style={{ fontSize: 14 }}>
              请检查 URL 是否正确，或返回首页继续浏览。
            </Text>
          </Flex>
        }
        extra={
          <Flex gap="middle" justify="center" style={{ marginTop: 24 }}>
            <Button icon={<RollbackOutlined />} onClick={goBack}>
              返回上一页
            </Button>
            <Button type="primary" icon={<HomeOutlined />} onClick={() => redirectTo('/')}>
              返回首页
            </Button>
          </Flex>
        }
      />
    </div>
  )
}

export default NoMatch
