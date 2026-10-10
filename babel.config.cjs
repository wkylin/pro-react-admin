const plugins = [
  ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
  ['@babel/plugin-transform-runtime'],
  ['@babel/plugin-transform-object-rest-spread'],
  ['babel-plugin-react-compiler'],
]

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
        modules: false,
      },
    ],
    '@babel/preset-typescript',
  ],
  overrides: [
    {
      // Babel 8 enables JSX parsing through preset-react. Keep it off for .ts
      // files so generic arrows such as <T>(value: T) remain valid TypeScript.
      test: /\.(?:js|jsx|tsx)$/,
      presets: [['@babel/preset-react', { runtime: 'automatic' }]],
    },
  ],
  compact: true,
  comments: true,
  plugins:
    process.env.NODE_ENV === 'production'
      ? [...plugins, 'transform-remove-console', 'transform-remove-debugger']
      : plugins,
  env: {
    development: {
      plugins: ['react-refresh/babel'],
    },
  },
}
