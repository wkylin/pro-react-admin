import React, { useState } from 'react'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import styles from './index.module.less'

const ProSider = ({ children, theme = 'light', collapsed, onCollapse, isMobile }) => {
  return (
    <Layout.Sider
      width={208}
      collapsedWidth={80}
      theme={theme}
      collapsible
      collapsed={collapsed}
      trigger={null}
      className={styles.sider}
      style={isMobile ? { height: '100%' } : undefined}
    >
      {children}
      {!isMobile && (
        <div className={styles.proLink} onClick={() => onCollapse(!collapsed)} role="button">
          {collapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: '16px', color: '#08c', cursor: 'pointer' }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: '18px', color: '#08c', cursor: 'pointer' }} />
          )}
        </div>
      )}
    </Layout.Sider>
  )
}

export default ProSider
