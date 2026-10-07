import React, { type CSSProperties, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import PropTypes from 'prop-types'
import LightIcon from '@assets/svg/light.svg'
import DarkIcon from '@assets/svg/dark.svg'
import { useProThemeContext } from '@src/theme/hooks'
import { Layout, Space, Dropdown, theme, Avatar, message, Tooltip, Button, type MenuProps } from 'antd'
import GlobalSearch from '@src/components/GlobalSearch'
import AnimatedIcon from '@stateless/AnimatedIcon'
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
  SearchOutlined,
} from '@ant-design/icons'
import { useNavigate, type NavigateFunction } from 'react-router-dom'
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
import { HashRouterUtils } from '@src/utils/hashRouter'
import PrimaryNav, { usePrimaryNavItems } from '../primaryNav'
import styles from './index.module.less'
import Fullscreen from '../fullscreen'
import { useStore } from '@/store'
import type { StoreState } from '@/store/types'
import type { GitHubUser } from '@src/service/authService'
import type { TFunction } from 'i18next'

type HeaderLayout = string
type HeaderMenuItems = NonNullable<MenuProps['items']>
type LastDeniedRef = { current: string | null }
type SearchOpenSetter = Dispatch<SetStateAction<boolean>>
type MessageApi = ReturnType<typeof message.useMessage>[0]

interface ProHeaderProps {
  layout?: HeaderLayout
  onSettingClick?: () => void
  children?: ReactNode
  onMobileMenuClick?: () => void
}

interface HeaderActionsProps {
  t: TFunction
  iconButtonStyle: CSSProperties
  isTopDarkHeader: boolean
  isDark: boolean
  handleThemeToggle: () => void
  onSettingClick?: () => void
  redirectGithub: () => void
  redirectWiki: () => void
  redirectWrapped: () => void
  mobileMoreItems: HeaderMenuItems
  setSearchOpen: SearchOpenSetter
}

/**
 * 安全获取 store 状态
 */
const useSafeStore = <T,>(selector: (state: StoreState) => T, defaultValue: T): T => {
  try {
    return useStore(selector) ?? defaultValue
  } catch (error) {
    console.error('ProHeader store access error:', error)
    return defaultValue
  }
}

const DENIED_TIP = '您没有权限访问该页面'

const safeNotifyDeniedOnce = async ({
  path,
  lastDeniedRef,
  messageApi,
}: {
  path: string
  lastDeniedRef: LastDeniedRef
  messageApi: MessageApi
}): Promise<void> => {
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

const buildUserMenuItems = ({ t, tokenValue }: { t: TFunction; tokenValue: string }): HeaderMenuItems => [
  {
    key: 'token',
    label: <>{tokenValue}</>,
    disabled: true,
  },
  { type: 'divider' },
  {
    key: '1',
    label: <Space>{t('header.userCenter')}</Space>,
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <UserOutlined />
      </AnimatedIcon>
    ),
  },

  {
    key: '2',
    label: <Space>{t('header.userSettings')}</Space>,
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <SmileOutlined />
      </AnimatedIcon>
    ),
  },
  {
    key: '3',
    label: <Space>{t('header.contactMe')}</Space>,
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <SmileOutlined />
      </AnimatedIcon>
    ),
  },
  {
    key: '4',
    label: <Space>{t('header.logout')}</Space>,
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <LogoutOutlined />
      </AnimatedIcon>
    ),
  },
]

const buildMobileMoreItems = ({
  t,
  primaryNavItems,
  onSettingClick,
  redirectGithub,
  redirectWiki,
  redirectWrapped,
}: {
  t: TFunction
  primaryNavItems: ReturnType<typeof usePrimaryNavItems>
  onSettingClick?: () => void
  redirectGithub: () => void
  redirectWiki: () => void
  redirectWrapped: () => void
}): HeaderMenuItems => [
  ...(Array.isArray(primaryNavItems) ? primaryNavItems : []).map((it) => ({
    ...it,
    label: it?.i18nKey ? t(it.i18nKey) : it?.label,
  })),
  { type: 'divider' },
  {
    key: 'notification',
    label: <NotificationDrawer iconColor={undefined} buttonStyle={undefined} />,
    icon: null,
    onClick: undefined,
  },
  {
    key: 'github',
    label: t('header.github'),
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <GithubOutlined style={{ fontSize: 16 }} />
      </AnimatedIcon>
    ),
    onClick: redirectGithub,
  },
  {
    key: 'wiki',
    label: t('header.wiki'),
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <BookOutlined style={{ fontSize: 16 }} />
      </AnimatedIcon>
    ),
    onClick: redirectWiki,
  },
  {
    key: 'wrapped',
    label: t('header.wrapped'),
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <RocketOutlined style={{ fontSize: 16 }} />
      </AnimatedIcon>
    ),
    onClick: redirectWrapped,
  },
  {
    key: 'setting',
    label: t('header.preferences'),
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <SettingOutlined style={{ fontSize: 16 }} />
      </AnimatedIcon>
    ),
    onClick: onSettingClick,
  },
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

