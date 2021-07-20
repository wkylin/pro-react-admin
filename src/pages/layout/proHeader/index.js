import React from 'react'

import { Layout, Space, Dropdown, Menu, Tag } from 'antd'
import { UserOutlined, LogoutOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import PrimaryNav from '../primaryNav'

import styles from './index.module.less'

const ProHeader = () => {
  const history = useHistory()
  const redirectTo = (path) => {
    history.push(path)
  }
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo} onClick={() => redirectTo('/')}>
        Pro React <Tag color="cyan">{process.env.DEPLOYED_ENV}</Tag>
      </div>
      <div className={styles.headerMeta}>
        <div className={styles.headerMenu}>
          <PrimaryNav />
        </div>
        <div className={styles.headerRight}>
          <Space direction="horizontal" style={{ cursor: 'pointer', paddingRight: 8 }}>
            <BellOutlined style={{ fontSize: 18 }} />
          </Space>
          <Dropdown
            arrow
            overlay={
              <Menu>
                <Menu.Item key="1" icon={<UserOutlined />} onClick={() => redirectTo('/profile')}>
                  个人中心
                </Menu.Item>
                <Menu.Item key="2" icon={<SettingOutlined />} onClick={() => redirectTo('/setting')}>
                  个人设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => redirectTo('/signin')}>
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
