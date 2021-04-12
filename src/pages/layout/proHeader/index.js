import React from 'react'

import { Layout, Space, Dropdown, Menu } from 'antd'
import { UserOutlined, LogoutOutlined, SettingOutlined, MailOutlined, BellOutlined } from '@ant-design/icons'

import styles from './index.module.less'

const ProHeader = () => {
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo}>促销中台</div>
      <div className={styles.headerMeta}>
        <div className={styles.headerMenu}>
          <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
            <Menu.Item key="mail" icon={<MailOutlined />}>
              Navigation One
            </Menu.Item>
            <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
          </Menu>
        </div>
        <div className={styles.headerRight}>
          <Space direction="horizontal" style={{ cursor: 'pointer', paddingRight: 8 }}>
            <BellOutlined style={{ fontSize: 18 }} />
          </Space>
          <Dropdown
            arrow
            overlay={
              <Menu>
                <Menu.Item key="1" icon={<UserOutlined />}>
                  个人中心
                </Menu.Item>
                <Menu.Item key="2" icon={<SettingOutlined />}>
                  个人设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" icon={<LogoutOutlined />}>
                  退出登录
                </Menu.Item>
              </Menu>
            }
          >
            <Space direction="horizontal" style={{ cursor: 'pointer' }}>
              <UserOutlined style={{ fontSize: 18 }} />
              <span>Admin</span>
            </Space>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  )
}

export default ProHeader
