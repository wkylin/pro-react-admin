import React, { useRef, useEffect } from 'react'
import type { Transformer } from 'markmap-lib'
import type { Markmap } from 'markmap-view'

/*
  Optimized Markmap React wrapper:
  - dynamic imports for `markmap-lib` and `markmap-view` to avoid SSR/bundle issues
  - reuse transformer instance per component via ref
  - debounce heavy operations with requestAnimationFrame
  - robust error handling and cleanup
*/

interface MarkmapHooksProps {
  markmap: string
  debounceDelay?: number
}

const MarkmapHooks = ({ markmap, debounceDelay = 200 }: MarkmapHooksProps) => {
  const refSvg = useRef<SVGSVGElement | null>(null)
  const mmRef = useRef<Markmap | null>(null)
  const transformerRef = useRef<Transformer | null>(null)
  const rafRef = useRef<number | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isReady, setIsReady] = React.useState(false)

  // Initialize markmap and transformer on client only
  useEffect(() => {
    let cancelled = false

    const init = async () => {
      try {
        const [{ Transformer }, { Markmap }] = await Promise.all([import('markmap-lib'), import('markmap-view')])

        if (cancelled) return

        // create transformer once per component
        transformerRef.current = transformerRef.current || new Transformer()

        // create markmap instance if svg exists
        if (refSvg.current && !mmRef.current) {
          try {
            mmRef.current = Markmap.create(refSvg.current)
            setIsReady(true) // Trigger re-run of the effect below
          } catch (err) {
            console.error('Markmap.create error:', err)
          }
        }
      } catch (err) {
        console.error('Failed to load markmap libraries:', err)
      }
    }

    init()

    return () => {
      cancelled = true
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      if (mmRef.current) {
        try {
          mmRef.current.destroy()
        } catch (err) {
          console.warn('Error destroying markmap instance:', err)
        }
        mmRef.current = null
      }
    }
  }, [])

  // Update markmap when `markmap` prop changes or when libraries are ready.
  useEffect(() => {
    const transformer = transformerRef.current
    const markmapInstance = mmRef.current
    if (!isReady || !transformer || !markmapInstance) return

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        try {
          const { root } = transformer.transform(markmap || '')
          markmapInstance.setData(root)
          // fit may cause layout thrashing; keep it but guard with try/catch
          try {
            markmapInstance.fit()
          } catch (err) {
            console.warn('markmap fit failed:', err)
          }
        } catch (err) {
          console.error('Markmap render error:', err)
        }
      })
    }, debounceDelay)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [markmap, debounceDelay, isReady])

  return <svg aria-hidden="true" style={{ width: '100%', height: 400 }} ref={refSvg} />
}

export default MarkmapHooks
