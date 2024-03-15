import React from 'react'
import { Button, Space } from 'antd'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
    // window.location.reload()
  }

  return (
    <Space>
      {(i18n.language === 'zh-CN' || i18n.language === 'zh') && (
        <Button onClick={() => handleLanguageChange('en')}>英文</Button>
      )}
      {i18n.language === 'en' && <Button onClick={() => handleLanguageChange('zh')}>中文</Button>}
    </Space>
  )
}

export default LanguageSwitcher
