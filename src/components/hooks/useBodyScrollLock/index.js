const useBodyScrollLock = () => {
  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = originalStyle)
  }, [])
}

export default useBodyScrollLock
