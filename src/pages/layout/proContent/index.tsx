import React, { useMemo, type ComponentProps } from 'react'
import { Layout, theme, Space } from 'antd'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'
import type { RouteHandle } from '@src/routers/utils'
import ProBreadcrumb from './breadcrumb'
import ProTabs from '../proTabs'
import styles from './index.module.less'

const { Content, Header, Footer } = Layout

type Pane = ComponentProps<typeof ProTabs>['panesItem']

const ProContent = () => {
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
    token: { colorBgContainer, colorBgLayout },
  } = theme.useToken()
  return (
    <Layout className={styles.layout} id="fullScreen">
      <Header className="layout-header" style={{ backgroundColor: colorBgLayout }}>
        <section className="flex items-center justify-between">
          <ProBreadcrumb />
          {/* <ClockFace /> */}
        </section>
      </Header>
      <Content className="layout-content" id="fullScreenContent" style={{ backgroundColor: colorBgContainer }}>
        <ProTabs panesItem={panesItem} tabActiveKey={tabKey} />
      </Content>
      <Footer className="layout-footer">
        <Space>&copy; {new Date().getFullYear()} Pro React Admin</Space>
      </Footer>
    </Layout>
  )
}

export default ProContent
