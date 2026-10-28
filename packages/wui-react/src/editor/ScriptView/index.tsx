'use client'

import AnimatedIcon from '../../AnimatedIcon'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Highlight, themes } from 'prism-react-renderer'
import { useCopyToClipboard } from '../../data-display/CopyToClipboard/useCopyed'
import styles from './index.module.less'

export interface ScriptViewProps {
  showMultiplePackageOptions?: boolean
  codeLanguage?: string
  commandMap: Record<string, string>
  className?: string
  theme?: 'light' | 'dark'
  copyLabel?: string
  onCopyError?: (error: unknown) => void
}
const ScriptView = ({
  showMultiplePackageOptions = true,
  codeLanguage = 'bash',
  commandMap,
  className,
  theme = 'light',
  copyLabel = 'Copy command',
  onCopyError,
}: ScriptViewProps) => {
  const isDark = theme === 'dark'
  const packageManagers = Object.keys(commandMap)
  const [selected, setPackageManager] = useState(packageManagers[0] ?? '')
  const packageManager = selected in commandMap ? selected : (packageManagers[0] ?? '')
  const command = commandMap[packageManager] ?? ''
  const [, copy, copied] = useCopyToClipboard({ onError: onCopyError })
  const copyToClipboard = () => {
    void copy(command)
  }

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''} ${className || ''}`}>
      <div className={styles.wrapper}>
        {showMultiplePackageOptions && (
          <div className={styles.header}>
            <div className={styles.tabs}>
              {packageManagers.map((pm) => (
                <div key={pm} className={styles.tabItem}>
                  <button
                    type="button"
                    aria-pressed={packageManager === pm}
                    className={`${styles.tabButton} ${packageManager === pm ? styles.active : ''}`}
                    onClick={() => setPackageManager(pm)}
                  >
                    {pm}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.codeWrapper}>
          <div className={styles.codeContent}>
            <Highlight theme={isDark ? themes.dracula : themes.github} code={command} language={codeLanguage}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={className}
                  style={{
                    ...style,
                    background: 'transparent',
                    margin: 0,
                    padding: '0.625rem 1rem',
                    overflowX: 'auto',
                  }}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
          <button
            className={styles.copyButton}
            onClick={copyToClipboard}
            type="button"
            aria-label={copyLabel}
            title={copyLabel}
          >
            {copied ? (
              <AnimatedIcon variant="spin" mode="hover">
                <Check className={`${styles.icon} ${styles.checkIcon}`} />
              </AnimatedIcon>
            ) : (
              <AnimatedIcon variant="spin" mode="hover">
                <Copy className={styles.icon} />
              </AnimatedIcon>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScriptView
