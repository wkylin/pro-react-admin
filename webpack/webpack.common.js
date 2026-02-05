import path, { dirname } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
// import CircularDependencyPlugin from 'circular-dependency-plugin'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import WebpackBar from 'webpackbar'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import webpack from 'webpack'
import paths from './paths.js'
import { generateRemotesConfig, parseRemotesFromEnv } from './mfe.config.js'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const isDev = process.env.NODE_ENV === 'development'
const isAnalyze = Boolean(Number(process.env.USE_ANALYZE || 0))

const mfeRole = (process.env.MFE_ROLE || '').toString().trim() // 'host' | 'remote' | ''
const isMfeHost = mfeRole === 'host'
const isMfeRemote = mfeRole === 'remote'
const isMfeEnabled = isMfeHost || isMfeRemote

const toMfeName = (name) => {
  const raw = (name || '').toString().trim() || 'app'
  const safe = raw.replace(/[^a-zA-Z0-9_]/g, '_')
  return /^[0-9]/.test(safe) ? `app_${safe}` : safe
}

const mfeName = isMfeEnabled ? toMfeName(paths.projectName) : undefined

const packageJson = (() => {
  try {
    const pkg = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
    return JSON.parse(pkg)
  } catch {
    return { dependencies: {} }
  }
})()

const deps = {
  ...(packageJson.dependencies || {}),
  ...(packageJson.peerDependencies || {}),
}

const UNABLE_ANALYZE = 0
const USE_ANALYZE = process.env.USE_ANALYZE || UNABLE_ANALYZE

let dotEnv = ''
switch (process.env.BUILD_GOAL) {
  case 'development':
    dotEnv = '.env.development'
    break
  case 'production':
    dotEnv = '.env.production'
    break
  case 'dev':
    dotEnv = '.env.dev'
    break
  case 'test':
    dotEnv = '.env.test'
    break
  default:
    dotEnv = '.env.development'
}

// Ensure PUBLIC_URL (and other env vars) are available to this webpack config file.
// Note: dotenv-webpack injects env vars into the bundle, but it doesn't affect the
// Node.js process.env used while generating the webpack configuration.
dotenv.config({ path: path.resolve(__dirname, '..', dotEnv) })

// GitHub Pages typically serves the site under "/<repo>/".
// When building in GitHub Actions and PUBLIC_URL isn't explicitly provided,
// infer it from GITHUB_REPOSITORY to avoid broken asset paths.
const inferredGhPagesPublicUrl = (() => {
  try {
    const repo = process.env.GITHUB_REPOSITORY
    if (!repo) return ''
    const parts = repo.split('/')
    const repoName = parts[1]
    return repoName ? `/${repoName}/` : ''
  } catch {
    return ''
  }
})()

const normalizePublicPath = (value) => {
  const raw = (value ?? '').toString().trim()
  if (!raw) return '/'
  if (raw === '.') return '/'
  if (raw === './') return './'
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw.endsWith('/') ? raw : `${raw}/`
  }
  // Prefer absolute paths so chunks load correctly on deep-link routes.
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

const rawPublicUrl = process.env.PUBLIC_URL
const prodPublicPath = normalizePublicPath(
  rawPublicUrl ||
    (process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_ACTIONS === '1' ? inferredGhPagesPublicUrl : '')
)

