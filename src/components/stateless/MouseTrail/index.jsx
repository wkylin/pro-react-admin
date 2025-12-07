import React, { createRef, useRef } from 'react'
import clsx from 'clsx'

const ImageMouseTrail = ({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = 'w-40 h-48',
  distance = 20,
  fadeAnimation = false,
}) => {
  const containerRef = useRef(null)
  const refs = useRef(items.map(() => createRef()))
  const currentZIndexRef = useRef(1)
  let globalIndex = 0
  let last = { x: 0, y: 0 }
  const activate = (image, x, y) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return

    const relativeX = x - containerRect.left
    const relativeY = y - containerRect.top
    image.style.left = `${relativeX}px`
    image.style.top = `${relativeY}px`
    console.log(refs.current[refs.current?.length - 1])
    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1
    }
    image.style.zIndex = String(currentZIndexRef.current)
    currentZIndexRef.current++
    image.dataset.status = 'active'
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = 'inactive'
      }, 1500)
    }
    last = { x, y }
  }
  const distanceFromLast = (x, y) => {
    return Math.hypot(x - last.x, y - last.y)
  }
  const deactivate = (image) => {
    image.dataset.status = 'inactive'
  }
  const handleOnMove = (e) => {
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / distance) {
      const lead = refs.current[globalIndex % refs.current.length].current
      const tail = refs.current[(globalIndex - maxNumberOfImages) % refs.current.length]?.current
      if (lead) activate(lead, e.clientX, e.clientY)
      if (tail) deactivate(tail)
      globalIndex++
    }
  }
  return (
    <section
      onMouseMove={handleOnMove}
      onTouchMove={(e) => handleOnMove(e.touches[0])}
      ref={containerRef}
      className={clsx(
        'relative grid h-screen w-full place-content-center overflow-hidden bg-white text-slate-900',
        className
      )}
    >
      {items.map((item, index) => (
        <>
          <img
            key={index}
            className={clsx(
              "opacity:0 data-[status='active']:ease-out-expo absolute -translate-x-[50%] -translate-y-[50%] scale-0 object-cover transition-transform duration-300 data-[status='active']:scale-100 data-[status='active']:opacity-100 data-[status='active']:duration-500",
              imgClass
            )}
            data-index={index}
            data-status="inactive"
            src={item}
            alt={`image-${index}`}
            ref={refs.current[index]}
          />
        </>
      ))}
      <article className="relative z-40">{children}</article>
    </section>
  )
}

export default ImageMouseTrail
