import { useState } from 'react'
import { Button, Empty, Select, Skeleton, Tabs, Tag } from 'antd'
import { ArrowUpRight, Check, Copy, Download, Ellipsis, Globe2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { buildSearchCode, type TavilySearchRequest, type TavilySearchResponse } from './model'
import styles from './index.module.less'

export interface SearchRun {
  id: number
  request: TavilySearchRequest
  response: TavilySearchResponse
  at: number
}

interface Props {
  draft: TavilySearchRequest
  run?: SearchRun
  running: boolean
  changed: boolean
  onExample: (key: 'engineering' | 'news' | 'research') => void
  onCopy: (value: string) => void
}

function safeLink(value: string | undefined) {
  try {
    const url = new URL(value ?? '')
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined
  } catch {
    return undefined
  }
}

export default function ResultsPanel({ draft, run, running, changed, onExample, onCopy }: Props) {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState<'curl' | 'javascript' | 'python'>('curl')
  const [tab, setTab] = useState('answer')
  let code = ''
  try {
    code = buildSearchCode(draft, language)
  } catch {
    // Code follows the current editable request, including validation.
  }
  const json = run ? JSON.stringify(run.response, null, 2) : ''
  const download = () => {
    if (!run) return
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `tavily-response-${run.at}.json`
    document.body.append(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const empty = (
    <div className={styles.emptyState}>
      <div className={styles.orbitMark} aria-hidden="true">
        <Globe2 size={28} />
      </div>
      <h3>{t('tavily.emptyTitle')}</h3>
      <p>{t('tavily.emptyDescription')}</p>
      <div className={styles.examples}>
        {(['engineering', 'news', 'research'] as const).map((key) => (
          <Button key={key} onClick={() => onExample(key)}>
            {t(`tavily.examples.${key}.label`)}
          </Button>
        ))}
      </div>
    </div>
  )
  const noResults = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('tavily.noResults')} />
  const sources = run?.response.results ?? []

  return (
    <section className={styles.resultsPanel} aria-label={t('tavily.results')} aria-busy={running}>
      <div className={styles.resultsHeading}>
        <div>
          <span className={styles.eyebrow}>{t('tavily.responseEyebrow')}</span>
          <h2>{t('tavily.results')}</h2>
        </div>
        {run && (
          <Button size="small" icon={<Download size={14} aria-hidden="true" />} onClick={download}>
            {t('tavily.download')}
          </Button>
        )}
      </div>
      {run && (
        <div className={styles.runSummary}>
          <div className={styles.submittedQuery}>
            <Check size={14} aria-hidden="true" />
            <strong>{run.request.query}</strong>
          </div>
          <div className={styles.metadata}>
            <span>{t('tavily.sourceCount', { count: sources.length })}</span>
            {run.response.responseTime !== undefined && (
              <span>
                {t('tavily.elapsed', {
                  seconds: new Intl.NumberFormat(i18n.resolvedLanguage, { maximumFractionDigits: 2 }).format(
                    run.response.responseTime
                  ),
                })}
              </span>
            )}
            {run.response.usage && <span>{t('tavily.credits', { count: run.response.usage.credits })}</span>}
            <span>
              {new Intl.DateTimeFormat(i18n.resolvedLanguage, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }).format(run.at)}
            </span>
          </div>
          {changed && <p className={styles.changedHint}>{t('tavily.changed')}</p>}
        </div>
      )}
      <Tabs
        more={{
          icon: (
            <span role="img" aria-label={t('tavily.moreViews')}>
              <Ellipsis size={16} aria-hidden="true" />
            </span>
          ),
        }}
        activeKey={tab}
        onChange={setTab}
        className={styles.resultTabs}
        items={[
          {
            key: 'answer',
            label: t('tavily.tabs.answer'),
            children: running ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : !run ? (
              empty
            ) : (
              <div className={styles.resultContent} key={run.id}>
                {run.response.answer ? (
                  <>
                    <Tag>{t('tavily.answerBy')}</Tag>
                    <div className={styles.answer}>
                      <ReactMarkdown
                        skipHtml
                        components={{
                          a: ({ href, children }) => {
                            const url = safeLink(href)
                            return url ? (
                              <a href={url} target="_blank" rel="noopener noreferrer">
                                {children}
                              </a>
                            ) : (
                              <span>{children}</span>
                            )
                          },
                        }}
                      >
                        {run.response.answer}
                      </ReactMarkdown>
                    </div>
                    <Button
                      type="text"
                      size="small"
                      icon={<Copy size={14} aria-hidden="true" />}
                      onClick={() => onCopy(run.response.answer)}
                    >
                      {t('tavily.copyAnswer')}
                    </Button>
                  </>
                ) : (
                  <p className={styles.hint}>
                    {t(run.request.include_answer ? 'tavily.noAnswer' : 'tavily.answerOff')}
                  </p>
                )}
                {sources.length > 0 && (
                  <div className={styles.answerSources}>
                    <h3>{t('tavily.relatedSources')}</h3>
                    <ol>
                      {sources.slice(0, 5).map((source, index) => (
                        <li key={`${source.url}-${index}`}>
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
                            <span>{source.title}</span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {!sources.length && noResults}
              </div>
            ),
          },
          {
            key: 'sources',
            label: t('tavily.tabs.sources'),
            children: running ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : !run ? (
              empty
            ) : sources.length ? (
              <div className={styles.sourceList} key={run.id}>
                {sources.map((source, index) => (
                  <article className={styles.sourceCard} key={`${source.url}-${index}`}>
                    <span className={styles.sourceRank} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={styles.sourceBody}>
                      <span className={styles.sourceDomain}>{new URL(source.url).hostname}</span>
                      <h3>
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          {source.title}
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      </h3>
                      <p className={styles.sourceExcerpt}>{source.content}</p>
                      <div className={styles.metadata}>
                        {source.score !== undefined && (
                          <span>{t('tavily.relevance', { score: Math.round(source.score * 100) })}</span>
                        )}
                        {source.publishedDate && <span>{t('tavily.pageDate', { date: source.publishedDate })}</span>}
                      </div>
                      {source.rawContent && (
                        <details className={styles.rawContent}>
                          <summary>{t('tavily.pageContent')}</summary>
                          <pre>{source.rawContent}</pre>
                        </details>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              noResults
            ),
          },
          {
            key: 'images',
            label: t('tavily.tabs.images'),
            children: running ? (
              <Skeleton active />
            ) : run?.response.images.length ? (
              <div className={styles.imageGrid}>
                {run.response.images.map((item, index) => (
                  <a
                    className={styles.imageCard}
                    key={`${item.url}-${index}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={item.url}
                      alt={item.description || t('tavily.imageLabel', { index: index + 1 })}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <span>{item.description || t('tavily.imageLabel', { index: index + 1 })}</span>
                  </a>
                ))}
              </div>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('tavily.noImages')} />
            ),
          },
          {
            key: 'json',
            label: t('tavily.tabs.json'),
            children: json ? (
              <div className={styles.codePanel}>
                <div className={styles.codeHeading}>
                  <p>{t('tavily.jsonHint')}</p>
                  <Button size="small" icon={<Copy size={14} aria-hidden="true" />} onClick={() => onCopy(json)}>
                    {t('tavily.copyJson')}
                  </Button>
                </div>
                {run?.response.requestId && (
                  <p className={styles.requestId}>
                    {t('tavily.requestId')}: {run.response.requestId}
                  </p>
                )}
                <pre tabIndex={0} aria-label={t('tavily.tabs.json')}>
                  {json}
                </pre>
              </div>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('tavily.noResponse')} />
            ),
          },
          {
            key: 'code',
            label: t('tavily.tabs.code'),
            children: (
              <div className={styles.codePanel}>
                <div className={styles.codeHeading}>
                  <Select
                    aria-label={t('tavily.codeLanguage')}
                    value={language}
                    onChange={setLanguage}
                    options={[
                      { value: 'curl', label: 'cURL' },
                      { value: 'javascript', label: 'JavaScript' },
                      { value: 'python', label: 'Python' },
                    ]}
                  />
                  <Button
                    size="small"
                    icon={<Copy size={14} aria-hidden="true" />}
                    disabled={!code}
                    onClick={() => onCopy(code)}
                  >
                    {t('tavily.copyCode')}
                  </Button>
                </div>
                <p className={styles.hint}>{t('tavily.codeHint')}</p>
                {code ? (
                  <pre tabIndex={0} aria-label={t('tavily.tabs.code')}>
                    {code}
                  </pre>
                ) : (
                  <p className={styles.hint}>{t('tavily.codeEmpty')}</p>
                )}
              </div>
            ),
          },
        ]}
      />
    </section>
  )
}
