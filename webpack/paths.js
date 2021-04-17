const { resolve } = require('path')

module.exports = {
  // Source files
  src: resolve(__dirname, '../src'),

  // Production build files
  build: resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: resolve(__dirname, '../public'),

  // component files
  stateless: resolve(__dirname, '../src/components/stateless'),
  stateful: resolve(__dirname, '../src/components/stateful'),
  hooks: resolve(__dirname, '../src/components/hooks'),
  container: resolve(__dirname, '../src/components/container'),
}
