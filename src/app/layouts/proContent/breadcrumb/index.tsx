import { useLocation } from 'react-router-dom'
import { Breadcrumb, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import rootRouter from '@routers'
import { findRouteChain } from './util'
import styles from './index.module.less'

const ProBreadcrumb = () => {
  const { pathname } = useLocation()
  const { redirectTo } = useSafeNavigate()
  const { t } = useTranslation()
  const chain = findRouteChain(rootRouter, pathname)
  return (
    <Breadcrumb
      separator=">"
      items={chain.map((item, index) => ({
        key: item.key,
        title: (
          <span className={styles.breadcrumb}>
            {index < chain.length - 1 && item.clickable ? (
              <Button type="link" style={{ padding: 0, height: 'auto' }} onClick={() => redirectTo(item.path)}>
                {item.i18nKey ? t(item.i18nKey, { defaultValue: item.name }) : item.name}
              </Button>
            ) : item.i18nKey ? (
              t(item.i18nKey, { defaultValue: item.name })
            ) : (
              item.name
            )}
          </span>
        ),
      }))}
    />
  )
}
export default ProBreadcrumb
