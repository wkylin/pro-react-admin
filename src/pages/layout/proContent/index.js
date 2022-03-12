import React, { useState, useEffect, useRef } from 'react'
import { Layout, BackTop } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { getKeyName } from '@utils/publicFn'
import { ProTabProvider } from '@hooks/proTabsContext'
import ProBreadcrumb from './breadcrumb'
import ProTabs from '../proTabs'
import styles from './index.module.less'

const { Content, Header, Footer } = Layout
// const { Content, Footer } = Layout

const noNewTab = ['/signin', '/signup']

const ProContent = () => {
  const [tabActiveKey, setTabActiveKey] = useState('home')
  const [panesItem, setPanesItem] = useState({
    title: '',
    content: null,
    key: '',
    closable: false,
    path: '',
  })

  const pathRef = useRef('')
  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  useEffect(() => {
    // 未登录
    // if (!token && pathname !== '/signin') {
    //   navigate('signin', { replace: true })
    //   return
    // }

    const { tabKey, title, element } = getKeyName(pathname)
    if (pathname === pathRef.current || noNewTab.includes(pathname)) {
      setTabActiveKey(tabKey)
    }

    const newPath = search ? pathname + search : pathname
    pathRef.current = newPath

    setPanesItem({
      title,
      content: element,
      key: tabKey,
      closable: tabKey !== '/',
      path: newPath,
    })
    setTabActiveKey(tabKey)
  }, [pathname, navigate, search])

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <ProBreadcrumb />
      </Header>
      <Content className={styles.content}>
        <ProTabProvider>
          <ProTabs defaultActiveKey="home" panesItem={panesItem} tabActiveKey={tabActiveKey} />
        </ProTabProvider>
      </Content>
      <Footer className={styles.footer}>
        <BackTop target={() => document.querySelector('#container')}>
          <VerticalAlignTopOutlined style={{ fontSize: 20 }} />
        </BackTop>
        <div>&copy; 2020-{new Date().getFullYear()} 上海麒麟科技有限公司</div>
      </Footer>
    </Layout>
  )
}

export default ProContent
