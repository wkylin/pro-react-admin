import React, { useState, useEffect, useRef } from 'react'
import { Layout, BackTop } from 'antd'
// import { Outlet } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { getKeyName } from '@utils/publicFn'
import ProBreadcrumb from './breadcrumb'
import ProTabs from '../proTabs'
import styles from './index.module.less'

const { Content, Header, Footer } = Layout

const noNewTab = ['/signin'] // 不需要新建 tab的页面
// const noCheckAuth = ['/', '/403'] // 不需要检查权限的页面

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
    //   history.replace({ pathname: '/signin' })
    //   return
    // }

    const { tabKey, title, component: Content } = getKeyName(pathname)
    if (pathname === pathRef.current || noNewTab.includes(pathname)) {
      setTabActiveKey(tabKey)
    }

    const newPath = search ? pathname + search : pathname
    pathRef.current = newPath
    console.log('tabKey', tabKey)
    console.log('title', title)
    setPanesItem({
      title,
      content: Content,
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
      <Content className={styles.content} id="content">
        {`tabActiveKey: ${tabActiveKey}`}
        <br />
        {`panesItem: ${JSON.stringify(panesItem, null, 2)}`}
        <ProTabs defaultActiveKey="home" panesItem={panesItem} tabActiveKey={tabActiveKey} />
        {/* <Outlet /> */}
      </Content>
      <Footer className={styles.footer}>
        <BackTop target={() => document.querySelector('#content')}>
          <VerticalAlignTopOutlined style={{ fontSize: 20 }} />
        </BackTop>
        <div>&copy; 2020-{new Date().getFullYear()} 上海麒麟科技有限公司</div>
      </Footer>
    </Layout>
  )
}

export default ProContent
