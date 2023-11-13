import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Breadcrumb, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import rootRouter from '@src/routers'
import { getRouteItem, getRouteList } from './util'
import styles from './index.module.less'

const ProBreadcrumb = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [breadcrumbList, setBreadcrumbList] = useState([])

  const { t } = useTranslation()

  useEffect(() => {
    const routeList = getRouteList(
      [],
      getRouteItem(rootRouter, pathname) ? [getRouteItem(rootRouter, pathname)] : [],
      pathname
    )

    if (routeList.length === 0) {
      setBreadcrumbList([
        { path: '/', name: '首页', key: '/', i18nKey: 'home', isSubMenu: false },
        { path: '404', name: 'Not Found', key: '/404', i18nKey: 'notFound', isSubMenu: false },
      ])
    } else {
      setBreadcrumbList([...routeList])
    }
  }, [pathname])

  const linkTo = (path) => {
    navigate(path)
  }

  const breadcrumbItem = () =>
    breadcrumbList.map((item, index) => ({
      title:
        index !== breadcrumbList.length - 1 ? (
          <span className={styles.breadcrumb} key={item.key}>
            {item.isSubMenu ? (
              <Button disabled type="link" style={{ padding: 0 }}>
                {item.i18nKey ? t(item.i18nKey) : item.name}
              </Button>
            ) : (
              <Button type="link" style={{ padding: 0 }} onClick={() => linkTo(item.key)}>
                {item.i18nKey ? t(item.i18nKey) : item.name}
              </Button>
            )}
          </span>
        ) : (
          <span className={styles.breadcrumb} key={item.key}>
            {item.i18nKey ? t(item.i18nKey) : item.name}
          </span>
        ),
      key: item.key,
    }))

  return <Breadcrumb separator=">" items={breadcrumbItem()} />
}

export default ProBreadcrumb
