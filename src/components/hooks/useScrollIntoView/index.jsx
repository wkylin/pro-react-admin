import React, { useEffect, useRef, useState } from 'react'

const useScrollIntoView = ({ offset = 0 }) => {
  const targetRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const scrollIntoView = () => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect()
      const scrollTop = window.scrollX || document.documentElement.scrollTop
      const scrollLeft = window.scrollY || document.documentElement.scrollLeft
      const elementTop = rect.top + scrollTop
      const elementLeft = rect.left + scrollLeft

      const windowHeight = window.innerHeight
      const windowWidth = window.innerWidth

      // 根据偏移量调整滚动位置
      const adjustedTop = elementTop - offset
      const adjustedLeft = elementLeft - offset

      // 判断是否需要滚动
      const shouldScrollY = adjustedTop < 0 || adjustedTop > windowHeight
      const shouldScrollX = adjustedLeft < 0 || adjustedLeft > windowWidth

      if (shouldScrollY) {
        window.scrollTo({
          top: shouldScrollY ? adjustedTop : scrollTop,
          behavior: 'smooth'
        })
      }

      if (shouldScrollX) {
        window.scrollTo({
          left: shouldScrollX ? adjustedLeft : scrollLeft,
          behavior: 'smooth'
        })
      }

      setIsScrolled(true)
    }
  }

  useEffect(() => {
    if (!isScrolled) return undefined
    // 延迟清理，避免在 effect 中同步触发 setState
    const rafId = requestAnimationFrame(() => setIsScrolled(false))
    return () => cancelAnimationFrame(rafId)
  }, [isScrolled])

  return {
    scrollIntoView,
    targetRef
  }
}

export default useScrollIntoView

// const { scrollIntoView, targetRef } = useScrollIntoView({
//   offset: 60
// });

// return (
//   <div>
//       <div ref={targetRef}>这是要滚动到的目标元素</div>
//       <button onClick={scrollIntoView}>滚动到目标元素</button>
//   </div>
// );
