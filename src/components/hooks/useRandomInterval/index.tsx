import React from 'react'

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

const useRandomInterval = (callback: () => void, minDelay?: number, maxDelay?: number) => {
  const timeoutId = React.useRef<number | null>(null)
  const savedCallback = React.useRef(callback)

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    if (typeof minDelay !== 'number' || typeof maxDelay !== 'number') {
      return undefined
    }

    const handleTick = () => {
      const nextTickAt = random(minDelay, maxDelay)

      timeoutId.current = window.setTimeout(() => {
        savedCallback.current()
        handleTick()
      }, nextTickAt)
    }

    handleTick()

    return () => {
      if (timeoutId.current !== null) {
        window.clearTimeout(timeoutId.current)
      }
    }
  }, [minDelay, maxDelay])

  const cancel = React.useCallback(function () {
    if (timeoutId.current !== null) {
      window.clearTimeout(timeoutId.current)
    }
  }, [])

  return cancel
}

export default useRandomInterval
