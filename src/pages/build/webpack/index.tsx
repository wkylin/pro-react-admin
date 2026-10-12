import type { CSSProperties } from 'react'
import { theme } from 'antd'
import FixTabPanel from '@shared/ui/FixTabPanel'
import styles from './index.module.less'

const targets = [
  {
    name: '后台应用',
    config: 'webpack.common.js + webpack.dev.js / webpack.prod.js',
    output: 'dist/',
    detail: '默认入口 src/index.tsx；开发、生产、测试和预发使用同一套应用规则。',
  },
  {
    name: '独立项目',
    config: 'PROJECT + webpack.common.js + dev / prod',
    output: 'dist-projectA/、dist-projectB/、dist-enterprise/',
    detail: '按注册表切换入口、路由和输出；有专属 HTML 模板时覆盖默认模板。',
  },
  {
    name: '微前端',
    config: 'MFE_ROLE + ModuleFederationPlugin',
    output: 'dist-shell/、dist-projectA/、dist-projectB/',
    detail: 'Shell 是 Host；ProjectA、ProjectB 是 Remote，并输出 remoteEntry.js。',
  },
  {
    name: '组件库',
    config: 'webpack.lib.js',
    output: 'packages/wui-react/dist/',
    detail: '按组件生成 ESM、CommonJS 和样式；类型声明由独立的 TypeScript 步骤生成。',
  },
  {
    name: 'Storybook',
    config: '.storybook/main.ts + Webpack 5 builder',
    output: 'storybook-static/',
    detail: '直接编译 src 和 packages/wui-react/src 的 story，不依赖组件库 dist。',
  },
]

const commands = [
  { purpose: '开发后台与本地埋点 API', command: 'pnpm start', result: '开发服务器；默认从 8080 端口开始' },
  { purpose: '仅启动前端', command: 'pnpm start:web', result: 'Webpack Dev Server' },
  { purpose: '构建默认应用', command: 'pnpm run build:production', result: 'dist/' },
  { purpose: '构建指定项目', command: 'pnpm run project:build enterprise', result: 'dist-enterprise/' },
  { purpose: '构建联邦项目', command: 'pnpm run mfe:build shell', result: 'dist-shell/' },
  { purpose: '构建组件库', command: 'pnpm run build:lib', result: 'packages/wui-react/dist/' },
  {
    purpose: '预览 / 构建组件文档',
    command: 'pnpm run storybook / pnpm run build-storybook',
    result: '6006 端口 / storybook-static/',
  },
  { purpose: '生成体积统计', command: 'pnpm run build:stats', result: 'compilation-stats.json' },
]

const navigation = [
  { id: 'webpack-targets', label: '构建入口' },
  { id: 'webpack-shared', label: '环境与资源' },
  { id: 'webpack-modes', label: '开发与生产' },
  { id: 'webpack-mfe', label: '多项目与联邦' },
  { id: 'webpack-library', label: '组件库与 Storybook' },
  { id: 'webpack-delivery', label: '分析与交付' },
  { id: 'webpack-commands', label: '命令速查' },
]

