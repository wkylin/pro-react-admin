import type { StorybookConfig } from '@storybook/react-vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createPathAliases } from '../../build/aliases.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../../src/**/*.mdx',
    '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../packages/wui-react/src/**/*.mdx',
    '../../packages/wui-react/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: ['../../public', { from: '../../src/assets', to: '/assets' }],
  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  core: {
    disableTelemetry: true,
    builder: {
      name: '@storybook/builder-vite',
      options: { viteConfigPath: path.join(root, '.storybook/vite.config.ts') },
    },
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    const { default: react } = await import('@vitejs/plugin-react')
    const { default: svgr } = await import('vite-plugin-svgr')
    const storybookEnv = { NODE_ENV: process.env.NODE_ENV || 'development', REACT_APP_USE_MOCK: 'true' }
    return mergeConfig(config, {
      plugins: [react(), svgr({ include: '**/*.svg', svgrOptions: { icon: true, exportType: 'default' } })],
      resolve: { alias: createPathAliases(root), dedupe: ['react', 'react-dom', 'zustand', 'immer'] },
      css: {
        preprocessorOptions: { less: { javascriptEnabled: true } },
        modules: { localsConvention: 'camelCase' },
      },
      define: {
        'process.env': JSON.stringify(storybookEnv),
        __APP_ENV__: JSON.stringify(storybookEnv),
        __APP_VERSION__: JSON.stringify('storybook'),
        __APP_BUILD_TIME__: JSON.stringify('storybook'),
      },
      cacheDir: path.join(root, '.vite-cache/storybook-vite'),
      build: { chunkSizeWarningLimit: 2000 },
    })
  },
}

export default config
