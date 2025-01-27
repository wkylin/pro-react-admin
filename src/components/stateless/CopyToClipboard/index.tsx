import React, { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'

const CopyToClipboard = ({ code }: Readonly<{ code: string }>) => {
  const [isCopied, setIsCopied] = useState(false)
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
    } catch (_error) {
      setIsCopied(false)
    } finally {
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  return (
    <>
      <button
        className="relative flex text-base font-normal leading-6 transition-colors duration-150 ease-in-out bg-transparent cursor-pointer size-4 text-zinc-500 dark:text-zinc-400"
        onClick={copyToClipboard}
        type="button"
      >
        {isCopied ? (
          <CheckIcon className="block align-middle size-4" />
        ) : (
          <CopyIcon className="block align-middle size-4" />
        )}
      </button>
    </>
  )
}

export default CopyToClipboard
