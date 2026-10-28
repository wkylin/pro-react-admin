import AnimatedIcon from '../../AnimatedIcon'
import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { useCopyToClipboard } from '../../data-display/CopyToClipboard/useCopyed'
import layout from '../editor.module.less'
import { Copy as CopyOutlined, Check as CheckCircleTwoTone } from 'lucide-react'
import styles from './index.module.less'

export interface ShiCodeProps {
  preCode: string
  fileName?: string
  language?: string
  copyLabel?: string
}
const ShiCode = ({ preCode, fileName, language = 'jsx', copyLabel = 'Copy code' }: ShiCodeProps) => {
  const [, copyToClipboard, copied] = useCopyToClipboard()
  const handleClickCopy = () => {
    copyToClipboard(preCode)
  }

  return (
    <div className={layout.codeBlock}>
      <header className={layout.header}>
        <span>{fileName}</span>
        <button type="button" onClick={handleClickCopy} aria-label={copyLabel} title={copyLabel}>
          <AnimatedIcon variant="spin" mode="hover">
            {copied ? <CheckCircleTwoTone /> : <CopyOutlined />}
          </AnimatedIcon>
        </button>
      </header>
      <div>
        <Highlight theme={themes.dracula} code={preCode} language={language}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre className={styles.pre} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, className: styles.line })}>
                  <span className={styles['line-no']}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

export default ShiCode
