import batchStyles from '../batch-c.module.less'
void batchStyles
import React, { useEffect, useState } from 'react'
export interface TextClipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix'> {
  items?: readonly string[]
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  interval?: number
}
export default function TextClip({
  items = [],
  prefix,
  suffix,
  interval = 2000,
  children,
  className,
  ...props
}: TextClipProps) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (items.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), Math.max(16, interval))
    return () => clearInterval(timer)
  }, [items.length, interval])
  return (
    <div {...props} className={`wui-text-clip ${className || ''}`}>
      {prefix}{' '}
      <span className="wui-text-clip-word" key={index}>
        {items[index % items.length]}
      </span>{' '}
      {suffix}
      {children}
    </div>
  )
}
