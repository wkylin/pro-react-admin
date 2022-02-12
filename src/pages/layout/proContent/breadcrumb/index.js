import React, { useEffect, useState } from 'react'
import { getRouteItem, getRouteList } from './util'
// import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { useNavigate, useLocation } from 'react-router-dom'

import { Breadcrumb, Button } from 'antd'
import rootRouter from '@src/routers'
import styles from './index.module.less'

const ProBreadcrumb = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  // const breadcrumbs = useBreadcrumbs()
  const [breadcrumbList, setBreadcrumbList] = useState([])

  useEffect(() => {
    const routeList = getRouteList(
      [],
      getRouteItem(rootRouter, pathname) ? [getRouteItem(rootRouter, pathname)] : [],
      pathname
    )

    if (routeList.length === 0) {
      setBreadcrumbList([
        { path: '/', name: '首页', key: '/', isSubMenu: false },
        { path: '404', name: 'Not Found', key: '/404', isSubMenu: false },
      ])
    } else {
      setBreadcrumbList([...routeList])
    }
  }, [pathname])

  const linkTo = (path) => {
    navigate(path)
  }

  return (
    <>
      <Breadcrumb separator=">">
        {breadcrumbList.map((item, index) => {
          return index !== breadcrumbList.length - 1 ? (
            <Breadcrumb.Item className={styles.breadcrumb} key={item.key}>
              {item.isSubMenu ? (
                <Button disabled type="link" style={{ padding: 0 }}>
                  {item.name}
                </Button>
              ) : (
                <Button type="link" style={{ padding: 0 }} onClick={() => linkTo(item.key)}>
                  {item.name}
                </Button>
              )}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item className={styles.breadcrumb} key={item.key}>
              {item.name}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </>
  )
}

export default ProBreadcrumb
