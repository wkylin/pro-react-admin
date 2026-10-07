import React from 'react'
import { theme, Tooltip } from 'antd'
import clsx from 'clsx'
import styles from './index.module.less'

interface RadioInputProps {
  text?: string
  checked?: boolean
  type?: 'radio' | 'checkbox'
}

const RadioInput = ({ text = '单选', checked = false, type = 'radio' }: RadioInputProps) => {
  const { token } = theme.useToken()
  const isChecked = checked

  const cssVars = {
    '--radio-text-color': token.colorText,
    '--radio-bg-color': token.colorBgContainer,
    '--radio-border-color': token.colorBorder,
    '--radio-primary-color': token.colorPrimary,
    '--radio-disabled-bg': token.colorBgContainerDisabled,
  }

  return (
    <div className={styles.radioContainer} style={cssVars}>
      <span
        className={clsx(styles.indicator, {
          [styles.checked]: isChecked,
          [styles.checkbox]: type === 'checkbox',
          [styles.radio]: type === 'radio',
        })}
      />
      <Tooltip title={text} placement="topLeft" mouseEnterDelay={0.5}>
        <span className={styles.label}>{text}</span>
      </Tooltip>
    </div>
  )
}

export default RadioInput
