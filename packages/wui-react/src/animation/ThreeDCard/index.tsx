import batchStyles from '../batch-c.module.less'
void batchStyles
import React from 'react'
import clsx from 'clsx'

export type ThreeDCardProps = React.ComponentPropsWithoutRef<'div'> & {
  imageUrl?: string
  backgroundUrl?: string
  variant?: 'default' | 'border' | 'shine'
  disabled?: boolean
}

const ThreeDCard = ({
  title,
  imageUrl,
  backgroundUrl,
  className,
  children,
  variant = 'default',
  disabled = false,
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  style,
  ...props
}: ThreeDCardProps) => {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 })
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)
  const [isInitialRender, setIsInitialRender] = React.useState(true)

  React.useEffect(() => {
    setIsInitialRender(false)
  }, [])

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || disabled) return

      const rect = cardRef.current.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const rotateY = (mouseX / (rect.width / 2)) * 25
      const rotateX = -(mouseY / (rect.height / 2)) * 25

      const moveX = (mouseX / rect.width) * 10
      const moveY = (mouseY / rect.height) * 10

      {
        setRotation({ x: rotateX, y: rotateY })
        setPosition({ x: moveX, y: moveY })
      }
    },
    [disabled]
  )

  const handleMouseLeave = React.useCallback(() => {
    if (disabled) return
    {
      setRotation({ x: 0, y: 0 })
      setPosition({ x: 0, y: 0 })
      setIsHovered(false)
    }
  }, [disabled])

  const handleMouseEnter = React.useCallback(() => {
    if (disabled) return
    setIsHovered(true)
  }, [disabled])

  const transitionSettings = isInitialRender
    ? 'none'
    : isHovered
      ? 'transform 0.1s ease-out'
      : 'transform 0.5s ease-out'

  const cardStyle: React.CSSProperties = {
    transform: `
      perspective(2000px)
      rotateX(${disabled ? 0 : rotation.x}deg)
      rotateY(${disabled ? 0 : rotation.y}deg)
      scale(${isHovered && !disabled ? 1.05 : 1})
      ${disabled ? 'translateZ(0)' : ''}
    `,
    transformStyle: 'preserve-3d',
    transition: transitionSettings,
    transformOrigin: 'center center',
    filter: disabled ? 'grayscale(1) brightness(0.8)' : 'none',
    willChange: 'transform',
  }

  return (
    <div
      ref={cardRef}
      className={clsx(
        'group wui-c-d89972fe wui-c-887d31cd wui-c-efc981d0 wui-c-34516836 wui-c-2cd02d11 wui-c-a217b4ea',
        'wui-c-ee63cbea wui-c-14e46609',
        variant === 'border' && [
          'wui-c-884dada4 wui-c-45532d58 wui-c-c0e97424 wui-c-19c84e00 wui-c-32b46cc6',
          'wui-c-53365446 wui-c-a5873f21 wui-c-622d13bc',
          'wui-card-border-hover',
        ],
        variant === 'shine' && [
          'wui-c-9856f0a8 wui-c-93d88806 wui-c-ffa7b067',
          'wui-c-0b007fa8 wui-c-94bbac9f wui-c-09b5eae0',
          'wui-c-d3f42657 wui-c-ae8f6121',
          'wui-card-shine-hover',
        ],
        disabled && 'wui-card-disabled',
        className
      )}
      style={{ ...cardStyle, ...style }}
      onMouseMove={(event) => {
        handleMouseMove(event)
        onMouseMove?.(event)
      }}
      onMouseLeave={(event) => {
        handleMouseLeave()
        onMouseLeave?.(event)
      }}
      onMouseEnter={(event) => {
        handleMouseEnter()
        onMouseEnter?.(event)
      }}
      {...props}
    >
      {backgroundUrl && (
        <div
          className={clsx(
            'wui-c-da4dbfbc wui-c-7b7df044 wui-c-fecb6ec6 wui-c-0de26b9d wui-c-a1c2c255',
            imageUrl ? 'wui-card-blur' : 'wui-card-clear',
            disabled && 'wui-c-1247d307 wui-c-6a6dff1a'
          )}
          style={{
            backgroundImage: `url(${backgroundUrl})`,
            transform: `
              translateZ(-75px)
              translateX(${position.x * 2}px)
              translateY(${position.y * 2}px)
              scale(${isHovered && !disabled ? 1.15 : 1.1})
            `,
            transition: transitionSettings,
            willChange: 'transform',
          }}
        />
      )}

      {!disabled && (
        <div
          className="wui-c-a4326536 wui-c-da4dbfbc wui-c-7b7df044 wui-c-668b21aa wui-c-6da6a3c3"
          style={{
            background: `linear-gradient(
              ${105 + rotation.x}deg,
              transparent 20%,
              rgba(255, 255, 255, ${isHovered ? 0.1 : 0}) 35%,
              rgba(255, 255, 255, ${isHovered ? 0.2 : 0}) 50%,
              transparent 80%
            )`,
            transform: 'translateZ(1px)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
          }}
        />
      )}

      {imageUrl && (
        <div className="wui-c-d89972fe wui-c-668b21aa wui-c-6da6a3c3">
          <img
            src={imageUrl}
            alt={title || 'Card image'}
            className={clsx(
              'wui-c-d89972fe wui-c-236812d6 wui-c-668b21aa wui-c-6da6a3c3 wui-c-b1104f41 wui-c-0ed3baca',
              disabled && 'wui-c-1247d307 wui-c-03183f3c',
              isHovered && !disabled && 'wui-card-image-hover'
            )}
            style={{
              transform: `
                translateZ(${isHovered ? 120 : 75}px)
                translateX(${position.x * -2}px)
                translateY(${position.y * -2}px)
                scale(${isHovered && !disabled ? 1.2 : 1.1})
              `,
              transition: transitionSettings,
              willChange: 'transform',
            }}
          />
        </div>
      )}

      <div
        className="wui-c-da4dbfbc wui-c-1ff6c8c7 wui-c-145745bf wui-c-6da6a3c3 wui-c-8a95aa5d wui-c-b303bdfe wui-c-b2e1d744 wui-c-e4be17bb wui-c-0fe2b3da wui-c-8e63407b"
        style={{
          transform: `
            translateZ(50px)
            translateX(${position.x * -1.5}px)
            translateY(${position.y * -1.5}px)
          `,
          transition: transitionSettings,
          willChange: 'transform',
        }}
      >
        {title && (
          <h3
            className={clsx('wui-c-42536e69 wui-c-69450ef1 wui-c-72a4c7cd', disabled && 'wui-card-muted')}
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              transform: `translateZ(25px)`,
              transition: transitionSettings,
            }}
          >
            {title}
          </h3>
        )}
        {children}
      </div>

      <div
        className={clsx(
          'wui-c-da4dbfbc wui-c-7b7df044 wui-c-a217b4ea wui-c-16b1efa5 wui-c-765217db',
          isHovered && !disabled && 'wui-card-ring'
        )}
        style={{
          transform: 'translateZ(100px)',
          transition: 'ring-color 0.5s ease-out',
        }}
      />
    </div>
  )
}

export default ThreeDCard
