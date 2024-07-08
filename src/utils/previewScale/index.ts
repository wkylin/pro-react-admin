import { throttle } from 'lodash'

export const previewFitScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: { width: number; height: number }) => void
) => {
  // * 画布尺寸（px）
  const baseWidth = width
  const baseHeight = height

  // * 默认缩放值
  const scale = {
    width: 1,
    height: 1,
  }

  // * 需保持的比例
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    // 当前屏幕宽高比
    const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
    if (scaleDom) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5))
        scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5))
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      } else {
        // 表示更高
        scale.height = parseFloat((window.innerWidth / baseProportion / baseHeight).toFixed(5))
        scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5))
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      }
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // * 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // * 卸载监听
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize,
  }
}
