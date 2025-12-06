import React from 'react'
import LightIcon from '@assets/svg/light.svg'
import DarkIcon from '@assets/svg/dark.svg'
import { useProThemeContext } from '@src/theme/hooks'
import { Layout, Space, Dropdown, theme, Avatar, message, Tooltip, Button } from 'antd'
import GlobalSearch from '@src/components/GlobalSearch'
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
  SearchOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { removeLocalStorage } from '@utils/publicFn'
import LanguageSwitcher from '@stateless/LanguageSwitcher'
import GradientAnimationText from '@stateless/GradientAnimation'
import avatarPng from '@assets/images/w.png'

import Logo from '@assets/images/pro-logo.png'
import SoundBar from '@stateless/SoundBar'
import NotificationDrawer from '@stateless/NotificationDrawer'

import { useAuth } from '@src/service/useAuth'
import { authService } from '@src/service/authService'
import { permissionService } from '@src/service/permissionService'
import { getLocalStorage } from '@utils/publicFn'
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
      key: 'notification',
      label: <NotificationDrawer />,
      icon: null,
      onClick: undefined,
    },
    {
      key: 'github',
      label: 'Github',
      icon: <GithubOutlined style={{ fontSize: 16 }} />,
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
      label: '偏好设置',
      icon: <SettingOutlined style={{ fontSize: 16 }} />,
      onClick: onSettingClick,
    },
  ]

  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken()
  const { themeSettings, updateSettings } = useProThemeContext()
  const isDark = themeSettings.themeMode === 'dark'
  const effectiveNavTheme = isDark ? 'dark' : themeSettings.navTheme

  const isTopDarkHeader = layout === 'top' && effectiveNavTheme === 'dark'
  const headerBackground = isTopDarkHeader ? '#001529' : colorBgContainer
  const headerBorder = isTopDarkHeader ? '1px solid rgba(255, 255, 255, 0.12)' : `1px solid ${colorBorder}`

  const handleThemeToggle = () => {
    updateSettings({ themeMode: isDark ? 'light' : 'dark' })
  }

  // 全局搜索弹窗控制
  const [searchOpen, setSearchOpen] = React.useState(false)
  // 快捷键 ctrl+k/command+k 打开搜索
  React.useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const iconButtonStyle = React.useMemo(() => ({ fontSize: 16 }), [])

  return (
    <Layout.Header
      className={styles.header}
      style={{
        backgroundColor: headerBackground,
        borderBottom: headerBorder,
        padding: isMobile ? '0 16px' : 0,
      }}
    >
      {isMobile && (
        <div
          onClick={onMobileMenuClick}
          style={{ margin: '0 16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
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
        {!isMobile && <img src={Logo} alt="logo" />}
        <GradientAnimationText text="Pro React Admin" />
      </div>
      <div className={styles.headerMeta} style={isMobile ? { justifyContent: 'flex-end' } : {}}>
        {!isMobile && (
          <div className={styles.headerMenu} style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
            <PrimaryNav layout={layout} />
            {layout === 'top' && <div style={{ flex: 1, minWidth: 0 }}>{children}</div>}
          </div>
        )}
        <div className={styles.headerRight} style={isMobile ? { flex: 1 } : {}}>
          {!isMobile ? (
            <Space orientation="horizontal" style={{ paddingRight: 8 }}>
              <SoundBar buttonStyle={{ border: 'none' }} />
              {/* 全局搜索按钮 */}
              <Tooltip title="全局菜单搜索 (Ctrl+K)" placement="bottom">
                <Button
                  icon={<SearchOutlined />}
                  size="small"
                  style={iconButtonStyle}
                  onClick={() => setSearchOpen(true)}
                />
              </Tooltip>

              <NotificationDrawer variant="button" buttonStyle={iconButtonStyle} />
              <Tooltip title="GitHub" placement="bottom">
                <Button
                  icon={<GithubOutlined style={{ fontSize: 16 }} />}
                  size="small"
                  type="default"
                  onClick={redirectGithub}
                  style={iconButtonStyle}
                />
              </Tooltip>
              <Fullscreen buttonStyle={iconButtonStyle} />
              <Tooltip title={isDark ? '明亮模式' : '暗黑模式'} placement="bottom">
                <Button
                  onClick={handleThemeToggle}
                  size="small"
                  style={{ margin: '0 4px', fontSize: 16 }}
                  icon={
                    isDark ? (
                      <LightIcon width={16} height={16} style={{ width: 16, height: 16 }} />
                    ) : (
                      <DarkIcon width={16} height={16} style={{ width: 16, height: 16 }} />
                    )
                  }
                />
              </Tooltip>
              <Tooltip title="偏好设置" placement="bottom">
                <Button icon={<SettingOutlined />} size="small" onClick={onSettingClick} style={iconButtonStyle} />
              </Tooltip>
              <Tooltip title="GitHub Wrapped" placement="bottom">
                <Button
                  icon={<RocketOutlined style={{ fontSize: 16 }} />}
                  size="small"
                  onClick={redirectWrapped}
                  style={iconButtonStyle}
                />
              </Tooltip>
              <Tooltip title="DeepWiki" placement="bottom">
                <Button
                  icon={<BookOutlined style={{ fontSize: 16 }} />}
                  size="small"
                  onClick={redirectWiki}
                  style={iconButtonStyle}
                />
              </Tooltip>
              <LanguageSwitcher />
            </Space>
          ) : (
            <Space>
              {/* 移动端全局搜索按钮 */}
              <Tooltip title="菜单搜索">
                <Button
                  icon={<SearchOutlined style={{ color: isTopDarkHeader ? '#fff' : undefined }} />}
                  size="small"
                  style={{ fontSize: 18 }}
                  onClick={() => setSearchOpen(true)}
                />
              </Tooltip>
              <Tooltip title={isDark ? '明亮模式' : '暗黑模式'} placement="bottom">
                <Button
                  onClick={handleThemeToggle}
                  size="small"
                  style={{ margin: '0 4px', fontSize: 16 }}
                  icon={
                    isDark ? (
                      <LightIcon width={16} height={16} style={{ width: 16, height: 16 }} />
                    ) : (
                      <DarkIcon width={16} height={16} style={{ width: 16, height: 16 }} />
                    )
                  }
                />
              </Tooltip>
              <Dropdown menu={{ items: mobileMoreItems }} trigger={['click']}>
                <MoreOutlined
                  style={{ fontSize: 20, cursor: 'pointer', color: isTopDarkHeader ? '#fff' : undefined }}
                />
              </Dropdown>
            </Space>
          )}
          <Dropdown arrow menu={{ items }} trigger={['click']}>
            {isAuthenticated && user ? (
              <Avatar src={user.avatar_url} />
            ) : (
              <Button
                icon={<UserOutlined style={{ fontSize: 16 }} />}
                // size="small"
                type="default"
                shape="round"
                style={iconButtonStyle}
              />
            )}
          </Dropdown>
          {/* 全局搜索弹窗 */}
          <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={redirectTo} />
        </div>
        {contextHolder}
      </div>
    </Layout.Header>
  )
}

export default ProHeader
