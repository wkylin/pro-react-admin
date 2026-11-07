import React, { useMemo, type ComponentProps } from 'react'
import { Button, Layout, theme, Space } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'
import type { RouteHandle } from '@app/routing/utils'
import { selectIsMobile, useAppStore } from '@app/model'
import { useTranslation } from 'react-i18next'
import ProBreadcrumb from './breadcrumb'
import ProTabs from '../proTabs'
import styles from './index.module.less'
import type { LayoutSlots } from '../types'

const { Content, Footer } = Layout

type Pane = ComponentProps<typeof ProTabs>['panesItem']

interface ProContentProps {
  showTabs?: boolean
  slots?: LayoutSlots
}

const ProContent = ({ showTabs = true, slots }: ProContentProps) => {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen)
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)
  const isMobile = useAppStore(selectIsMobile)
  const { t } = useTranslation()
  const { pathname, search } = useLocation()
  const matches = useMatches()
  const outlet = useOutlet()
  const routeMatch = [...matches].reverse().find((match) => {
    const handle = match.handle
    return typeof handle === 'object' && handle !== null && 'tab' in handle && (handle as RouteHandle).tab === true
  })
  const routeHandle = routeMatch?.handle as RouteHandle | undefined
  const routeKey = routeHandle?.routeKey || pathname
  const tabKey = routeHandle?.tabKey || (routeKey.includes(':') || routeKey.includes('*') ? pathname : routeKey)
  const fullPath = pathname + search
  const panesItem = useMemo<Pane>(
    () => ({
      title: routeHandle?.title || 'New Tab',
      content: outlet,
      key: tabKey,
      routeId: routeMatch?.id,
      closable: tabKey !== '/',
      path: fullPath,
      i18nKey: routeHandle?.i18nKey,
    }),
    [fullPath, outlet, routeHandle?.i18nKey, routeHandle?.title, routeMatch?.id, tabKey]
  )
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken()
  return (
    <Layout className={styles.layout} id="fullScreen">
      <div
        className={`layout-header ${styles.header}`}
        style={{ backgroundColor: colorBgContainer, borderBottom: `1px solid ${colorBorderSecondary}` }}
      >
        <section className="flex items-center justify-between">
          <div className={styles.breadcrumbControls}>
            {!isMobile && (
              <Button
                type="text"
                size="small"
                className={styles.sidebarToggle}
                aria-label={t(isSidebarOpen ? 'header.collapseSidebar' : 'header.expandSidebar')}
                aria-expanded={isSidebarOpen}
                title={t(isSidebarOpen ? 'header.collapseSidebar' : 'header.expandSidebar')}
                icon={isSidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                onClick={toggleSidebar}
              />
            )}
            <ProBreadcrumb />
          </div>
          {/* <ClockFace /> */}
        </section>
      </div>
      <Content
        className="layout-content content-typography"
        id="fullScreenContent"
        tabIndex={-1}
        style={{ backgroundColor: colorBgContainer }}
      >
        {slots?.contentStart}
        {showTabs ? <ProTabs panesItem={panesItem} tabActiveKey={tabKey} /> : outlet}
        {slots?.contentEnd}
      </Content>
      <Footer className="layout-footer">
        <Space>&copy; {new Date().getFullYear()} Pro React Admin</Space>
      </Footer>
    </Layout>
  )
}

export default ProContent
