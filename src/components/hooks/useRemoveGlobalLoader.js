import { useEffect } from 'react'

export const useRemoveGlobalLoader = () => {
  useEffect(() => {
    const loader = document.getElementById('global-loader')
    if (loader) {
      // 优化：等待浏览器完成当前的绘制任务，确保 React 组件已真正渲染上屏
      // 使用双重 rAF 确保在下一帧的布局和绘制之后执行
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // 稍微延迟，给首屏重组件（如 ECharts/地图）一点初始化时间，避免动画掉帧
          setTimeout(() => {
            loader.classList.add('fade-out')

            // 监听 transitionend 事件比 setTimeout 更安全，防止时间不一致
            const handleTransitionEnd = () => {
              if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader)
              }
            }

            loader.addEventListener('transitionend', handleTransitionEnd, {
              once: true,
            })

            // 兜底：如果动画没触发（例如页面不可见），强制移除
            setTimeout(handleTransitionEnd, 500)
          }, 100)
        })
      })
    }
  }, [])
}
