import React from 'react'
import { Download, Copy, Moon, Sun, PenTool } from 'lucide-react'
import styles from './index.module.less'

export default function Header({
  title,
  labels,
  theme,
  onThemeChange,
  onCopy,
  onDownload,
}: {
  title?: string
  labels: { theme?: string; copy?: string; download?: string }
  theme: string
  onThemeChange: () => void
  onCopy: () => void
  onDownload: () => void
}) {
  return (
    <header className={styles.mdxHeader}>
      <div className={styles.mdxBrand}>
        <PenTool className={styles.mdxLogoIcon} />
        <span>{title}</span>
      </div>
      <div className={styles.mdxHeaderActions}>
        <button
          className={styles.mdxIconBtn}
          onClick={onThemeChange}
          type="button"
          aria-label={labels.theme ?? 'Toggle theme'}
          title={labels.theme ?? 'Toggle theme'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className={styles.mdxIconBtn}
          onClick={onDownload}
          type="button"
          aria-label={labels.download ?? 'Download'}
          title={labels.download ?? 'Download'}
        >
          <Download size={18} />
        </button>
        <button
          className={styles.mdxCopyBtn}
          onClick={onCopy}
          type="button"
          aria-label={labels.copy ?? 'Copy Markdown'}
          title={labels.copy ?? 'Copy Markdown'}
        >
          <Copy size={18} />
        </button>
      </div>
    </header>
  )
}
