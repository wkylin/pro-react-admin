import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    dts({
      // 为多入口输出可被 exports 子路径引用的 d.ts
      insertTypesEntry: false,
      tsconfigPath: './tsconfig.json',
      entryRoot: 'src/lib',
      outDir: 'dist-lib/entries',
      // 只生成 lib 入口相关类型，避免把 app 页面/未导出组件也卷入
      include: ['src/lib', 'src/vite-env.d.ts'],
    }),
  ],
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
    outDir: 'dist-lib/entries',
    emptyOutDir: true,
    lib: {
      entry: {
        core: path.resolve(__dirname, 'src/lib/core.ts'),
        stateful: path.resolve(__dirname, 'src/lib/stateful.ts'),
        stateless: path.resolve(__dirname, 'src/lib/stateless.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd', 'react-router-dom'],
      output: {
        exports: 'named',
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
