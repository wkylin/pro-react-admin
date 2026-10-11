const { transformSync } = require('esbuild')
const path = require('node:path')

module.exports = {
  process(source, filename) {
    const extension = path.extname(filename).slice(1)
    return transformSync(source, {
      loader: extension === 'js' ? 'jsx' : extension,
      format: 'cjs',
      target: 'es2022',
      jsx: 'automatic',
      sourcemap: 'inline',
      sourcefile: filename,
    })
  },
}
