import React, { useRef, useState, useEffect } from 'react'
import { message } from 'antd'
import Mermaid from 'mermaid'
import ReactMarkdown from 'react-markdown'
import RemarkMath from 'remark-math'
import RemarkBreaks from 'remark-breaks'
import RehypeKatex from 'rehype-katex'
import RemarkGfm from 'remark-gfm'
import RehypeHighlight from 'rehype-highlight'
import RehypeRaw from 'rehype-raw'
import { useDebouncedCallback } from 'use-debounce'
import 'highlight.js/styles/github.css'

import styles from './index.module.less'

const PreCode = (props) => {
  const ref = useRef(null)
  const refText = ref.current?.innerText
  const [mermaidCode, setMermaidCode] = useState('')

  const renderMermaid = useDebouncedCallback(() => {
    if (!ref.current) return
    const mermaidDom = ref.current.querySelector('code.language-mermaid')
    if (mermaidDom) {
      setMermaidCode(mermaidDom.innerText)
    }
  }, 600)

  useEffect(() => {
    setTimeout(renderMermaid, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refText])

  const copyTextToClipboard = async (copyText) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(copyText)
        message.success('已成功复制到剪贴板')
      }
    } catch (err) {
      message.error(`复制到剪贴板失败:${err.message}`)
    }
  }

  return (
    <section>
      {mermaidCode.length > 0 && <Mermaid code={mermaidCode} key={mermaidCode} />}
      <div className={styles.copyBtn} onClick={() => copyTextToClipboard(refText)}>
        复制代码
      </div>
      <pre className={styles.preCode} ref={ref}>
        {props.children}
      </pre>
    </section>
  )
}

const ReMarkdown = ({ markdownText }) => (
  <section className={styles.markdownBody}>
    <ReactMarkdown
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[
        RehypeKatex,
        RehypeRaw,
        [
          RehypeHighlight,
          {
            detect: false,
            ignoreMissing: true
          }
        ]
      ]}
      components={{
        pre: PreCode,
        p: (pProps) => <p {...pProps} dir='auto' />,
        a: (aProps) => {
          const href = aProps.href || ''
          const isInternal = /^\/#/i.test(href)
          const target = isInternal ? '_self' : aProps.target ?? '_blank'
          return <a {...aProps} target={target} />
        }
      }}
    >
      {markdownText}
    </ReactMarkdown>
  </section>
)

export default ReMarkdown
