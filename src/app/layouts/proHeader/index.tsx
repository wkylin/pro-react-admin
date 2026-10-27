import React, { type CSSProperties, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import PropTypes from 'prop-types'
import LightIcon from '@assets/svg/light.svg'
import DarkIcon from '@assets/svg/dark.svg'
import { useProThemeContext } from '@src/theme/hooks'
import { Layout, Space, Dropdown, theme, Avatar, message, Tooltip, Button, Tag, type MenuProps } from 'antd'
import { showMessage } from '@platform/feedback/message'
import GlobalSearch from '@layouts/proHeader/components/GlobalSearch'
import AnimatedIcon from '@wui/AnimatedIcon'
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
  ApartmentOutlined,
  CheckOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { useNavigate, type NavigateFunction } from 'react-router-dom'
import { removeLocalStorage, getLocalStorage } from '@shared/lib/publicFn'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@stateless/LanguageSwitcher'
import GradientAnimationText from '@stateless/GradientAnimation'

import Logo from '@assets/images/pro-logo.png'
import SoundBar from '@stateless/SoundBar'
import { ModuleAction, ModuleActions, useModuleActions } from '@platform/modules'

import { useAuth } from '@platform/auth/hooks/useAuth'
import { authService } from '@platform/auth/services/authService'
import { getSessionIdentity, readEnterpriseSession, type EnterpriseSession } from '@platform/auth/model/session'
import { listEnterpriseTenants, switchEnterpriseTenant, type EnterpriseTenant } from '@platform/auth/api/enterprise'
import { permissionService } from '@platform/auth/services/permissionService'
import { getEnv } from '@platform/config/env'
import { HashRouterUtils } from '@platform/navigation/hashRouter'
import PrimaryNav, { usePrimaryNavItems } from '../primaryNav'
import styles from './index.module.less'
import Fullscreen from '../fullscreen'
import { selectIsMobile, useAppStore, useApplicationScope } from '@app/model'
import type { GitHubUser } from '@platform/auth/services/authService'
import type { TFunction } from 'i18next'
import type { LayoutSlots } from '../types'

type HeaderLayout = string
type HeaderMenuItems = NonNullable<MenuProps['items']>
type LastDeniedRef = { current: string | null }
type SearchOpenSetter = Dispatch<SetStateAction<boolean>>
type MessageApi = ReturnType<typeof message.useMessage>[0]

interface ProHeaderProps {
  layout?: HeaderLayout
  slots?: LayoutSlots
  onSettingClick?: () => void
  children?: ReactNode
  onMobileMenuClick?: () => void
}

interface HeaderActionsProps {
  t: TFunction
  iconButtonStyle: CSSProperties
  isEnterpriseProject: boolean
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

const DENIED_TIP = '您没有权限访问该页面'
type TenantMenuState = {
  identity: string
  status: 'loading' | 'ready' | 'error'
  tenants: EnterpriseTenant[]
}
const HEADER_ACTION_BUTTON_STYLE: CSSProperties = {
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 24px',
  width: 24,
  height: 24,
  minWidth: 24,
  minHeight: 24,
  padding: 0,
  fontSize: 16,
}

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
    if (getEnv('NODE_ENV') === 'development') {
      console.warn('[ProHeader] messageApi.open failed', err)
    }
    try {
      await Promise.resolve(showMessage.error(DENIED_TIP))
    } catch (err2) {
      if (getEnv('NODE_ENV') === 'development') {
        console.warn('[ProHeader] notify denied failed', err2)
      }
    }
  }
}

