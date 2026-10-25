import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  GitBranch,
  Layers3,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import { readStoredToken } from '@platform/auth/model/session'
import logo from '@assets/images/pro-logo.png'
import styles from './guide.module.less'

const repository = 'https://github.com/wkylin/pro-react-admin'
const pages = 'https://wkylin.github.io/pro-react-admin'

type BuildTool = 'webpack' | 'vite'

const capabilities = [
  {
    id: 'dualBuild',
    source: 'config/project-registry.mjs',
    docs: 'docs/development/BUILD.md',
    icon: GitBranch,
  },
  {
    id: 'projects',
    source: 'src/projects',
    docs: 'docs/development/MULTI_PROJECT.md',
    icon: Layers3,
  },
  {
    id: 'identity',
    source: 'src/platform/auth',
    docs: 'docs/architecture/USER_ROLE_PERMISSION.md',
    icon: ShieldCheck,
  },
  {
    id: 'quality',
    source: 'packages/wui-react',
    docs: 'docs/development/QUALITY.md',
    icon: BookOpen,
  },
] as const

const directories = [
  ['src/app', 'app'],
  ['src/features', 'features'],
  ['src/platform', 'platform'],
  ['src/projects', 'projects'],
  ['build', 'build'],
  ['tests', 'tests'],
  ['deploy', 'deploy'],
] as const

const workflow = [
  {
    id: 'develop',
    command: 'pnpm run dev:webpack',
  },
  {
    id: 'verify',
    command: 'pnpm run ci:quality',
  },
  {
    id: 'deliver',
    command: 'pnpm run build:pages',
  },
] as const

