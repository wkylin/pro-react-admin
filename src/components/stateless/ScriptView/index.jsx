'use client'

import React, { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { motion } from 'motion/react'
import clsx from 'clsx'

import styles from './index.module.less'

const ScriptView = ({ showMultiplePackageOptions = true, codeLanguage, commandMap, className }) => {
  const packageManagers = Object.keys(commandMap)
  const [packageManager, setPackageManager] = useState(packageManagers[0])
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState('')
  const command = commandMap[packageManager]

  useEffect(async () => {
    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import('shiki')
        const highlighted = await codeToHtml(command, {
          lang: codeLanguage,
          defaultColor: 'light',
          theme: 'github-dark',
          wrap: false,
        })
        setHighlightedCode(highlighted)
      } catch (error) {
        setHighlightedCode(`<pre>${command}</pre>`)
      }
    }

    loadHighlightedCode()
  }, [command, codeLanguage])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={clsx('mx-auto flex max-w-md items-center justify-center', className)}>
      <div className="w-full space-y-2">
        <div className="mb-2 flex items-center justify-between">
          {showMultiplePackageOptions && (
            <div className="relative">
              <div className="border-border inline-flex overflow-hidden rounded-md border text-xs">
                {packageManagers.map((pm, index) => (
                  <div key={pm} className="flex items-center">
                    {index > 0 && <div className={`h-4 w-px ${styles['bg-border']}`} aria-hidden="true" />}
                    <span
                      className={`bg-background hover:bg-background text-primary relative cursor-pointer rounded-none px-2 py-1`}
                      onClick={() => setPackageManager(pm)}
                    >
                      {pm}
                      {packageManager === pm && (
                        <motion.div
                          className={`absolute inset-x-0 bottom-[1px] mx-auto h-0.5 w-[90%] ${styles['bg-primary']}`}
                          layoutId="activeTab"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative flex items-center">
          <div className="min-w-[300px] grow font-mono">
            {highlightedCode ? (
              <div
                className={`${styles.pre} light [&>pre]:overflow-x-auto [&>pre]:rounded-md [&>pre]:p-2 [&>pre]:px-4 [&>pre]:font-mono`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            ) : (
              <pre
                className={`${styles.pre} border-border rounded-md border bg-white p-2 px-4 font-mono dark:bg-black`}
              >
                {command}
              </pre>
            )}
          </div>
          <span className="relative ml-2 cursor-pointer rounded-md" onClick={copyToClipboard}>
            <span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
            <Copy className={`h-4 w-4 transition-all duration-300 ${copied ? 'scale-0' : 'scale-100'}`} />
            <Check
              className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
                copied ? 'scale-100' : 'scale-0'
              }`}
            />
          </span>
        </div>
      </div>
    </div>
  )
}

export default ScriptView
