import AnimatedIcon from '@stateless/AnimatedIcon'
import React, { useMemo } from 'react'
import { Result, Button, Typography, Space } from 'antd'
import { useLocation } from 'react-router-dom'
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import FixTabPanel from '@stateless/FixTabPanel'

const { Paragraph, Text } = Typography

const SectionNotFound = () => {
  const location = useLocation()
  const { redirectTo } = useSafeNavigate()
  const pathname = location.pathname || '/'

  const sectionPath = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length <= 1) {
      return '/'
    }
    return `/${segments.slice(0, -1).join('/')}`
  }, [pathname])

  const handleBackToSection = () => {
    redirectTo(sectionPath)
  }

  const handleBackHome = () => {
    redirectTo('/')
  }

  return (
    <FixTabPanel>
      <Result
        status="404"
        title="模块子页面不存在"
        subTitle={
          <Paragraph style={{ marginBottom: 0 }}>
            当前路径 <Text code>{pathname}</Text> 不在该模块的有效子路由列表中。
            <br />
            建议返回 <Text code>{sectionPath}</Text> 查看模块首页，或返回全局首页继续浏览。
          </Paragraph>
        }
        extra={
          <Space size="middle">
            <Button
              icon={
                <AnimatedIcon variant="spin" mode="hover">
                  <ArrowLeftOutlined />
                </AnimatedIcon>
              }
              onClick={handleBackToSection}
            >
              返回模块首页
            </Button>
            <Button
              type="primary"
              icon={
                <AnimatedIcon variant="spin" mode="hover">
                  <HomeOutlined />
                </AnimatedIcon>
              }
              onClick={handleBackHome}
            >
              返回首页
            </Button>
          </Space>
        }
      />
    </FixTabPanel>
  )
}

export default SectionNotFound