const redirectToWithPermission = async ({
  path,
  navigate,
  messageApi,
  lastDeniedRef,
}: {
  path: string
  navigate: NavigateFunction
  messageApi: MessageApi
  lastDeniedRef: LastDeniedRef
}): Promise<void> => {
  // 公共页面直接跳转
  const normalizedPath = HashRouterUtils.toPathString(path)
  if (!normalizedPath || normalizedPath === '/signin' || normalizedPath === '/signup' || normalizedPath === '/') {
    navigate(normalizedPath || '/')
    return
  }

  try {
    const ok = await permissionService.canAccessRoute(normalizedPath, false)
    if (!ok) {
      await safeNotifyDeniedOnce({ path: normalizedPath, lastDeniedRef, messageApi })
      return
    }
    navigate(normalizedPath)
  } catch (error) {
    // 出错时保守处理为不跳转并显示提示

    await safeNotifyDeniedOnce({ path: normalizedPath, lastDeniedRef, messageApi })
  }
}

const renderMobileMenuTrigger = (isMobile: boolean, onMobileMenuClick?: () => void): ReactNode => {
  if (!isMobile) return null
  return (
    <button
      type="button"
      onClick={onMobileMenuClick}
      style={{
        margin: '0 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        border: 'none',
        padding: 0,
      }}
    >
      <AnimatedIcon variant="spin" mode="hover">
        <MenuOutlined style={{ fontSize: 20 }} />
      </AnimatedIcon>
    </button>
  )
}

const renderDesktopNav = (isMobile: boolean, layout: HeaderLayout | undefined, children: ReactNode): ReactNode => {
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
  setSearchOpen,
}: HeaderActionsProps) => (
  <Space orientation="horizontal" style={{ paddingRight: 8 }}>
    <SoundBar iconColor={undefined} buttonStyle={{ border: 'none' }} />
    <Tooltip title={t('header.searchTooltip')} placement="bottom">
      <Button
        icon={
          <AnimatedIcon variant="spin" mode="hover">
            <SearchOutlined />
          </AnimatedIcon>
        }
        size="small"
        style={iconButtonStyle}
        onClick={() => setSearchOpen(true)}
      />
    </Tooltip>

    <NotificationDrawer iconColor={undefined} variant="button" buttonStyle={iconButtonStyle} />
    <Tooltip title={t('header.github')} placement="bottom">
      <Button
        icon={
          <AnimatedIcon variant="spin" mode="hover">
            <GithubOutlined style={{ fontSize: 16 }} />
          </AnimatedIcon>
        }
        size="small"
        type="default"
        onClick={redirectGithub}
        style={iconButtonStyle}
      />
    </Tooltip>
    <Fullscreen buttonStyle={iconButtonStyle} />
    <Tooltip title={isDark ? t('header.themeLight') : t('header.themeDark')} placement="bottom">
      <Button
        onClick={handleThemeToggle}
        size="small"
        style={{ margin: '0 4px', fontSize: 16 }}
        icon={
          isDark ? (
            <span style={{ display: 'inline-flex', width: 16, height: 16 }}>
              <LightIcon />
            </span>
          ) : (
            <span style={{ display: 'inline-flex', width: 16, height: 16 }}>
              <DarkIcon />
            </span>
          )
        }
      />
    </Tooltip>
    <Tooltip title={t('header.preferences')} placement="bottom">
      <Button
        icon={
          <AnimatedIcon variant="spin" mode="hover">
            <SettingOutlined />
          </AnimatedIcon>
        }
        size="small"
        onClick={onSettingClick}
        style={iconButtonStyle}
      />
    </Tooltip>
    <Tooltip title={t('header.wrappedTooltip')} placement="bottom">
      <Button
        icon={
          <AnimatedIcon variant="spin" mode="hover">
            <RocketOutlined style={{ fontSize: 16 }} />
          </AnimatedIcon>
        }
        size="small"
        onClick={redirectWrapped}
        style={iconButtonStyle}
      />
    </Tooltip>
    <Tooltip title={t('header.wiki')} placement="bottom">
      <Button
        icon={
          <AnimatedIcon variant="spin" mode="hover">
            <BookOutlined style={{ fontSize: 16 }} />
          </AnimatedIcon>
        }
        size="small"
        onClick={redirectWiki}
        style={iconButtonStyle}
      />
    </Tooltip>
    <LanguageSwitcher />
  </Space>
)

