import React, { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'
import clsx from 'clsx'

const ShikiCode = ({ code, lang, theme, className, ...props }) => {
  const [html, setHtml] = useState('')

  useEffect(async () => {
    const loadHtml = async () => {
      const result = await codeToHtml(code, { lang, theme })
      setHtml(result)
    }

    loadHtml()
  }, [code, lang, theme])

  return (
    <div
      className={clsx('text-sm hue-rotate-0 invert-0 *:bg-transparent dark:hue-rotate-180 dark:invert', className)}
      {...props}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default ShikiCode
