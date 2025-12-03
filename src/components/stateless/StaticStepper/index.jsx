import React, { useState } from 'react'
import clsx from 'clsx'
import { Check, Copy } from 'lucide-react'
import copy from 'copy-to-clipboard'

const StaticStep = ({ step, title, children, titleClassName, stepClassName }) => {
  return (
    <div className='flex gap-4 md:gap-6'>
      <div className='flex flex-col items-center'>
        <p
          className={clsx(
            'flex size-8 flex-none items-center justify-center rounded-full border border-neutral-400/20 bg-neutral-100 text-sm font-medium text-[var(--foreground)] select-none dark:border-neutral-400/10 dark:bg-neutral-800 dark:text-[var(--foreground)] dark:hover:bg-neutral-800/80',
            stepClassName
          )}
        >
          {step}
        </p>
        <div className='relative my-2 h-full w-px rounded-full bg-neutral-200 dark:bg-neutral-700' />
      </div>
      <div className='mb-4 w-full'>
        <h6 className={clsx('mb-4 ml-1 text-lg font-medium tracking-tight text-[var(--foreground)]', titleClassName)}>
          {title}
        </h6>
        {children}
      </div>
    </div>
  )
}

const CodeContainer = ({ children }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    copy(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='relative h-fit w-full rounded-lg border border-neutral-400/20 bg-neutral-100 px-5 py-3 transition-colors duration-300 dark:border-neutral-400/10 dark:bg-neutral-800 dark:hover:bg-neutral-800/80'>
      <code className={clsx('text-sm whitespace-pre-wrap text-[var(--foreground)] opacity-80')}>{children}</code>
      <button
        onClick={handleCopy}
        className='absolute top-2 right-2 rounded-md p-1 text-neutral-500 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700'
        aria-label='Copy code'
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  )
}

const StaticStepper = {
  StaticStep,
  CodeContainer
}
export default StaticStepper
