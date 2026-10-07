import React, { useState } from 'react'
import { InputNumber, Row, Col } from 'antd'

interface IntervalInputValue {
  minValue?: number | null
  maxValue?: number | null
}

interface IntervalInputProps {
  value?: IntervalInputValue
  onChange?: (value: IntervalInputValue) => void
}

const IntervalInput = ({ value = {}, onChange }: IntervalInputProps) => {
  const [minValue, setMinValue] = useState<number | null>(null)
  const [maxValue, setMaxValue] = useState<number | null>(null)

  const triggerChange = (changedValue: IntervalInputValue) => {
    onChange?.({
      minValue,
      maxValue,
      ...value,
      ...changedValue,
    })
  }

  const handleMinChange = (valueOps: number | null) => {
    setMinValue(valueOps)
    triggerChange({
      minValue: valueOps,
    })
  }

  const handleMaxChange = (valueOps: number | null) => {
    setMaxValue(valueOps)
    triggerChange({
      maxValue: valueOps,
    })
  }

  return (
    <Row gutter={16}>
      <Col span={11}>
        <InputNumber<number>
          min={0}
          max={100}
          value={minValue}
          status={minValue > maxValue ? 'error' : ''}
          onChange={handleMinChange}
          style={{ width: '100%' }}
          placeholder=""
        />
      </Col>
      <Col span={2} style={{ textAlign: 'center', lineHeight: '32px', color: '#fff' }}>
        -
      </Col>
      <Col span={11}>
        <InputNumber<number>
          min={0}
          max={100}
          value={maxValue}
          status={minValue > maxValue ? 'error' : ''}
          onChange={handleMaxChange}
          style={{ width: '100%' }}
          placeholder=""
        />
      </Col>
    </Row>
  )
}

export default IntervalInput
