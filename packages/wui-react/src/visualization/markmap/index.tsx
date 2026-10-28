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
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let cancelled = false
    let instance: Markmap | undefined
    let observer: ResizeObserver | undefined
    let svg: SVGSVGElement | undefined
    const timer = setTimeout(
      async () => {
        try {
          const [{ Transformer }, { Markmap }] = await loadMarkmap()
          if (cancelled || !host.current) return
          // Disable asset-loading plugins: caller content must never fetch scripts or styles.
          const transformer = new Transformer([])
          const { root } = transformer.transform(markmap)
          const clean = (node: typeof root) => {
            node.content = sanitizeMarkmapHtml(node.content)
            node.children?.forEach(clean)
          }
          clean(root)
          // Each effect owns a separate SVG: late renderer work can only touch its detached tree.
          svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          svg.style.width = '100%'
          svg.style.height = '100%'
          svg.setAttribute('aria-hidden', 'true')
          host.current.append(svg)
          instance = Markmap.create(svg, { ...options, duration: 0, autoFit: false })
          await instance.setData(root)
          if (cancelled) return
          await instance.fit()
          if (cancelled) return
          if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(() => {
              if (!cancelled)
                void instance?.fit().catch((error) => {
                  if (!cancelled) onError?.(error)
                })
            })
            observer.observe(svg)
          }
        } catch (error) {
          if (!cancelled) onError?.(error)
        } finally {
          if (cancelled) svg?.replaceChildren()
        }
      },
      Math.max(0, debounceDelay)
    )
    return () => {
      cancelled = true
      clearTimeout(timer)
      observer?.disconnect()
      svg?.remove()
      instance?.destroy()
    }
  }, [markmap, debounceDelay, options, onError])
  return <div role="img" aria-label={ariaLabel} ref={host} style={{ width: '100%', height: 400, ...style }} />
}
