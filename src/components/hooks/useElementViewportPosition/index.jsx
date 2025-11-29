import { useState, useEffect } from 'react'

const useElementViewportPosition = (ref = null, offset = 0) => {
  const [position, setPosition] = useState([0, 0])

  useEffect(() => {
    const update = () => {
      if (!ref?.current) return
      const pageHeight = document.body.scrollHeight
      const start = ref.current.offsetTop
      const end = start + ref.current.offsetHeight

      setPosition([(start + offset) / pageHeight, (end + offset) / pageHeight])
    }

    update()

    document.addEventListener('resize', update)

    return () => {
      document.removeEventListener('resize', update)
    }
  }, [offset, ref])

  return { position }
}

export default useElementViewportPosition
