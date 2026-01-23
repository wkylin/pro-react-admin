import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { ArrowRight, CheckCircle } from 'lucide-react'

type ColorObject = { type?: string; colors: string[] }
type ColorProp = string | ColorObject

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
  bgColor?: ColorProp
  bgColorS?: ColorProp
  sliderBg?: ColorProp
  sliderSuccessBg?: ColorProp
}

const MoveChecker = forwardRef<MoveCheckerHandle, MoveCheckerProps>(
  (
    {
      onResult = undefined,
      initialText = '请按住滑块，拖动到最后',
      successText = '验证通过',
      initialTextColor = '#777',
      successTextColor = '#fff',
      boxBg = '#ddd',
      bgColor = 'linear-gradient(to right,#68cd0f,#35cca1)',
      bgColorS = 'linear-gradient(to right,#68cd0f,#66e92d)',
      sliderBg = '#fff',
      sliderSuccessBg = '#fff',
    },
    ref
  ) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [bgWidth, setBgWidth] = useState(40)
    const [sliderLeft, setSliderLeft] = useState(0)
    const [txt, setTxt] = useState(initialText)
    const [txtColor, setTxtColor] = useState(initialTextColor)

    const boxRef = useRef<HTMLDivElement | null>(null)
    const bgColorRef = useRef<HTMLDivElement | null>(null)
    const sliderRef = useRef<HTMLDivElement | null>(null)
    const successMoveDistance = useRef(0)
    const downX = useRef(0)
    const isDragging = useRef(false)
    const isSuccessRef = useRef(false)
    const rafId = useRef<number | null>(null)
    const latestOffset = useRef(0)

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

    const getOffsetX = (offset: number, min: number, max: number) => {
      if (offset < min) return min
      if (offset > max) return max
      return offset
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      downX.current = e.clientX
      isDragging.current = true
      e.currentTarget.setPointerCapture((e as any).pointerId)

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
        if (!rafId.current) rafId.current = requestAnimationFrame(performUpdate) as any

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
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
          rafId.current = null
        }
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
      }

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    }

    const handleSuccess = () => {
      setIsSuccess(true)
      isSuccessRef.current = true
      setIsShow(true)
      setTxt(successText)
      setTxtColor(successTextColor)
      setTimeout(() => setIsShow(false), 200)
      if (boxRef.current) setBgWidth(boxRef.current.offsetWidth)
      setSliderLeft(successMoveDistance.current)
      onResult && onResult(true)
    }

    const reset = () => {
      setIsSuccess(false)
      setIsShow(false)
      setBgWidth(40)
      setSliderLeft(0)
      isSuccessRef.current = false
      setTxt(initialText)
      setTxtColor(initialTextColor)
      onResult && onResult(false)
    }

    useImperativeHandle(ref, () => ({ reset }))

    const boxStyle = { backgroundColor: boxBg }

    const resolveColorProp = (bg: ColorProp): string => {
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
      background: resolveColorProp(isSuccess ? sliderSuccessBg : sliderBg),
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

    const extractRgbList = (bg: ColorProp) => {
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

    const deriveIconColor = (bg: ColorProp) => {
      const rgbs = extractRgbList(bg)
      if (rgbs.length === 0) return '#fff'
      const lums = rgbs.map(luminanceOf)
      const avgLum = lums.reduce((a, b) => a + b, 0) / lums.length
      return avgLum > 160 ? '#222' : '#fff'
    }

    const sliderIconColor = isSuccess ? deriveIconColor(sliderSuccessBg) : deriveIconColor(sliderBg)

    return (
      <div ref={boxRef} className={styles.box} style={boxStyle}>
        <div ref={bgColorRef} className={styles.bgColor} style={progressStyle} />
        <div className={styles.txt} style={{ color: txtColor }}>
          {txt}
        </div>
        <div ref={sliderRef} className={styles.slider} onPointerDown={handlePointerDown} style={sliderStyle}>
          {!isSuccess && <ArrowRight size={20} color={sliderIconColor} aria-hidden />}
          {isSuccess && <CheckCircle size={22} color={sliderIconColor} aria-hidden />}
        </div>
      </div>
    )
  }
)

export default MoveChecker
