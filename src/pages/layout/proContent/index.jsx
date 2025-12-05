import React, { useState, useEffect, useRef } from 'react'
import { Layout, FloatButton, theme, Space } from 'antd'
import { useLocation } from 'react-router-dom'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { getKeyName } from '@utils/publicFn'
import { useProTabContext } from '@hooks/proTabsContext'
import ClockFace from '@stateless/ClockFace'
import ProBreadcrumb from './breadcrumb'
import ProTabs from '../proTabs'
import styles from './index.module.less'

const { Content, Header, Footer } = Layout

const ProContent = () => {
  const [tabActiveKey, setTabActiveKey] = useState('home')
  const { activeKey, panes } = useProTabContext()
  const [panesItem, setPanesItem] = useState({
    title: '',
    content: null,
    key: '',
    closable: false,
    path: '',
    i18nKey: ''
  })

  const pathRef = useRef('')
  const { pathname, search } = useLocation()
  const {
    token: { colorBgContainer, colorBgLayout }
  } = theme.useToken()
  useEffect(() => {
    // pass full path (including search) so getKeyName can consider query params
    const full = search ? pathname + search : pathname
    const { tabKey, title, element, i18nKey } = getKeyName(full)
    const newPath = full
    pathRef.current = newPath

    setPanesItem({
      title,
      content: element,
      key: tabKey,
      closable: tabKey !== '/',
      path: newPath,
      i18nKey
    })
    setTabActiveKey(tabKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search, panes, activeKey])

  return (
    <Layout className={styles.layout} id='fullScreen'>
      <Header className='layout-header' style={{ backgroundColor: colorBgLayout }}>
        <section className='flex items-center justify-between'>
          <ProBreadcrumb />
          {/* <ClockFace /> */}
        </section>
      </Header>
      <Content className='layout-content' id='fullScreenContent' style={{ backgroundColor: colorBgContainer }}>
        <ProTabs panesItem={panesItem} tabActiveKey={tabActiveKey} />
      </Content>
      <Footer className='layout-footer'>
        <Space>&copy; {new Date().getFullYear()} Pro React Admin</Space>
      </Footer>
    </Layout>
  )
}

export default ProContent
