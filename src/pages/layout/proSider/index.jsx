import React, { useState } from 'react'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import styles from './index.module.less'

const ProSider = ({ children, theme = 'light' }) => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout.Sider
      width={208}
      collapsedWidth={80}
      theme={theme}
      collapsible
      collapsed={collapsed}
      trigger={null}
      className={styles.sider}
    >
      {children}
      <div className={styles.proLink} onClick={onCollapse} role="button">
        {collapsed ? (
          <MenuUnfoldOutlined style={{ fontSize: '16px', color: '#08c', cursor: 'pointer' }} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: '18px', color: '#08c', cursor: 'pointer' }} />
        )}
      </div>
    </Layout.Sider>
  )
}

export default ProSider
