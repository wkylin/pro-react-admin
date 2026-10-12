import React from 'react'
import clsx from 'clsx'

type StickyFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  heightValue?: string | number
}

const StickyFooter = ({ children, className, heightValue = '100dvh', style, ...props }: StickyFooterProps) => {
  return (
    <div
      className="relative"
      style={{ height: heightValue, clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)', ...style }}
      {...props}
    >
      <div className={clsx('fixed bottom-[100px] flex w-full items-end', className)} style={{ height: heightValue }}>
        {children}
      </div>
    </div>
  )
}

export default StickyFooter
