import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

const TextComponent = ({ number, title, content, isOpen, loadingWidthPercent }) => {
  return (
    <div
      className={clsx(
        'transform-gpu rounded-lg border transition-all',
        isOpen
          ? 'border-neutral-500/10 bg-gradient-to-b from-neutral-200/15 to-neutral-200/5 dark:border-neutral-500/15 dark:from-neutral-600/15 dark:to-neutral-600/5 dark:shadow-[2px_4px_25px_0px_rgba(248,248,248,0.06)_inset] '
          : 'scale-90 border-transparent opacity-50 saturate-0'
      )}
    >
      <div className="flex items-center w-full gap-4 p-4">
        <p
          className={clsx(
            'inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-neutral-500/20 text-neutral-600'
          )}
        >
          {number}
        </p>
        <h2 className={clsx('text-left text-xl font-medium text-neutral-800 dark:text-neutral-200')}>{title}</h2>
      </div>
      <div
        className={clsx(
          'w-full transform-gpu overflow-hidden text-left text-neutral-600 transition-all duration-500 dark:text-neutral-400',
          isOpen ? ' max-h-64' : 'max-h-0'
        )}
      >
        <p className="p-4 text-lg">{content}</p>
        <div className="w-full px-4 pb-4">
          <div className="relative w-full h-1 overflow-hidden rounded-full">
            <div
              className={clsx('absolute left-0 top-0 h-1 bg-neutral-500')}
              style={{ width: `${loadingWidthPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextComponent
