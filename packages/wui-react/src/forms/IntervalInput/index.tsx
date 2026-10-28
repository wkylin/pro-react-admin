import { useState } from 'react'
import { InputNumber } from 'antd'
import styles from './index.module.less'
export interface IntervalInputValue {
  minValue?: number | null
  maxValue?: number | null
}
export interface IntervalInputProps {
  value?: IntervalInputValue
  defaultValue?: IntervalInputValue
  onChange?: (value: IntervalInputValue) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  minLabel?: string
  maxLabel?: string
}
export default function IntervalInput({
  value,
  defaultValue = {},
  onChange,
  min,
  max,
  step,
  disabled,
  minLabel = 'Minimum',
  maxLabel = 'Maximum',
}: IntervalInputProps) {
  const [internal, setInternal] = useState(defaultValue)
  const selected = value ?? internal
  const invalid = selected.minValue != null && selected.maxValue != null && selected.minValue > selected.maxValue
  const change = (patch: IntervalInputValue) => {
    const next = { ...selected, ...patch }
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  return (
    <div className={styles.interval}>
      <InputNumber<number>
        aria-label={minLabel}
        aria-invalid={invalid}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={selected.minValue ?? null}
        status={invalid ? 'error' : undefined}
        onChange={(minValue) => change({ minValue })}
      />
      <span aria-hidden="true">–</span>
      <InputNumber<number>
        aria-label={maxLabel}
        aria-invalid={invalid}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={selected.maxValue ?? null}
        status={invalid ? 'error' : undefined}
        onChange={(maxValue) => change({ maxValue })}
      />
    </div>
  )
}
