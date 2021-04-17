module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
          [
            'import',
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: 'css',
            },
          ],
          '@babel/plugin-syntax-dynamic-import',
          // 'transform-remove-console',
          // 'transform-remove-debugger',
        ]
      : [
          [
            'import',
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: 'css',
            },
          ],
          '@babel/plugin-syntax-dynamic-import',
        ],
}
