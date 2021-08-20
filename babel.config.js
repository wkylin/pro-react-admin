const plugins = [
  [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
  ],
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-decorators', { legacy: true }],
]

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  // compact: true,
  plugins:
    process.env.NODE_ENV === 'production'
      ? [...plugins, 'transform-remove-console', 'transform-remove-debugger']
      : plugins,
}
