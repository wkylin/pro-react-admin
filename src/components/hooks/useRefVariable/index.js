import { useRef } from 'react'

const useRefVariable = (value) => {
  const ref = useRef()
  ref.current = value
  return ref
}

export default useRefVariable
