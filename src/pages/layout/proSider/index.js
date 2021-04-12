import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

import styles from './index.module.less'

const ProSider = () => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout.Sider
      width={208}
      collapsedWidth={80}
      theme="dark"
      collapsible
      collapsed={collapsed}
      trigger={null}
      className={styles.sider}
    >
      <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} theme="dark" className={styles.menu}>
        <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="sub nav 1">
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" icon={<LaptopOutlined />} title="sub nav 2">
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub3" icon={<NotificationOutlined />} title="sub nav 3">
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </Menu.SubMenu>
      </Menu>
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
