import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Result, Flex, Typography, theme } from 'antd'
import { HomeOutlined, RollbackOutlined } from '@ant-design/icons'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { useProThemeContext } from '@src/theme/hooks'

const { Text, Paragraph } = Typography

const NoMatch = () => {
  const location = useLocation()
  const { redirectTo, goBack } = useSafeNavigate()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  // 禁止页面滚动
  React.useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 20,
        background: colorBgContainer
      }}
    >
      <Result
        status='404'
        title='页面未找到'
        subTitle={
          <Flex vertical gap='small' align='center' style={{ marginTop: 16 }}>
            <Paragraph style={{ marginBottom: 0 }}>
              抱歉，您访问的页面 <Text code>{location.pathname}</Text> 不存在或已被移除。
            </Paragraph>
            <Text type='secondary' style={{ fontSize: 14 }}>
              请检查 URL 是否正确，或返回首页继续浏览。
            </Text>
          </Flex>
        }
        extra={
          <Flex gap='middle' justify='center' style={{ marginTop: 24 }}>
            <Button icon={<RollbackOutlined />} onClick={goBack}>
              返回上一页
            </Button>
            <Button type='primary' icon={<HomeOutlined />} onClick={() => redirectTo('/')}>
              返回首页
            </Button>
          </Flex>
        }
      />
    </div>
  )
}

export default NoMatch
