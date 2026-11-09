import { useState } from 'react'
import { Alert, App, Avatar, Button, Result, Select, Skeleton, Space, Switch, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BusinessPage from '@shared/ui/BusinessPage'
import { useAuth } from '@platform/auth/hooks/useAuth'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { canAccessPath } from '@platform/auth/model/policy'
import { readEnterpriseSession } from '@platform/auth/model/session'
import type { GitHubUser } from '@platform/auth/services/authService'
import { useApplicationModules } from '@platform/modules'
import { useApplicationScope } from '@app/model'
import { useProThemeContext, type ThemeMode } from '@/theme/hooks'
import { createProfileDefaults, getProfileStorageKey, loadProfile, saveProfile, type ProfileValues } from './model'
import ProfileEditor from './ProfileEditor'
import styles from './index.module.less'

function safeAvatar(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname === 'avatars.githubusercontent.com' ? url.href : undefined
  } catch {
    return undefined
  }
}

function ProfileWorkspace({
  user,
  tenantId,
  userId,
  storageKey,
}: {
  user: GitHubUser
  tenantId?: string
  userId?: string
  storageKey: string
}) {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const navigate = useNavigate()
  const registry = useApplicationModules()
  const { current, loading, status, refreshPermissions } = usePermission()
  const { themeSettings, updateSettings } = useProThemeContext()
  const [profile, setProfile] = useState(() => {
    const defaults = createProfileDefaults(user.name || user.login)
    try {
      return loadProfile(window.localStorage, storageKey, defaults)
    } catch {
      return { values: defaults, status: 'unavailable' as const }
    }
  })
  const [editing, setEditing] = useState(false)
  const save = (draft: ProfileValues) => {
    const saved = saveProfile(window.localStorage, storageKey, draft)
    setProfile({ values: saved, status: 'ready' })
    setEditing(false)
    void message.success(t('profilePage.saved'))
  }
  const notProvided = <span className={styles.muted}>{t('profilePage.notProvided')}</span>
  const personalFields = ['displayName', 'jobTitle', 'department', 'location'] as const
  const destinations = [
    { path: '/', label: 'profilePage.openHome', available: true },
    {
      path: '/notifications',
      label: 'profilePage.openNotifications',
      available: registry.modules.some((item) => item.id === 'notifications'),
    },
    { path: '/permission', label: 'profilePage.openPermissions', available: true },
    { path: '/account/security', label: 'profilePage.openSecurity', available: Boolean(tenantId) },
  ].filter((item) => item.available && current && canAccessPath(current, item.path))
  const kind = tenantId ? 'tenantAccount' : user.id > 0 ? 'githubAccount' : 'demoAccount'
  return (
    <BusinessPage
      title={t('menu.profile')}
      description={t('profilePage.description')}
      actions={
        <Button type="primary" onClick={() => setEditing(true)}>
          {t('profilePage.edit')}
        </Button>
      }
      notice={<Alert type="info" showIcon title={t('profilePage.localNotice')} />}
    >
      {profile.status !== 'ready' && (
        <Alert
          type="warning"
          showIcon
          title={t(profile.status === 'invalid' ? 'profilePage.invalidStorage' : 'profilePage.storageUnavailable')}
        />
      )}
      <div className={styles.grid}>
        <section className={styles.panel} aria-label={t('profilePage.account')}>
          <div className={styles.identity}>
            <Avatar className={styles.avatar} size={64} src={safeAvatar(user.avatar_url)}>
              {Array.from(profile.values.displayName).slice(0, 2).join('').toLocaleUpperCase()}
            </Avatar>
            <div>
              <h2>{profile.values.displayName}</h2>
              <p className={styles.description}>{user.email || user.login}</p>
            </div>
            <Tag>{t(`profilePage.${kind}`)}</Tag>
          </div>
          <h2 className={styles.sectionTitle}>{t('profilePage.account')}</h2>
          <p className={styles.description}>{t('profilePage.accountReadOnly')}</p>
          <dl className={`${styles.details} ${styles.accountDetails}`}>
            <div>
              <dt>{t('profilePage.signInName')}</dt>
              <dd>{user.login}</dd>
            </div>
            <div>
              <dt>{t('profilePage.email')}</dt>
              <dd>{user.email || notProvided}</dd>
            </div>
            <div>
              <dt>{t('profilePage.userId')}</dt>
              <dd>{userId || current?.userId || (user.id > 0 ? String(user.id) : notProvided)}</dd>
            </div>
            {tenantId && (
              <div>
                <dt>{t('profilePage.tenant')}</dt>
                <dd>{tenantId}</dd>
              </div>
            )}
            <div>
              <dt>{t('profilePage.roles')}</dt>
              <dd>
                {loading ? (
                  <Skeleton active title={false} paragraph={{ rows: 1 }} />
                ) : status === 'error' ? (
                  <Alert
                    type="warning"
                    title={t('profilePage.permissionsFailed')}
                    action={
                      <Button size="small" onClick={() => void refreshPermissions()}>
                        {t('profilePage.retry')}
                      </Button>
                    }
                  />
                ) : current?.roles.length ? (
                  <Space className={styles.roles} wrap size={[4, 8]}>
                    {current.roles.map((role) => (
                      <Tag key={role.id}>{role.name || role.code}</Tag>
                    ))}
                  </Space>
                ) : (
                  notProvided
                )}
              </dd>
            </div>
          </dl>
        </section>
        <div className={styles.mainColumn}>
          <section className={styles.panel} aria-label={t('profilePage.personal')}>
            <h2 className={styles.sectionTitle}>{t('profilePage.personal')}</h2>
            <p className={styles.description}>{t('profilePage.personalDescription')}</p>
            <dl className={styles.details}>
              {personalFields.map((field) => (
                <div key={field}>
                  <dt>{t(`profilePage.${field}`)}</dt>
                  <dd>{profile.values[field] || notProvided}</dd>
                </div>
              ))}
            </dl>
            <h3 className={styles.sectionTitle}>{t('profilePage.bio')}</h3>
            <p className={`${styles.bio} ${profile.values.bio ? '' : styles.muted}`}>
              {profile.values.bio || t('profilePage.emptyBio')}
            </p>
          </section>
          <section className={styles.panel} aria-label={t('profilePage.preferences')}>
            <h2 className={styles.sectionTitle}>{t('profilePage.preferences')}</h2>
            <p className={styles.description}>{t('profilePage.preferencesDescription')}</p>
            <div className={styles.preferences}>
              <div className={styles.preference}>
                <div>
                  <label htmlFor="profile-theme">{t('profilePage.theme')}</label>
                  <p className={styles.description}>{t('profilePage.themeHelp')}</p>
                </div>
                <Select<ThemeMode>
                  id="profile-theme"
                  className={styles.select}
                  aria-label={t('profilePage.theme')}
                  value={themeSettings.themeMode}
                  onChange={(themeMode) => updateSettings({ themeMode })}
                  options={(['light', 'dark', 'system'] as const).map((value) => ({
                    value,
                    label: t(`profilePage.themes.${value}`),
                  }))}
                />
              </div>
              <div className={styles.preference}>
                <div>
                  <label htmlFor="profile-language">{t('profilePage.language')}</label>
                  <p className={styles.description}>{t('profilePage.languageHelp')}</p>
                </div>
                <Select
                  id="profile-language"
                  className={styles.select}
                  aria-label={t('profilePage.language')}
                  value={i18n.language.startsWith('zh') ? 'zh' : 'en'}
                  onChange={(value: string) =>
                    void i18n.changeLanguage(value).catch(() => message.error(t('profilePage.preferencesFailed')))
                  }
                  options={[
                    { value: 'zh', label: t('profilePage.languages.zh') },
                    { value: 'en', label: t('profilePage.languages.en') },
                  ]}
                />
              </div>
              <div className={styles.preference}>
                <div>
                  <label htmlFor="profile-compact">{t('profilePage.compact')}</label>
                  <p className={styles.description}>{t('profilePage.compactHelp')}</p>
                </div>
                <Switch
                  id="profile-compact"
                  aria-label={t('profilePage.compact')}
                  checked={themeSettings.compactAlgorithm}
                  onChange={(compactAlgorithm) => updateSettings({ compactAlgorithm })}
                />
              </div>
            </div>
          </section>
          {destinations.length > 0 && (
            <section className={styles.panel} aria-label={t('profilePage.quickLinks')}>
              <h2 className={styles.sectionTitle}>{t('profilePage.quickLinks')}</h2>
              <p className={styles.description}>{t('profilePage.quickLinksDescription')}</p>
              <div className={styles.links}>
                {destinations.map((item) => (
                  <Button key={item.path} onClick={() => navigate(item.path)}>
                    {t(item.label)}
                  </Button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      {editing && <ProfileEditor values={profile.values} onSave={save} onClose={() => setEditing(false)} />}
    </BusinessPage>
  )
}

export default function Profile() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const { projectId } = useApplicationScope()
  const { t } = useTranslation()
  const navigate = useNavigate()
  if (isLoading)
    return (
      <BusinessPage title={t('menu.profile')}>
        <Skeleton active paragraph={{ rows: 6 }} />
      </BusinessPage>
    )
  if (!isAuthenticated || !user)
    return (
      <BusinessPage title={t('menu.profile')}>
        <Result
          title={t('profilePage.accountUnavailable')}
          extra={<Button onClick={() => navigate('/signin')}>{t('profilePage.signIn')}</Button>}
        />
      </BusinessPage>
    )
  const enterprise = readEnterpriseSession()
  const accountId = enterprise
    ? `enterprise:${enterprise.user.id}`
    : user.id > 0
      ? `github:${user.id}`
      : `demo:${user.login}`
  const storageKey = getProfileStorageKey(projectId, accountId, enterprise?.tenantId)
  return (
    <ProfileWorkspace
      key={storageKey}
      user={user}
      tenantId={enterprise?.tenantId}
      userId={enterprise?.user.id}
      storageKey={storageKey}
    />
  )
}