const WebpackPage = () => {
  const { token } = theme.useToken()
  const colors = {
    '--guide-surface': token.colorBgContainer,
    '--guide-subtle': token.colorFillQuaternary,
    '--guide-text': token.colorText,
    '--guide-muted': token.colorTextSecondary,
    '--guide-border': token.colorBorderSecondary,
    '--guide-accent': token.colorPrimary,
    '--guide-accent-soft': token.colorPrimaryBg,
  } as CSSProperties

  const jumpTo = (id: string) => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
  }

  return (
    <FixTabPanel fill={false}>
      <article className={styles.page} style={colors} aria-labelledby="webpack-title">
        <div className={styles.inner}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>构建体系 / WEBPACK 5</p>
            <h1 id="webpack-title">Webpack 构建链路</h1>
            <p className={styles.intro}>
              项目使用 Webpack 5 构建后台应用、独立项目、微前端和组件库；Storybook 使用独立的 Webpack 5
              builder。入口、构建目标和交付目录由项目注册表与脚本明确指定。
            </p>
            <ol className={styles.flow} aria-label="应用构建流程">
              <li>
                <span>选择入口</span>
                <code>PROJECT / registry.json</code>
              </li>
              <li>
                <span>合并公共规则</span>
                <code>webpack.common.js</code>
              </li>
              <li>
                <span>选择构建模式</span>
                <code>webpack.dev.js / prod.js</code>
              </li>
              <li>
                <span>生成应用产物</span>
                <code>dist*</code>
              </li>
            </ol>
            <p className={styles.flowNote}>
              组件库走 <code>webpack.lib.js</code>；Storybook 走 <code>.storybook/main.ts</code>，不经过上面的应用配置。
            </p>
          </header>

          <div className={styles.layout}>
            <nav className={styles.contents} aria-label="本页目录">
              <span className={styles.contentsLabel}>本页目录</span>
              {navigation.map(({ id, label }) => (
                <button key={id} type="button" onClick={() => jumpTo(id)}>
                  {label}
                </button>
              ))}
            </nav>

            <div className={styles.article}>
              <section id="webpack-targets" className={styles.section}>
                <h2>构建入口</h2>
                <p>这五类产物使用不同的入口或配置。独立项目与微前端共用应用规则，但构建角色不同。</p>
                <div className={styles.tableScroll}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">场景</th>
                        <th scope="col">配置入口</th>
                        <th scope="col">输出目录</th>
                        <th scope="col">实际用途</th>
                      </tr>
                    </thead>
                    <tbody>
                      {targets.map((target) => (
                        <tr key={target.name}>
                          <th scope="row">{target.name}</th>
                          <td>
                            <code>{target.config}</code>
                          </td>
                          <td>
                            <code>{target.output}</code>
                          </td>
                          <td>{target.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="webpack-shared" className={styles.section}>
                <h2>环境与资源</h2>
                <p>
                  <code>src/projects/registry.json</code> 登记 default、projectA、projectB、shell 和 enterprise。
                  <code>PROJECT</code> 在构建时选择入口、路由与输出；<code>BUILD_GOAL</code> 选择对应的{' '}
                  <code>.env.*</code>
                  与本地覆盖文件，外部注入的环境值优先。<code>PUBLIC_URL</code>{' '}
                  控制静态资源基路径；联邦产物改用自动路径。
                </p>
                <div className={styles.facts}>
                  <div>
                    <h3>代码转换</h3>
                    <p>
                      应用的 TS/JS 经 esbuild-loader 与 Babel 处理；路径别名统一映射源码，并固定 React、Zustand、Immer
                      为单实例。
                    </p>
                  </div>
                  <div>
                    <h3>样式与文件</h3>
                    <p>
                      CSS、Less 与 PostCSS 参与构建；SVG 通过 SVGR 作为 React 组件。图片、字体、媒体和 PDF 小于 25 KiB
                      时可内联，其余生成资源文件。
                    </p>
                  </div>
                  <div>
                    <h3>构建检查</h3>
                    <p>
                      应用配置接入 TypeScript 检查、ESLint、路径大小写检查与构建进度。浏览器只接收{' '}
                      <code>webpack/client-env.js</code> 中明确允许的变量。
                    </p>
                  </div>
                </div>
                <p>
                  HtmlWebpackPlugin 负责生成页面与注入脚本；Ant Design 的日期依赖替换和 Node polyfill
                  也在公共配置中处理。
                </p>
              </section>

              <section id="webpack-modes" className={styles.section}>
                <h2>开发与生产</h2>
                <div className={styles.modeGrid}>
                  <div>
                    <h3>开发服务器</h3>
                    <p>
                      <code>webpack.dev.js</code> 启用内存缓存、source map、HMR 与 React Refresh，并将指定的 API
                      请求交给开发代理。默认从 8080 端口寻找可用端口；<code>pnpm start</code> 还会启动本地埋点 API。
                    </p>
                  </div>
                  <div>
                    <h3>生产产物</h3>
                    <p>
                      <code>webpack.prod.js</code> 使用按项目隔离的文件系统缓存、内容哈希文件名、代码分包、JS/HTML
                      压缩与 gzip。路由动态导入形成异步 chunk；React、Zustand/Immer、HLS 等依赖有专门的分包规则。
                    </p>
                  </div>
                </div>
                <p>
                  生产配置还生成 <code>version.json</code>、通过 Serwist 注入 <code>sw.js</code>，并复制公开静态文件。
                  默认不生成 source map；<code>DEBUG_PROD=1</code> 可生成 source map 并关闭压缩。 Sentry
                  插件仅在选择上传模式且提供凭据时启用；<code>DIST_ZIP=1</code> 可额外归档产物。
                </p>
                <p>
                  <code>build:dev</code> 与 <code>build:test</code> 仍调用 <code>webpack.prod.js</code>，由
                  <code>BUILD_GOAL</code> 选择对应环境文件；它们不是开发服务器构建。
                </p>
              </section>

              <section id="webpack-mfe" className={styles.section}>
                <h2>多项目与模块联邦</h2>
                <p>
                  <code>scripts/project-command.mjs</code> 根据注册表生成构建计划。普通 <code>project:dev</code> /{' '}
                  <code>project:build</code>
                  构建独立运行的应用；<code>mfe:dev</code> / <code>mfe:build</code> 为 shell 设置 Host 角色，为
                  ProjectA、ProjectB 设置 Remote 角色。开发联调默认约定 shell 8080、Remote 8081/8082 端口。
                </p>
                <p>
                  Module Federation 暴露 Remote 的 <code>./App</code> 与 <code>remoteEntry.js</code>，React
                  等共享依赖采用单实例和严格版本约束。 Remote
                  同时生成协议清单；加载器校验清单并在失败时重试。生产构建保留联邦入口自己的 runtime，避免 Host
                  加载远程脚本时缺少依赖。
                </p>
                <p>
                  <code>pnpm run mfe:build:standalone projectA</code> 可将 Remote 构建为独立站点使用；
                  <code>pnpm run build:mf:vercel</code> 则组合 Host 与 Remote 产物并校验联邦入口及清单。
                </p>
              </section>

              <section id="webpack-library" className={styles.section}>
                <h2>组件库与 Storybook</h2>
                <div className={styles.modeGrid}>
                  <div>
                    <h3>可发布组件库</h3>
                    <p>
                      <code>webpack.lib.js</code> 根据组件公开契约生成多入口 ESM 与 CommonJS 包，抽取{' '}
                      <code>style.css</code>，将约定的依赖留给使用方。<code>build:lib</code>{' '}
                      随后生成类型声明并整理发布目录。
                    </p>
                  </div>
                  <div>
                    <h3>组件预览</h3>
                    <p>
                      Storybook 使用 <code>@storybook/react-webpack5</code> 和独立的 <code>webpackFinal</code>
                      。它复用路径别名，补齐 Tailwind/PostCSS、SVG、Less 规则，直接编译源码旁的 stories 与
                      MDX；开发预览不注入应用的 React Refresh Babel 插件。
                    </p>
                  </div>
                </div>
              </section>

              <section id="webpack-delivery" className={styles.section}>
                <h2>分析与交付</h2>
                <p>
                  <code>build:stats</code> 输出 Webpack 统计文件；<code>check:bundle-budget</code> 检查初始 JS/CSS
                  总量、单资源大小，以及配置了总量上限时的全部 JS/CSS。预算使用原始字节数，不是 gzip 大小。
                  <code>analyze:build</code> 与 <code>build:lib:analyze</code> 用于分析打包构成。
                </p>
                <p>
                  GitHub Pages 的 <code>build:pages</code> 将多个应用和 Storybook 组装到 <code>dist-combined/</code>
                  ；Vercel 的普通应用、联邦组合与 Storybook 分别使用 <code>dist/</code>、<code>dist-vercel/</code>、
                  <code>storybook-static/</code>。部署阶段使用这些构建结果，项目与组件库仍应分别核对输出契约。
                </p>
                <p>
                  通过 pnpm 运行 <code>build:production</code> 或 <code>build:stats</code> 时，prehook 会准备媒体资源；
                  CI 默认跳过媒体优化，设置 <code>OPTIMIZE_MEDIA=1</code> 才会强制执行。直接调用 Webpack 不会运行这些
                  prehook。
                </p>
                <div className={styles.note}>
                  <strong>当前配置边界</strong>
                  <p>
                    主应用样式规则目前使用 <code>style-loader</code>；虽然生产配置包含 CSS 提取、压缩和 PurgeCSS
                    插件，不能据此认为主应用 CSS 已独立抽出。<code>ImageMinimizerPlugin</code> 当前被注释停用。Storybook
                    与组件库各有自己的 Webpack 配置，不直接继承应用的 <code>webpack.common.js</code>。
                  </p>
                </div>
              </section>

              <section id="webpack-commands" className={styles.section}>
                <h2>命令速查</h2>
                <div className={styles.tableScroll}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">用途</th>
                        <th scope="col">命令</th>
                        <th scope="col">结果</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commands.map((item) => (
                        <tr key={item.command}>
                          <th scope="row">{item.purpose}</th>
                          <td>
                            <code>{item.command}</code>
                          </td>
                          <td>{item.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={styles.reference}>
                  配置来源：<code>webpack/</code>、<code>.storybook/main.ts</code>、
                  <code>src/projects/registry.json</code>、<code>config/project-registry.mjs</code>
                  。构建参数与预算说明见 <code>docs/BUILD.md</code>。
                </p>
              </section>
            </div>
          </div>
        </div>
      </article>
    </FixTabPanel>
  )
}

export default WebpackPage
