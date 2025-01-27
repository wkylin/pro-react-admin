import React from 'react'
import ShikiCode from '@stateless/CodeHighlighter'
import CopyToClipboard from '@stateless/CopyToClipboard'
import clsx from 'clsx'

const AdvancedCodeBlock = ({ code, fileName, lang = 'typescript', theme = 'github-light', className, ...props }) => {
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
        <ShikiCode code={code} lang={lang} theme={theme} />
      </div>
    </figure>
  )
}

export default AdvancedCodeBlock
