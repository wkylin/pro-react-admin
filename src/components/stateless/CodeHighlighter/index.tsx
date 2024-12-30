import React, { useState, useEffect } from 'react'
import { type BundledLanguage, type BundledTheme, codeToHtml } from 'shiki'
import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

type ShikiProps = {
  code: string
  lang: BundledLanguage
  theme: BundledTheme
  className?: string
}

export default function ShikiCode({
  code,
  lang,
  theme,
  className,
  ...props
}: Readonly<ShikiProps> & HTMLAttributes<HTMLDivElement>) {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
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
