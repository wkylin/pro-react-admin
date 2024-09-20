import React, { useRef, useEffect, useLayoutEffect, useImperativeHandle } from 'react'
import debounce from 'lodash-es/debounce'
import echarts from './echarts.config'

const EChart = (props, ref) => {
  const { options, loading = false, onClick, style = {} } = props
  const cDom = useRef(null)
  const cInstance = useRef(null)

  // 获取实例
  const getInstance = () => cInstance.current

  // 窗口自适应并开启过渡动画
  const resize = () => {
    cInstance.current &&
      cInstance.current.resize({
        animation: { duration: 300 }
      })
  }

  // 自适应防抖优化
  const debounceResize = debounce(resize, 500)

  useEffect(() => {
    if (cDom.current) {
      // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
      cInstance.current = echarts.getInstanceByDom(cDom.current)
      if (!cInstance.current) {
        cInstance.current = echarts.init(cDom.current, null, {
          renderer: 'svg'
        })
      } else {
        cInstance.current.clear()
      }

      // 绑定鼠标点击事件
      cInstance.current.on('click', (event) => {
        if (event && onClick) onClick(event)
      })

      options && cInstance.current.setOption(options)
    }

    return () => {
      cInstance.current.dispose() // 容器被销毁之后，销毁实例，避免内存泄漏
    }
  }, [cDom, options])

  // 监听高度变化
  useLayoutEffect(() => {
    resize()
  }, [style.width, style.height])

  // 监听窗口大小
  useEffect(() => {
    window.addEventListener('resize', debounceResize)

    return () => {
      window.removeEventListener('resize', debounceResize)
    }
  }, [options])

  // 展示 loading 动画
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    loading ? cInstance.current.showLoading() : cInstance.current.hideLoading()
  }, [loading])

  // 对父组件暴露获取ECharts实例的方法，可直接通过实例调用原生函数
  useImperativeHandle(ref, () => ({ getInstance }))

  return <div id='myEChart' ref={cDom} style={{ width: '100%', height: '100%', ...style }} />
}

export default React.memo(React.forwardRef(EChart))
