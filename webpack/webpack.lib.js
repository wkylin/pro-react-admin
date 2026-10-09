import path from 'node:path'
import { fileURLToPath } from 'node:url'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { createPathAliases } from './aliases.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = path.resolve(rootDir, 'dist-lib')
const target = process.env.LIB_BUILD_TARGET || 'main'
const useAnalyze = process.env.USE_ANALYZE === '1'

const aliases = createPathAliases(rootDir)

const entries = {
  core: path.resolve(rootDir, 'src/lib/core.ts'),
  stateful: path.resolve(rootDir, 'src/lib/stateful.ts'),
  stateless: path.resolve(rootDir, 'src/lib/stateless.ts'),
  tracking: path.resolve(rootDir, 'src/lib/tracking/index.ts'),
}

const externalPackages = ['react', 'react-dom', 'antd', 'react-router-dom']

const sharedRules = [
  {
    test: /\.m?js$/,
    resolve: { fullySpecified: false },
  },
  {
    test: /\.tsx$/,
    exclude: /node_modules/,
    use: {
      loader: 'esbuild-loader',
      options: { loader: 'tsx', target: 'es2022', jsx: 'automatic' },
    },
  },
  {
    test: /\.ts$/,
    exclude: /node_modules/,
    use: {
      loader: 'esbuild-loader',
      options: { loader: 'ts', target: 'es2022' },
    },
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'esbuild-loader',
      options: { loader: 'jsx', target: 'es2022', jsx: 'automatic' },
    },
  },
  {
    test: /\.css$/i,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: 'css-loader', options: { importLoaders: 1 } },
      'postcss-loader',
    ],
  },
  {
    test: /\.less$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: {
            auto: /\.module\.less$/i,
            localIdentName: '[name]__[local]--[hash:base64:5]',
            namedExport: false,
            exportLocalsConvention: 'camelCase',
          },
        },
      },
      'postcss-loader',
      {
        loader: 'less-loader',
        options: { lessOptions: { javascriptEnabled: true } },
      },
    ],
  },
  {
    test: /\.svg$/i,
    oneOf: [
      { resourceQuery: /url/, type: 'asset/resource' },
      { issuer: /\.[jt]sx?$/, use: [{ loader: '@svgr/webpack', options: { exportType: 'default' } }] },
      { type: 'asset/resource' },
    ],
  },
  {
    test: /\.(png|jpe?g|gif|webp|avif|eot|ttf|woff2?|mp4|mp3|mkv|pdf)$/i,
    type: 'asset',
    parser: { dataUrlCondition: { maxSize: 25 * 1024 } },
    generator: { filename: 'assets/[name].[contenthash:8][ext]' },
  },
]

const umdExternals = Object.fromEntries(
  externalPackages.map((name) => [
    name,
    {
      commonjs: name,
      commonjs2: name,
      amd: name,
      root: {
        react: 'React',
        'react-dom': 'ReactDOM',
        antd: 'antd',
        'react-router-dom': 'ReactRouterDOM',
      }[name],
    },
  ])
)

const createConfig = ({ name, entry, format, filename, cssFilename, externals, library, analyze = false }) => {
  const isModule = format === 'es'
  const isCjs = format === 'cjs'

  return {
    name: `wui-react-${name}-${format}`,
    mode: 'production',
    target: 'web',
    entry,
    devtool: false,
    output: {
      path: outputPath,
      filename,
      clean: false,
      publicPath: 'auto',
      globalObject: 'typeof self !== "undefined" ? self : this',
      library,
      ...(isModule ? { module: true } : {}),
    },
    experiments: isModule ? { outputModule: true } : {},
    externals,
    externalsType: isModule ? 'module' : isCjs ? 'commonjs' : undefined,
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
      extensionAlias: {
        '.js': ['.ts', '.tsx', '.js'],
        '.jsx': ['.tsx', '.jsx'],
      },
      alias: aliases,
    },
    module: { rules: sharedRules },
    plugins: [
      new MiniCssExtractPlugin({ filename: cssFilename }),
      ...(analyze && useAnalyze
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: path.resolve(outputPath, 'bundle-report.html'),
              openAnalyzer: false,
            }),
          ]
        : []),
    ],
    optimization: {
      minimize: true,
      splitChunks: false,
      runtimeChunk: false,
    },
    performance: { hints: false },
    stats: 'errors-warnings',
  }
}

const mainConfigs = [
  createConfig({
    name: 'main',
    entry: { main: path.resolve(rootDir, 'src/lib/index.ts') },
    format: 'es',
    filename: 'pro-react-components.es.js',
    cssFilename: 'style.css',
    externals: externalPackages,
    library: { type: 'module' },
    analyze: true,
  }),
  createConfig({
    name: 'main',
    entry: { main: path.resolve(rootDir, 'src/lib/index.ts') },
    format: 'umd',
    filename: 'pro-react-components.umd.cjs',
    cssFilename: 'style.umd.css',
    externals: umdExternals,
    library: { name: 'ProReactComponents', type: 'umd', umdNamedDefine: true },
  }),
]

const entryConfigs = [
  createConfig({
    name: 'entries',
    entry: entries,
    format: 'es',
    filename: 'entries/[name].es.js',
    cssFilename: 'entries/[name].es.css',
    externals: externalPackages,
    library: { type: 'module' },
  }),
  createConfig({
    name: 'entries',
    entry: entries,
    format: 'cjs',
    filename: 'entries/[name].cjs',
    cssFilename: 'entries/[name].cjs.css',
    externals: externalPackages,
    library: { type: 'commonjs2' },
  }),
]

export default target === 'entries' ? entryConfigs : mainConfigs
