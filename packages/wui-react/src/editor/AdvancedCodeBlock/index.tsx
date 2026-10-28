import type { HTMLAttributes } from 'react'
import CodeHighlighter, { type CodeHighlighterProps } from '../CodeHighlighter'
import CopyToClipboard from '../../data-display/CopyToClipboard'
import styles from '../editor.module.less'
export interface AdvancedCodeBlockProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  code: string
  fileName?: string
  lang?: CodeHighlighterProps['lang']
  theme?: CodeHighlighterProps['theme']
  copyLabel?: string
}
export default function AdvancedCodeBlock({
  code,
  fileName,
  lang,
  theme,
  copyLabel,
  className = '',
  ...props
}: AdvancedCodeBlockProps) {
  return (
    <figure {...props} className={`${styles.codeBlock} ${className}`}>
      <figcaption className={styles.header}>
        <span>{fileName}</span>
        <CopyToClipboard code={code} label={copyLabel} />
      </figcaption>
      <CodeHighlighter code={code} lang={lang} theme={theme} />
    </figure>
  )
}
