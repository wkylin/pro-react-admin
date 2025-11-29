import React from 'react'
import clsx from 'clsx'

const SlideButton = ({
  children,
  className,
  textColor = '#1670f0',
  borderStartColor = '#0c002b',
  borderEndColor = '#1779ff',
  backgroundColor = 'transparent',
  style,
  ...props
}) => {
  const buttonStyle = {
    '--border-start': borderStartColor,
    '--border-end': borderEndColor,
    '--text-color': textColor,
    '--bg-color': backgroundColor,
    ...style,
  }

  return (
    <span
      className={clsx(
        'relative cursor-pointer overflow-hidden px-[10px] py-[10px] text-[14px] tracking-[5px] uppercase no-underline shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
        'bg-[var(--bg-color)] text-[var(--text-color)]',
        className
      )}
      style={buttonStyle}
      {...props}
    >
      <span className="animate-wui-slide-right absolute top-0 left-0 h-[2px] w-full bg-linear-to-r from-[var(--border-start)] to-[var(--border-end)]" />
      <span className="animate-wui-slide-down absolute top-0 right-0 h-full w-[2px] bg-linear-to-b from-[var(--border-start)] to-[var(--border-end)]" />
      <span className="animate-wui-slide-left absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-l from-[var(--border-start)] to-[var(--border-end)]" />
      <span className="animate-wui-slide-up absolute top-0 left-0 h-full w-[2px] bg-linear-to-t from-[var(--border-start)] to-[var(--border-end)]" />
      {children}
    </span>
  )
}

export default SlideButton
