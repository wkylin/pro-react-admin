import React from 'react'
import type { HTMLAttributes } from 'react'
import type { BundledLanguage, BundledTheme } from 'shiki'
import ShikiCode from '@stateless/CodeHighlighter'
import CopyToClipboard from '@stateless/CopyToClipboard'
import clsx from 'clsx'

type AdvancedBlockProps = {
  code: string
  fileName?: string
  lang?: BundledLanguage
  theme?: BundledTheme
  className?: string
}

export const AdvancedCodeBlock = ({
  code,
  fileName,
  lang = 'typescript',
  theme = 'github-light',
  className,
  ...props
}: AdvancedBlockProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <figure
      className={clsx(
        '-mt-1 relative flex w-full flex-col flex-wrap rounded-2xl bg-neutral-200/70 text-white leading-6 dark:bg-[rgb(33,33,38)]',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between px-5 py-3">
        <figcaption className="mr-[-48px] max-w-full whitespace-nowrap font-medium text-neutral-600 text-xs dark:text-neutral-200">
          <span>{fileName ?? <br />}</span>
        </figcaption>
        <CopyToClipboard code={code} />
      </div>
      <div className="w-full px-1 pb-1">
        <div className="relative overflow-hidden border-t shadow-xs isolate rounded-xl border-white/80 shadow-black/5 dark:border-white/15 dark:shadow-black/10">
          <pre
            className="py-4 overflow-x-auto overflow-y-auto text-sm leading-6 text-white bg-white/50 dark:bg-zinc-700/50"
            style={{ paddingRight: '10px' }}
          >
            <ShikiCode code={code} lang={lang} theme={theme} />
          </pre>
        </div>
      </div>
    </figure>
  )
}
