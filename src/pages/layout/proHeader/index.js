import React, { useEffect, useState } from 'react'
// import React from 'react'
import { Layout, Space, Dropdown, Menu, Tag, Switch } from 'antd'
import Icon, { UserOutlined, LogoutOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import PrimaryNav from '../primaryNav'
import LightSvg from '@assets/svg/light.svg'
import DarkSvg from '@assets/svg/dark.svg'
import darkVars from '@src/theme/dark.json'
import lightVars from '@src/theme/light.json'
import less from 'less'

import styles from './index.module.less'

const ProHeader = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }
  const [theme, setTheme] = useState(localStorage.getItem('theme-name') || 'light')

  const [themeApplied, setThemeApplied] = useState(false)

  const [vars, setVars] = useState(localStorage.getItem('app-theme') === 'dark' ? darkVars : lightVars)

  useEffect(() => {
    less
      .modifyVars(vars)
      .then(() => {
        setThemeApplied(true)
      })
      .catch((error) => {
        console.log('error:', error)
        // message.error(`Failed to update theme`)
      })
  }, [theme, vars])

  const changeTheme = (checked) => {
    const modifyVars = checked ? lightVars : darkVars
    localStorage.setItem('theme-name', checked ? 'light' : 'dark')

    setTheme(checked ? 'light' : 'dark')
    setVars(modifyVars)
  }

  if (!themeApplied) {
    return <div>Loading...</div>
  }
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo} onClick={() => redirectTo('/')}>
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
              defaultChecked
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
