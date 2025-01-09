import React from 'react'
import clsx from 'clsx'

const StaticStep = ({ step, title, children }) => {
  return (
    <div className="flex gap-6 ">
      <div className="flex flex-col items-center">
        <p className="flex items-center justify-center flex-none text-sm font-medium border rounded-full select-none size-8 border-neutral-400/20 bg-neutral-100 text-neutral-700 dark:border-neutral-400/10 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80">
          {step}
        </p>
        <div className="relative w-px h-full my-2 rounded-full bg-neutral-200 dark:bg-neutral-700" />
      </div>
      <div className="w-full mb-4">
        <h6 className="mb-4 ml-1 text-lg font-medium tracking-tight text-neutral-700 dark:text-neutral-50">{title}</h6>
        {children}
      </div>
    </div>
  )
}

const CodeContainer = ({ children }) => {
  return (
    <div className="w-full px-5 py-3 transition-colors duration-300 border rounded-lg h-fit border-neutral-400/20 bg-neutral-100 dark:border-neutral-400/10 dark:bg-neutral-800 dark:hover:bg-neutral-800/80">
      <code className={clsx('whitespace-pre-wrap text-sm text-neutral-500 dark:text-neutral-300')}>{children}</code>
    </div>
  )
}

const StaticStepper = {
  StaticStep,
  CodeContainer,
}
export default StaticStepper
