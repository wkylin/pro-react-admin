import React from 'react'
import PropTypes from 'prop-types'
import LightIcon from '@assets/svg/light.svg'
import DarkIcon from '@assets/svg/dark.svg'
import { useProThemeContext } from '@src/theme/hooks'
import { Layout, Space, Dropdown, theme, Avatar, message, Tooltip, Button } from 'antd'
import GlobalSearch from '@src/components/GlobalSearch'
import {
  UserOutlined,
  LogoutOutlined,
  GithubOutlined,
  SmileOutlined,
  SettingOutlined,
  MenuOutlined,
  MoreOutlined,
  RocketOutlined,
  BookOutlined,
  SearchOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { removeLocalStorage, getLocalStorage } from '@utils/publicFn'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@stateless/LanguageSwitcher'
import GradientAnimationText from '@stateless/GradientAnimation'

import Logo from '@assets/images/pro-logo.png'
import SoundBar from '@stateless/SoundBar'
import NotificationDrawer from '@stateless/NotificationDrawer'

import { useAuth } from '@src/service/useAuth'
import { authService } from '@src/service/authService'
import { permissionService } from '@src/service/permissionService'
import PrimaryNav, { usePrimaryNavItems } from '../primaryNav'
import styles from './index.module.less'
import Fullscreen from '../fullscreen'
import { useStore } from '@/store'

const DENIED_TIP = '您没有权限访问该页面'

const safeNotifyDeniedOnce = async ({ path, lastDeniedRef, messageApi }) => {
  if (!path) return
  if (lastDeniedRef?.current === path) return
  if (lastDeniedRef) lastDeniedRef.current = path

  try {
    await Promise.resolve(messageApi.open({ type: 'error', content: DENIED_TIP }))
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ProHeader] messageApi.open failed', err)
    }
    try {
      await Promise.resolve(message.error(DENIED_TIP))
    } catch (err2) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[ProHeader] notify denied failed', err2)
      }
    }
  }
}

const buildUserMenuItems = ({ t, tokenValue, isAuthenticated, user, redirectTo }) => [
  {
    key: 'token',
    label: <>{tokenValue}</>,
    disabled: true
  },
  { type: 'divider' },
  {
    key: '1',
    label: <Space>{t('header.userCenter')}</Space>,
    icon: <UserOutlined />,
    onClick: () => {
      redirectTo('/profile')
    }
  },
  {
    key: '2',
    label: <Space>{t('header.userSettings')}</Space>,
    icon: <SmileOutlined />,
    onClick: () => {
      redirectTo('/setting')
    }
  },
  {
    key: '3',
    label: <Space>{t('header.contactMe')}</Space>,
    icon: <SmileOutlined />,
    onClick: () => {
      redirectTo('/contact')
    }
  },
  {
    key: '4',
    label: <Space>{t('header.logout')}</Space>,
    icon: <LogoutOutlined />,
    onClick: () => {
      if (isAuthenticated && user) {
        authService.logout()
        return
      }

      safeLogoutCleanup()
      removeLocalStorage('token')
      redirectTo('/signin')
    }
  }
]

const buildMobileMoreItems = ({
  t,
  primaryNavItems,
  onSettingClick,
  redirectGithub,
  redirectWiki,
  redirectWrapped
}) => [
  ...(Array.isArray(primaryNavItems) ? primaryNavItems : []).map((it) => ({
    ...it,
    label: it?.i18nKey ? t(it.i18nKey) : it?.label
  })),
  { type: 'divider' },
  {
    key: 'notification',
    label: <NotificationDrawer />,
    icon: null,
    onClick: undefined
  },
  {
    key: 'github',
    label: t('header.github'),
    icon: <GithubOutlined style={{ fontSize: 16 }} />,
    onClick: redirectGithub
  },
  {
    key: 'wiki',
    label: t('header.wiki'),
    icon: <BookOutlined style={{ fontSize: 16 }} />,
    onClick: redirectWiki
  },
  {
    key: 'wrapped',
    label: t('header.wrapped'),
    icon: <RocketOutlined style={{ fontSize: 16 }} />,
    onClick: redirectWrapped
  },
  {
    key: 'setting',
    label: t('header.preferences'),
    icon: <SettingOutlined style={{ fontSize: 16 }} />,
    onClick: onSettingClick
  }
]

const safeLogoutCleanup = () => {
  try {
    // 兼容“测试账号登录”(仅 token) 的登出路径，确保权限缓存被清理
    permissionService.logoutCleanup()
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ProHeader] logoutCleanup failed', err)
    }
  }
}

const redirectToWithPermission = async ({ path, navigate, messageApi, lastDeniedRef }) => {
  // 公共页面直接跳转
  if (!path || path === '/signin' || path === '/signup' || path === '/') {
    navigate(path)
    return
  }

  try {
    const ok = await permissionService.canAccessRoute(path, false)
    if (!ok) {
      await safeNotifyDeniedOnce({ path, lastDeniedRef, messageApi })
      return
    }
    navigate(path)
  } catch (error) {
    // 出错时保守处理为不跳转并显示提示

    console.error('redirect permission check failed', error)
    await safeNotifyDeniedOnce({ path, lastDeniedRef, messageApi })
  }
}

const renderMobileMenuTrigger = (isMobile, onMobileMenuClick) => {
  if (!isMobile) return null
  return (
    <button
      type='button'
      onClick={onMobileMenuClick}
      style={{
        margin: '0 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        border: 'none',
        padding: 0
      }}
    >
      <MenuOutlined style={{ fontSize: 20 }} />
    </button>
  )
}

const renderDesktopNav = (isMobile, layout, children) => {
  if (isMobile) return null
  return (
    <div className={styles.headerMenu} style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
      <PrimaryNav layout={layout} />
      {layout === 'top' && <div style={{ flex: 1, minWidth: 0 }}>{children}</div>}
    </div>
  )
}

const renderDesktopActions = ({
  t,
  iconButtonStyle,
  isDark,
  handleThemeToggle,
  onSettingClick,
  redirectGithub,
  redirectWiki,
  redirectWrapped,
  setSearchOpen
}) => (
  <Space orientation='horizontal' style={{ paddingRight: 8 }}>
    <SoundBar buttonStyle={{ border: 'none' }} />
    <Tooltip title={t('header.searchTooltip')} placement='bottom'>
      <Button icon={<SearchOutlined />} size='small' style={iconButtonStyle} onClick={() => setSearchOpen(true)} />
    </Tooltip>

    <NotificationDrawer variant='button' buttonStyle={iconButtonStyle} />
    <Tooltip title={t('header.github')} placement='bottom'>
      <Button
        icon={<GithubOutlined style={{ fontSize: 16 }} />}
        size='small'
        type='default'
        onClick={redirectGithub}
        style={iconButtonStyle}
      />
    </Tooltip>
    <Fullscreen buttonStyle={iconButtonStyle} />
    <Tooltip title={isDark ? t('header.themeLight') : t('header.themeDark')} placement='bottom'>
      <Button
        onClick={handleThemeToggle}
        size='small'
        style={{ margin: '0 4px', fontSize: 16 }}
        icon={
          isDark
            ? (
              <LightIcon width={16} height={16} style={{ width: 16, height: 16 }} />
              )
            : (
              <DarkIcon width={16} height={16} style={{ width: 16, height: 16 }} />
              )
        }
      />
    </Tooltip>
    <Tooltip title={t('header.preferences')} placement='bottom'>
      <Button icon={<SettingOutlined />} size='small' onClick={onSettingClick} style={iconButtonStyle} />
    </Tooltip>
    <Tooltip title={t('header.wrappedTooltip')} placement='bottom'>
      <Button
        icon={<RocketOutlined style={{ fontSize: 16 }} />}
        size='small'
        onClick={redirectWrapped}
        style={iconButtonStyle}
      />
    </Tooltip>
    <Tooltip title={t('header.wiki')} placement='bottom'>
      <Button
        icon={<BookOutlined style={{ fontSize: 16 }} />}
        size='small'
        onClick={redirectWiki}
        style={iconButtonStyle}
      />
    </Tooltip>
    <LanguageSwitcher />
  </Space>
)

const renderMobileActions = ({ t, isTopDarkHeader, isDark, handleThemeToggle, mobileMoreItems, setSearchOpen }) => (
  <Space>
    <Tooltip title={t('header.search')}>
      <Button
        icon={<SearchOutlined style={{ color: isTopDarkHeader ? '#fff' : undefined }} />}
        size='small'
        style={{ fontSize: 18 }}
        onClick={() => setSearchOpen(true)}
      />
    </Tooltip>
    <Tooltip title={isDark ? t('header.themeLight') : t('header.themeDark')} placement='bottom'>
      <Button
        onClick={handleThemeToggle}
        size='small'
        style={{ margin: '0 4px', fontSize: 16 }}
        icon={
          isDark
            ? (
              <LightIcon width={16} height={16} style={{ width: 16, height: 16 }} />
              )
            : (
              <DarkIcon width={16} height={16} style={{ width: 16, height: 16 }} />
              )
        }
      />
    </Tooltip>
    <Dropdown menu={{ items: mobileMoreItems }} trigger={['click']}>
      <MoreOutlined
        style={{
          fontSize: 20,
          cursor: 'pointer',
          color: isTopDarkHeader ? '#fff' : undefined
        }}
      />
    </Dropdown>
  </Space>
)

const renderHeaderActions = (isMobile, props) => (isMobile ? renderMobileActions(props) : renderDesktopActions(props))

const renderUserTrigger = (isAuthenticated, user, iconButtonStyle) =>
  isAuthenticated && user
    ? (
      <Avatar src={user.avatar_url || undefined} icon={<UserOutlined style={{ fontSize: 16 }} />} />
      )
    : (
      <Button icon={<UserOutlined style={{ fontSize: 16 }} />} type='default' shape='round' style={iconButtonStyle} />
      )

const ProHeader = ({ layout, onSettingClick, children, onMobileMenuClick }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const lastDeniedRef = React.useRef(null)
  const primaryNavItems = usePrimaryNavItems()

  const redirectTo = React.useCallback(
    (path) => redirectToWithPermission({ path, navigate, messageApi, lastDeniedRef }),
    [navigate, messageApi]
  )

  const redirectGithub = () => {
    window.open('https://github.com/wkylin/pro-react-admin', '_blank', 'noopener')
  }

  const redirectWrapped = () => {
    window.open('https://git-wrapped.com/', '_blank', 'noopener')
  }
  const redirectWiki = () => {
    window.open('https://deepwiki.com/wkylin/pro-react-admin', '_blank', 'noopener')
  }

  const { isAuthenticated, user } = useAuth()

  const tokenValue = getLocalStorage('token')?.token || 'wkylin.w'
  const items = React.useMemo(
    () => buildUserMenuItems({ t, tokenValue, isAuthenticated, user, redirectTo }),
    [t, tokenValue, isAuthenticated, user, redirectTo]
  )

  const mobileMoreItems = React.useMemo(
    () =>
      buildMobileMoreItems({
        t,
        primaryNavItems,
        onSettingClick,
        redirectGithub,
        redirectWiki,
        redirectWrapped
      }),
    [t, primaryNavItems, onSettingClick]
  )

  const {
    token: { colorBgContainer, colorBorder }
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

  const isMobile = useStore((s) => s.isMobile)

  return (
    <Layout.Header
      className={styles.header}
      style={{
        backgroundColor: headerBackground,
        borderBottom: headerBorder,
        padding: isMobile ? '0 16px' : 0
      }}
    >
      {renderMobileMenuTrigger(isMobile, onMobileMenuClick)}
      <div
        aria-hidden='true'
        className={`${styles.logo} ${layout === 'top' ? styles.topLayoutLogo : ''}`}
        onClick={() => redirectTo('/')}
        style={isMobile ? { flex: '0 0 auto', justifyContent: 'flex-start' } : {}}
      >
        {/* Pro React <Tag>{process.env.DEPLOYED_ENV}</Tag> */}
        {!isMobile && <img src={Logo} alt='logo' />}
        <GradientAnimationText text='Pro React Admin' />
      </div>
      <div className={styles.headerMeta} style={isMobile ? { justifyContent: 'flex-end' } : {}}>
        {renderDesktopNav(isMobile, layout, children)}
        <div className={styles.headerRight} style={isMobile ? { flex: 1 } : {}}>
          {renderHeaderActions(isMobile, {
            iconButtonStyle,
            t,
            isTopDarkHeader,
            isDark,
            handleThemeToggle,
            onSettingClick,
            redirectGithub,
            redirectWiki,
            redirectWrapped,
            mobileMoreItems,
            setSearchOpen
          })}
          <Dropdown arrow menu={{ items }} trigger={['click']}>
            {renderUserTrigger(isAuthenticated, user, iconButtonStyle)}
          </Dropdown>
          {/* 全局搜索弹窗 */}
          <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={redirectTo} />
        </div>
        {contextHolder}
      </div>
    </Layout.Header>
  )
}

ProHeader.propTypes = {
  layout: PropTypes.string,
  onSettingClick: PropTypes.func,
  children: PropTypes.node,
  // `isMobile` 由全局 Zustand 管理，组件直接读取，不再通过 props 传入
  onMobileMenuClick: PropTypes.func
}

export default ProHeader
