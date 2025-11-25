import React from 'react'
import { Button, Space } from 'antd'
import { DashboardOutlined, ProjectOutlined, HomeOutlined } from '@ant-design/icons'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { usePermission } from '@src/hooks/usePermission'

const PrimaryNav = () => {
  const { redirectTo } = useSafeNavigate()
  const { routes } = usePermission()

  // 简单的权限检查辅助函数
  const hasAccess = (path) => {
    // 如果 routes 为空（加载中或失败），保守起见不显示
    if (!routes || routes.length === 0) return false
    // 根路径总是允许
    if (path === '/') return true

    return routes.some((route) => {
      if (route === path) return true
      if (path.startsWith(route + '/')) return true
      if (route.includes('*')) {
        const pattern = route.replace('*', '.*')
        return new RegExp(`^${pattern}$`).test(path)
      }
      return false
    })
  }

  return (
    <Space style={{ marginRight: 16 }}>
      <Button type="link" icon={<HomeOutlined />} onClick={() => redirectTo('/')}>
        首页
      </Button>

      {hasAccess('/dashboard') && (
        <Button type="link" icon={<DashboardOutlined />} onClick={() => redirectTo('dashboard')}>
          多路由设置
        </Button>
      )}

      {hasAccess('/portfilo') && (
        <Button type="link" icon={<ProjectOutlined />} onClick={() => redirectTo('portfilo')}>
          My Portfilo
        </Button>
      )}
    </Space>
  )
}

export default PrimaryNav
