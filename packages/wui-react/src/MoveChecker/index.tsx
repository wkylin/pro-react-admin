import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { theme } from 'antd'
import { ArrowRight, CheckCircle } from 'lucide-react'
import AnimatedIcon from '../AnimatedIcon'
import styles from './index.module.less'

export type MoveCheckerColorObject = { type?: string; colors: string[] }
export type MoveCheckerColor = string | MoveCheckerColorObject

export interface MoveCheckerHandle {
  reset: () => void
}

export interface MoveCheckerProps {
  onResult?: (result: boolean) => void
  initialText?: string
  successText?: string
  initialTextColor?: string
  successTextColor?: string
  boxBg?: string
  bgColor?: MoveCheckerColor
  bgColorS?: MoveCheckerColor
  sliderBg?: MoveCheckerColor
  sliderSuccessBg?: MoveCheckerColor
}

const MoveChecker = forwardRef<MoveCheckerHandle, MoveCheckerProps>(
  (
    {
      onResult = undefined,
      initialText = '请按住滑块，拖动到最后',
      successText = '验证通过',
      initialTextColor,
      successTextColor,
      boxBg,
      bgColor = 'linear-gradient(to right,#68cd0f,#35cca1)',
      bgColorS = 'linear-gradient(to right,#68cd0f,#66e92d)',
      sliderBg,
      sliderSuccessBg,
    },
    ref
  ) => {
    const { token } = theme.useToken()
    const resolvedInitialTextColor = initialTextColor ?? token.colorTextSecondary
    const resolvedSuccessTextColor = successTextColor ?? token.colorTextLightSolid
    const resolvedBoxBg = boxBg ?? token.colorFillTertiary
    const resolvedSliderBg = sliderBg ?? token.colorBgElevated
    const resolvedSliderSuccessBg = sliderSuccessBg ?? token.colorBgContainer

    const [isSuccess, setIsSuccess] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [bgWidth, setBgWidth] = useState(40)
    const [sliderLeft, setSliderLeft] = useState(0)
    const [txt, setTxt] = useState(initialText)
    const [txtColor, setTxtColor] = useState(resolvedInitialTextColor)

    useEffect(() => {
      setTxtColor(isSuccess ? resolvedSuccessTextColor : resolvedInitialTextColor)
    }, [isSuccess, resolvedInitialTextColor, resolvedSuccessTextColor])

    const boxRef = useRef<HTMLDivElement | null>(null)
    const bgColorRef = useRef<HTMLDivElement | null>(null)
    const sliderRef = useRef<HTMLDivElement | null>(null)
    const successMoveDistance = useRef(0)
    const downX = useRef(0)
    const isDragging = useRef(false)
    const isSuccessRef = useRef(false)
    const rafId = useRef<number | null>(null)
    const latestOffset = useRef(0)
    const dragCleanupRef = useRef<() => void>(() => {})
    const hideSuccessTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
      const calc = () => {
        if (boxRef.current && sliderRef.current) {
          successMoveDistance.current = boxRef.current.offsetWidth - sliderRef.current.offsetWidth
        }
      }
      calc()
      window.addEventListener('resize', calc)
      return () => {
        window.removeEventListener('resize', calc)
      }
    }, [])

    useEffect(
      () => () => {
        dragCleanupRef.current()
        if (rafId.current !== null) cancelAnimationFrame(rafId.current)
        if (hideSuccessTimerRef.current !== null) clearTimeout(hideSuccessTimerRef.current)
      },
      []
    )

    const getOffsetX = (offset: number, min: number, max: number) => {
      if (offset < min) return min
      if (offset > max) return max
      return offset
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      dragCleanupRef.current()
      downX.current = e.clientX
      isDragging.current = true
      e.currentTarget.setPointerCapture(e.pointerId)

      latestOffset.current = 0

      const performUpdate = () => {
        rafId.current = null
        const offset = latestOffset.current
        if (bgColorRef.current) bgColorRef.current.style.width = `${offset + 40}px`
        if (sliderRef.current) sliderRef.current.style.left = `${offset}px`
      }

      const handlePointerMove = (ev: PointerEvent) => {
        if (!isDragging.current || isSuccessRef.current) return
        const moveX = ev.clientX
        const offsetX = getOffsetX(moveX - downX.current, 0, successMoveDistance.current)
        latestOffset.current = offsetX
        if (rafId.current === null) rafId.current = requestAnimationFrame(performUpdate)

        if (offsetX === successMoveDistance.current) {
          handleSuccess()
        }
      }

      const handlePointerUp = () => {
        if (!isSuccessRef.current) {
          if (bgColorRef.current) bgColorRef.current.style.width = `40px`
          if (sliderRef.current) sliderRef.current.style.left = `0px`
          setBgWidth(40)
          setSliderLeft(0)
        } else {
          if (boxRef.current) setBgWidth(boxRef.current.offsetWidth)
          setSliderLeft(successMoveDistance.current)
        }
        isDragging.current = false
        if (rafId.current !== null) {
          cancelAnimationFrame(rafId.current)
          rafId.current = null
        }
        dragCleanupRef.current()
      }

      dragCleanupRef.current = () => {
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
        document.removeEventListener('pointercancel', handlePointerUp)
      }
      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
      document.addEventListener('pointercancel', handlePointerUp)
    }

    const handleSuccess = () => {
      setIsSuccess(true)
      isSuccessRef.current = true
      setIsShow(true)
      setTxt(successText)
      setTxtColor(resolvedSuccessTextColor)
      if (hideSuccessTimerRef.current !== null) clearTimeout(hideSuccessTimerRef.current)
      hideSuccessTimerRef.current = setTimeout(() => {
        setIsShow(false)
        hideSuccessTimerRef.current = null
      }, 200)
      if (boxRef.current) setBgWidth(boxRef.current.offsetWidth)
      setSliderLeft(successMoveDistance.current)
      onResult && onResult(true)
    }

    const reset = () => {
      if (hideSuccessTimerRef.current !== null) {
        clearTimeout(hideSuccessTimerRef.current)
        hideSuccessTimerRef.current = null
      }
      setIsSuccess(false)
      setIsShow(false)
      setBgWidth(40)
      setSliderLeft(0)
      isSuccessRef.current = false
      setTxt(initialText)
      setTxtColor(resolvedInitialTextColor)
      onResult && onResult(false)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isSuccessRef.current) return

      const max = Math.max(0, successMoveDistance.current)
      const step = Math.max(1, Math.round(max / 10))
      let next: number

      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = Math.min(max, sliderLeft + step)
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = Math.max(0, sliderLeft - step)
      else if (event.key === 'Home') next = 0
      else if (event.key === 'End') next = max
      else return

      event.preventDefault()
      setSliderLeft(next)
      setBgWidth(next + 40)
      if (next >= max && max > 0) handleSuccess()
    }

    useImperativeHandle(ref, () => ({ reset }))

    const boxStyle = { backgroundColor: resolvedBoxBg }

    const resolveColorProp = (bg: MoveCheckerColor): string => {
      if (!bg) return ''
      if (typeof bg === 'string') return bg
      if (typeof bg === 'object' && Array.isArray(bg.colors)) {
        if (bg.colors.length === 1) return bg.colors[0]
        return `linear-gradient(to right, ${bg.colors.join(',')})`
      }
      return ''
    }

    const progressStyle: React.CSSProperties = {
      width: `${bgWidth}px`,
      background: resolveColorProp(isShow ? bgColorS : bgColor),
    }

    const sliderStyle: React.CSSProperties = {
      left: `${sliderLeft}px`,
      background: resolveColorProp(isSuccess ? resolvedSliderSuccessBg : resolvedSliderBg),
    }

    const parseColorsFromString = (str: string | undefined) => {
      if (!str || typeof str !== 'string') return [] as string[]
      const results: string[] = []
      const hexRe = /#([0-9a-fA-F]{3,6})/g
      let m: RegExpExecArray | null
      while ((m = hexRe.exec(str)) !== null) {
        results.push(m[0])
      }
      const rgbRe = /rgba?\(([^)]+)\)/g
      while ((m = rgbRe.exec(str)) !== null) {
        results.push(`rgb(${m[1]})`)
      }
      return results
    }

    const colorStringToRgb = (color: string | undefined) => {
      if (!color) return null
      if (color.startsWith('#')) {
        let h = color.slice(1)
        if (h.length === 3)
          h = h
            .split('')
            .map((c) => c + c)
            .join('')
        const r = parseInt(h.substr(0, 2), 16)
        const g = parseInt(h.substr(2, 2), 16)
        const b = parseInt(h.substr(4, 2), 16)
        return { r, g, b }
      }
      if (color.startsWith('rgb')) {
        const nums = color
          .replace(/rgba?\(|\)/g, '')
          .split(',')
          .map((s) => parseFloat(s.trim()))
        return { r: nums[0], g: nums[1], b: nums[2] }
      }
      return null
    }

    const luminanceOf = ({ r, g, b }: { r: number; g: number; b: number }) => 0.2126 * r + 0.7152 * g + 0.0722 * b

    const extractRgbList = (bg: MoveCheckerColor) => {
      if (!bg) return [] as { r: number; g: number; b: number }[]
      let colorStrs: string[] = []
      if (typeof bg === 'string') {
        colorStrs = parseColorsFromString(bg)
      } else if (typeof bg === 'object' && Array.isArray(bg.colors)) {
        colorStrs = bg.colors
      }
      const rgbs = colorStrs.map(colorStringToRgb).filter(Boolean) as { r: number; g: number; b: number }[]
      return rgbs
    }

    const deriveIconColor = (bg: MoveCheckerColor) => {
      const rgbs = extractRgbList(bg)
      if (rgbs.length === 0) return '#fff'
      const lums = rgbs.map(luminanceOf)
      const avgLum = lums.reduce((a, b) => a + b, 0) / lums.length
      return avgLum > 160 ? '#222' : '#fff'
    }

    const sliderIconColor = isSuccess ? deriveIconColor(resolvedSliderSuccessBg) : deriveIconColor(resolvedSliderBg)

    return (
      <div ref={boxRef} className={styles.box} style={boxStyle}>
        <div ref={bgColorRef} className={styles.bgColor} style={progressStyle} />
        <div className={styles.txt} style={{ color: txtColor }}>
          {txt}
        </div>
        <div
          ref={sliderRef}
          className={styles.slider}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          style={sliderStyle}
          role="slider"
          tabIndex={0}
          aria-label="Slide to verify"
          aria-valuemin={0}
          aria-valuemax={Math.max(0, Math.round(successMoveDistance.current))}
          aria-valuenow={Math.round(sliderLeft)}
          aria-valuetext={txt}
        >
          {!isSuccess && (
            <AnimatedIcon variant="spin" mode="hover">
              <ArrowRight size={20} color={sliderIconColor} aria-hidden />
            </AnimatedIcon>
          )}
          {isSuccess && (
            <AnimatedIcon variant="spin" mode="hover">
              <CheckCircle size={22} color={sliderIconColor} aria-hidden />
            </AnimatedIcon>
          )}
        </div>
      </div>
    )
  }
)

export default MoveChecker
