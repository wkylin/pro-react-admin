import React, { memo } from 'react'
import type { RefObject, UIEventHandler } from 'react'
import styles from './index.module.less'

type SourceViewProps = {
  readOnly?: boolean
  label?: string
  markdown: string
  onChange: (markdown: string) => void
  onScroll?: UIEventHandler<HTMLDivElement>
  scrollRef?: RefObject<HTMLDivElement | null>
}

function SourceView({ markdown, onChange, onScroll, scrollRef, readOnly, label }: SourceViewProps) {
  return (
    <div className={`${styles.mdxSourceCol} mdxSourceCol`} ref={scrollRef} onScroll={onScroll}>
      <textarea
        readOnly={readOnly}
        aria-label={label ?? 'Markdown source'}
        className={styles.mdxSourceTextarea}
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        placeholder="在此输入 Markdown..."
      />
    </div>
  )
}

export default memo(SourceView)
