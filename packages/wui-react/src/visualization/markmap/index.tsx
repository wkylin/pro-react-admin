import { useEffect, useRef, type CSSProperties } from 'react'
import type { Markmap, IMarkmapOptions } from 'markmap-view'
import { loadMarkmap } from '../engines'
import { sanitizeMarkmapHtml } from '../sanitize'
export type MarkmapHooksProps = {
  markmap: string
  debounceDelay?: number
  options?: Partial<IMarkmapOptions>
  ariaLabel?: string
  style?: CSSProperties
  onError?: (error: unknown) => void
}
export default function MarkmapHooks({
  markmap,
  debounceDelay = 200,
  options,
  ariaLabel = 'Mind map',
  style,
  onError,
}: MarkmapHooksProps) {
  const svg = useRef<SVGSVGElement>(null)
  useEffect(() => {
    let cancelled = false
    let instance: Markmap | undefined
    let observer: ResizeObserver | undefined
    const timer = setTimeout(
      async () => {
        try {
          const [{ Transformer }, { Markmap }] = await loadMarkmap()
          if (cancelled || !svg.current) return
          // Disable asset-loading plugins: caller content must never fetch scripts or styles.
          const transformer = new Transformer([])
          const { root } = transformer.transform(markmap)
          const clean = (node: typeof root) => {
            node.content = sanitizeMarkmapHtml(node.content)
            node.children?.forEach(clean)
          }
          clean(root)
          instance = Markmap.create(svg.current, { ...options, duration: 0 }, root)
          await instance.fit()
          if (cancelled) return
          if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(() => {
              if (!cancelled)
                void instance?.fit().catch((error) => {
                  if (!cancelled) onError?.(error)
                })
            })
            observer.observe(svg.current)
          }
        } catch (error) {
          if (!cancelled) onError?.(error)
        }
      },
      Math.max(0, debounceDelay)
    )
    return () => {
      cancelled = true
      clearTimeout(timer)
      observer?.disconnect()
      instance?.destroy()
    }
  }, [markmap, debounceDelay, options, onError])
  return <svg role="img" aria-label={ariaLabel} ref={svg} style={{ width: '100%', height: 400, ...style }} />
}