function EvidenceLink({ path, label }: { path: string; label: string }) {
  const view = /\.[^/]+$/.test(path) ? 'blob' : 'tree'
  return (
    <a href={`${repository}/${view}/main/${path}`} target="_blank" rel="noopener noreferrer">
      {label} <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const [buildTool, setBuildTool] = useState<BuildTool>('webpack')
  const [copied, setCopied] = useState('')
  const { pathname } = useLocation()
  const isPublic = pathname === '/overview'
  const isSignedIn = Boolean(readStoredToken())
  const commands = ['pnpm install --frozen-lockfile', 'pnpm run project:doctor', `pnpm run dev:${buildTool}`]

  const copy = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(command)
    } catch {
      setCopied('copy-failed')
    }
  }

  return (
    <main className={styles.page}>
      {isPublic && (
        <header className={styles.publicNav}>
          <a className={styles.brand} href="#/overview" aria-label={t('projectGuide.nav.overviewLabel')}>
            <img src={logo} alt="" />
            <span>{t('projectGuide.brand')}</span>
          </a>
          <div className={styles.navActions}>
            <a href={`${repository}/tree/main/docs`} target="_blank" rel="noopener noreferrer">
              {t('projectGuide.nav.docs')} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <Link className={styles.navPrimary} to={isSignedIn ? '/demo' : '/signin'}>
              {isSignedIn ? t('projectGuide.nav.openDemo') : t('projectGuide.nav.signIn')}{' '}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </header>
      )}

      <div className={styles.content}>
        <section className={styles.intro} aria-labelledby="guide-title">
          <div>
            <p className={styles.kicker}>{t('projectGuide.intro.kicker')}</p>
            <h1 id="guide-title">{t('projectGuide.brand')}</h1>
            <p className={styles.lead}>{t('projectGuide.intro.lead')}</p>
            <p className={styles.introCopy}>{t('projectGuide.intro.description')}</p>
            <div className={styles.introActions}>
              <Link className={styles.primaryAction} to={isSignedIn ? '/demo' : '/signin'}>
                {isSignedIn ? t('projectGuide.intro.viewScenarios') : t('projectGuide.intro.tryDemo')}{' '}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a
                className={styles.secondaryAction}
                href={`${repository}/blob/main/docs/README.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('projectGuide.intro.readDocs')} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className={styles.deliveryMap} aria-label={t('projectGuide.intro.deliveryMapLabel')}>
            <p>{t('projectGuide.intro.deliveryMapTitle')}</p>
            <ol>
              <li>
                <span>{t('projectGuide.intro.business')}</span>
                <code>{t('projectGuide.intro.businessPaths')}</code>
              </li>
              <li>
                <span>{t('projectGuide.intro.build')}</span>
                <code>{t('projectGuide.intro.buildPaths')}</code>
              </li>
              <li>
                <span>{t('projectGuide.intro.quality')}</span>
                <code>{t('projectGuide.intro.qualityPaths')}</code>
              </li>
              <li>
                <span>{t('projectGuide.intro.deploy')}</span>
                <code>{t('projectGuide.intro.deployPaths')}</code>
              </li>
            </ol>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="capabilities-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>{t('projectGuide.capabilities.kicker')}</p>
              <h2 id="capabilities-title">{t('projectGuide.capabilities.heading')}</h2>
            </div>
            <EvidenceLink
              path="docs/architecture/ENGINEERING_OVERVIEW.md"
              label={t('projectGuide.capabilities.fullMap')}
            />
          </div>
          <div className={styles.capabilityList}>
            {capabilities.map(({ id, source, docs, icon: Icon }) => (
              <article className={styles.capability} key={id}>
                <div className={styles.capabilityIcon}>
                  <Icon size={21} aria-hidden="true" />
                </div>
                <div>
                  <h3>{t(`projectGuide.capabilities.${id}.title`)}</h3>
                  <p>{t(`projectGuide.capabilities.${id}.detail`)}</p>
                </div>
                <div className={styles.evidence}>
                  <EvidenceLink path={source} label={t('projectGuide.evidence.source')} />
                  <EvidenceLink path={docs} label={t('projectGuide.evidence.docs')} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="start-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>{t('projectGuide.start.kicker')}</p>
              <h2 id="start-title">{t('projectGuide.start.heading')}</h2>
            </div>
            <EvidenceLink path="docs/development/GETTING_STARTED.md" label={t('projectGuide.start.details')} />
          </div>
          <p className={styles.sectionDescription}>{t('projectGuide.start.description')}</p>
          <div className={styles.toolSelector} role="group" aria-label={t('projectGuide.start.chooseBuildTool')}>
            {(['webpack', 'vite'] as const).map((tool) => (
              <button
                key={tool}
                type="button"
                className={buildTool === tool ? styles.selectedTool : ''}
                aria-pressed={buildTool === tool}
                onClick={() => setBuildTool(tool)}
              >
                {t(`projectGuide.start.tools.${tool}`)}
              </button>
            ))}
          </div>
          <div className={styles.terminal}>
            <div className={styles.terminalHeading}>
              <Terminal size={17} aria-hidden="true" />
              <span>{t('projectGuide.start.terminal')}</span>
              <span>{t('projectGuide.start.platform')}</span>
            </div>
            {commands.map((command, index) => (
              <div className={styles.commandRow} key={command}>
                <span className={styles.commandNumber}>{String(index + 1).padStart(2, '0')}</span>
                <code>{command}</code>
                <button
                  type="button"
                  onClick={() => void copy(command)}
                  aria-label={t('projectGuide.start.copyCommand', { command })}
                  title={t('projectGuide.start.copyCommand', { command })}
                >
                  {copied === command ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                </button>
              </div>
            ))}
          </div>
          <p className={styles.commandNote} aria-live="polite">
            {copied === 'copy-failed'
              ? t('projectGuide.start.copyFailed')
              : copied
                ? t('projectGuide.start.copied')
                : t('projectGuide.start.addressNote')}
          </p>
        </section>

        <section className={styles.section} aria-labelledby="structure-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>{t('projectGuide.structure.kicker')}</p>
              <h2 id="structure-title">{t('projectGuide.structure.heading')}</h2>
            </div>
            <EvidenceLink path="docs/development/SRC_DIRECTORY_GUIDE.md" label={t('projectGuide.structure.details')} />
          </div>
          <div className={styles.directoryList}>
            {directories.map(([path, purposeKey]) => (
              <div className={styles.directoryRow} key={path}>
                <EvidenceLink path={path} label={path} />
                <span>{t(`projectGuide.structure.directories.${purposeKey}`)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="workflow-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>{t('projectGuide.workflow.kicker')}</p>
              <h2 id="workflow-title">{t('projectGuide.workflow.heading')}</h2>
            </div>
            <EvidenceLink path="docs/deployment/DEPLOY.md" label={t('projectGuide.workflow.details')} />
          </div>
          <div className={styles.workflow}>
            {workflow.map(({ id, command }) => (
              <div className={styles.workflowStep} key={id}>
                <strong>{t(`projectGuide.workflow.${id}.stage`)}</strong>
                <code>{id === 'develop' ? `pnpm run dev:${buildTool}` : command}</code>
                <p>{t(`projectGuide.workflow.${id}.result`)}</p>
              </div>
            ))}
          </div>
          <p className={styles.boundary}>{t('projectGuide.workflow.boundary')}</p>
        </section>

        <footer className={styles.footer}>
          <span>{t('projectGuide.footer.tagline')}</span>
          <div>
            <Link to="/demo">{t('projectGuide.footer.scenarios')}</Link>
            <a href={`${pages}/portal.html`} target="_blank" rel="noopener noreferrer">
              {t('projectGuide.footer.allApps')} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={`${pages}/storybook/`} target="_blank" rel="noopener noreferrer">
              {t('projectGuide.footer.storybook')} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}
