import AnimatedIcon from '@stateless/AnimatedIcon'
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Space } from 'antd'
import { DashboardOutlined, ProjectOutlined, HomeOutlined } from '@ant-design/icons'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { usePermission } from '@src/app-hooks/usePermission'
import { useTranslation } from 'react-i18next'

export const usePrimaryNavItems = () => {
  const { redirectTo } = useSafeNavigate()
  const { routes } = usePermission()

  const matchWildcard = (text, pattern) => {
    if (pattern === '*') return true
    if (!pattern.includes('*')) return text === pattern

    const parts = pattern.split('*').filter((p) => p.length > 0)
    if (parts.length === 0) return true

    let pos = 0
    const startsWithWildcard = pattern.startsWith('*')
    const endsWithWildcard = pattern.endsWith('*')

    if (!startsWithWildcard) {
      const first = parts[0]
      if (!text.startsWith(first)) return false
      pos = first.length
    }

    for (let i = startsWithWildcard ? 0 : 1; i < parts.length; i += 1) {
      const part = parts[i]
      const idx = text.indexOf(part, pos)
      if (idx === -1) return false
      pos = idx + part.length
    }

    if (!endsWithWildcard) {
      const last = parts[parts.length - 1]
      return text.endsWith(last)
    }

    return true
  }

  const hasAccess = (path) => {
    if (!routes || routes.length === 0) return false
    if (path === '/') return true
    return routes.some((route) => {
      if (route === path) return true
      if (path.startsWith(route + '/')) return true
      if (route.includes('*')) {
        return matchWildcard(path, route)
      }
      return false
    })
  }

  const items = [
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
      show: true,
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
      onClick: () => redirectTo('portfilo'),
      show: hasAccess('/portfilo'),
    },
  ]

  return items.filter((item) => item.show).map(({ show, ...rest }) => rest)
}

const PrimaryNav = ({ layout = '' }) => {
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

PrimaryNav.propTypes = {
  layout: PropTypes.string,
}

export default PrimaryNav
