import { useEffect } from 'react'

export const useRemoveGlobalLoader = () => {
  useEffect(() => {
    const loader = document.getElementById('global-loader')
    if (loader) {
      // 确保组件已经挂载并渲染
      requestAnimationFrame(() => {
        loader.classList.add('fade-out')
        setTimeout(() => {
          if (loader && loader.parentNode) {
            loader.parentNode.removeChild(loader)
          }
        }, 300)
      })
    }
  }, [])
}
