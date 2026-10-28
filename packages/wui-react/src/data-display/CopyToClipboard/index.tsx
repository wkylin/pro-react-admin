import type { ButtonHTMLAttributes } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { useCopyToClipboard, type ClipboardOptions } from './useCopyed'
import styles from '../display.module.less'
export * from './useCopyed'
export interface CopyToClipboardProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onError'>, ClipboardOptions {
  code: string
  label?: string
  copiedLabel?: string
  onCopy?: () => void
}
export default function CopyToClipboard({
  code,
  label = 'Copy',
  copiedLabel = 'Copied',
  isCopiedDelay,
  onError,
  onCopy,
  onClick,
  className = '',
  ...props
}: CopyToClipboardProps) {
  const [, copy, copied] = useCopyToClipboard({ isCopiedDelay, onError })
  return (
    <button
      {...props}
      type="button"
      aria-label={copied ? copiedLabel : label}
      title={copied ? copiedLabel : label}
      className={`${styles.copy} ${className}`}
      onClick={async (event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (await copy(code)) onCopy?.()
      }}
    >
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
    </button>
  )
}
