import AnimatedIcon from '@stateless/AnimatedIcon'
import React from 'react'
import { Button, Space, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { GlobalOutlined, TranslationOutlined } from '@ant-design/icons'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
  }

  const isZh = i18n.language === 'zh-CN' || i18n.language === 'zh'
  const isEn = i18n.language === 'en'

  return (
    <Space>
      {isZh && (
        <Tooltip title="Switch to English" placement="bottom">
          <Button
            icon={
              <AnimatedIcon variant="spin" mode="hover">
                <GlobalOutlined />
              </AnimatedIcon>
            }
            size="small"
            onClick={() => handleLanguageChange('en')}
          />
        </Tooltip>
      )}
      {isEn && (
        <Tooltip title="切换为中文" placement="bottom">
          <Button
            size="small"
            icon={
              <AnimatedIcon variant="spin" mode="hover">
                <TranslationOutlined />
              </AnimatedIcon>
            }
            onClick={() => handleLanguageChange('zh')}
          />
        </Tooltip>
      )}
    </Space>
  )
}

export default LanguageSwitcher
