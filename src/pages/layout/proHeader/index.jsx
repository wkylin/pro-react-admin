import React from 'react'
// import React, { useEffect, useState } from 'react'
import { Layout, Space, Dropdown, Menu, Switch } from 'antd'
import { UserOutlined, LogoutOutlined, SettingOutlined, GithubOutlined } from '@ant-design/icons'
// import Icon, { UserOutlined, LogoutOutlined, SettingOutlined, GithubOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useThemeSwitcher } from 'react-css-theme-switcher'
// import { ReactComponent as LightSvg } from '@assets/svg/light.svg'
// import { ReactComponent as DarkSvg } from '@assets/svg/dark.svg'
// import LightSvg from '@assets/svg/light.svg'
// import DarkSvg from '@assets/svg/dark.svg'

import PrimaryNav from '../primaryNav'

import styles from './index.module.less'

const ProHeader = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }

  const redirectGithub = () => {
    window.open('https://github.com/wkylin/promotion-web', '_blank')
  }

  const { switcher, themes, currentTheme } = useThemeSwitcher()

  const changeTheme = (checked) => {
    switcher({ theme: checked ? themes.light : themes.dark })
  }
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo} role="button" onClick={() => redirectTo('/')}>
        {/* Pro React <Tag>{process.env.DEPLOYED_ENV}</Tag> */}
        Pro React
      </div>
      <div className={styles.headerMeta}>
        <div className={styles.headerMenu}>
          <PrimaryNav />
        </div>
        <div className={styles.headerRight}>
          <Space direction="horizontal" style={{ cursor: 'pointer', paddingRight: 8 }}>
            <Switch
              // checkedChildren={<Icon component={LightSvg} />}
              // unCheckedChildren={<Icon component={DarkSvg} />}
              defaultChecked={currentTheme === 'light'}
              onClick={changeTheme}
            />
            <GithubOutlined style={{ fontSize: 18 }} onClick={redirectGithub} />
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
              <span>wkylin.w</span>
            </Space>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  )
}

export default ProHeader
