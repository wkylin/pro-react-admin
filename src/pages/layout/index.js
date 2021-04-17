import React from 'react'
import { Layout, Breadcrumb } from 'antd'

import ProHeader from '../layout/proHeader'
import ProSider from '../layout/proSider'
import ProSecNav from '../layout/proSecNav'
// import CustomSwitch from 'stateless/CustomSwitch'
// import RouteWithSubRoutes from 'stateless/RouteWithSubRoutes'

import { Switch, Route } from 'react-router-dom'

import Demo from '../demo'
import Home from '../home'
import Coupons from '../coupons'

import styles from './index.module.less'
const BasicComponents = ({ routes = [] }) => {
  console.log('routes==>>>', JSON.stringify(routes, null, 2))
  return (
    <>
      <Layout className={styles.layout}>
        <ProHeader />
        <Layout className={styles.layout}>
          <ProSider>
            <ProSecNav />
          </ProSider>
          {/* <ProContent routes={routes} /> */}
          <Layout className={styles.layout}>
            <Layout.Header className={styles.header}>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
            </Layout.Header>
            <Layout.Content className={styles.content}>
              <div className={styles.container}>
                {/* <CustomSwitch>
                  {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                  ))}
                </CustomSwitch> */}
                <Switch>
                  <Route path="/layout" exact>
                    <Home />
                  </Route>
                  <Route path="/layout/demo">
                    <Demo />
                  </Route>
                  <Route path="/layout/coupons">
                    <Coupons />
                  </Route>
                </Switch>
              </div>
              <div className={styles.footer}>
                Copyright &copy; 2015-{new Date().getFullYear()} 上海永辉云创科技有限公司
              </div>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

export default BasicComponents
