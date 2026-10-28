import { useEffect, useId, useState, type CSSProperties } from 'react'
import type { MermaidConfig } from 'mermaid'
import { loadMermaid } from '../engines'
import { sanitizeDiagramSvg } from '../sanitize'
export type { MermaidConfig } from 'mermaid'
export type MermaidHooksProps = {
  chart: string
  config?: MermaidConfig
  debounceDelay?: number
  ariaLabel?: string
  style?: CSSProperties
  onError?: (error: unknown) => void
}
// Mermaid initialization is global: serialize initialization AND rendering for our instances.
let renderQueue: Promise<void> = Promise.resolve()
let sequence = 0
export default function MermaidHooks({
  chart,
  config,
  debounceDelay = 200,
  ariaLabel = 'Diagram',
  style,
  onError,
}: MermaidHooksProps) {
  const id = useId().replace(/[^\w-]/g, '')
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let cancelled = false
    setSvg('')
    setError('')
    setLoading(Boolean(chart))
    if (!chart) return
    const timer = setTimeout(
      () => {
        const job = async () => {
          if (cancelled) return
          try {
            const mermaid = await loadMermaid()
            if (cancelled) return
            mermaid.initialize({
              ...config,
              startOnLoad: false,
              htmlLabels: false,
              securityLevel: config?.securityLevel ?? 'strict',
              flowchart: { ...config?.flowchart, htmlLabels: false },
            })
            const { svg: result } = await mermaid.render(`wui-mermaid-${id}-${sequence++}`, chart)
            if (!cancelled) setSvg(sanitizeDiagramSvg(result))
          } catch (reason) {
            if (!cancelled) {
              setError(reason instanceof Error ? reason.message : String(reason))
              onError?.(reason)
            }
          } finally {
            if (!cancelled) setLoading(false)
          }
        }
        renderQueue = renderQueue.then(job, job)
      },
      Math.max(0, debounceDelay)
    )
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [chart, config, debounceDelay, id, onError])
  return (
    <div style={{ minHeight: 100, ...style }} aria-busy={loading}>
      {error ? (
        <pre role="alert">{error}</pre>
      ) : (
        <div role="img" aria-label={ariaLabel} dangerouslySetInnerHTML={{ __html: svg }} />
      )}
    </div>
  )
}
