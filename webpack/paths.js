import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  // Source files
  src: resolve(__dirname, '../src'),

  // Production build files
  build: resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: resolve(__dirname, '../public')
}