const buildUserMenuItems = ({
  t,
  tokenValue,
  isEnterpriseProject,
  enterpriseSession,
  tenantMenuState,
  switchingTenant,
}: {
  t: TFunction
  tokenValue: string
  isEnterpriseProject: boolean
  enterpriseSession: EnterpriseSession | null
  tenantMenuState: TenantMenuState | null
  switchingTenant: boolean
}): HeaderMenuItems => {
  const identity = enterpriseSession ? `tenant:${enterpriseSession.tenantId}|token:${enterpriseSession.token}` : ''
  const state = tenantMenuState?.identity === identity ? tenantMenuState : null
  const tenantItems: HeaderMenuItems =
    state?.status === 'ready'
      ? state.tenants.map((tenant) => ({
          key: `tenant:${tenant.id}`,
          label: (
            <span className={styles.tenantOption}>
              <span>{tenant.name}</span>
              <span className={styles.tenantOptionId}>{tenant.id}</span>
            </span>
          ),
          icon: tenant.id === enterpriseSession?.tenantId ? <CheckOutlined /> : undefined,
          disabled: switchingTenant || tenant.id === enterpriseSession?.tenantId,
        }))
      : [
          state?.status === 'error'
            ? { key: 'tenant-retry', label: t('identity.retryTenants'), icon: <ReloadOutlined /> }
            : { key: 'tenant-loading', label: t('identity.loadingTenants'), disabled: true },
        ]

  return [
    { key: 'token', label: <span className={styles.menuUserName}>{tokenValue}</span>, disabled: true },
    { type: 'divider' },
    ...(enterpriseSession
      ? [
          {
            key: 'authenticator',
            label: t('menu.authenticator'),
            icon: <SafetyCertificateOutlined />,
          } as HeaderMenuItems[number],
          {
            key: 'tenants',
            label: t('identity.switchTenant'),
            icon: <ApartmentOutlined />,
            children: tenantItems,
          } as HeaderMenuItems[number],
        ]
      : []),
    ...(!isEnterpriseProject
      ? [
          { key: '1', label: t('header.userCenter'), icon: <UserOutlined /> },
          { key: '2', label: t('header.userSettings'), icon: <SmileOutlined /> },
          { key: '3', label: t('header.contactMe'), icon: <SmileOutlined /> },
        ]
      : []),
    { key: '4', label: t('header.logout'), icon: <LogoutOutlined />, disabled: switchingTenant },
  ]
}

