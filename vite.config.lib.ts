import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const useAnalyze = Boolean(process.env.USE_ANALYZE)
const libDebugCss = process.env.LIB_DEBUG_CSS === '1'

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
      // 只生成对外 lib 入口可达的类型，避免把未导出的页面/组件也卷进来。
      // 同时显式包含全局声明（例如 *.module.less）
      include: ['src/lib', 'src/vite-env.d.ts'],
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'NPM_README.md',
          dest: '.', // 这里 '.' 代表相对于 build.outDir (即 dist-lib) 的根目录
          rename: 'README.md',
        },
      ],
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
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
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
        // Produce stable, predictable chunk filenames for consumers (no hashes)
        chunkFileNames: (chunkInfo) => {
          return chunkInfo.name ? `chunk-${chunkInfo.name}.js` : 'chunk-[hash].js'
        },
        assetFileNames: (assetInfo) => {
          // Keep a stable css entry for consumers: `@w.ui/wui-react/style.css`
          if (assetInfo.name && assetInfo.name.endsWith('.css')) return 'style.css'
          return assetInfo.name ?? 'assets/[name]-[hash][extname]'
        },
      },
    },
    minify: 'esbuild',
    // Some upstream CSS can be non-standard and confuse esbuild's CSS minifier.
    // Run `LIB_DEBUG_CSS=1 npm run build:lib` to output non-minified CSS for debugging.
    cssMinify: libDebugCss ? false : 'esbuild',
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
