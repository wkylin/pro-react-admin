export const libraryPackageName = '@w.ui/wui-react'

export const libraryPeerDependencies = Object.freeze({
  react: '>=19.0.0',
  'react-dom': '>=19.0.0',
  antd: '>=6.0.0',
  'react-router-dom': '>=7.0.0',
})

export const libraryExternalPackages = Object.freeze(Object.keys(libraryPeerDependencies))

export const libraryExports = Object.freeze({
  '.': {
    types: './dist/types/src/lib/index.d.ts',
    import: './dist/pro-react-components.es.js',
    require: './dist/pro-react-components.umd.cjs',
  },
  './core': {
    types: './dist/types/src/lib/core.d.ts',
    import: './dist/entries/core.es.js',
    require: './dist/entries/core.cjs',
  },
  './stateful': {
    types: './dist/types/src/lib/stateful.d.ts',
    import: './dist/entries/stateful.es.js',
    require: './dist/entries/stateful.cjs',
  },
  './stateless': {
    types: './dist/types/src/lib/stateless.d.ts',
    import: './dist/entries/stateless.es.js',
    require: './dist/entries/stateless.cjs',
  },
  './tracking': {
    types: './dist/types/src/lib/tracking/index.d.ts',
    import: './dist/entries/tracking.es.js',
    require: './dist/entries/tracking.cjs',
  },
  './style.css': './dist/style.css',
})

export const libraryEntrypoints = Object.freeze({
  main: './dist/pro-react-components.umd.cjs',
  module: './dist/pro-react-components.es.js',
  types: './dist/types/src/lib/index.d.ts',
})