const config = {
  // Module Federation 的 remote script loader 可能生成 async/await。
  // 明确目标环境为现代浏览器（2026年 ES2022 已被所有主流浏览器完全支持）。
  target: ['web', 'es2022'],
  entry: {
    app: paths.entry,
  },
  ignoreWarnings: isMfeEnabled
    ? [
        {
          message:
            /The generated code contains 'async\/await' because this module is using "external script"\.[\s\S]*your target environment does not appear to support 'async\/await'\./,
        },
      ]
    : [],
  output: {
    path: paths.build,
    publicPath: isMfeEnabled ? 'auto' : isDev ? '/' : prodPublicPath,
    environment: {
      asyncFunction: true,
    },
    uniqueName: isMfeEnabled ? toMfeName(paths.projectName) : undefined,
    // For MF remotes in production we must expose the container globally so the host can find it.
    // Using a string-keyed window export avoids minifier renaming issues.
    library: isMfeRemote && mfeName ? { type: 'window', name: mfeName } : undefined,
    filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash].js',
    chunkFilename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash].js',
    // library: '',
    // libraryTarget: 'umd',
    // chunkLoadingGlobal: '',
    clean: true,
    // contentBase: path.join(__dirname, "public"), // 配置额外的静态文件内容的访问路径
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '...'],
    alias: {
      '@assets/audio': path.resolve('./src/assets/audio'),
      '@assets/video': path.resolve('./src/assets/video'),
      '@': path.resolve('./src'),
      '@src': path.resolve('./src'),
      '@app': paths.appDir,
      '@stateless': path.resolve('./src/components/stateless'),
      '@stateful': path.resolve('./src/components/stateful'),
      '@hooks': path.resolve('./src/components/hooks'),
      '@app-hooks': path.resolve('./src/app-hooks'),
      '@assets': path.resolve('./src/assets'),
      '@pages': path.resolve('./src/pages'),
      '@routers': paths.routersDir,
      '@utils': path.resolve('./src/utils'),
      '@theme': path.resolve('./src/theme'),
      // 确保关键依赖只有一个实例，避免 zustand middleware 错误
      'zustand': path.resolve('./node_modules/zustand'),
      'immer': path.resolve('./node_modules/immer'),
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
    symlinks: false,
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '..', dotEnv),
    }),
    codeInspectorPlugin({
      bundler: 'webpack',
    }),
    new HtmlWebpackPlugin({
      title:
        (isDev ? 'Pro React Dev' : 'Pro React Admin') +
        (paths.projectName && paths.projectName !== 'default' ? ` (${paths.projectName})` : ''),
      template: paths.htmlTemplate,
      favicon: paths.favicon,
      filename: 'index.html',
      inject: 'body',
      hash: true,
      cache: false,
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    new AntdDayjsWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    // new CircularDependencyPlugin({
    //   exclude: /node_modules/,
    //   include: /src/,
    //   failOnError: true,
    //   allowAsyncCycles: false,
    //   cwd: process.cwd(),
    // }),
    new NodePolyfillPlugin(),
    new WebpackBar(),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        memoryLimit: (() => {
          const raw = process.env.TSC_MEMORY_LIMIT
          const parsed = Number(raw)
          return Number.isFinite(parsed) && parsed > 0 ? parsed : 4096
        })(),
      },
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules', // 默认值
      cache: false, // 禁用/开启缓存
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'), // 缓存目录
    }),
  ],
  module: {
    // 将缺失的导出提示成错误而不是警告
    strictExportPresence: true,
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[local]--[hash:base64:5]',
                localIdentContext: paths.src,
                namedExport: false,
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[local]--[hash:base64:5]',
                localIdentContext: paths.src,
                namedExport: false,
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                config: false,
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  'postcss-normalize',
                ],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              // loader: 'tsx',
              target: 'es2022',
            },
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-object-rest-spread', '@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif|eot|ttf|woff|woff2|mp4|mp3|mkv|pdf)$/i,
        type: 'asset',
        parser: {
          // Conditions for converting to base64
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: 'images/[contenthash][ext][query]',
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-object-rest-spread', '@babel/plugin-transform-runtime'],
            },
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
    ],
  },
  stats: {
    ...(isAnalyze
      ? {
          preset: 'verbose',
          assets: true,
          chunks: true,
          chunkModules: true,
          chunkOrigins: true,
          chunkRelations: true,
          entrypoints: true,
          modules: true,
          nestedModules: true,
          dependentModules: true,
          reasons: true,
          ids: true,
          errorDetails: true,
        }
      : {
          all: false,
          errors: true,
          warnings: true,
          errorDetails: true,
          moduleTrace: true,
          excludeAssets: /node_modules/,
        }),
  },
  // 性能提示
  performance: {
    hints: isDev ? false : 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}

if (isMfeEnabled) {
  const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin
  const mfeName = toMfeName(paths.projectName)

  // 使用动态配置生成 remotes
  // 注意：即使当前构建目标是 remote，也可能会编译到 Host 的路由/页面文件。
  // 为避免出现 "Can't resolve 'projectA/App'" 这类编译错误，这里统一注册 remotes。
  const remotes = generateRemotesConfig(isDev)

  // 输出配置信息（仅在开发环境）
  if (isDev && isMfeHost) {
    // eslint-disable-next-line no-console
    console.log('[MFE] Remote projects configured:', Object.keys(remotes).join(', '))
  }

  const resolveExpose = () => {
    if (!isMfeRemote) return {}
    const project = (paths.projectName || 'default').toString()
    const candidate = path.resolve(__dirname, `../src/projects/${project}/mfe/App.tsx`)
    if (!fs.existsSync(candidate)) {
      // eslint-disable-next-line no-console
      console.warn(`[mfe] Missing expose file: ${candidate}`)
    }
    return { './App': candidate }
  }

  config.plugins.push(
    new ModuleFederationPlugin({
      name: mfeName,
      filename: 'remoteEntry.js',
      // Use a string-keyed global to avoid minifier mangling the container name
      // (e.g. `var projectA` -> `var A`), which breaks host loading.
      library: { type: 'window', name: mfeName },
      exposes: resolveExpose(),
      remotes,
      shared: {
        react: { singleton: true, eager: true, requiredVersion: deps.react || false },
        'react-dom': { singleton: true, eager: true, requiredVersion: deps['react-dom'] || false },
        'react-router-dom': { singleton: true, eager: true, requiredVersion: deps['react-router-dom'] || false },
        antd: { singleton: true, eager: true, requiredVersion: deps.antd || false },
        dayjs: { singleton: true, eager: true, requiredVersion: deps.dayjs || false },
        zustand: { singleton: true, eager: true, requiredVersion: deps.zustand || false },
        immer: { singleton: true, eager: true, requiredVersion: deps.immer || false },
      },
    })
  )
}

if (USE_ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

export default config
