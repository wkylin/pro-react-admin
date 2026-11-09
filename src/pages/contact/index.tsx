import { App, Button, Collapse } from 'antd'
import { Mail, BookOpen, Copy } from 'lucide-react'
import { GithubOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import BusinessPage from '@shared/ui/BusinessPage'
import { useAuth } from '@platform/auth/hooks/useAuth'
import { readEnterpriseSession } from '@platform/auth/model/session'
import { contactChannels } from './channels'
import ContactForm from './ContactForm'
import styles from './index.module.less'

export default function Contact() {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const { user } = useAuth()
  const enterprise = readEnterpriseSession()
  const mayPrefill = Boolean(enterprise) || Boolean(user && user.id > 0)
  const scope = JSON.stringify([enterprise?.tenantId ?? null, user?.id ?? null, user?.login ?? null])
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactChannels.email)
      void message.success(t('contactPage.copied'))
    } catch {
      void message.info(t('contactPage.copyFallback'))
    }
  }
  return (
    <BusinessPage title={t('menu.contact')} description={t('contactPage.description')}>
      <div className={styles.grid}>
        <aside className={styles.aside} aria-label={t('contactPage.channels')}>
          <section className={styles.panel}>
            <h2 className={styles.sectionTitle}>{t('contactPage.channels')}</h2>
            <p className={styles.description}>{t('contactPage.channelsDescription')}</p>
            <div className={styles.channels}>
              <div className={styles.channel}>
                <Mail size={20} aria-hidden="true" />
                <div>
                  <h3>{t('contactPage.emailChannel')}</h3>
                  <a className={styles.email} href={'mailto:' + contactChannels.email}>
                    {contactChannels.email}
                  </a>
                  <Button size="small" icon={<Copy size={14} aria-hidden="true" />} onClick={() => void copyEmail()}>
                    {t('contactPage.copyEmail')}
                  </Button>
                  <p>{t('contactPage.emailHelp')}</p>
                </div>
              </div>
              <div className={styles.channel}>
                <GithubOutlined className={styles.channelIcon} aria-hidden="true" />
                <div>
                  <h3>{t('contactPage.issuesChannel')}</h3>
                  <a href={contactChannels.issues} target="_blank" rel="noopener noreferrer">
                    {t('contactPage.openIssues')}
                  </a>
                  <p>{t('contactPage.issuesHelp')}</p>
                </div>
              </div>
              <div className={styles.channel}>
                <BookOpen size={20} aria-hidden="true" />
                <div>
                  <h3>{t('contactPage.guideChannel')}</h3>
                  <a href={contactChannels.guide} target="_blank" rel="noopener noreferrer">
                    {t('contactPage.openGuide')}
                  </a>
                  <p>{t('contactPage.guideHelp')}</p>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.panel} aria-label={t('contactPage.helpTitle')}>
            <h2 className={styles.sectionTitle}>{t('contactPage.helpTitle')}</h2>
            <ul className={styles.helpList}>
              <li>{t('contactPage.help.page')}</li>
              <li>{t('contactPage.help.steps')}</li>
              <li>{t('contactPage.help.environment')}</li>
            </ul>
          </section>
        </aside>
        <ContactForm
          key={scope}
          initialName={mayPrefill ? (user?.name || '').trim().slice(0, 80) : ''}
          initialEmail={mayPrefill ? user?.email || '' : ''}
        />
      </div>
      <section className={styles.panel} aria-label={t('contactPage.faqTitle')}>
        <h2 className={styles.sectionTitle}>{t('contactPage.faqTitle')}</h2>
        <Collapse
          className={styles.faq}
          ghost
          items={['channel', 'draft', 'delivery'].map((key) => ({
            key,
            label: t('contactPage.faq.' + key + 'Title'),
            children: <p className={styles.description}>{t('contactPage.faq.' + key + 'Description')}</p>,
          }))}
        />
      </section>
    </BusinessPage>
  )
}
