import { useEffect, useState } from 'react'

const useIsMount = () => {
  const [isMount, setIsMount] = useState(true)
  useEffect(() => {
    const id = setTimeout(() => setIsMount(false), 0)
    return () => clearTimeout(id)
  }, [])
  return isMount
}

export default useIsMount
