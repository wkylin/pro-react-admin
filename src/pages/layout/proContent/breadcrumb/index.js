import React, { useEffect, useState } from 'react'
import { getRouteItem, getRouteList } from './util'
import { useHistory, useLocation } from 'react-router-dom'

import { Breadcrumb } from 'antd'
import rootRouter from '@src/routers'
import styles from './index.module.less'

const ProBreadcrumb = () => {
  const { pathname } = useLocation()
  const history = useHistory()

  const [breadcrumbList, setBreadcrumbList] = useState([])
  useEffect(() => {
    const routeList = getRouteList(
      [],
      getRouteItem(rootRouter, pathname) ? [getRouteItem(rootRouter, pathname)] : [],
      pathname
    )

    setBreadcrumbList([...routeList])
  }, [pathname])

  const linkTo = (path) => {
    history.push(path)
  }

  return (
    <>
      <Breadcrumb separator="/">
        {breadcrumbList.map((item, index) => {
          return index !== breadcrumbList.length ? (
            <Breadcrumb.Item className={styles.breadcrumb} key={item.path} onClick={() => linkTo(item.path)}>
              {item.name}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item className={styles.lastBreadcrumb} key={item.path}>
              {item.name}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </>
  )
}

export default ProBreadcrumb
