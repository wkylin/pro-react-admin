import AnimatedIcon from '@wui/AnimatedIcon'
import React, { type CSSProperties } from 'react'
import { Button, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { GlobalOutlined, TranslationOutlined } from '@ant-design/icons'

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
              <GlobalOutlined />
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
