import React, { memo } from 'react'
import type { RefObject, UIEventHandler } from 'react'
import styles from './index.module.less'

type SourceViewProps = {
  markdown: string
  onChange: (markdown: string) => void
  onScroll?: UIEventHandler<HTMLDivElement>
  scrollRef?: RefObject<HTMLDivElement | null>
}

function SourceView({ markdown, onChange, onScroll, scrollRef }: SourceViewProps) {
  return (
    <div className={`${styles.mdxSourceCol} mdxSourceCol`} ref={scrollRef} onScroll={onScroll}>
      <textarea
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
