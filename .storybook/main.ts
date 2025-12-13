import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'
const rootDir = process.cwd()
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-a11y', '@storybook/addon-docs'],
  docs: {},
  framework: '@storybook/react-webpack5',
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(rootDir, 'src'),
      '@src/*': path.resolve(rootDir, 'src/*'),
      '@stateless/*': path.resolve(rootDir, 'src/components/stateless/*'),
      '@stateful/*': path.resolve(rootDir, 'src/components/stateful/*'),
      '@hooks/*': path.resolve(rootDir, 'src/components/hooks/*'),
      '@app-hooks/*': path.resolve(rootDir, 'src/app-hooks/*'),
      '@container/*': path.resolve(rootDir, 'src/components/container/*'),
      '@assets/*': path.resolve(rootDir, 'src/assets/*'),
      '@pages/*': path.resolve(rootDir, 'src/pages/*'),
      '@routers/*': path.resolve(rootDir, 'src/routers/*'),
      '@utils/*': path.resolve(rootDir, 'src/utils/*'),
      '@theme/*': path.resolve(rootDir, 'src/theme/*'),
    }
    // If building for a subpath (e.g. /pro-react-admin/storybook/)
    // you can set the STORYBOOK_BASE_HREF env var when running the build.
    // This will make webpack emit assets with the correct publicPath.
    // Example: STORYBOOK_BASE_HREF=/pro-react-admin/storybook/ npm run build-storybook
    // const baseHref = process.env.STORYBOOK_BASE_HREF;
    // if (baseHref) {
    //   config.output = config.output || {};
    //   // webpack expects a string, ensure it ends with a slash
    //   config.output.publicPath = baseHref.endsWith('/') ? baseHref : baseHref + '/';
    // }

    // add Less and Less Module support for project styles
    config.module = config.module || { rules: [] }
    const lessModuleRule = {
      test: /\.module\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: { localIdentName: '[local]__[hash:base64:5]' },
            importLoaders: 2,
          },
        },
        'postcss-loader',
        {
          loader: 'less-loader',
          options: { lessOptions: { javascriptEnabled: true } },
        },
      ],
    }

    const lessRule = {
      test: /(?<!\.module)\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        {
          loader: 'less-loader',
          options: { lessOptions: { javascriptEnabled: true } },
        },
      ],
    }

    // prepend to ensure project rules take precedence
    config.module.rules = [lessModuleRule, lessRule, ...(config.module.rules || [])]

    return config
  },
}
export default config
