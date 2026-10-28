import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { libraryEntries, libraryExternalPackages } from '../../config/library-contract.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const source = path.join(root, 'packages/wui-react/src')

export default defineConfig({
  root,
  publicDir: false,
  // Preserve established external CJS default semantics (e.g. @uiw/react-signature).
  legacy: { inconsistentCjsInterop: true },
  plugins: [
    react(),
    {
      name: 'wui-global-animation-styles',
      enforce: 'post',
      transform(code, id) {
        // These CSS modules intentionally contain global selectors only.
        // Keep their CSS even when their empty/default binding is unused.
        if (/\/animation\/batch-[bc]\.module\.less(?:\?|$)/.test(id)) {
          return { code, map: null, moduleSideEffects: 'no-treeshake' }
        }
      },
    },
    svgr({ include: '**/*.svg', svgrOptions: { exportType: 'default' } }),
    ...(process.env.USE_ANALYZE === '1'
      ? [visualizer({ filename: 'artifacts/build/vite/library/report.html', open: false })]
      : []),
  ],
  resolve: { alias: { '@wui': source } },
  css: {
    preprocessorOptions: { less: { javascriptEnabled: true } },
    modules: { localsConvention: 'camelCase' },
  },
  build: {
    outDir: path.join(root, 'packages/wui-react/dist'),
    emptyOutDir: true,
    target: 'es2022',
    lib: {
      entry: Object.fromEntries(
        libraryEntries.map(({ subpath, source: entry }) => [subpath, path.join(source, entry)])
      ),
      cssFileName: 'style',
    },
    rollupOptions: {
      external: (id) => libraryExternalPackages.some((name) => id === name || id.startsWith(`${name}/`)),
      output: [
        { format: 'es', entryFileNames: 'esm/[name].js', chunkFileNames: 'esm/chunks/[name]-[hash].js' },
        {
          format: 'cjs',
          exports: 'named',
          entryFileNames: 'cjs/[name].cjs',
          chunkFileNames: 'cjs/chunks/[name]-[hash].cjs',
        },
      ],
    },
  },
})
