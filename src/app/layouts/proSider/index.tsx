import PropTypes from 'prop-types'
import { useState } from 'react'
import { Avatar, Dropdown, Layout, type MenuProps } from 'antd'
import {
  LogoutOutlined,
  MoreOutlined,
  NotificationOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { selectIsMobile, useAppStore, useApplicationScope } from '@app/model'
import type { ComponentProps, FC, ReactNode } from 'react'
import type { LayoutSlots } from '../types'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@platform/auth/hooks/useAuth'
import { authService } from '@platform/auth/services/authService'
import { readEnterpriseSession } from '@platform/auth/model/session'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'

import styles from './index.module.less'

interface ProSiderProps {
  children?: ReactNode
  theme?: ComponentProps<typeof Layout.Sider>['theme']
  slots?: LayoutSlots
  onMenuClick?: () => void
}

const ProSider: FC<ProSiderProps> = ({ children, theme = 'light', slots, onMenuClick }) => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen)
  const isMobile = useAppStore(selectIsMobile)
  const { user, isAuthenticated } = useAuth()
  const { redirectTo } = useSafeNavigate()
  const { t } = useTranslation()
  const isBuiltInEnterpriseProject = useApplicationScope().projectId === 'enterprise'
  const enterpriseSession = isAuthenticated ? readEnterpriseSession() : null
  const isEnterpriseProject = isBuiltInEnterpriseProject || Boolean(enterpriseSession)
  const profileName = user?.name || user?.login || t('header.account')
  const profileEmail = user?.email || user?.login || t('header.signIn')
  const navigateFromAccount = (path: string) => {
    if (isMobile) onMenuClick?.()
    void redirectTo(path)
  }
  const accountMenuItems: MenuProps['items'] = isAuthenticated
    ? [
        ...(enterpriseSession
          ? [{ key: 'authenticator', label: t('menu.authenticator'), icon: <SafetyCertificateOutlined /> }]
          : []),
        ...(!isEnterpriseProject
          ? [
              { key: 'profile', label: t('header.userCenter'), icon: <UserOutlined /> },
              { key: 'settings', label: t('header.userSettings'), icon: <SettingOutlined /> },
            ]
          : []),
        { key: 'notifications', label: t('header.notifications'), icon: <NotificationOutlined /> },
        { type: 'divider' },
        { key: 'logout', label: t('header.logout'), icon: <LogoutOutlined /> },
      ]
    : [{ key: 'signin', label: t('header.signIn'), icon: <UserOutlined /> }]

  const handleAccountMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'profile') navigateFromAccount('/profile')
    if (key === 'settings') navigateFromAccount('/setting')
    if (key === 'notifications') navigateFromAccount('/notifications')
    if (key === 'authenticator') navigateFromAccount('/account/security')
    if (key === 'signin') navigateFromAccount('/signin')
    if (key === 'logout') {
      if (isMobile) onMenuClick?.()
      authService.logout()
    }
  }

  const profileTrigger = (
    <button
      type="button"
      className={styles.accountTrigger}
      aria-label={`${profileName}, ${profileEmail}`}
      aria-haspopup="menu"
      aria-expanded={accountMenuOpen}
      title={profileEmail}
    >
      <Avatar
        size={28}
        src={user?.avatar_url || undefined}
        icon={<UserOutlined aria-hidden="true" style={{ fontSize: 14 }} />}
        className={styles.accountAvatar}
      />
      <span className={styles.accountCopy}>
        <span className={styles.accountName}>{profileName}</span>
        <span className={styles.accountEmail}>{profileEmail}</span>
      </span>
      <span className={styles.accountMore} aria-hidden="true">
        <MoreOutlined />
      </span>
    </button>
  )

  return (
    <Layout.Sider
      width={208}
      collapsedWidth={80}
      theme={theme}
      collapsible
      collapsed={!isMobile && !isSidebarOpen}
      trigger={null}
      className={styles.sider}
      style={isMobile ? { height: '100%' } : undefined}
    >
      {slots?.siderStart}
      {children}
      {slots?.siderEnd}
      <div className={styles.accountDock}>
        <Dropdown
          menu={{ items: accountMenuItems, onClick: handleAccountMenuClick }}
          placement="rightBottom"
          trigger={['click']}
          onOpenChange={setAccountMenuOpen}
          popupRender={(menu) => (
            <div className={styles.accountDropdown}>
              {isAuthenticated ? (
                <div className={styles.accountDropdownHeader}>
                  <Avatar
                    size={36}
                    src={user?.avatar_url || undefined}
                    icon={<UserOutlined aria-hidden="true" style={{ fontSize: 18 }} />}
                    className={styles.accountAvatar}
                  />
                  <span className={styles.accountCopy}>
                    <span className={styles.accountName}>{profileName}</span>
                    <span className={styles.accountEmail}>{profileEmail}</span>
                  </span>
                </div>
              ) : null}
              {menu}
            </div>
          )}
        >
          {profileTrigger}
        </Dropdown>
      </div>
    </Layout.Sider>
  )
}

ProSider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOf(['light', 'dark']),
  slots: PropTypes.object,
  onMenuClick: PropTypes.func,
}

export default ProSider
