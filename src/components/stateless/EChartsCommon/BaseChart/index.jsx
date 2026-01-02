import React, { useRef, useImperativeHandle, useMemo } from 'react'
import EChartCore from '@stateless/EChart'
import PropTypes from 'prop-types'

const EChart = (props, ref) => {
  const { options, loading = false, onClick, style = {} } = props
  const innerRef = useRef(null)

  const onEvents = useMemo(() => {
    if (!onClick) return undefined
    return {
      click: (event) => {
        if (event && onClick) onClick(event)
      },
    }
  }, [onClick])

  // 对父组件暴露获取ECharts实例的方法，可直接通过实例调用原生函数
  useImperativeHandle(ref, () => ({
    getInstance: () => innerRef.current?.getInstance?.(),
  }))

  return (
    <EChartCore
      ref={innerRef}
      option={options}
      loading={loading}
      onEvents={onEvents}
      renderer="svg"
      notMerge
      style={{ width: '100%', height: '100%', ...style }}
    />
  )
}

EChart.propTypes = {
  options: PropTypes.object,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
}

export default React.memo(React.forwardRef(EChart))
