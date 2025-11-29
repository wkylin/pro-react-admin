import { useState, useEffect } from 'react'

const useWindowScroll = () => {
  // 用于存储窗口滚动位置的状态
  const [scroll, setScroll] = useState({
    x: window.scrollX,
    y: window.scrollY,
  })

  // 用于更新滚动位置状态的函数
  const handleScroll = () => {
    setScroll({
      x: window.scrollX,
      y: window.scrollY,
    })
  }

  // 在组件挂载时添加滚动事件监听器，在组件卸载时移除监听器
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 返回滚动位置对象以及设置滚动位置的方法
  return {
    scroll,
    setScroll: (newScroll) => {
      window.scrollTo(newScroll.x, newScroll.y)
      setScroll(newScroll)
    },
  }
}

export default useWindowScroll
