import { useEffect, useState } from 'react'

const useInitialRender = () => {
  const [isInitial, setIsInitial] = useState(true)
  useEffect(() => {
    const id = setTimeout(() => setIsInitial(false), 0)
    return () => clearTimeout(id)
  }, [])
  return isInitial
}

export default useInitialRender
