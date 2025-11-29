import React from 'react'
import { Button, Space } from 'antd'
import { DashboardOutlined, ProjectOutlined, HomeOutlined } from '@ant-design/icons'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { usePermission } from '@src/hooks/usePermission'

export const usePrimaryNavItems = () => {
  const { redirectTo } = useSafeNavigate()
  const { routes } = usePermission()

  const hasAccess = (path) => {
    if (!routes || routes.length === 0) return false
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

  const items = [
    {
      key: 'home',
      label: '首页',
      icon: <HomeOutlined style={{ fontSize: 16 }} />,
      onClick: () => redirectTo('/'),
      show: true,
    },
    {
      key: 'dashboard',
      label: '多路由设置',
      icon: <DashboardOutlined style={{ fontSize: 16 }} />,
      onClick: () => redirectTo('dashboard'),
      show: hasAccess('/dashboard'),
    },
    {
      key: 'portfilo',
      label: 'My Portfilo',
      icon: <ProjectOutlined style={{ fontSize: 16 }} />,
      onClick: () => redirectTo('portfilo'),
      show: hasAccess('/portfilo'),
    },
  ]

  return items.filter((item) => item.show).map(({ show, ...rest }) => rest)
}

const PrimaryNav = () => {
  const items = usePrimaryNavItems()

  return (
    <Space style={{ marginRight: 16 }}>
      {items.map((item) => (
        <Button key={item.key} type="link" icon={item.icon} onClick={item.onClick}>
          {item.label}
        </Button>
      ))}
    </Space>
  )
}

export default PrimaryNav