const renderMobileActions = ({
  t,
  isTopDarkHeader,
  isDark,
  handleThemeToggle,
  mobileMoreItems,
  setSearchOpen,
}: HeaderActionsProps) => (
  <Space>
    <Tooltip title={t('header.search')}>
      <Button
        icon={
          <AnimatedIcon variant="spin" mode="hover">
            <SearchOutlined style={{ color: isTopDarkHeader ? '#fff' : undefined }} />
          </AnimatedIcon>
        }
        size="small"
        style={{ fontSize: 18 }}
        onClick={() => setSearchOpen(true)}
      />
    </Tooltip>
    <Tooltip title={isDark ? t('header.themeLight') : t('header.themeDark')} placement="bottom">
      <Button
        onClick={handleThemeToggle}
        size="small"
        style={{ margin: '0 4px', fontSize: 16 }}
        icon={
          isDark ? (
            <span style={{ display: 'inline-flex', width: 16, height: 16 }}>
              <LightIcon />
            </span>
          ) : (
            <span style={{ display: 'inline-flex', width: 16, height: 16 }}>
              <DarkIcon />
            </span>
          )
        }
      />
    </Tooltip>
    <Dropdown menu={{ items: mobileMoreItems }} trigger={['click']}>
      <AnimatedIcon variant="spin" mode="hover">
        <MoreOutlined
          style={{
            fontSize: 20,
            cursor: 'pointer',
            color: isTopDarkHeader ? '#fff' : undefined,
          }}
        />
      </AnimatedIcon>
    </Dropdown>
  </Space>
)

const renderHeaderActions = (isMobile: boolean, props: HeaderActionsProps) =>
  isMobile ? renderMobileActions(props) : renderDesktopActions(props)

const renderUserTrigger = (isAuthenticated: boolean, user: GitHubUser | null, iconButtonStyle: CSSProperties) =>
  isAuthenticated && user ? (
    <Avatar
      src={user.avatar_url || undefined}
      icon={
        <AnimatedIcon variant="spin" mode="hover">
          <UserOutlined style={{ fontSize: 16 }} />
        </AnimatedIcon>
      }
    />
  ) : (
    <Button
      icon={
        <AnimatedIcon variant="spin" mode="hover">
          <UserOutlined style={{ fontSize: 16 }} />
        </AnimatedIcon>
      }
      type="default"
      shape="round"
      style={iconButtonStyle}
    />
  )

const ProHeader = ({ layout, onSettingClick, children, onMobileMenuClick }: ProHeaderProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const lastDeniedRef = React.useRef<string | null>(null)
  const primaryNavItems = usePrimaryNavItems()

  const redirectTo = React.useCallback(
    (path: string) => redirectToWithPermission({ path, navigate, messageApi, lastDeniedRef }),
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

  const storedToken = getLocalStorage<{ token?: string }>('token')
  const tokenValue =
    typeof storedToken === 'object' && storedToken !== null ? storedToken.token || 'wkylin.w' : 'wkylin.w'
  const items = React.useMemo(() => buildUserMenuItems({ t, tokenValue }), [t, tokenValue])

  const mobileMoreItems = React.useMemo(
    () =>
      buildMobileMoreItems({
        t,
        primaryNavItems,
        onSettingClick,
        redirectGithub,
        redirectWiki,
        redirectWrapped,
      }),
    [t, primaryNavItems, onSettingClick, redirectGithub, redirectWiki, redirectWrapped]
  )

  const handleUserMenuClick = React.useCallback(
    ({ key }: { key: string }) => {
      if (key === '1') {
        redirectTo('/profile')
        return
      }
      if (key === '2') {
        redirectTo('/setting')
        return
      }
      if (key === '3') {
        redirectTo('/contact')
        return
      }
      if (key === '4') {
        if (isAuthenticated && user) {
          authService.logout()
          return
        }

        safeLogoutCleanup()
        removeLocalStorage('token')
        redirectTo('/signin')
      }
    },
    [redirectTo, isAuthenticated, user]
  )

  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken()
  const { themeSettings, updateSettings } = useProThemeContext()
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = themeSettings.themeMode === 'dark' || (themeSettings.themeMode === 'system' && prefersDark)
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
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const iconButtonStyle = React.useMemo<CSSProperties>(() => ({ fontSize: 16 }), [])

  const isMobile = useSafeStore((s) => s.isMobile, false)

  return (
    <Layout.Header
      className={styles.header}
      style={{
        backgroundColor: headerBackground,
        borderBottom: headerBorder,
        padding: isMobile ? '0 16px' : 0,
      }}
    >
      {renderMobileMenuTrigger(isMobile, onMobileMenuClick)}
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
            setSearchOpen,
          })}
          <Dropdown arrow menu={{ items, onClick: handleUserMenuClick }} trigger={['click']}>
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
  onMobileMenuClick: PropTypes.func,
}

export default ProHeader
