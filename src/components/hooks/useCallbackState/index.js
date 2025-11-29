import { useEffect, useRef, useState } from 'react'

const useCallbackState = (initialValue) => {
  // Use a more descriptive name for the state value and follow the setter naming convention
  const [callbackState, setCallbackState] = useState(initialValue)
  const callbackQueue = useRef([])

  useEffect(() => {
    callbackQueue.current.forEach((cb) => cb(callbackState))
    callbackQueue.current = []
  }, [callbackState])

  const setState = (newValue, callback) => {
    setCallbackState(newValue)
    if (callback && typeof callback === 'function') {
      callbackQueue.current.push(callback)
    }
  }

  return [callbackState, setState]
}

export default useCallbackState
