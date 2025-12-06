import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const useAnalyze = Boolean(process.env.USE_ANALYZE)

const analyzePlugin =
  useAnalyze &&
  visualizer({
    filename: 'dist-lib/bundle-report.html',
    title: 'pro-react-admin library bundle',
    gzipSize: true,
    brotliSize: true,
    template: 'treemap',
  })

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
      // 需要覆盖 .module.less 声明（位于 src/vite-env.d.ts），因此包含整个 src
      include: ['src'],
    }),
    // 仅在 USE_ANALYZE=1 时生成体积分布报告
    analyzePlugin,
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@src': path.resolve(__dirname, 'src'),
      '@stateless': path.resolve(__dirname, 'src/components/stateless'),
      '@stateful': path.resolve(__dirname, 'src/components/stateful'),
      '@hooks': path.resolve(__dirname, 'src/components/hooks'),
      '@app-hooks': path.resolve(__dirname, 'src/app-hooks'),
      '@container': path.resolve(__dirname, 'src/components/container'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routers': path.resolve(__dirname, 'src/routers'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@theme': path.resolve(__dirname, 'src/theme'),
    },
  },
  build: {
    outDir: 'dist-lib',
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'ProReactComponents',
      fileName: (format) => `pro-react-components.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd', 'react-router-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          'react-router-dom': 'ReactRouterDOM',
        },
      },
    },
    minify: 'esbuild',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