const buildMobileMoreItems = ({
  t,
  moduleActions,
  primaryNavItems,
  isEnterpriseProject,
  onSettingClick,
  redirectGithub,
  redirectWiki,
  redirectWrapped,
}: {
  t: TFunction
  moduleActions: ReturnType<typeof useModuleActions>
  primaryNavItems: ReturnType<typeof usePrimaryNavItems>
  isEnterpriseProject: boolean
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
  ...moduleActions.map((definition) => ({
    key: `module:${definition.id}`,
    label: <ModuleAction moduleId={definition.id} placement="mobile" />,
    icon: null,
    onClick: undefined,
  })),
  ...(!isEnterpriseProject
    ? [
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
      ]
    : []),
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
    if (getEnv('NODE_ENV') === 'development') {
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
  } catch {
    // 出错时保守处理为不跳转并显示提示

    await safeNotifyDeniedOnce({ path: normalizedPath, lastDeniedRef, messageApi })
  }
}

const renderMobileMenuTrigger = (
  isMobile: boolean,
  onMobileMenuClick: (() => void) | undefined,
  label: string
): ReactNode => {
  if (!isMobile) return null
  return (
    <button
      type="button"
      aria-label={label}
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

const renderThemeToggleAction = (t: TFunction, isDark: boolean, handleThemeToggle: () => void): ReactNode => (
  <Tooltip title={isDark ? t('header.themeLight') : t('header.themeDark')} placement="bottom">
    <Button
      aria-label={isDark ? t('header.themeLight') : t('header.themeDark')}
      aria-pressed={isDark}
      onClick={handleThemeToggle}
      size="small"
      style={HEADER_ACTION_BUTTON_STYLE}
      icon={
        <AnimatedIcon variant="spin" mode="hover">
          {isDark ? <LightIcon /> : <DarkIcon />}
        </AnimatedIcon>
      }
    />
  </Tooltip>
)

const renderDesktopActions = ({
  t,
  iconButtonStyle,
  isEnterpriseProject,
  isDark,
  handleThemeToggle,
  onSettingClick,
  redirectGithub,
  redirectWiki,
  redirectWrapped,
  setSearchOpen,
}: HeaderActionsProps) => (
  <Space className={styles.headerActions} orientation="horizontal" align="center" size={8} style={{ paddingRight: 8 }}>
    {!isEnterpriseProject && <SoundBar iconColor={undefined} buttonStyle={{ ...iconButtonStyle, border: 'none' }} />}
    <Tooltip title={t('header.searchTooltip')} placement="bottom">
      <Button
        aria-label={t('header.searchTooltip')}
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

    <ModuleActions placement="header" buttonStyle={iconButtonStyle} />
    {!isEnterpriseProject && (
      <Tooltip title={t('header.github')} placement="bottom">
        <Button
          aria-label={t('header.github')}
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
    )}
    <Fullscreen buttonStyle={iconButtonStyle} />
    {renderThemeToggleAction(t, isDark, handleThemeToggle)}
    <Tooltip title={t('header.preferences')} placement="bottom">
      <Button
        aria-label={t('header.preferences')}
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
    {!isEnterpriseProject && (
      <Tooltip title={t('header.wrappedTooltip')} placement="bottom">
        <Button
          aria-label={t('header.wrappedTooltip')}
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
    )}
    {!isEnterpriseProject && (
      <Tooltip title={t('header.wiki')} placement="bottom">
        <Button
          aria-label={t('header.wiki')}
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
    )}
    <LanguageSwitcher buttonStyle={iconButtonStyle} />
  </Space>
)

const renderMobileActions = ({
  t,
  iconButtonStyle,
  isTopDarkHeader,
  isDark,
  handleThemeToggle,
  mobileMoreItems,
  setSearchOpen,
}: HeaderActionsProps) => (
  <Space className={styles.headerActions} align="center" size={8}>
    <Tooltip title={t('header.search')}>
      <Button
        aria-label={t('header.searchTooltip')}
        icon={
          <AnimatedIcon variant="spin" mode="hover">
            <SearchOutlined style={{ color: isTopDarkHeader ? '#fff' : undefined }} />
          </AnimatedIcon>
        }
        size="small"
        style={iconButtonStyle}
        onClick={() => setSearchOpen(true)}
      />
    </Tooltip>
    {renderThemeToggleAction(t, isDark, handleThemeToggle)}
    <Dropdown menu={{ items: mobileMoreItems }} trigger={['click']}>
      <Button
        aria-label={t('header.moreActions')}
        size="small"
        style={iconButtonStyle}
        icon={
          <AnimatedIcon variant="spin" mode="hover">
            <MoreOutlined style={{ color: isTopDarkHeader ? '#fff' : undefined }} />
          </AnimatedIcon>
        }
      />
    </Dropdown>
  </Space>
)

const renderHeaderActions = (isMobile: boolean, props: HeaderActionsProps) =>
  isMobile ? renderMobileActions(props) : renderDesktopActions(props)

const renderUserTrigger = (t: TFunction, isAuthenticated: boolean, user: GitHubUser | null) =>
  isAuthenticated && user ? (
    <Button type="text" shape="circle" aria-label={user.name || user.login} className={styles.userTrigger}>
      <Avatar
        size={40}
        src={user.avatar_url || undefined}
        icon={
          <AnimatedIcon variant="spin" mode="hover">
            <UserOutlined style={{ fontSize: 20 }} />
          </AnimatedIcon>
        }
      />
    </Button>
  ) : (
    <Button
      icon={
        <AnimatedIcon variant="spin" mode="hover">
          <UserOutlined style={{ fontSize: 20 }} />
        </AnimatedIcon>
      }
      type="default"
      shape="circle"
      aria-label={t('header.account')}
      title={t('header.account')}
      className={styles.userTrigger}
    />
  )

const ProHeader = ({ layout, slots, onSettingClick, children, onMobileMenuClick }: ProHeaderProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isEnterpriseProject = useApplicationScope().projectId === 'enterprise'
  const [messageApi, contextHolder] = message.useMessage()
  const lastDeniedRef = React.useRef<string | null>(null)
  const primaryNavItems = usePrimaryNavItems()
  const moduleActions = useModuleActions()

  const redirectTo = React.useCallback(
    (path: string) => redirectToWithPermission({ path, navigate, messageApi, lastDeniedRef }),
    [navigate, messageApi]
  )

  const redirectGithub = React.useCallback(
    () => window.open('https://github.com/wkylin/pro-react-admin', '_blank', 'noopener'),
    []
  )

  const redirectWrapped = React.useCallback(() => window.open('https://git-wrapped.com/', '_blank', 'noopener'), [])
  const redirectWiki = React.useCallback(
    () => window.open('https://deepwiki.com/wkylin/pro-react-admin', '_blank', 'noopener'),
    []
  )

  const { isAuthenticated, user } = useAuth()
  const enterpriseSession = isAuthenticated ? readEnterpriseSession() : null
  const sessionIdentity = enterpriseSession
    ? `tenant:${enterpriseSession.tenantId}|token:${enterpriseSession.token}`
    : ''
  const hasEnterpriseSession = Boolean(enterpriseSession)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)
  const [tenantMenuState, setTenantMenuState] = React.useState<TenantMenuState | null>(null)
  const [tenantRefresh, setTenantRefresh] = React.useState(0)
  const [switchingTenant, setSwitchingTenant] = React.useState(false)

  React.useEffect(() => {
    if (!userMenuOpen || !hasEnterpriseSession) return
    let cancelled = false
    const controller = new AbortController()
    setTenantMenuState({ identity: sessionIdentity, status: 'loading', tenants: [] })
    void listEnterpriseTenants(controller.signal).then(
      (tenants) => {
        if (!cancelled && getSessionIdentity() === sessionIdentity)
          setTenantMenuState({ identity: sessionIdentity, status: 'ready', tenants })
      },
      () => {
        if (!cancelled && getSessionIdentity() === sessionIdentity)
          setTenantMenuState({ identity: sessionIdentity, status: 'error', tenants: [] })
      }
    )
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [userMenuOpen, hasEnterpriseSession, sessionIdentity, tenantRefresh])

  const storedToken = getLocalStorage<{ token?: string }>('token')
  const tokenValue =
    user?.name ||
    (typeof storedToken === 'object' && storedToken !== null ? storedToken.token || 'wkylin.w' : 'wkylin.w')
  const items = buildUserMenuItems({
    t,
    tokenValue,
    isEnterpriseProject,
    enterpriseSession,
    tenantMenuState,
    switchingTenant,
  })

  const mobileMoreItems = React.useMemo(
    () =>
      buildMobileMoreItems({
        t,
        moduleActions,
        primaryNavItems,
        isEnterpriseProject,
        onSettingClick,
        redirectGithub,
        redirectWiki,
        redirectWrapped,
      }),
    [
      t,
      moduleActions,
      primaryNavItems,
      isEnterpriseProject,
      onSettingClick,
      redirectGithub,
      redirectWiki,
      redirectWrapped,
    ]
  )

  const handleUserMenuClick = React.useCallback(
    ({ key }: { key: string }) => {
      if (key === 'tenant-retry') {
        setTenantRefresh((count) => count + 1)
        return
      }
      if (key.startsWith('tenant:') && enterpriseSession && !switchingTenant) {
        const nextTenantId = key.slice('tenant:'.length)
        if (nextTenantId === enterpriseSession.tenantId) return
        setSwitchingTenant(true)
        void (async () => {
          try {
            const nextSession = await switchEnterpriseTenant(nextTenantId)
            if (getSessionIdentity() !== sessionIdentity) {
              void messageApi.warning(t('identity.sessionChanged'))
              return
            }
            await authService.setEnterpriseAuthenticated(nextSession)
            navigate('/', { replace: true })
          } catch {
            void messageApi.error(t('identity.switchFailed'))
          } finally {
            setSwitchingTenant(false)
          }
        })()
        return
      }
      if (key === '1') {
        redirectTo('/profile')
        return
      }
      if (key === 'authenticator') {
        redirectTo('/account/security')
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
    [redirectTo, isAuthenticated, user, enterpriseSession, switchingTenant, sessionIdentity, messageApi, t, navigate]
  )

  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken()
  const { themeSettings, resolvedTheme, updateSettings } = useProThemeContext()
  const isDark = resolvedTheme === 'dark'
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

  const iconButtonStyle = HEADER_ACTION_BUTTON_STYLE

  const isMobile = useAppStore(selectIsMobile)

  return (
    <Layout.Header
      className={styles.header}
      style={{
        backgroundColor: headerBackground,
        borderBottom: headerBorder,
        padding: isMobile ? '0 16px' : 0,
      }}
    >
      {renderMobileMenuTrigger(isMobile, onMobileMenuClick, t('header.openMenu'))}
      <button
        type="button"
        className={`${styles.logo} ${layout === 'top' ? styles.topLayoutLogo : ''}`}
        onClick={() => redirectTo('/')}
        aria-label={t('header.home')}
        style={isMobile ? { flex: '0 0 28px', padding: 0, justifyContent: 'center' } : undefined}
      >
        <img src={Logo} alt="" style={isMobile ? { marginRight: 0 } : undefined} />
        {!isMobile && (
          <GradientAnimationText text="Pro React Admin" surface={isDark || isTopDarkHeader ? 'dark' : 'light'} />
        )}
      </button>
      <div className={styles.headerMeta} style={isMobile ? { justifyContent: 'flex-end' } : {}}>
        {slots?.headerStart}
        {renderDesktopNav(isMobile, layout, children)}
        <div className={styles.headerRight} style={isMobile ? { flex: 1 } : {}}>
          {renderHeaderActions(isMobile, {
            iconButtonStyle,
            t,
            isEnterpriseProject,
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
          <Dropdown
            arrow
            menu={{ items, onClick: handleUserMenuClick }}
            trigger={['click']}
            onOpenChange={setUserMenuOpen}
          >
            {renderUserTrigger(t, isAuthenticated, user)}
          </Dropdown>
          {!isMobile && enterpriseSession && (
            <Tag className={styles.tenantTag} title={`${t('identity.tenant')}: ${enterpriseSession.tenantId}`}>
              {enterpriseSession.tenantId}
            </Tag>
          )}
          {/* 全局搜索弹窗 */}
          <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={redirectTo} />
        </div>
        {slots?.headerEnd}
        {contextHolder}
      </div>
    </Layout.Header>
  )
}

ProHeader.propTypes = {
  layout: PropTypes.string,
  onSettingClick: PropTypes.func,
  children: PropTypes.node,
  slots: PropTypes.object,
  // `isMobile` 由全局 Zustand 管理，组件直接读取，不再通过 props 传入
  onMobileMenuClick: PropTypes.func,
}

export default ProHeader
