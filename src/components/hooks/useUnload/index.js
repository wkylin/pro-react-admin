import React from 'react'
const useUnload = (fn) => {
  const cb = React.useRef(fn)

  React.useEffect(() => {
    const onUnload = cb.current
    window.addEventListener('beforeunload', onUnload)
    return () => {
      window.removeEventListener('beforeunload', onUnload)
    }
  }, [cb])
}

export default useUnload
