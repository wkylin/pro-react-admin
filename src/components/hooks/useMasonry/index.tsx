import { useEffect, useLayoutEffect, useState, useRef } from 'react'

const useMasonry = () => {
  const masonryContainer = useRef<HTMLDivElement | null>(null)
  const [items, setItems] = useState<HTMLElement[]>([])

  function elementLeft(el: HTMLElement) {
    return el.getBoundingClientRect().left
  }

  function elementTop(el: HTMLElement) {
    return el.getBoundingClientRect().top + window.scrollY
  }

  function elementBottom(el: HTMLElement) {
    return el.getBoundingClientRect().bottom + window.scrollY
  }

  useLayoutEffect(() => {
    if (masonryContainer.current) {
      const masonryItem = Array.from(masonryContainer.current.children).filter(
        (c): c is HTMLElement => c instanceof HTMLElement
      )
      setItems(masonryItem)
    }
  }, [])

  useEffect(() => {
    const handleMasonry = () => {
      if (!items || items.length < 1) return
      let gapSize = 0
      if (masonryContainer.current) {
        gapSize = parseInt(window.getComputedStyle(masonryContainer.current).getPropertyValue('grid-row-gap'))
      }
      items.forEach((el) => {
        if (!(el instanceof HTMLElement)) return
        let previous = el.previousSibling
        while (previous) {
          if (previous.nodeType === 1) {
            el.style.marginTop = '0'
            if (previous instanceof HTMLElement && elementLeft(previous) === elementLeft(el)) {
              el.style.marginTop = -(elementTop(el) - elementBottom(previous) - gapSize) + 'px'
              break
            }
          }
          previous = previous.previousSibling
        }
      })
    }

    handleMasonry()
    window.addEventListener('resize', handleMasonry)
    return () => {
      window.removeEventListener('resize', handleMasonry)
    }
  }, [items])

  return masonryContainer
}

export default useMasonry
