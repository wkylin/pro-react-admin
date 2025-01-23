import React from 'react'
import styles from './index.module.less'

const TagCloud = () => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="not-prose my-5 w-full">
        <ul className="flex w-full flex-wrap items-center justify-center gap-3">
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            'use server'
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            useOptimistic
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            React Server Components
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            Concurrent Rendering
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            useActionState
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            Improved Hydration
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            Form Actions
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            Server Actions
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            Suspense
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            'use client'
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            useTransition
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            React Compiler
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            Streaming
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            useFormStatus
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            New React Hooks
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            use()
          </li>
          <li className="flex h-10 items-center justify-center rounded-sm border border-[#DEDFE2] bg-linear-to-b from-[#E8E9EC] to-[#D7D9E1] px-5 text-center text-sm font-medium dark:border-[#484F60] dark:from-[#343A4D] dark:to-[#2A3043] dark:font-normal sm:h-12 sm:px-7 sm:text-lg">
            Automatic Memoization
          </li>
        </ul>
      </div>
      <div className={styles.mask}></div>
    </div>
  )
}

export default TagCloud
