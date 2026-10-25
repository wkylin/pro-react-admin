import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, theme } from 'antd'
import { ArrowRight, ArrowUpRight, Blocks, ExternalLink, GitBranch, LockKeyhole, Move } from 'lucide-react'
import FixTabPanel from '@shared/ui/FixTabPanel'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import styles from './index.module.less'

const repositoryFile = (path: string) => `https://github.com/wkylin/pro-react-admin/blob/main/${path}`

const scenarios = [
  {
    id: 'crypto',
    path: '/crypto',
    Icon: LockKeyhole,
    source: { path: 'src/pages/crypto/index.tsx', label: 'crypto/index.tsx' },
    test: { path: 'src/platform/api/core/encryption.test.ts', label: 'encryption.test.ts' },
    docs: { path: 'docs/architecture/REQUEST_ENCRYPTION.md', label: 'REQUEST_ENCRYPTION.md' },
  },
  {
    id: 'motion',
    path: '/motion',
    Icon: Move,
    source: { path: 'src/pages/motion/index.tsx', label: 'motion/index.tsx' },
    test: { path: 'packages/wui-react/src/ScrollableSections/index.test.tsx', label: 'ScrollableSections.test.tsx' },
    docs: { path: 'docs/components/UI_COMPONENTS.md', label: 'UI_COMPONENTS.md' },
  },
  {
    id: 'architecture',
    path: '/svg-viewer',
    Icon: GitBranch,
    source: { path: 'src/pages/svgViewer/index.tsx', label: 'svgViewer/index.tsx' },
    test: { path: 'scripts/validate-route-contract.mjs', label: '路由契约校验' },
    docs: { path: 'docs/architecture/ARCHITECTURE.md', label: 'ARCHITECTURE.md' },
  },
] as const

const storybookLinks = [
  { type: 'source', path: '.storybook/main.ts', label: '.storybook/main.ts' },
  { type: 'test', path: 'scripts/storybook.test.mjs', label: 'storybook.test.mjs' },
  { type: 'docs', path: 'docs/development/STORYBOOK.md', label: 'STORYBOOK.md' },
] as const

const Demo = () => {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const { redirectTo } = useSafeNavigate()
  const colors = {
    '--demo-surface': token.colorBgContainer,
    '--demo-text': token.colorText,
    '--demo-muted': token.colorTextSecondary,
    '--demo-border': token.colorBorderSecondary,
    '--demo-subtle': token.colorFillQuaternary,
    '--demo-focus': token.colorPrimary,
    '--demo-info': token.colorInfo,
    '--demo-info-bg': token.colorInfoBg,
    '--demo-success': token.colorSuccess,
    '--demo-success-bg': token.colorSuccessBg,
    '--demo-warning': token.colorWarning,
    '--demo-warning-bg': token.colorWarningBg,
  } as CSSProperties

  return (
    <FixTabPanel fill={false}>
      <main className={styles.page} style={colors}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>{t('scenarioGuide.eyebrow')}</p>
              <h1>{t('scenarioGuide.heading')}</h1>
            </div>
            <span className={styles.count}>
              {t('scenarioGuide.sceneCount', { total: String(scenarios.length).padStart(2, '0') })}
            </span>
          </header>

          <div className={styles.scenarios}>
            {scenarios.map((scenario) => {
              const Icon = scenario.Icon
              const title = t(`scenarioGuide.scenarios.${scenario.id}.title`)
              const evidence = [
                { type: 'source', ...scenario.source },
                { type: 'test', ...scenario.test },
                { type: 'docs', ...scenario.docs },
              ]
              return (
                <section key={scenario.id} className={`${styles.scenario} ${styles[scenario.id]}`}>
                  <div className={styles.sceneHeading}>
                    <span className={styles.sceneIcon} aria-hidden="true">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className={styles.category}>{t(`scenarioGuide.scenarios.${scenario.id}.category`)}</p>
                      <h2>{title}</h2>
                      <p className={styles.summary}>{t(`scenarioGuide.scenarios.${scenario.id}.summary`)}</p>
                    </div>
                  </div>
                  <div className={styles.sceneAction}>
                    <code>{scenario.path}</code>
                    <Button
                      type="primary"
                      icon={<ArrowRight size={16} />}
                      onClick={() => void redirectTo(scenario.path)}
                    >
                      {t('scenarioGuide.enterScene')}
                    </Button>
                  </div>
                  <nav className={styles.evidence} aria-label={t('scenarioGuide.evidenceLabel', { title })}>
                    {evidence.map((item) => (
                      <a key={item.type} href={repositoryFile(item.path)} target="_blank" rel="noreferrer">
                        <span>{t(`scenarioGuide.evidence.${item.type}`)}</span>
                        <code>{item.label}</code>
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    ))}
                  </nav>
                  {scenario.id === 'architecture' && (
                    <p className={styles.testNote}>{t('scenarioGuide.scenarios.architecture.testNote')}</p>
                  )}
                </section>
              )
            })}
          </div>

          <section className={styles.storybook} aria-labelledby="storybook-title">
            <div className={styles.storybookHeading}>
              <span className={styles.storybookIcon} aria-hidden="true">
                <Blocks size={20} strokeWidth={1.8} />
              </span>
              <div>
                <p className={styles.category}>{t('scenarioGuide.storybook.category')}</p>
                <h2 id="storybook-title">{t('scenarioGuide.storybook.title')}</h2>
                <Button
                  type="link"
                  size="small"
                  icon={<ArrowRight size={14} />}
                  style={{ paddingInline: 0 }}
                  onClick={() => void redirectTo('/component-playground')}
                >
                  {t('scenarioGuide.storybook.openLab')}
                </Button>
              </div>
            </div>
            <a
              className={styles.storybookAction}
              href="https://wkylin.github.io/pro-react-admin/storybook/"
              target="_blank"
              rel="noreferrer"
            >
              {t('scenarioGuide.storybook.openExternal')}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <nav className={styles.storybookEvidence} aria-label={t('scenarioGuide.storybook.evidenceLabel')}>
              {storybookLinks.map((item) => (
                <a key={item.type} href={repositoryFile(item.path)} target="_blank" rel="noreferrer">
                  <span>{t(`scenarioGuide.evidence.${item.type}`)}</span>
                  <code>{item.label}</code>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </section>
        </div>
      </main>
    </FixTabPanel>
  )
}

export default Demo
