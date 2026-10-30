import type { ReactNode } from 'react'
import { ArrowRight, List, RefreshCcw } from 'lucide-react'
import styles from './bookMatter.module.less'
import { PageFlow } from './bookPagination'
import { bookTitleParts } from './bookTitle'

export interface BookPublicationInfo {
  publisher?: ReactNode
  date?: ReactNode
  edition?: ReactNode
  isbn?: string
  copyright?: ReactNode
  /** 印次、定价等额外出版信息；只显示传入的字段。 */
  details?: Array<{ label: string; value: ReactNode }>
}

export interface BookFrontMatterOptions {
  dedication?: ReactNode
  preface?: ReactNode
}

export interface BookBackMatterOptions {
  title?: ReactNode
  content?: ReactNode
  acknowledgments?: ReactNode
}

export const frontMatterKinds = ['endpaper', 'half-title', 'frontispiece', 'title', 'copyright', 'preface'] as const
export type BookMatterKind = (typeof frontMatterKinds)[number] | 'afterword' | 'colophon' | 'contents-end'
export const matterLabels: Record<BookMatterKind, string> = {
  endpaper: '环衬',
  'half-title': '前扉页',
  frontispiece: '插画衬页',
  title: '扉页',
  copyright: '版权页',
  preface: '卷首',
  afterword: '后记',
  colophon: '版本记录',
  'contents-end': '目录',
}

export interface BookMatterPageProps {
  kind: BookMatterKind
  title: ReactNode
  author?: ReactNode
  subtitle?: ReactNode
  image?: string
  imagePosition?: string
  publication: BookPublicationInfo
  front?: BookFrontMatterOptions
  back?: BookBackMatterOptions
  description?: ReactNode
  faceCount: number
  chapterCount: number
  onContents: () => void
  onRestart: () => void
  onRead: () => void
  flowContent?: ReactNode
  flowScale?: number
  part?: number
  partCount?: number
}

function hasText(value: ReactNode) {
  return value !== undefined && value !== null && value !== false && value !== ''
}

