import React, { useEffect } from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { ConfigProvider } from 'antd'
import CustomSwitch from '@stateless/CustomSwitch'
import RouteWithSubRoutes from '@stateless/RouteWithSubRoutes'
import ScrollToTop from '@stateless/ScrollToTop'
import rootRouter from '@src/routers'
import { sentryInit } from '@src/utils'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/lib/locale/zh_CN'
// import enUS from 'antd/lib/locale/en_US'
// import { BrowserRouter as Router } from 'react-router-dom'

dayjs.locale('zh-cn')

const App = () => {
  useEffect(() => {
    sentryInit()
  }, [])

  return (
    <ConfigProvider locale={zhCN} componentSize="middle">
      <Router>
        <ScrollToTop>
          <CustomSwitch>
            {rootRouter.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </CustomSwitch>
        </ScrollToTop>
      </Router>
    </ConfigProvider>
  )
}

export default App
