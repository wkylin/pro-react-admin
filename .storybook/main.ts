import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import { mergeConfig } from 'vite'

const rootDir = process.cwd()

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public', { from: '../src/assets', to: '/assets' }],
  addons: [
    '@storybook/addon-links',
    // '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  docs: {},
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (viteConfig) => {
    // Storybook 会合并项目的 Vite 配置。
    // 需要剔除「仅用于主应用 build」的选项/插件，否则可能：
    // 1) 覆盖 Storybook 的入口（index.html 变成主应用模板）
    // 2) 触发压缩/打包等后置插件，导致 Storybook build 失败（产物不完整，iframe.html/index.json 404）
    const cfg: any = viteConfig

    // build 相关：只移除「主应用的 index.html input」，保留 Storybook 自己的 iframe 输入。
    const inputLooksLikeAppIndex = (input: unknown): boolean => {
      const isIndexHtml = (v: unknown) => {
        if (typeof v !== 'string') return false
        const normalized = v.replace(/\\/g, '/').toLowerCase()
        return normalized.endsWith('/index.html') || normalized === 'index.html'
      }
      if (isIndexHtml(input)) return true
      if (Array.isArray(input)) return input.some(isIndexHtml)
      if (input && typeof input === 'object') {
        return Object.values(input as Record<string, unknown>).some(isIndexHtml)
      }
      return false
    }

    if (cfg?.build?.rollupOptions?.input && inputLooksLikeAppIndex(cfg.build.rollupOptions.input)) {
      delete cfg.build.rollupOptions.input
    }
    if (cfg?.build?.outDir) delete cfg.build.outDir

    // 插件相关：过滤掉主应用专用插件（压缩/zip/sentry/analyze 等）。
    const filteredPlugins = Array.isArray(cfg?.plugins)
      ? cfg.plugins.filter((p: any) => {
          const name: string = String(p?.name || '')
          if (!name) return true
          if (name === 'vite-plugin-compression') return false
          if (name === 'zip-after-build') return false
          if (name.includes('sentry')) return false
          if (name.includes('visualizer')) return false
          return true
        })
      : cfg?.plugins

    const merged = mergeConfig(viteConfig, {
      // 避免 Vite 默认拾取项目根目录的 index.html（会把 storybook-static/index.html 覆盖成主应用 loader）
      root: path.resolve(rootDir, '.storybook'),
      resolve: {
        alias: {
          '@': path.resolve(rootDir, 'src'),
          '@src/*': path.resolve(rootDir, 'src/*'),
          '@stateless/*': path.resolve(rootDir, 'src/components/stateless/*'),
          '@stateful/*': path.resolve(rootDir, 'src/components/stateful/*'),
          '@hooks/*': path.resolve(rootDir, 'src/components/hooks/*'),
          '@app-hooks/*': path.resolve(rootDir, 'src/app-hooks/*'),
          '@assets/*': path.resolve(rootDir, 'src/assets/*'),
          '@pages/*': path.resolve(rootDir, 'src/pages/*'),
          '@routers/*': path.resolve(rootDir, 'src/routers/*'),
          '@utils/*': path.resolve(rootDir, 'src/utils/*'),
          '@theme/*': path.resolve(rootDir, 'src/theme/*'),
        },
      },
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          },
        },
      },
      cacheDir: path.resolve(rootDir, '.vite-cache/storybook'),
      optimizeDeps: {
        esbuildOptions: {
          target: 'es2020',
        },
      },

      build: {
        chunkSizeWarningLimit: 2000,
        // 强制 preview 产物落在 storybook-static（否则会被主应用 outDir 污染，导致 iframe.html 缺失 -> 404）
        outDir: path.resolve(rootDir, 'storybook-static'),
        // manager 会负责清理 outputDir；这里避免 vite 误删 manager 文件
        emptyOutDir: false,
        publicDir: false,
        copyPublicDir: false,
      },
    })

    // mergeConfig 会合并 plugins 数组，这里强制替换为过滤后的插件列表。
    ;(merged as any).plugins = filteredPlugins

    return merged
  },
}

export default config
