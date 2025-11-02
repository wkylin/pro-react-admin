import React from 'react'
import { Layout, Space, Dropdown, Switch, theme, Avatar } from 'antd'
import { UserOutlined, LogoutOutlined, GithubOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons'
// import Icon, { UserOutlined, LogoutOutlined, SettingOutlined, GithubOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { removeLocalStorage } from '@utils/publicFn'
import LanguageSwitcher from '@stateless/LanguageSwitcher'
import GradientAnimationText from '@stateless/GradientAnimation'
// import { ReactComponent as LightSvg } from '@assets/svg/light.svg'
// import { ReactComponent as DarkSvg } from '@assets/svg/dark.svg'
// import LightSvg from '@assets/svg/light.svg'
// import DarkSvg from '@assets/svg/dark.svg'
import WikiSvg from '@assets/svg/wikipedia.svg'
import RocketSvg from '@assets/svg/rocket.svg'

import Logo from '@assets/images/pro-logo.png'
import SoundBar from '@stateless/SoundBar'

import { useProThemeContext } from '@theme/hooks'

import { useAuth } from '@src/service/useAuth'
import { authService } from '@src/service/authService'
import { getLocalStorage } from '@utils/publicFn'
import PrimaryNav from '../primaryNav'
import styles from './index.module.less'
import Fullscreen from '../fullscreen'

const ProHeader = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }

  const redirectGithub = () => {
    window.open('https://github.com/wkylin/pro-react-admin', '_blank')
  }

  const redirectWrapped = () => {
    window.open('https://www.githubwrapped.io/wkylin', '_blank')
  }
  const redirectWiki = () => {
    window.open('https://deepwiki.com/wkylin/pro-react-admin', '_blank')
  }

  const { isAuthenticated, user, isLoading } = useAuth()

  const handleLogout = () => {
    authService.logout()
    removeLocalStorage('token')
    redirectTo('/signin')
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
      label: <Space>联 系 我</Space>,
      icon: <SmileOutlined />,
      onClick: () => {
        redirectTo('/contact')
      },
    },
    {
      key: '4',
      label: <Space>退出登录</Space>,
      icon: <LogoutOutlined />,
      onClick: () => {
        if (isAuthenticated && user) {
          authService.logout()
        } else {
          removeLocalStorage('token')
          redirectTo('/signin')
        }
      },
    },
  ]

  const { myTheme, setMyTheme } = useProThemeContext()

  const setAntdTheme = () => {
    setMyTheme(myTheme === 'light' ? 'dark' : 'light')
  }

  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken()

  return (
    <Layout.Header
      className={styles.header}
      style={{
        background: colorBgContainer,
        borderBottom: `1px solid ${colorBorder}`,
      }}
    >
      <div aria-hidden="true" className={styles.logo} onClick={() => redirectTo('/')}>
        {/* Pro React <Tag>{process.env.DEPLOYED_ENV}</Tag> */}
        <img src={Logo} alt="logo" />
        <GradientAnimationText text="Pro React Admin" />
      </div>
      <div className={styles.headerMeta}>
        <div className={styles.headerMenu}>
          <PrimaryNav />
        </div>
        <div className={styles.headerRight}>
          <Space direction="horizontal" style={{ cursor: 'pointer', paddingRight: 8 }}>
            <SoundBar />
            <Switch
              // checkedChildren={<Icon component={LightSvg} />}
              // unCheckedChildren={<Icon component={DarkSvg} />}
              onClick={setAntdTheme}
            />
            <GithubOutlined style={{ fontSize: 16 }} onClick={redirectGithub} />
            <Fullscreen />
            <RocketSvg style={{ fontSize: 16 }} onClick={redirectWrapped} />
            <WikiSvg style={{ fontSize: 16 }} onClick={redirectWiki} />
            <LanguageSwitcher />
          </Space>

          <Dropdown
            arrow
            menu={{
              items,
            }}
          >
            <Space>
              {isAuthenticated && user ? (
                <>
                  <Avatar src={user.avatar_url} /> <span>{user.name || user.login}</span>
                </>
              ) : (
                <span style={{ fontSize: 18 }}>{getLocalStorage('token')?.token || 'wkylin.w'}</span>
              )}
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  )
}

export default ProHeader
