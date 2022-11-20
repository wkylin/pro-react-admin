import React from 'react'
// import React, { useEffect, useState } from 'react'
import { Layout, Space, Dropdown, Switch } from 'antd'
import { UserOutlined, LogoutOutlined, GithubOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons'
// import Icon, { UserOutlined, LogoutOutlined, SettingOutlined, GithubOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
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

  const items = [
    {
      key: '1',
      label: <Space>个人中心</Space>,
      icon: <UserOutlined />,
      onClick: () => {
        redirectTo('/profile')
      },
    },
    {
      key: '2',
      label: <Space>个人设置</Space>,
      icon: <SmileOutlined />,
      onClick: () => {
        redirectTo('/setting')
      },
    },
    {
      key: '3',
      label: <Space>退出登录</Space>,
      icon: <LogoutOutlined />,
      onClick: () => {
        redirectTo('/signin')
      },
    },
  ]

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
            />
            <GithubOutlined style={{ fontSize: 18 }} onClick={redirectGithub} />
          </Space>
          <Dropdown
            arrow
            menu={{
              items,
            }}
          >
            <Space>
              wkylin.w
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  )
}

export default ProHeader
