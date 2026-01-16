import React, { memo } from 'react'
import styles from './index.module.less'

function SourceView({ markdown, onChange }) {
  return (
    <div className={`${styles.mdxSourceCol} mdxSourceCol`}>
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
