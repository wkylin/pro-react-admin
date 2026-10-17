import AnimatedIcon from '@wui/AnimatedIcon'
import React, { type CSSProperties } from 'react'
import { Button, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { TranslationOutlined } from '@ant-design/icons'

// Reuse the TranslationOutlined frame and A, replacing its lower-right glyph with En.
const EnglishTranslationIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M140 188h584v164h76V144c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h544v-76H140V188z" />
    <path d="M414.3 256h-60.6c-3.4 0-6.4 2.2-7.6 5.4L219 629.4c-.3.8-.4 1.7-.4 2.6 0 4.4 3.6 8 8 8h55.1c3.4 0 6.4-2.2 7.6-5.4L322 540h196.2L422 261.4a8.42 8.42 0 00-7.7-5.4zm12.4 228h-85.5L384 360.2 426.7 484z" />
    <path d="M560 552h170v48H612v50h108v48H612v54h118v48H560V552z" />
    <path d="M758 624h52v21c21-20 45-30 72-30 49 0 76 34 76 86v99h-52v-95c0-26-10-39-29-39-27 0-67 27-67 63v71h-52V624z" />
  </svg>
)

interface LanguageSwitcherProps {
  buttonStyle?: CSSProperties
}

const LanguageSwitcher = ({ buttonStyle }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
  }

  const isZh = i18n.language === 'zh-CN' || i18n.language === 'zh'
  const isEn = i18n.language === 'en'

  if (isZh) {
    return (
      <Tooltip title="Switch to English" placement="bottom">
        <Button
          aria-label="Switch to English"
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <EnglishTranslationIcon />
            </AnimatedIcon>
          }
          size="small"
          style={buttonStyle}
          onClick={() => handleLanguageChange('en')}
        />
      </Tooltip>
    )
  }

  if (isEn) {
    return (
      <Tooltip title="切换为中文" placement="bottom">
        <Button
          aria-label="切换为中文"
          size="small"
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <TranslationOutlined />
            </AnimatedIcon>
          }
          style={buttonStyle}
          onClick={() => handleLanguageChange('zh')}
        />
      </Tooltip>
    )
  }

  return null
}

export default LanguageSwitcher
