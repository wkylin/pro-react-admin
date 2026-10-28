import batchStyles from '../batch-c.module.less'
void batchStyles
import React from 'react'
import clsx from 'clsx'

export type SlideButtonStyle = React.CSSProperties & {
  '--border-start'?: string
  '--border-end'?: string
  '--text-color'?: string
  '--bg-color'?: string
}

export type SlideButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  textColor?: string
  borderStartColor?: string
  borderEndColor?: string
  backgroundColor?: string
  style?: SlideButtonStyle
}

const SlideButton = ({
  children,
  className,
  textColor = '#1670f0',
  borderStartColor = '#0c002b',
  borderEndColor = '#1779ff',
  backgroundColor = 'transparent',
  style,
  ...props
}: SlideButtonProps) => {
  const buttonStyle: SlideButtonStyle = {
    '--border-start': borderStartColor,
    '--border-end': borderEndColor,
    '--text-color': textColor,
    '--bg-color': backgroundColor,
    ...style,
  }

  return (
    <button type="button" className={clsx('wui-slide-button', className)} style={buttonStyle} {...props}>
      <span aria-hidden="true" className="wui-slide-edge" />
      <span aria-hidden="true" className="wui-slide-edge" />
      <span aria-hidden="true" className="wui-slide-edge" />
      <span aria-hidden="true" className="wui-slide-edge" />
      {children}
    </button>
  )
}

export default SlideButton
