import { useRef } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useTranslation } from 'react-i18next'
import FixTabPanel from '@shared/ui/FixTabPanel'
import guide from '../../../docs/deployment/PAGES_VERCEL_GUIDE.md?raw'
import styles from './index.module.less'

const repositoryGuide = 'https://github.com/wkylin/pro-react-admin/blob/main/docs/deployment/PAGES_VERCEL_GUIDE.md'
const repositoryDocs = 'https://github.com/wkylin/pro-react-admin/blob/main/docs/deployment/'
const content = guide.replace(/^# .+\n+/, '')

const sections = [
  { id: 'build-output', labelKey: 'deploymentGuide.sections.buildOutput' },
  { id: 'prepare', labelKey: 'deploymentGuide.sections.prepare' },
  { id: 'github-pages', labelKey: 'deploymentGuide.sections.pages' },
  { id: 'vercel', labelKey: 'deploymentGuide.sections.vercel' },
  { id: 'other-targets', labelKey: 'deploymentGuide.sections.other' },
  { id: 'troubleshooting', labelKey: 'deploymentGuide.sections.troubleshooting' },
] as const

const headingIds: Record<string, string> = {
  先认识构建产物: 'build-output',
  准备源码与工具: 'prepare',
  'GitHub Pages：使用项目现有的 Actions': 'github-pages',
  'Vercel：部署默认后台': 'vercel',
  其他目标与必要边界: 'other-targets',
  失败时从哪里查: 'troubleshooting',
}

const markdownComponents: Components = {
  h2: ({ children, ...props }) => (
    <h2 {...props} id={headingIds[String(children)]}>
      {children}
    </h2>
  ),
  a: ({ href, children, ...props }) => {
    const destination = href?.startsWith('./') || href?.startsWith('../') ? new URL(href, repositoryDocs).href : href
    return (
      <a {...props} href={destination} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  },
  table: ({ children, ...props }) => (
    <div className={styles.tableScroll}>
      <table {...props}>{children}</table>
    </div>
  ),
}

function scrollToSection(id: string, container: HTMLDivElement | null) {
  if (!container) return
  const section = container.querySelector<HTMLElement>(`#${id}`)
  if (!section) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = section.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 20
  container.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
}

export default function DeploymentGuide() {
  const { t } = useTranslation()
  const panelRef = useRef<HTMLDivElement>(null)

  return (
    <FixTabPanel ref={panelRef} fill={false}>
      <main className={styles.page}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.headerCopy}>
              <span className={styles.eyebrow}>{t('deploymentGuide.eyebrow')}</span>
              <h1>{t('deploymentGuide.title')}</h1>
              <p>{t('deploymentGuide.intro')}</p>
            </div>
            <a className={styles.sourceLink} href={repositoryGuide} target="_blank" rel="noopener noreferrer">
              {t('deploymentGuide.source')}
            </a>
          </header>

          <div className={styles.pathCards} aria-label={t('deploymentGuide.choosePlatform')}>
            <button
              type="button"
              className={styles.pathCard}
              onClick={() => scrollToSection('github-pages', panelRef.current)}
            >
              <span className={styles.pathNumber}>{t('deploymentGuide.pages.number')}</span>
              <strong>{t('deploymentGuide.pages.title')}</strong>
              <span>{t('deploymentGuide.pages.description')}</span>
              <code>{t('deploymentGuide.pages.build')}</code>
            </button>
            <button
              type="button"
              className={styles.pathCard}
              onClick={() => scrollToSection('vercel', panelRef.current)}
            >
              <span className={styles.pathNumber}>{t('deploymentGuide.vercel.number')}</span>
              <strong>{t('deploymentGuide.vercel.title')}</strong>
              <span>{t('deploymentGuide.vercel.description')}</span>
              <code>{t('deploymentGuide.vercel.build')}</code>
            </button>
          </div>

          <div className={styles.readingLayout}>
            <nav className={styles.contents} aria-label={t('deploymentGuide.tableOfContents')}>
              <span className={styles.contentsLabel}>{t('deploymentGuide.tableOfContents')}</span>
              {sections.map((section) => (
                <button type="button" key={section.id} onClick={() => scrollToSection(section.id, panelRef.current)}>
                  {t(section.labelKey)}
                </button>
              ))}
            </nav>
            <article className={styles.document} aria-label={t('deploymentGuide.articleLabel')}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </main>
    </FixTabPanel>
  )
}
