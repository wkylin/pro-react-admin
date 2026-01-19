import React, { memo } from 'react'
import styles from './index.module.less'

function SourceView({ markdown, onChange, onScroll, scrollRef }) {
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