export function getMatterContent(
  kind: BookMatterKind,
  props: Pick<BookMatterPageProps, 'title' | 'author' | 'subtitle' | 'publication' | 'front' | 'back' | 'description'>
): ReactNode {
  const { title, author, publication, front, back, description, subtitle } = props
  const heading = bookTitleParts(title, subtitle)
  const details = (
    <dl className={styles.details}>
      {[
        { label: '书名', value: title },
        { label: '作者', value: author },
        { label: '出版者', value: publication.publisher },
        { label: '出版日期', value: publication.date },
        { label: '版次', value: publication.edition },
        { label: 'ISBN', value: publication.isbn },
        ...(publication.details ?? []),
      ]
        .filter(({ value }) => hasText(value))
        .map(({ label, value }, index) => (
          <div key={`${label}-${index}`}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
    </dl>
  )
  if (kind === 'copyright')
    return (
      <>
        {details}
        {hasText(publication.copyright) && <div className={styles.copyright}>{publication.copyright}</div>}
      </>
    )
  if (kind === 'preface') return front?.dedication ?? front?.preface ?? description ?? <p>从这一页开始，慢慢读。</p>
  if (kind === 'afterword')
    return (
      <>
        <h2 className={styles.sectionTitle}>{back?.title ?? '后记'}</h2>
        {back?.content ?? (
          <>
            <p>感谢读到这里。</p>
            <p>愿书中的文字，成为你下一次思考与实践的起点。</p>
          </>
        )}
        {hasText(back?.acknowledgments) && (
          <div className={styles.acknowledgments}>
            <h3>致谢</h3>
            {back?.acknowledgments}
          </div>
        )}
      </>
    )
  if (kind === 'colophon')
    return (
      <>
        <h2 className={styles.sectionTitle}>{heading.title}</h2>
        {hasText(heading.subtitle) && <div className={styles.subtitle}>{heading.subtitle}</div>}
        {details}
      </>
    )
  return null
}

export function BookMatterPage({
  kind,
  title,
  author,
  subtitle,
  image,
  imagePosition,
  publication,
  front,
  back,
  description,
  faceCount,
  chapterCount,
  onContents,
  onRestart,
  onRead,
  flowContent,
  flowScale,
  part = 0,
  partCount = 1,
}: BookMatterPageProps) {
  const heading = bookTitleParts(title, subtitle)
  const body = (
    <PageFlow scale={flowScale}>
      {flowContent === undefined
        ? getMatterContent(kind, { title, author, subtitle, publication, front, back, description })
        : flowContent}
    </PageFlow>
  )
  const folio = partCount > 1 ? `${part + 1} / ${partCount}` : null
  const contentsButton = (
    <button type="button" className={styles.textButton} onClick={onContents}>
      进入目录 <ArrowRight size={13} aria-hidden="true" />
    </button>
  )

  return (
    <section
      className={styles.matter}
      data-book-matter={kind}
      data-book-matter-part={part}
      aria-label={matterLabels[kind]}
    >
      {kind === 'endpaper' && (
        <>
          <div className={styles.endpaper} aria-hidden="true">
            <span className={styles.bookmark} />
          </div>
          <div className={styles.footer}>
            {contentsButton}
            {folio && <span className={styles.folio}>{folio}</span>}
          </div>
        </>
      )}
      {kind === 'half-title' && (
        <>
          <div className={styles.quietTitle}>
            <h2>{heading.title}</h2>
          </div>
          <div className={styles.footer}>
            <span>{publication.publisher}</span>
          </div>
        </>
      )}
      {kind === 'frontispiece' && (
        <figure className={styles.frontispiece}>
          {image && <img src={image} alt="" style={{ objectPosition: imagePosition }} />}
          <figcaption>{title}</figcaption>
        </figure>
      )}
      {kind === 'title' && (
        <>
          <div className={styles.titleBlock}>
            <p className={styles.eyebrow}>书名页</p>
            <h2 className={styles.bookTitle}>{heading.title}</h2>
            {hasText(heading.subtitle) && <div className={styles.subtitle}>{heading.subtitle}</div>}
            <span className={styles.ornament} aria-hidden="true" />
            {hasText(author) && <div className={styles.author}>{author}</div>}
          </div>
          <div className={styles.publisher}>{publication.publisher}</div>
        </>
      )}
      {kind === 'copyright' && (
        <>
          <p className={styles.eyebrow}>版权与出版信息</p>
          <div className={styles.publicationBody} data-book-flow>
            {body}
          </div>
          <div className={styles.footer}>
            <span title={typeof title === 'string' ? title : undefined}>{heading.short}</span>
          </div>
        </>
      )}
      {kind === 'preface' && (
        <>
          <p className={styles.eyebrow}>{hasText(front?.dedication) ? '献词' : '写在前面'}</p>
          <div className={hasText(front?.dedication) ? styles.dedication : styles.prose} data-book-flow>
            {body}
          </div>
          <div className={styles.footer}>
            {contentsButton}
            {folio && <span className={styles.folio}>{folio}</span>}
          </div>
        </>
      )}
      {kind === 'contents-end' && (
        <>
          <div className={styles.quietTitle}>
            <p className={styles.eyebrow}>正文</p>
            <h2>{heading.title}</h2>
          </div>
          <div className={styles.footer}>
            <button type="button" className={styles.textButton} onClick={onRead}>
              开始阅读 <ArrowRight size={13} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
      {kind === 'afterword' && (
        <>
          <p className={styles.eyebrow}>卷末</p>
          <div className={styles.prose} data-book-flow>
            {body}
          </div>
          <div className={styles.footer}>
            <span title={typeof title === 'string' ? title : undefined}>{heading.short}</span>
            <span className={styles.folio}>{folio ?? '全书完'}</span>
          </div>
        </>
      )}
      {kind === 'colophon' && (
        <>
          <p className={styles.eyebrow}>版本记录</p>
          <p className={styles.readingSummary}>
            {chapterCount > 0 && `${chapterCount} 章 · `}正文 {faceCount} 页{folio && ` · ${folio}`}
          </p>
          <div className={styles.publicationBody} data-book-flow>
            {body}
          </div>
          <div className={styles.closing}>
            <span className={styles.completion}>{part === partCount - 1 ? '读完了' : '版本记录 · 续'}</span>
            {part === partCount - 1 && (
              <div className={styles.actions}>
                <button type="button" className={styles.textButton} onClick={onRestart}>
                  <RefreshCcw size={13} aria-hidden="true" />
                  从头阅读
                </button>
                <button type="button" className={styles.textButton} onClick={onContents}>
                  <List size={14} aria-hidden="true" />
                  返回目录
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}
