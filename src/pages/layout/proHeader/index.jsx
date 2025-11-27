import React from 'react'
import LightSvg from '@assets/svg/light.svg'
import DarkSvg from '@assets/svg/dark.svg'
import { useProThemeContext } from '@src/theme/hooks'
import { Layout, Space, Dropdown, theme, Avatar, message, Tooltip, Button } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  GithubOutlined,
  DownOutlined,
  SmileOutlined,
  SettingOutlined,
  MenuOutlined,
  MoreOutlined,
  RocketOutlined,
  BookOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { removeLocalStorage, getLocalStorage } from '@utils/publicFn'
import LanguageSwitcher from '@stateless/LanguageSwitcher'
import GradientAnimationText from '@stateless/GradientAnimation'
import avatarPng from '@assets/images/w.png'
// import WikiSvg from '@assets/svg/wikipedia.svg'
// import RocketSvg from '@assets/svg/rocket.svg'

import Logo from '@assets/images/pro-logo.png'
import SoundBar from '@stateless/SoundBar'
import NotificationDropdown from '@stateless/NotificationDropdown'

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

  const tokenValue = getLocalStorage('token')?.token || 'wkylin.w'
  const items = [
    {
      key: 'token',
      label: <>{tokenValue}</>,
      disabled: true,
    },
    { type: 'divider' },
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
      icon: <BookOutlined style={{ fontSize: 16 }} />,
      onClick: redirectWiki,
    },
    {
      key: 'wrapped',
      label: 'Wrapped',
      icon: <RocketOutlined style={{ fontSize: 16 }} />,
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
  const { themeSettings, updateSettings } = useProThemeContext()
  const isDark = themeSettings.themeMode === 'dark'

  const handleThemeToggle = () => {
    updateSettings({ themeMode: isDark ? 'light' : 'dark' })
  }

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
              <NotificationDropdown />
              <GithubOutlined style={{ fontSize: 16 }} onClick={redirectGithub} />
              <Fullscreen />
              <Tooltip title={isDark ? '明亮模式' : '暗黑模式'} placement="bottom">
                <Button
                  onClick={handleThemeToggle}
                  size="small"
                  style={{ margin: '0 4px', fontSize: 16 }}
                  icon={
                    isDark ? (
                      <LightSvg style={{ fontSize: 16, color: '#fadb14' }} />
                    ) : (
                      <DarkSvg style={{ fontSize: 16, color: '#222' }} />
                    )
                  }
                />
              </Tooltip>
              <Tooltip title="主题设置" placement="bottom">
                <Button icon={<SettingOutlined />} size="small" onClick={onSettingClick} style={{ fontSize: 16 }} />
              </Tooltip>
              <Tooltip title="GitHub Wrapped" placement="bottom">
                <Button icon={<RocketOutlined style={{ fontSize: 16 }} />} size="small" onClick={redirectWrapped} />
              </Tooltip>
              <Tooltip title="DeepWiki" placement="bottom">
                <Button icon={<BookOutlined style={{ fontSize: 16 }} />} size="small" onClick={redirectWiki} />
              </Tooltip>
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
            {isAuthenticated && user ? (
              <Avatar src={user.avatar_url} />
            ) : (
              <Avatar src={<img draggable={false} src={avatarPng} alt="avatar" />} />
            )}
          </Dropdown>
        </div>
        {contextHolder}
      </div>
    </Layout.Header>
  )
}

export default ProHeader
