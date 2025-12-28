import { useEffect, useState } from 'react'

export default function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(id)
  }, [])

  return mounted
}

// const mounted = useMounted();
