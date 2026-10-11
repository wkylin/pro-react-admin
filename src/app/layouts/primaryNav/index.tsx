import AnimatedIcon from '@wui/AnimatedIcon'
import React, { type ReactNode } from 'react'
import { Button, Space } from 'antd'
import { DashboardOutlined, ProjectOutlined, HomeOutlined } from '@ant-design/icons'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { canAccessPath } from '@platform/auth/model/policy'
import { useTranslation } from 'react-i18next'
import rootRouter from '@routers'
import { matchRoutes, type RouteObject } from 'react-router-dom'

interface PrimaryNavItem {
  key: string
  label: string
  i18nKey: string
  icon: ReactNode
  onClick: () => void
}

interface PrimaryNavItemWithVisibility extends PrimaryNavItem {
  show: boolean
}

interface PrimaryNavProps {
  layout?: string
}

export const usePrimaryNavItems = (): PrimaryNavItem[] => {
  const { redirectTo } = useSafeNavigate()
  const { current } = usePermission()

  const hasAccess = (path: string): boolean => {
    const matched = matchRoutes(rootRouter as RouteObject[], path)?.at(-1)
    return Boolean(current && matched && matched.route.path !== '*' && canAccessPath(current, path))
  }

  const items: PrimaryNavItemWithVisibility[] = [
    {
      key: 'home',
      label: '首页',
      i18nKey: 'nav.home',
      icon: (
        <AnimatedIcon variant="spin" mode="hover">
          <HomeOutlined style={{ fontSize: 16 }} />
        </AnimatedIcon>
      ),
      onClick: () => redirectTo('/'),
      show: hasAccess('/'),
    },
    {
      key: 'dashboard',
      label: '多路由设置',
      i18nKey: 'nav.dashboard',
      icon: (
        <AnimatedIcon variant="spin" mode="hover">
          <DashboardOutlined style={{ fontSize: 16 }} />
        </AnimatedIcon>
      ),
      onClick: () => redirectTo('dashboard'),
      show: hasAccess('/dashboard'),
    },
    {
      key: 'portfilo',
      label: 'My Portfilo',
      i18nKey: 'nav.portfolio',
      icon: (
        <AnimatedIcon variant="spin" mode="hover">
          <ProjectOutlined style={{ fontSize: 16 }} />
        </AnimatedIcon>
      ),
      onClick: () => window.open('https://wkylin.cn', '_blank'),
      show: hasAccess('/portfilo'),
    },
  ]

  return items
    .filter((item) => item.show)
    .map(({ key, label, i18nKey, icon, onClick }) => ({
      key,
      label,
      i18nKey,
      icon,
      onClick,
    }))
}

const PrimaryNav = ({ layout = '' }: PrimaryNavProps) => {
  const { t } = useTranslation()
  const items = usePrimaryNavItems()
  const filterItems = layout === 'top' ? items.filter((item) => item.key !== 'home') : items
  return (
    <Space style={{ marginRight: 16 }}>
      {filterItems.map((item) => (
        <Button key={item.key} type="link" icon={item.icon} onClick={item.onClick}>
          {item.i18nKey ? t(item.i18nKey) : item.label}
        </Button>
      ))}
    </Space>
  )
}

export default PrimaryNav
