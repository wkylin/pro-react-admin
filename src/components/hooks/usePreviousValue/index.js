import { useEffect, useRef, useState } from 'react'

const usePreviousValue = (value) => {
  const ref = useRef()
  const [prev, setPrev] = useState(undefined)
  useEffect(() => {
    setPrev(ref.current)
    ref.current = value
  }, [value])
  return prev
}

export default usePreviousValue
