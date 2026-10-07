import React from 'react'
import clsx from 'clsx'

const StickyFooter = ({ children, className, heightValue = '100dvh', ...props }) => {
  return (
    <div
      className={`relative h-[${heightValue}]`}
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      {...props}
    >
      <div className={clsx(`fixed bottom-[100px] h-[${heightValue}] w-full`, className)}>{children}</div>
    </div>
  )
}

export default StickyFooter
