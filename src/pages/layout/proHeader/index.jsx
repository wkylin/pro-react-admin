import React from 'react'
import { Layout, Space, Dropdown, theme, Avatar, message } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  GithubOutlined,
  DownOutlined,
  SmileOutlined,
  SettingOutlined,
  MenuOutlined,
  MoreOutlined,
} from '@ant-design/icons'
// import Icon, { UserOutlined, LogoutOutlined, SettingOutlined, GithubOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { removeLocalStorage, getLocalStorage } from '@utils/publicFn'
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

import { useAuth } from '@src/service/useAuth'
import { authService } from '@src/service/authService'
import { permissionService } from '@src/service/permissionService'
import PrimaryNav, { usePrimaryNavItems } from '../primaryNav'
import styles from './index.module.less'
import Fullscreen from '../fullscreen'

const ProHeader = ({ layout, onSettingClick, children, isMobile, onMobileMenuClick }) => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const lastDeniedRef = React.useRef(null)
  const primaryNavItems = usePrimaryNavItems()

  const redirectTo = async (path) => {
    // 公共页面直接跳转
    if (!path || path === '/signin' || path === '/signup' || path === '/') {
      navigate(path)
      return
    }

    try {
      const ok = await permissionService.canAccessRoute(path, false)
      if (!ok) {
        if (lastDeniedRef.current !== path) {
          lastDeniedRef.current = path
          try {
            messageApi.open({ type: 'error', content: '您没有权限访问该页面' })
          } catch (e) {
            try {
              message.error('您没有权限访问该页面')
            } catch (err) {}
          }
        }
        return
      }
      navigate(path)
    } catch (error) {
      console.error('redirect permission check failed', error)
      // 出错时保守处理为不跳转并显示提示
      if (lastDeniedRef.current !== path) {
        lastDeniedRef.current = path
        try {
          messageApi.open({ type: 'error', content: '您没有权限访问该页面' })
        } catch (e) {
          try {
            message.error('您没有权限访问该页面')
          } catch (err) {}
        }
      }
    }
  }

  const redirectGithub = () => {
    window.open('https://github.com/wkylin/pro-react-admin', '_blank')
  }

  const redirectWrapped = () => {
    window.open('https://git-wrapped.com/', '_blank')
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

  const mobileMoreItems = [
    ...primaryNavItems,
    { type: 'divider' },
    {
      key: 'github',
      label: 'Github',
      icon: <GithubOutlined />,
      onClick: redirectGithub,
    },
    {
      key: 'wiki',
      label: 'Wiki',
      icon: <WikiSvg style={{ fontSize: 16 }} />,
      onClick: redirectWiki,
    },
    {
      key: 'wrapped',
      label: 'Wrapped',
      icon: <RocketSvg style={{ fontSize: 16 }} />,
      onClick: redirectWrapped,
    },
    {
      key: 'setting',
      label: '设置',
      icon: <SettingOutlined />,
      onClick: onSettingClick,
    },
  ]

  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken()

  return (
    <Layout.Header
      className={styles.header}
      style={{
        background: colorBgContainer,
        borderBottom: `1px solid ${colorBorder}`,
        padding: isMobile ? '0 16px' : 0,
      }}
    >
      {isMobile && (
        <div
          onClick={onMobileMenuClick}
          style={{ marginRight: 16, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <MenuOutlined style={{ fontSize: 20 }} />
        </div>
      )}
      <div
        aria-hidden="true"
        className={`${styles.logo} ${layout === 'top' ? styles.topLayoutLogo : ''}`}
        onClick={() => redirectTo('/')}
        style={isMobile ? { flex: '0 0 auto', justifyContent: 'flex-start' } : {}}
      >
        {/* Pro React <Tag>{process.env.DEPLOYED_ENV}</Tag> */}
        <img src={Logo} alt="logo" />
        <GradientAnimationText text="Pro React Admin" />
      </div>
      <div className={styles.headerMeta} style={isMobile ? { justifyContent: 'flex-end' } : {}}>
        {!isMobile && (
          <div className={styles.headerMenu} style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
            <PrimaryNav />
            {layout === 'top' && <div style={{ flex: 1, minWidth: 0 }}>{children}</div>}
          </div>
        )}
        <div className={styles.headerRight} style={isMobile ? { flex: 1 } : {}}>
          {!isMobile ? (
            <Space orientation="horizontal" style={{ cursor: 'pointer', paddingRight: 8 }}>
              <SoundBar />
              <GithubOutlined style={{ fontSize: 16 }} onClick={redirectGithub} />
              <Fullscreen />
              <SettingOutlined style={{ fontSize: 16 }} onClick={onSettingClick} />
              <RocketSvg style={{ fontSize: 16 }} onClick={redirectWrapped} />
              <WikiSvg style={{ fontSize: 16 }} onClick={redirectWiki} />
              <LanguageSwitcher />
            </Space>
          ) : (
            <Space style={{ paddingRight: 8 }}>
              <Dropdown menu={{ items: mobileMoreItems }} trigger={['click']}>
                <MoreOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
              </Dropdown>
            </Space>
          )}

          <Dropdown
            arrow
            menu={{
              items,
            }}
          >
            <Space>
              {isAuthenticated && user ? (
                <>
                  <Avatar src={user.avatar_url} />{' '}
                  <span
                    style={{
                      maxWidth: isMobile ? 80 : 120,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  >
                    {user.name || user.login}
                  </span>
                </>
              ) : (
                <span style={{ fontSize: 18 }}>{getLocalStorage('token')?.token || 'wkylin.w'}</span>
              )}
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
        {contextHolder}
      </div>
    </Layout.Header>
  )
}

export default ProHeader
