import { useState, useCallback } from 'react'
const useForceUpdate = () => {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
    console.log('updated')
  }, [])
  return update
}

export default useForceUpdate
