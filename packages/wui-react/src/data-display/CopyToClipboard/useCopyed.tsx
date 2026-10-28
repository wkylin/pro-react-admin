import { useCallback, useEffect, useRef, useState } from 'react'
export interface ClipboardOptions {
  isCopiedDelay?: number
  onError?: (error: unknown) => void
}
export type CopiedValue = string | null
export type CopyFn = (text: string) => Promise<boolean>
export function useCopyToClipboard({ isCopiedDelay = 2000, onError }: ClipboardOptions = {}): [
  CopiedValue,
  CopyFn,
  boolean,
] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)
  const [isCopied, setIsCopied] = useState(false)
  const mounted = useRef(false)
  const request = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      request.current++
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])
  const copy: CopyFn = useCallback(
    async (text) => {
      const id = ++request.current
      try {
        if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText)
          throw new Error('Clipboard is unavailable')
        await navigator.clipboard.writeText(text)
        if (!mounted.current || id !== request.current) return false
        if (timer.current) clearTimeout(timer.current)
        setCopiedText(text)
        setIsCopied(true)
        timer.current = setTimeout(
          () => {
            setIsCopied(false)
            timer.current = null
          },
          Math.max(0, isCopiedDelay)
        )
        return true
      } catch (error) {
        if (mounted.current && id === request.current) {
          setCopiedText(null)
          setIsCopied(false)
          onError?.(error)
        }
        return false
      }
    },
    [isCopiedDelay, onError]
  )
  return [copiedText, copy, isCopied]
}
