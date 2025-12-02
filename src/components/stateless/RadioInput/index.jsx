import React from 'react'
import { theme, Tooltip } from 'antd'
import clsx from 'clsx'
import styles from './index.module.less'

const RadioInput = ({ text = '单选', checked = false, type = 'radio' }) => {
  const { token } = theme.useToken()
  const isChecked = checked === true || checked === 'true'

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
