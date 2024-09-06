import React, { useState } from 'react'
import { InputNumber, Row, Col } from 'antd'

const IntervalInput = ({ value = {}, onChange }) => {
  const [minValue, setMinValue] = useState(null)
  const [maxValue, setMaxValue] = useState(null)

  const triggerChange = (changedValue) => {
    onChange?.({
      minValue,
      maxValue,
      ...value,
      ...changedValue,
    })
  }

  const handleMinChange = (valueOps) => {
    setMinValue(valueOps)
    triggerChange({
      minValue: valueOps,
    })
  }

  const handleMaxChange = (valueOts) => {
    setMaxValue(valueOts)
    triggerChange({
      maxValue: valueOts,
    })
  }

  return (
    <Row gutter={16}>
      <Col span={11}>
        <InputNumber
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
        <InputNumber
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
