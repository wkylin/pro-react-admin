import React, { useEffect, useState, useRef, useId } from 'react'

const MermaidHooks = ({ chart, config }) => {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  // Generate a unique ID for mermaid to use for rendering
  // useId returns string with colons which might be problematic for selectors, strip them
  const id = useId().replace(/:/g, '')
  const mermaidId = `mermaid-${id}`

  useEffect(() => {
    let isMounted = true

    const renderChart = async () => {
      if (!chart) return

      setLoading(true)
      setError(null)

      try {
        // Dynamic import for performance
        const mermaid = (await import('mermaid')).default

        // Initialize with default config or props
        // Note: initialize is global, but safe to call repeatedly with same config
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'monospace',
          ...config
        })

        // Attempt to render
        // mermaid.render returns an object { svg } in newer versions
        const { svg: renderedSvg } = await mermaid.render(mermaidId, chart)

        if (isMounted) {
          setSvg(renderedSvg)
          setLoading(false)
        }
      } catch (err) {
        console.error('Mermaid render error:', err)
        if (isMounted) {
          setError(err.message || 'Failed to render chart')
          setLoading(false)
        }
      }
    }

    // Debounce rendering slightly to avoid thrashing on rapid input
    const timeoutId = setTimeout(renderChart, 200)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [chart, config, mermaidId])

  return (
    <div className='mermaid-wrapper' style={{ minHeight: 100, position: 'relative' }}>
      {loading && !svg && (
        <div className='absolute inset-0 flex items-center justify-center text-gray-400'>Loading...</div>
      )}

      {error
        ? (
          <div className='rounded border border-red-200 bg-red-50 p-4 text-red-500'>
            <p className='font-bold'>Syntax Error:</p>
            <pre className='mt-2 overflow-auto text-xs'>{error}</pre>
          </div>
          )
        : (
          <div className='mermaid-output' dangerouslySetInnerHTML={{ __html: svg }} />
          )}
    </div>
  )
}

export default MermaidHooks
