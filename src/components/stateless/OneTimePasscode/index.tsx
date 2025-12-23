import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { useProThemeContext } from '@/theme/hooks'

export interface OneTimePasscodeProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  autoFocus?: boolean
  disabled?: boolean
  className?: string
  inputClassName?: string
  id?: string
  name?: string
  /* allow any single-character validation, e.g. /\d/ */
  validateChar?: (ch: string) => boolean
  variant?: 'modern' | 'compact' | 'classic'
}

// 默认仅允许单个可见字符（空字符串用于删除）
const defaultValidate = (ch: string) => ch === '' || ch.length === 1

export const OneTimePasscode: React.FC<OneTimePasscodeProps> = ({
  length = 6,
  value,
  onChange,
  autoFocus = false,
  disabled = false,
  className,
  inputClassName,
  id,
  name,
  validateChar = defaultValidate,
  variant = 'modern',
}) => {
  const controlled = value !== undefined
  const [internal, setInternal] = useState<string>(() => (value ?? '').slice(0, length))
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const composing = useRef(false)

  useEffect(() => {
    // keep refs.current sized to `length`, preserving existing elements when possible
    refs.current = Array.from({ length }).map((_, i) => refs.current[i] ?? null)
  }, [length])

  useEffect(() => {
    if (controlled) setInternal((value ?? '').slice(0, length))
  }, [value, length, controlled])

  useEffect(() => {
    if (autoFocus && refs.current[0]) refs.current[0].focus()
  }, [autoFocus])

  const setValue = (next: string) => {
    const truncated = next.slice(0, length)
    if (!controlled) setInternal(truncated)
    onChange?.(truncated)
  }

  const makeArray = (src?: string) => Array.from({ length }, (_, i) => (src && src[i]) || '')

  const handleChange = (index: number, ch: string) => {
    // allow clearing the slot
    if (ch === '') {
      const arr = makeArray(controlled ? (value ?? '') : internal)
      arr[index] = ''
      // trim trailing empty slots
      const joined = arr.join('').replace(/\s+$/g, '')
      setValue(joined)
      return
    }

    if (!validateChar(ch)) return

    const arr = makeArray(controlled ? (value ?? '') : internal)
    arr[index] = ch
    const joined = arr.join('').replace(/\s+$/g, '')
    setValue(joined)
    // focus next
    const next = refs.current[index + 1]
    if (next) next.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    if (e.key === 'Backspace') {
      if (target.value === '' && index > 0) {
        const prev = refs.current[index - 1]
        prev?.focus()
        const arr = makeArray(controlled ? (value ?? '') : internal)
        arr[index - 1] = ''
        setValue(arr.join('').replace(/\s+$/g, ''))
        e.preventDefault()
      }
    } else if (e.key === 'ArrowLeft') {
      if (index > 0) refs.current[index - 1]?.focus()
      e.preventDefault()
    } else if (e.key === 'ArrowRight') {
      if (index < length - 1) refs.current[index + 1]?.focus()
      e.preventDefault()
    }
  }

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text')
    if (!paste) return
    const chars = paste.split('').filter((c) => validateChar(c))
    if (chars.length === 0) return
    const base = makeArray(controlled ? (value ?? '') : internal)
    for (let i = 0; i < chars.length && index + i < length; i++) {
      base[index + i] = chars[i]
    }
    setValue(base.join('').replace(/\s+$/g, ''))
    // focus after pasted segment
    const focusIndex = Math.min(length - 1, index + chars.length - 1)
    refs.current[focusIndex]?.focus()
    e.preventDefault()
  }

  const values = Array.from({ length }, (_, i) => (controlled ? (value ?? '')[i] : internal[i]) || '')

  // defensive: allow missing CSS modules (e.g. in some test/story setups)
  const css = styles ?? ({} as Record<string, string>)

  // read theme color from context for focus ring / accent
  let themeStyle: React.CSSProperties = {}
  try {
    const { themeSettings } = useProThemeContext()
    const primary = themeSettings?.colorPrimary ?? '#1677ff'
    const themeMode = themeSettings?.themeMode ?? 'light'
    const hexToRgb = (hex: string) => {
      const h = hex.replace('#', '')
      const bigint = parseInt(
        h.length === 3
          ? h
              .split('')
              .map((c) => c + c)
              .join('')
          : h,
        16
      )
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255
      return `${r}, ${g}, ${b}`
    }
    themeStyle = {
      ['--otp-primary' as any]: primary,
      ['--otp-primary-rgb' as any]: hexToRgb(primary),
      ['--otp-bg' as any]: themeMode === 'dark' ? '#0b1220' : '#fff',
      ['--otp-fg' as any]: themeMode === 'dark' ? '#e6eef8' : '#0f1720',
      ['--otp-bg-1' as any]: themeMode === 'dark' ? 'rgba(11, 18, 32, 0.92)' : 'rgba(255, 255, 255, 0.92)',
      ['--otp-bg-2' as any]: themeMode === 'dark' ? 'rgba(9, 14, 24, 0.92)' : 'rgba(245, 247, 250, 0.92)',
    }
  } catch (e) {
    // if context not available, fall back to defaults
    themeStyle = {
      ['--otp-primary' as any]: '#1677ff',
      ['--otp-primary-rgb' as any]: '22, 119, 255',
      ['--otp-bg' as any]: '#fff',
      ['--otp-fg' as any]: '#0f1720',
      ['--otp-bg-1' as any]: 'rgba(255, 255, 255, 0.92)',
      ['--otp-bg-2' as any]: 'rgba(245, 247, 250, 0.92)',
    }
  }

  const wrapperClass = [css.wrapper, (css as any)[variant] ?? '', className ?? ''].filter(Boolean).join(' ')

  // provide an inline style fallback when CSS Modules are not loaded
  const inputInlineFallback: React.CSSProperties | undefined = css.input
    ? undefined
    : {
        width: '3.25rem',
        height: '3.25rem',
        borderRadius: '0.75rem',
        border: '1px solid rgba(15,23,32,0.12)',
        background: 'var(--otp-bg, #fff)',
        color: 'var(--otp-fg, #0f1720)',
        fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace",
        fontSize: '1.125rem',
        fontWeight: 600,
        textAlign: 'center' as const,
        boxShadow: '0 8px 20px rgba(2,6,23,0.06)',
        transition: 'box-shadow 180ms cubic-bezier(.2,.9,.2,1), transform 160ms ease, border-color 120ms ease',
        outline: 'none',
        caretColor: 'var(--otp-primary, #1677ff)',
        appearance: 'none' as const,
      }

  return (
    <div className={wrapperClass} id={id} role="group" aria-label={name ?? 'one-time-passcode'} style={themeStyle}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[i] ?? ''}
          onChange={(e) => {
            if (composing.current) return
            handleChange(i, e.target.value.slice(-1))
          }}
          onCompositionStart={() => {
            composing.current = true
          }}
          onCompositionEnd={(e) => {
            composing.current = false
            handleChange(i, e.currentTarget.value.slice(-1))
          }}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          disabled={disabled}
          className={`${css.input ?? ''} ${inputClassName ?? ''}`.trim()}
          style={inputInlineFallback}
          aria-label={`digit-${i + 1}`}
        />
      ))}
    </div>
  )
}

export default OneTimePasscode
