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
        className="relative flex size-4 cursor-pointer bg-transparent text-base leading-6 font-normal text-zinc-500 transition-colors duration-150 ease-in-out dark:text-zinc-400"
        onClick={copyToClipboard}
        type="button"
      >
        {isCopied ? (
          <CheckIcon className="block size-4 align-middle" />
        ) : (
          <CopyIcon className="block size-4 align-middle" />
        )}
      </button>
    </>
  )
}

export default CopyToClipboard
