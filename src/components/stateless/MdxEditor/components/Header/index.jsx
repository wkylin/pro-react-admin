import React from 'react'
import { Download, Copy, Moon, Sun, PenTool } from 'lucide-react'
import styles from './index.module.less'

export default function Header({ theme, onThemeChange, onCopy, onDownload }) {
  return (
    <header className={styles.mdxHeader}>
      <div className={styles.mdxBrand}>
        <PenTool className={styles.mdxLogoIcon} />
        <span>Pro MDX Editor</span>
      </div>
      <div className={styles.mdxHeaderActions}>
        <button className={styles.mdxIconBtn} onClick={onThemeChange} title="切换主题">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className={styles.mdxIconBtn} onClick={onDownload} title="下载文件">
          <Download size={18} />
        </button>
        <button className={styles.mdxCopyBtn} onClick={onCopy} title="复制 Markdown">
          <Copy size={18} />
        </button>
      </div>
    </header>
  )
}
