import React, { useState } from 'react'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import styles from './index.module.less'

const ProSider = (props) => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout.Sider
      width={208}
      collapsedWidth={80}
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      className={styles.sider}
    >
      {props.children}
      <div className={styles.proLink} onClick={onCollapse}>
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
