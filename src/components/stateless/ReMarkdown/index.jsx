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
  const refText = ref.current?.innerText
  const langRef = useRef('')
  const renderMermaid = useDebouncedCallback(() => {
    if (!ref.current) return
    const { className } = ref.current.querySelector('code')
    const match = /language-(\w+)/.exec(className || '')
    if (match) {
      const [, lang] = match
      langRef.current = lang
    }
  }, 800)

  useEffect(() => {
    setTimeout(renderMermaid, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refText])

  return (
    <section>
      <section className={styles.copySection}>
        <span className={styles.lang}>{langRef.current}</span>
        <span
          className={styles.copySpan}
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
            const target = isInternal ? '_self' : aProps.target ?? '_blank'
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
