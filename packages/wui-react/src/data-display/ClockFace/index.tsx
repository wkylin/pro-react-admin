import { useEffect, useState, type HTMLAttributes } from 'react'
import styles from '../display.module.less'
export interface ClockFaceProps extends HTMLAttributes<HTMLDivElement> {
  hour12?: boolean
  locale?: string
  formatTime?: (date: Date) => string
}
export default function ClockFace({
  hour12 = true,
  locale = 'en-US',
  formatTime,
  className = '',
  ...props
}: ClockFaceProps) {
  const [time, setTime] = useState<Date | null>(null)
  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <div {...props} className={`${styles.clock} ${className}`}>
      {time
        ? formatTime
          ? formatTime(time)
          : new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12 }).format(
              time
            )
        : '--:--:--'}
    </div>
  )
}
