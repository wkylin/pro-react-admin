import FixTabPanel from '@shared/ui/FixTabPanel'
import ProMdxEditor from '@wui/editor/MdxEditor'
import { useProThemeContext } from '@/theme/hooks'
import { useTranslation } from 'react-i18next'
import styles from './index.module.less'

const RichTextEditor = () => {
  const { resolvedTheme, updateSettings } = useProThemeContext()
  const { t } = useTranslation()
  return (
    <FixTabPanel showScrollProgress={false}>
      <section className={styles.page} aria-label={t('menu.textEditor')}>
        <ProMdxEditor
          title={t('menu.textEditor')}
          theme={resolvedTheme}
          onThemeChange={(themeMode) => updateSettings({ themeMode })}
        />
      </section>
    </FixTabPanel>
  )
}

export default RichTextEditor
