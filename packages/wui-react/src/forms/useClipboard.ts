import { useEffect, useRef, useState } from 'react'
/** Local feedback only: no application notifications or browser access during render. */
export function useClipboard() {
  const [copied, setCopied] = useState(false)
  const mounted = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      clearTimeout(timer.current)
    }
  }, [])
  const copy = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      if (mounted.current) {
        clearTimeout(timer.current)
        setCopied(true)
        timer.current = setTimeout(() => setCopied(false), 1500)
      }
      return true
    } catch {
      if (mounted.current) setCopied(false)
      return false
    }
  }
  return { copied, copy }
}
