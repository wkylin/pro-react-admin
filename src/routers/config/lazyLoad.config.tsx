import loadable, {
  type DefaultComponent,
  type LoadableComponent,
  type OptionsWithoutResolver,
} from '@loadable/component'
import Loading from '@stateless/Loading'

import Home from '@pages/home'
import Layout from '@layouts'
import MyPortfilo from '@pages/portfilo'

/**
 * 统一懒加载处理函数
 */
const lazyLoad = <Props,>(
  importFunc: () => Promise<DefaultComponent<Props>>,
  options: OptionsWithoutResolver<Props> = {}
): LoadableComponent<Props> => {
  // 包装 importFunc 以捕获并处理动态导入错误
  const safeImportFunc = () =>
    importFunc().catch((error: unknown) => {
      console.error('[lazyLoad] 动态导入失败:', error)
      // 重新抛出错误让 loadable 的 fallback 处理
      throw error
    })

  return loadable(safeImportFunc, {
    fallback: <Loading />,
    ...options,
  })
}

/**
 * 路由组件懒加载配置
 * 统一管理所有页面的懒加载，便于维护和复用
 */
export const lazyComponents = {
  // 布局组件
  // Layout: lazyLoad(() => import('@layouts')),
  Layout, // 布局改为同步加载，避免白屏
  Dashboard: lazyLoad(() => import('@pages/dashboard')),
  MyPortfilo, // MyPortfilo 改为同步加载，避免刷新时一直 loading

  // 认证相关（直接导入，不需要懒加载）
  // SignIn 和 SignUp 在路由中直接导入，不使用懒加载
  AuthCallback: lazyLoad(() =>
    import('@platform/auth/components/AuthCallback').then(({ AuthCallback }) => ({ default: AuthCallback }))
  ),
  Terms: lazyLoad(() => import('@pages/terms')),
  Privacy: lazyLoad(() => import('@pages/privacy')),

  // 业务页面
  // Home: lazyLoad(() => import('@pages/home')),
  Home, // 首页改为同步加载，避免首屏白屏闪烁
  Demo: lazyLoad(() => import('@pages/demo')),
  Business: lazyLoad(() => import('@pages/business')),
  ZustandDemo: lazyLoad(() => import('@pages/zustand')),
  AutoDeploy: lazyLoad(() => import('@pages/autoDeploy')),
  RichTextEditor: lazyLoad(() => import('@pages/richTextEditor')),
  DeployFlow: lazyLoad(() => import('@pages/deployFlow')),

  // UI 组件页面
  Motion: lazyLoad(() => import('@pages/motion')),
  ReactTilt: lazyLoad(() => import('@pages/tilt')),
  ReactMusic: lazyLoad(() => import('@pages/music')),
  MyVideo: lazyLoad(() => import('@pages/video')),
  MyCrypto: lazyLoad(() => import('@pages/crypto')),

  // 图表相关
  Echarts: lazyLoad(() => import('@pages/echarts')),
  GeoChart: lazyLoad(() => import('@pages/geoChart')),
  BigScreen: lazyLoad(() => import('@pages/bigScreen')),
  SvgViewer: lazyLoad(() => import('@pages/svgViewer')),
  Topology: lazyLoad(() => import('@pages/topology')),

  // 工具类页面
  QrCode: lazyLoad(() => import('@pages/qrGenerate')),
  PrismRender: lazyLoad(() => import('@pages/prism')),
  ChatGpt: lazyLoad(() => import('@pages/chatgpt')),
  AiWorkbench: lazyLoad(() => import('@pages/aiWorkbench')),
  Mermaid: lazyLoad(() => import('@pages/mermaid')),
  PostMessage: lazyLoad(() => import('@pages/postmessage')),
  MyIframe: lazyLoad(() => import('@pages/postmessage/myIframe')),
  Print: lazyLoad(() => import('@pages/print')),
  // 埋点数据看板
  TrackingDashboard: lazyLoad(() => import('@src/features/tracking')),

  // 通知页面
  Notifications: lazyLoad(() => import('@features/notifications/pages/NotificationsPage')),
  NotificationDetail: lazyLoad(() => import('@features/notifications/pages/NotificationDetail')),
  PHBar: lazyLoad(() => import('@pages/phbar')),

  // 权限示例页面
  PermissionExample: lazyLoad(() => import('@pages/permission')),

  Dependencies: lazyLoad(() => import('@features/dependencies')),

  // 示例：如果新增一个按需加载的路由组件，请在此处注册（示例）
  // 例如：新增 pages/alerts/AlertDetail.tsx
  // AlertDetail: lazyLoad(() => import('@pages/alerts/AlertDetail')),
  // 若要预取页面，在导航 hover/focus 时显式调用组件的 `.preload()`；不要在启动时预取全部路由。

  // 用户相关
  Profile: lazyLoad(() => import('@pages/profile')),
  Contact: lazyLoad(() => import('@pages/contact')),

  // 嵌套路由
  BackendStack: lazyLoad(() => import('@pages/tech/backend')),
  FrontendStack: lazyLoad(() => import('@pages/tech/frontend')),
  ReactDemo: lazyLoad(() => import('@pages/tech/demos/react')),
  VueDemo: lazyLoad(() => import('@pages/tech/demos/vue')),
  AngularDemo: lazyLoad(() => import('@pages/tech/demos/angular')),
  NodeDemo: lazyLoad(() => import('@pages/tech/demos/node')),
  VuePlugins: lazyLoad(() => import('@pages/tech/demos/vue/plugins')),
  Vue3Plugin: lazyLoad(() => import('@pages/tech/demos/vue/plugins/vue3')),
  VuePerfPlugin: lazyLoad(() => import('@pages/tech/demos/vue/plugins/perf')),
  WebpackList: lazyLoad(() => import('@pages/tech/demos/webpack')),
  // 异常页面
  ErrorPage: lazyLoad(() => import('@pages/error')),
  Exception403: lazyLoad(() => import('@stateless/Exception/exception403')),
  Exception404: lazyLoad(() => import('@stateless/Exception/exception404')),
  NoMatch: lazyLoad(() => import('@stateless/NoMatch')),
  SectionNotFound: lazyLoad(() => import('@stateless/SectionNotFound')),
}

// 兼容性导出（保持原有导入方式）
export default lazyLoad
