import React, { useEffect, useRef, useState } from 'react'
import { formatTime } from '@utils/publicFn'

const stateInfo = {
  title: '大数据可视化平台',
  weekday: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
}

const BigHeader = () => {
  const [timeStr, setTimeStr] = useState('')
  const timing = useRef<number | null>(null)

  // 设置时间
  const setTimingFn = () => {
    timing.current = setInterval(() => {
      const dateYear = formatTime(new Date(), 'yyyy-MM-dd')
      const dateDay = formatTime(new Date(), 'HH: mm: ss')
      const dateWeek = stateInfo.weekday[new Date().getDay()]
      setTimeStr(`${dateYear} | ${dateDay} ${dateWeek}`)
    }, 1000) as any
  }

  useEffect(() => {
    // 初始化开启定时
    setTimingFn()
    return () => {
      if (timing.current) clearInterval(timing.current)
    }
  }, [])

  return (
    <section style={{ color: '#fff' }} className="flex justify-between mb-5">
      <span>{stateInfo.title}</span>
      <span>{timeStr}</span>
    </section>
  )
}

export default BigHeader
