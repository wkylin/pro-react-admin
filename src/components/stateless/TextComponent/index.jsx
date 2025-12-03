import React from 'react'
import clsx from 'clsx'

const TextComponent = ({ number, title, content, isOpen, loadingWidthPercent }) => {
  return (
    <div
      className={clsx(
        'transform-gpu rounded-xl border transition-all duration-300',
        isOpen
          ? 'border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-900/50'
          : 'scale-95 border-transparent opacity-60 hover:opacity-100'
      )}
    >
      <div className="flex w-full items-center gap-4 p-4">
        <span
          className={clsx(
            'flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-colors',
            isOpen
              ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
              : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
          )}
        >
          {number}
        </span>
        <h2
          className={clsx(
            'text-left text-lg font-medium transition-colors',
            isOpen ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-400'
          )}
        >
          {title}
        </h2>
      </div>
      <div
        className={clsx(
          'w-full transform-gpu overflow-hidden text-left transition-all duration-500 ease-in-out',
          isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <p className="px-4 pb-4 text-base text-neutral-600 dark:text-neutral-400">{content}</p>
        <div className="w-full px-4 pb-4">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div
              className={clsx(
                'absolute top-0 left-0 h-full bg-neutral-900 transition-all duration-300 dark:bg-neutral-100'
              )}
              style={{ width: `${loadingWidthPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextComponent
