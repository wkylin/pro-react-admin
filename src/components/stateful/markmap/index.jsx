import React, { useRef, useEffect } from 'react'

/*
  Optimized Markmap React wrapper:
  - dynamic imports for `markmap-lib` and `markmap-view` to avoid SSR/bundle issues
  - reuse transformer instance per component via ref
  - debounce heavy operations with requestAnimationFrame
  - robust error handling and cleanup
*/

const MarkmapHooks = ({ markmap, debounceDelay = 200 }) => {
  const refSvg = useRef(null)
  const mmRef = useRef(null)
  const transformerRef = useRef(null)
  const rafRef = useRef(null)
  const debounceRef = useRef(null)
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
    if (!isReady || !transformerRef.current || !mmRef.current) return

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        try {
          const { root } = transformerRef.current.transform(markmap || '')
          mmRef.current.setData(root)
          // fit may cause layout thrashing; keep it but guard with try/catch
          try {
            mmRef.current.fit()
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

  return <svg aria-hidden='true' style={{ width: '100%', height: 400 }} ref={refSvg} />
}

export default MarkmapHooks
