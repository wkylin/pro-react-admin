import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { libraryEntries, libraryExternalPackages } from '../../config/library-contract.mjs'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const packageSourceDir = path.join(rootDir, 'packages/wui-react/src')
const outputPath = path.join(rootDir, 'packages/wui-react/dist')
const useAnalyze = process.env.USE_ANALYZE === '1'

const componentEntries = Object.fromEntries(
  libraryEntries.map(({ subpath, source }) => [subpath, path.join(packageSourceDir, source)])
)
const styleEntries = fs
  .readdirSync(packageSourceDir, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(?:css|less)$/i.test(entry.name))
  .map((entry) => path.join(entry.parentPath, entry.name))
  .sort()

const isExternalRequest = (request = '') =>
  libraryExternalPackages.some((packageName) => request === packageName || request.startsWith(`${packageName}/`))

const createExternals = (type) =>
  function externalizeLibraryDependencies({ request }, callback) {
    if (isExternalRequest(request)) {
      callback(null, `${type} ${request}`)
      return
    }
    callback()
  }

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
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'],
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
            localIdentName: 'wui-[name]__[local]--[hash:base64:5]',
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

const createConfig = ({ format, entries, includeStyleEntry = false, analyze = false }) => {
  const isEsm = format === 'esm'
  const entry = includeStyleEntry
    ? {
        ...entries,
        style: {
          import: styleEntries,
          filename: 'esm/style-entry.js',
        },
      }
    : entries

  return {
    name: `wui-react-${format}`,
    mode: 'production',
    target: ['web', 'es2022'],
    entry,
    devtool: false,
    output: {
      path: outputPath,
      filename: isEsm ? 'esm/[name].js' : 'cjs/[name].cjs',
      chunkFilename: isEsm ? 'esm/chunks/[name].[contenthash:8].js' : 'cjs/chunks/[name].[contenthash:8].cjs',
      clean: false,
      publicPath: 'auto',
      globalObject: 'globalThis',
      library: { type: isEsm ? 'module' : 'commonjs2' },
      ...(isEsm ? { module: true } : {}),
    },
    experiments: isEsm ? { outputModule: true } : {},
    externals: [createExternals(isEsm ? 'module' : 'commonjs')],
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
      extensionAlias: {
        '.js': ['.ts', '.tsx', '.js'],
        '.jsx': ['.tsx', '.jsx'],
      },
      alias: {
        '@wui': packageSourceDir,
      },
    },
    module: { rules: sharedRules },
    plugins: [
      new MiniCssExtractPlugin({
        filename: ({ chunk }) => (chunk?.name === 'style' ? 'style.css' : `${format}-styles/[name].css`),
      }),
      ...(analyze && useAnalyze
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: path.join(rootDir, 'artifacts/build/webpack/library/report.html'),
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
    performance: {
      hints: 'error',
      maxAssetSize: 512 * 1024,
      maxEntrypointSize: 512 * 1024,
    },
    stats: 'errors-warnings',
  }
}

export default [
  createConfig({ format: 'esm', entries: componentEntries, includeStyleEntry: true, analyze: true }),
  createConfig({ format: 'cjs', entries: componentEntries }),
]
