import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
      include: ['src/components'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@src': path.resolve(__dirname, 'src'),
      '@stateless': path.resolve(__dirname, 'src/components/stateless'),
      '@stateful': path.resolve(__dirname, 'src/components/stateful'),
      '@hooks': path.resolve(__dirname, 'src/components/hooks'),
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
});
