import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './index.module.less'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// Utility to safely handle ref merging
const fillRef = (ref, node) => {
  if (typeof ref === 'function') {
    ref(node)
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    ref.current = node
  }
}

const getOppositePlacement = (placement) => {
  const map = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
    topLeft: 'bottomLeft',
    topRight: 'bottomRight',
    bottomLeft: 'topLeft',
    bottomRight: 'topRight',
  }
  return map[placement] || placement
}

const PortalTooltip = ({
  children,
  title,
  visible: controlledVisible,
  defaultVisible = false,
  placement = 'top',
  overlayStyle = {},
  overlayClassName = '',
  zIndex = 1060,
  trigger = 'hover', // 'hover' | 'click'
}) => {
  const [visible, setVisible] = useState(defaultVisible)
  const [coords, setCoords] = useState({ left: 0, top: 0 })
  const [effectivePlacement, setEffectivePlacement] = useState(placement)
  // Disabled: unused variable warning
  // const [arrowStyle, setArrowStyle] = useState({});
  const arrowStyle = {}
  const targetRef = useRef(null)
  const tooltipRef = useRef(null)

  const isControlled = controlledVisible !== undefined
  const show = isControlled ? controlledVisible : visible

  useEffect(() => {
    setEffectivePlacement(placement)
  }, [placement])

  const updatePosition = () => {
    if (!targetRef.current || !tooltipRef.current || !show) return

    const targetRect = targetRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset
    const gap = 8
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const getCoords = (p) => {
      let t = 0
      let l = 0
      switch (p) {
        case 'top':
          t = targetRect.top + scrollY - tooltipRect.height - gap
          l = targetRect.left + scrollX + (targetRect.width - tooltipRect.width) / 2
          break
        case 'bottom':
          t = targetRect.bottom + scrollY + gap
          l = targetRect.left + scrollX + (targetRect.width - tooltipRect.width) / 2
          break
        case 'left':
          t = targetRect.top + scrollY + (targetRect.height - tooltipRect.height) / 2
          l = targetRect.left + scrollX - tooltipRect.width - gap
          break
        case 'right':
          t = targetRect.top + scrollY + (targetRect.height - tooltipRect.height) / 2
          l = targetRect.right + scrollX + gap
          break
        case 'topLeft':
          t = targetRect.top + scrollY - tooltipRect.height - gap
          l = targetRect.left + scrollX
          break
        case 'topRight':
          t = targetRect.top + scrollY - tooltipRect.height - gap
          l = targetRect.right + scrollX - tooltipRect.width
          break
        case 'bottomLeft':
          t = targetRect.bottom + scrollY + gap
          l = targetRect.left + scrollX
          break
        case 'bottomRight':
          t = targetRect.bottom + scrollY + gap
          l = targetRect.right + scrollX - tooltipRect.width
          break
        default:
          t = targetRect.top + scrollY - tooltipRect.height - gap
          l = targetRect.left + scrollX + (targetRect.width - tooltipRect.width) / 2
      }
      return { top: t, left: l }
    }

    let activePlacement = placement
    let newCoords = getCoords(activePlacement)

    // Check collision (convert to viewport coords)
    const viewTop = newCoords.top - scrollY
    const viewLeft = newCoords.left - scrollX
    const viewBottom = viewTop + tooltipRect.height
    const viewRight = viewLeft + tooltipRect.width

    const isTopOverflow = viewTop < 0
    const isBottomOverflow = viewBottom > viewportHeight
    const isLeftOverflow = viewLeft < 0
    const isRightOverflow = viewRight > viewportWidth

    let needsFlip = false
    if (activePlacement.startsWith('top') && isTopOverflow) needsFlip = true
    else if (activePlacement.startsWith('bottom') && isBottomOverflow) needsFlip = true
    else if (activePlacement === 'left' && isLeftOverflow) needsFlip = true
    else if (activePlacement === 'right' && isRightOverflow) needsFlip = true

    if (needsFlip) {
      const opposite = getOppositePlacement(activePlacement)
      const altCoords = getCoords(opposite)

      // Verify if opposite works better (or at least fits)
      const altViewTop = altCoords.top - scrollY
      const altViewLeft = altCoords.left - scrollX
      const altViewBottom = altViewTop + tooltipRect.height
      const altViewRight = altViewLeft + tooltipRect.width

      let oppositeFits = true
      if (opposite.startsWith('bottom') && altViewBottom > viewportHeight) oppositeFits = false
      else if (opposite.startsWith('top') && altViewTop < 0) oppositeFits = false
      else if (opposite === 'right' && altViewRight > viewportWidth) oppositeFits = false
      else if (opposite === 'left' && altViewLeft < 0) oppositeFits = false

      // If it fits, or if the original was overflowing, we usually prefer to swap if plausible
      if (oppositeFits) {
        activePlacement = opposite
        newCoords = altCoords
      }
    }

    setCoords(newCoords)
    setEffectivePlacement(activePlacement)
  }

  useIsomorphicLayoutEffect(() => {
    if (show) {
      updatePosition()
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition, true)
    }
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [show, placement, title])

  const handleMouseEnter = () => {
    if (trigger === 'hover' && !isControlled) setVisible(true)
  }

  const handleMouseLeave = () => {
    if (trigger === 'hover' && !isControlled) setVisible(false)
  }

  const handleClick = () => {
    if (trigger === 'click' && !isControlled) setVisible(!visible)
  }

  const child = React.isValidElement(children) ? children : <span>{children}</span>

  const triggerProps = {
    onMouseEnter: (e) => {
      handleMouseEnter(e)
      child.props.onMouseEnter && child.props.onMouseEnter(e)
    },
    onMouseLeave: (e) => {
      handleMouseLeave(e)
      child.props.onMouseLeave && child.props.onMouseLeave(e)
    },
    onClick: (e) => {
      handleClick(e)
      child.props.onClick && child.props.onClick(e)
    },
    ref: (node) => {
      targetRef.current = node
      // Access ref inside callback.
      // Note: We use optional chaining or safe check for child.ref
      const childRef = child && child.ref
      if (childRef) {
        fillRef(childRef, node)
      }
    },
  }

  const { maxWidth, minWidth, width, ...restOverlayStyle } = overlayStyle

  const innerStyle = {
    maxWidth: maxWidth || 300,
    minWidth,
    width,
  }

  const portalContent = show ? (
    <div
      className={`${styles.tooltipContainer} ${show ? styles.visible : ''} ${overlayClassName}`}
      style={{ left: coords.left, top: coords.top, zIndex, ...restOverlayStyle }}
      ref={tooltipRef}
    >
      <div className={styles.tooltipInner} style={innerStyle}>
        {title}
      </div>
      <div className={`${styles.arrow} ${styles[`placement-${effectivePlacement}`] || ''}`} style={arrowStyle} />
    </div>
  ) : null

  return (
    <>
      {/* eslint-disable-next-line */}
      {React.cloneElement(child, triggerProps)}
      {typeof document !== 'undefined' && createPortal(portalContent, document.body)}
    </>
  )
}

export default PortalTooltip
