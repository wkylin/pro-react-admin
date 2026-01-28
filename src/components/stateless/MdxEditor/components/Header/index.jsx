import AnimatedIcon from '@stateless/AnimatedIcon'
import React from 'react'
import { Download, Copy, Moon, Sun, PenTool } from 'lucide-react'
import styles from './index.module.less'

export default function Header({ theme, onThemeChange, onCopy, onDownload }) {
  return (
    <header className={styles.mdxHeader}>
      <div className={styles.mdxBrand}>
        <AnimatedIcon variant="spin" mode="hover">
          <PenTool className={styles.mdxLogoIcon} />
        </AnimatedIcon>
        <span>Pro MDX Editor</span>
      </div>
      <div className={styles.mdxHeaderActions}>
        <button className={styles.mdxIconBtn} onClick={onThemeChange} title="切换主题">
          {theme === 'dark' ? (
            <AnimatedIcon variant="spin" mode="hover">
              <Sun size={18} />
            </AnimatedIcon>
          ) : (
            <AnimatedIcon variant="spin" mode="hover">
              <Moon size={18} />
            </AnimatedIcon>
          )}
        </button>
        <button className={styles.mdxIconBtn} onClick={onDownload} title="下载文件">
          <AnimatedIcon variant="spin" mode="hover">
            <Download size={18} />
          </AnimatedIcon>
        </button>
        <button className={styles.mdxCopyBtn} onClick={onCopy} title="复制 Markdown">
          <AnimatedIcon variant="spin" mode="hover">
            <Copy size={18} />
          </AnimatedIcon>
        </button>
      </div>
    </header>
  )
}
