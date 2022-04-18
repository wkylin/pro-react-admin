import { useEffect, useRef } from 'react'

const usePollingEffect = (asyncCallback, dependencies = [], options = { interval: 10000 }) => {
  const timeoutIdRef = useRef(null)
  useEffect(() => {
    // Side note: preceding semicolon needed for IIFEs.
    ;(async function pollingCallback() {
      try {
        await asyncCallback()
      } finally {
        // Initiate timeout only after a response/error is received
        timeoutIdRef.current = setTimeout(pollingCallback, options.interval)
      }
    })()
    return () => clearTimeout(timeoutIdRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, asyncCallback, options.interval])
}

export default usePollingEffect

// const [data, setData] = useState({})
// usePollingEffect(
//   async () => setData(await fetch(...)),
//   [],
//   { interval: 3000 }
// )
