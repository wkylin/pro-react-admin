'use client'

import AnimatedIcon from '@stateless/AnimatedIcon'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Highlight, themes } from 'prism-react-renderer'
import { useProThemeContext } from '@src/theme/hooks'
import styles from './index.module.less'

const ScriptView = ({ showMultiplePackageOptions = true, codeLanguage = 'bash', commandMap, className }) => {
  const { themeSettings } = useProThemeContext()
  const isDark = themeSettings.themeMode === 'dark'

  const packageManagers = Object.keys(commandMap)
  const [packageManager, setPackageManager] = useState(packageManagers[0])
  const [copied, setCopied] = useState(false)
  const command = commandMap[packageManager]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''} ${className || ''}`}>
      <div className={styles.wrapper}>
        {showMultiplePackageOptions && (
          <div className={styles.header}>
            <div className={styles.tabs}>
              {packageManagers.map((pm, index) => (
                <div key={pm} className={styles.tabItem}>
                  <button
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
          <button className={styles.copyButton} onClick={copyToClipboard} title="Copy command">
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
