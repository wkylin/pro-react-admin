import React, { useEffect, useState } from 'react'
import { getRouteItem, getRouteList } from './util'
import { useNavigate, useLocation } from 'react-router-dom'

import { Breadcrumb } from 'antd'
import rootRouter from '@src/routers'
import styles from './index.module.less'

const ProBreadcrumb = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [breadcrumbList, setBreadcrumbList] = useState([])

  console.log('pathname', pathname)

  useEffect(() => {
    const routeList = getRouteList(
      [],
      getRouteItem(rootRouter, pathname) ? [getRouteItem(rootRouter, pathname)] : [],
      pathname
    )

    console.log('routeList', routeList)

    setBreadcrumbList([...routeList])
  }, [pathname])

  const linkTo = (path) => {
    navigate(path)
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
