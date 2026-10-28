import { useRef, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import RemarkMath from 'remark-math'
import RemarkBreaks from 'remark-breaks'
import RehypeKatex from 'rehype-katex'
import RemarkGfm from 'remark-gfm'
import RehypeHighlight from 'rehype-highlight'
import { useCopyToClipboard } from '../../data-display/CopyToClipboard/useCopyed'
import styles from './index.module.less'
export interface ReMarkdownProps {
  markdownText?: string
  isLoading?: boolean
  loadingLabel?: string
  copyLabel?: string
  onCopy?: () => void
  onCopyError?: (error: unknown) => void
  /** Trusted caller renderers; raw HTML in Markdown is always ignored. */
  components?: Components
  renderLoading?: () => ReactNode
}
function PreCode({
  children,
  copyLabel,
  onCopy,
  onCopyError,
}: Pick<ReMarkdownProps, 'copyLabel' | 'onCopy' | 'onCopyError'> & { children?: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null)
  const [, copy, copied] = useCopyToClipboard({ onError: onCopyError })
  return (
    <section>
      <div className={styles.copySection}>
        <button
          type="button"
          onClick={async () => {
            if (await copy(ref.current?.textContent ?? '')) onCopy?.()
          }}
        >
          {copied ? 'Copied' : (copyLabel ?? 'Copy code')}
        </button>
      </div>
      <pre className={styles.preCode} ref={ref}>
        {children}
      </pre>
    </section>
  )
}
export default function ReMarkdown({
  markdownText = '',
  isLoading = false,
  loadingLabel = 'Loading',
  copyLabel,
  onCopy,
  onCopyError,
  components,
  renderLoading,
}: ReMarkdownProps) {
  return (
    <section className={styles.markdownBody}>
      {isLoading && !markdownText && <span role="status">{renderLoading?.() ?? loadingLabel}</span>}
      <ReactMarkdown
        skipHtml
        remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
        rehypePlugins={[
          [RehypeKatex, { output: 'mathml' }],
          [RehypeHighlight, { detect: false, ignoreMissing: true }],
        ]}
        components={{
          pre: ({ children }) => (
            <PreCode copyLabel={copyLabel} onCopy={onCopy} onCopyError={onCopyError}>
              {children}
            </PreCode>
          ),
          a: ({ node: _node, ...props }) => (
            <a {...props} target={/^\/#/i.test(props.href ?? '') ? '_self' : '_blank'} rel="noopener noreferrer" />
          ),
          ...components,
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </section>
  )
}
