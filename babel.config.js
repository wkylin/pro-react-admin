const plugins = [
  [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true, // *css Customize Theme less
    },
  ],
  '@babel/plugin-syntax-dynamic-import',
]

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins:
    process.env.NODE_ENV === 'production'
      ? [...plugins, 'transform-remove-console', 'transform-remove-debugger']
      : plugins,
}
