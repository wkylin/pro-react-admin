import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { Breadcrumb, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import rootRouter from '@src/routers'
import { findRouteChain } from './util'
import styles from './index.module.less'

const ProBreadcrumb = () => {
  const { pathname } = useLocation()
  const { redirectTo } = useSafeNavigate()
  const [breadcrumbList, setBreadcrumbList] = useState([])

  const { t } = useTranslation()

  useEffect(() => {
    // 使用新的递归查找算法，支持任意层级
    const chain = findRouteChain(rootRouter, pathname)

    if (chain.length === 0) {
      // 没找到路由，显示 404 状态
      const list = [
        {
          path: '/',
          name: '首页',
          key: '/',
          i18nKey: 'home',
        },
        {
          path: '404',
          name: 'Not Found',
          key: '/404',
          i18nKey: 'Not Found',
        },
      ]
      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => setBreadcrumbList(list))
      } else {
        setTimeout(() => setBreadcrumbList(list), 0)
      }
    } else {
      // 格式化路由链
      const formattedList = chain.map((item) => ({
        path: item.path,
        key: item.key || item.path,
        name: item.name,
        // 移除 isSubMenu 的自动推断，或者仅用于样式区分，不影响点击
        // isSubMenu: item.isSubMenu || (item.children && item.children.length > 0),
        i18nKey: item.i18nKey,
      }))

      // 确保首页存在
      if (formattedList.length > 0 && formattedList[0].key !== '/') {
        formattedList.unshift({
          path: '/',
          name: '首页',
          key: '/',
          i18nKey: 'home',
        })
      }

      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => setBreadcrumbList(formattedList))
      } else {
        setTimeout(() => setBreadcrumbList(formattedList), 0)
      }
    }
  }, [pathname])

  const linkTo = (path) => {
    redirectTo(path)
  }

  const breadcrumbItem = () =>
    breadcrumbList.map((item, index) => {
      const isLast = index === breadcrumbList.length - 1
      // 只要不是最后一项，都允许点击跳转
      // 除非显式配置了 clickable: false (预留扩展)
      const canClick = !isLast

      const content = !canClick ? (
        <span>{item.i18nKey ? t(item.i18nKey) : item.name}</span>
      ) : (
        <Button type="link" style={{ padding: 0, height: 'auto' }} onClick={() => linkTo(item.path || item.key)}>
          {item.i18nKey ? t(item.i18nKey) : item.name}
        </Button>
      )

      return {
        title: (
          <span className={styles.breadcrumb} key={item.key || item.path}>
            {content}
          </span>
        ),
        key: item.key || item.path,
      }
    })

  return <Breadcrumb separator=">" items={breadcrumbItem()} />
}

export default ProBreadcrumb
