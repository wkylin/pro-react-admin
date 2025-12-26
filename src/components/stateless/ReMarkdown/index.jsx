import React, { useRef, useEffect } from 'react'
import { message } from 'antd'
import Icon from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import RemarkMath from 'remark-math'
import RemarkBreaks from 'remark-breaks'
import RehypeKatex from 'rehype-katex'
import RemarkGfm from 'remark-gfm'
import RehypeHighlight from 'rehype-highlight'
import RehypeRaw from 'rehype-raw'
import { useDebouncedCallback } from 'use-debounce'
import LoadingIcon from '@assets/svg/three-dots.svg'
import 'highlight.js/styles/github.css'

import styles from './index.module.less'

const copyTextToClipboard = async (copyText) => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(copyText)
      message.success('已成功复制到剪贴板')
    }
  } catch (err) {
    const textArea = document.createElement('textarea')
    textArea.value = copyText
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      message.success('已成功复制到剪贴板')
    } catch (error) {
      message.success('复制到剪贴板失败')
    }
    document.body.removeChild(textArea)
  }
}

const PreCode = (props) => {
  const ref = useRef(null)
  const [refText, setRefText] = React.useState('')
  const [lang, setLang] = React.useState('')
  const renderMermaid = useDebouncedCallback(() => {
    const el = ref.current
    if (!el) return
    const codeEl = el.querySelector && el.querySelector('code')
    const className = codeEl?.className || ''
    const match = /language-(\w+)/.exec(className)
    if (match) {
      const [, found] = match
      setLang(found)
    }
  }, 800)

  useEffect(() => {
    // read DOM after mount/update, avoid reading ref during render
    const txt = ref.current?.innerText ?? ''
    const s = setTimeout(() => setRefText(txt), 0)
    const t = setTimeout(() => renderMermaid(), 1)
    return () => {
      clearTimeout(t)
      clearTimeout(s)
    }
  }, [props.children])

  return (
    <section>
      <section className={styles.copySection}>
        <span className={styles.lang}>{lang}</span>
        <span
          className={styles.copySpan}
          role="button"
          onClick={() => {
            if (ref.current) {
              const code = ref.current.innerText
              copyTextToClipboard(code)
            }
          }}
        >
          复制代码
        </span>
      </section>
      <pre className={styles.preCode} ref={ref}>
        {props.children}
      </pre>
    </section>
  )
}

const ReMarkdown = ({ markdownText = '', isLoading = false }) => (
  <section className={styles.markdownBody}>
    {isLoading && !markdownText && (
      <Icon component={LoadingIcon} style={{ color: '#fff' }} className={styles.loadingIcon} />
    )}
    {markdownText && (
      <ReactMarkdown
        remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
        rehypePlugins={[
          RehypeKatex,
          RehypeRaw,
          [
            RehypeHighlight,
            {
              detect: false,
              ignoreMissing: true,
            },
          ],
        ]}
        components={{
          pre: PreCode,
          p: (pProps) => <p {...pProps} dir="auto" />,
          a: (aProps) => {
            const href = aProps.href || ''
            const isInternal = /^\/#/i.test(href)
            const target = isInternal ? '_self' : (aProps.target ?? '_blank')
            return <a {...aProps} target={target} />
          },
        }}
      >
        {markdownText}
      </ReactMarkdown>
    )}
  </section>
)

export default ReMarkdown
