import React, { useRef } from 'react'

const useRefVariable = (value) => {
  const ref = useRef(value)
  // keep current updated after render
  React.useEffect(() => {
    ref.current = value
  }, [value])
  return ref
}

export default useRefVariable
