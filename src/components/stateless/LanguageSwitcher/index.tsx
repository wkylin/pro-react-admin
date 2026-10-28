import { useTranslation } from 'react-i18next'
import LanguageSwitcher, { type LanguageSwitcherProps } from '@wui/forms/LanguageSwitcher'
export default function AppLanguageSwitcher(props: Pick<LanguageSwitcherProps, 'buttonStyle' | 'disabled'>) {
  const { i18n } = useTranslation()
  return (
    <LanguageSwitcher
      {...props}
      language={i18n.language.startsWith('zh') ? 'zh' : 'en'}
      options={[
        { value: 'zh', label: '切换为中文' },
        { value: 'en', label: 'Switch to English' },
      ]}
      onLanguageChange={(language) => {
        void i18n.changeLanguage(language)
      }}
    />
  )
}
