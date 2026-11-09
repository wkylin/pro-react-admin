import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowUpRight, File, Image as ImageIcon } from 'lucide-react'
import { safeChatUrl } from './composerModel'
import styles from './MessageContent.module.less'

function standaloneFile(body: string): string | undefined {
  const value = body.trim()
  const markdown = /^\[((?:\\.|[^\]\\\r\n])*)\]\((?:<([^<>]+)>|([^()\s]+))\)$/.exec(value)
  const url = safeChatUrl(markdown ? (markdown[2] ?? markdown[3]) : value)
  if (!url) return undefined
  return /\.(?:pdf|docx?|xlsx?|pptx?|txt|csv|zip|rar|7z|json|md|png|jpe?g|gif|webp|svg|mp[34]|mov|wav)$/i.test(
    new URL(url).pathname
  )
    ? url
    : undefined
}

function fileName(url: string): string {
  const parsed = new URL(url)
  const segment = parsed.pathname.split('/').at(-1) || parsed.hostname
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

function containsImage(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false
  const node = value as { type?: string; tagName?: string; children?: unknown[] }
  return (
    (node.type === 'element' && node.tagName === 'img') ||
    (Array.isArray(node.children) && node.children.some(containsImage))
  )
}

/** Render the platform's ordinary text wire format without fetching user-supplied images. */
export default function MessageContent({ body }: { body: string }) {
  const file = standaloneFile(body)
  return (
    <div className={styles.content} data-content-typography-exempt>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        urlTransform={(url) => safeChatUrl(url) ?? ''}
        components={{
          a: ({ href, children, node }) => {
            const url = safeChatUrl(href ?? '')
            // Image nodes become links themselves; avoid nesting those links inside an outer anchor.
            if (!url || containsImage(node)) return <span>{children}</span>
            if (file === url) {
              const title = typeof children === 'string' && children === href ? fileName(url) : children
              return (
                <a className={styles.fileLink} href={url} target="_blank" rel="noopener noreferrer">
                  <File size={20} aria-hidden="true" />
                  <span>
                    <strong>{title}</strong>
                    <small>{new URL(url).hostname}</small>
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )
            }
            return (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            )
          },
          img: ({ src, alt }) => {
            const url = safeChatUrl(typeof src === 'string' ? src : '')
            return url ? (
              <a className={styles.imageLink} href={url} target="_blank" rel="noopener noreferrer">
                <ImageIcon size={14} aria-hidden="true" />
                <span>{alt || fileName(url)}</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ) : (
              <span>{alt}</span>
            )
          },
          pre: ({ children }) => <pre tabIndex={0}>{children}</pre>,
          table: ({ children }) => (
            <div className={styles.table} tabIndex={0}>
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  )
}
