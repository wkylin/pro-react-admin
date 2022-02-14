import React, { useEffect } from 'react'
import { Layout, Space, Dropdown, Menu, Tag, Switch } from 'antd'
import Icon, { UserOutlined, LogoutOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import PrimaryNav from '../primaryNav'
import LightSvg from '@assets/svg/light.svg'
import DarkSvg from '@assets/svg/dark.svg'

import styles from './index.module.less'

const ProHeader = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }
  const { switcher, themes, currentTheme } = useThemeSwitcher()

  useEffect(() => {
    switcher({ theme: themes[localStorage.getItem('antd-theme') ? localStorage.getItem('theme') : 'light'] })
  }, [currentTheme, switcher, themes])

  const changeTheme = (checked) => {
    switcher({ theme: checked ? themes.light : themes.dark })
    localStorage.setItem('antd-theme', checked ? 'light' : 'dark')
  }
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo} role="logo" onClick={() => redirectTo('/')}>
        Pro React <Tag>{process.env.DEPLOYED_ENV}</Tag>
      </div>
      <div className={styles.headerMeta}>
        <div className={styles.headerMenu}>
          <PrimaryNav />
        </div>
        <div className={styles.headerRight}>
          <Space direction="horizontal" style={{ cursor: 'pointer', paddingRight: 8 }}>
            <Switch
              checkedChildren={<Icon component={LightSvg} />}
              unCheckedChildren={<Icon component={DarkSvg} />}
              defaultChecked={currentTheme === 'light'}
              onClick={changeTheme}
            />
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
