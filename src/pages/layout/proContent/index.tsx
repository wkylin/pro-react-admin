import React, { useState, useEffect, type ComponentProps } from 'react'
import { Layout, theme, Space } from 'antd'
import { useLocation } from 'react-router-dom'
import { getKeyName } from '@utils/publicFn'
import ProBreadcrumb from './breadcrumb'
import ProTabs from '../proTabs'
import styles from './index.module.less'

const { Content, Header, Footer } = Layout

type Pane = ComponentProps<typeof ProTabs>['panesItem']

const ProContent = () => {
  const [tabActiveKey, setTabActiveKey] = useState<string>('home')
  const [panesItem, setPanesItem] = useState<Pane>({
    title: '',
    content: null,
    key: '',
    closable: false,
    path: '',
    i18nKey: '',
  })
  const { pathname, search } = useLocation()
  const {
    token: { colorBgContainer, colorBgLayout },
  } = theme.useToken()
  useEffect(() => {
    // pass full path (including search) so getKeyName can consider query params
    const full = search ? pathname + search : pathname
    const { tabKey, title, element, i18nKey } = getKeyName(full)
    const key = typeof tabKey === 'string' ? tabKey : full

    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => {
        setPanesItem({
          title,
          content: element,
          key,
          closable: tabKey !== '/',
          path: full,
          i18nKey,
        })
        setTabActiveKey(key)
      })
    } else {
      setTimeout(() => {
        setPanesItem({
          title,
          content: element,
          key,
          closable: tabKey !== '/',
          path: full,
          i18nKey,
        })
        setTabActiveKey(key)
      }, 0)
    }
  }, [pathname, search])

  return (
    <Layout className={styles.layout} id="fullScreen">
      <Header className="layout-header" style={{ backgroundColor: colorBgLayout }}>
        <section className="flex items-center justify-between">
          <ProBreadcrumb />
          {/* <ClockFace /> */}
        </section>
      </Header>
      <Content className="layout-content" id="fullScreenContent" style={{ backgroundColor: colorBgContainer }}>
        <ProTabs panesItem={panesItem} tabActiveKey={tabActiveKey} />
      </Content>
      <Footer className="layout-footer">
        <Space>&copy; {new Date().getFullYear()} Pro React Admin</Space>
      </Footer>
    </Layout>
  )
}

export default ProContent
