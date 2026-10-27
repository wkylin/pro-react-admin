import { useTranslation } from 'react-i18next'
import styles from './AuthShowcase.module.less'

type Variant = 'enterprise' | 'demo' | 'signup'

const featureKeys = ['first', 'second', 'third'] as const
const flowKeys = ['first', 'second', 'third'] as const

export function AuthBackdrop({ variant }: { variant: Variant }) {
  return <div className={`${styles.backdrop} ${styles[variant] ?? ''}`} aria-hidden="true" />
}

export default function AuthShowcase({ variant, headingLevel = 2 }: { variant: Variant; headingLevel?: 1 | 2 }) {
  const { t } = useTranslation()
  const key = `identity.showcase.${variant}`
  const Heading = headingLevel === 1 ? 'h1' : 'h2'

  return (
    <section className={`${styles.showcase} ${styles[variant] ?? ''}`} aria-labelledby={`showcase-title-${variant}`}>
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.halo} />
        <span className={styles.haloInner} />
        <span className={styles.signal} />
      </div>

      <div className={styles.content}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>PRO REACT ADMIN</span>
          <span className={styles.brandCaption}>{t('identity.showcase.brandCaption')}</span>
        </div>

        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.statusDot} aria-hidden="true" />
            {t(`${key}.eyebrow`)}
          </div>
          <Heading id={`showcase-title-${variant}`} className={styles.title}>
            <span>{t(`${key}.titleFirst`)}</span>
            <span className={styles.titleAccent}>{t(`${key}.titleSecond`)}</span>
          </Heading>
          <p className={styles.description}>{t(`${key}.description`)}</p>
        </div>

        <div className={styles.featureList} aria-label={t('identity.showcase.capabilities')}>
          {featureKeys.map((feature) => (
            <div className={styles.feature} key={feature}>
              <span className={styles.featureMark} aria-hidden="true" />
              <div>
                <strong>{t(`${key}.features.${feature}.title`)}</strong>
                <p>{t(`${key}.features.${feature}.detail`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.flow}>
          <div className={styles.flowHeading}>
            <span>{t(`${key}.flowTitle`)}</span>
            <span className={styles.liveLabel}>{t('identity.showcase.live')}</span>
          </div>
          <div className={styles.flowTrack}>
            {flowKeys.map((step) => (
              <span className={styles.flowStep} key={step}>
                <span className={styles.flowNode} aria-hidden="true" />
                {t(`${key}.flow.${step}`)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
