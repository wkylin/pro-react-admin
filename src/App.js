import React from 'react'

import { ConfigProvider } from 'antd'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import zhCN from 'antd/lib/locale/zh_CN'
// import enUS from 'antd/lib/locale/en_US'
import RouteWithSubRoutes from 'stateless/RouteWithSubRoutes'
import ScrollToTop from 'stateless/ScrollToTop'
// import CustomSwitch from 'stateless/CustomSwitch'
import rootRouter from '@/routers'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

function App() {
  return (
    <ConfigProvider locale={zhCN} componentSize="middle">
      <Router>
        <ScrollToTop>
          <Switch>
            {rootRouter.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </ScrollToTop>
      </Router>
    </ConfigProvider>
  )
}

export default App
