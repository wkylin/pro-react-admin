import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useStore } from '@/store'

import styles from './index.module.less'

const ProSider = ({ children, theme = 'light' }) => {
  const isSidebarOpen = useStore((s) => s.isSidebarOpen)
  const toggleSidebar = useStore((s) => s.toggleSidebar)
  const isMobile = useStore((s) => s.isMobile)

  return (
    <Layout.Sider
      width={208}
      collapsedWidth={80}
      theme={theme}
      collapsible
      collapsed={!isMobile && !isSidebarOpen}
      trigger={null}
      className={styles.sider}
      style={isMobile ? { height: '100%' } : undefined}
    >
      {children}
      {!isMobile ? (
        <button
          type="button"
          className={styles.proLink}
          aria-label={isSidebarOpen ? '收起侧边栏' : '展开侧边栏'}
          onClick={() => toggleSidebar()}
        >
          {isSidebarOpen ? (
            <MenuFoldOutlined style={{ fontSize: '18px', color: '#08c', cursor: 'pointer' }} />
          ) : (
            <MenuUnfoldOutlined style={{ fontSize: '16px', color: '#08c', cursor: 'pointer' }} />
          )}
        </button>
      ) : (
        <Button type="link">Pro React Admin</Button>
      )}
    </Layout.Sider>
  )
}

ProSider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string,
  // `isMobile` 由全局 Zustand 管理，组件直接读取，不再通过 props 传入
  // 侧边栏折叠状态由全局 Zustand `isSidebarOpen` 管理
}

export default ProSider
