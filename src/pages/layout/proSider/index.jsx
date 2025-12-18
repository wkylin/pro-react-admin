import React from 'react'
import PropTypes from 'prop-types'
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
        <button
          type="button"
          className={styles.proLink}
          aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
          onClick={() => onCollapse(!collapsed)}
        >
          {collapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: '16px', color: '#08c', cursor: 'pointer' }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: '18px', color: '#08c', cursor: 'pointer' }} />
          )}
        </button>
      )}
    </Layout.Sider>
  )
}

ProSider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string,
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default ProSider
