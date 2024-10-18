module.exports = {
  // Root directory
  root: '/wui/pro-react/pro-react-admin',
  // Directories that do not need to be analyzed
  ignore: ['**/node_modules/**', '**/dist/**'],
  // Order of preference when parsing files without extensions
  extensions: ['.js', '.ts', '.tsx', '.vue', '.json', '.jsx'],
  // Path mapping of the project's alias
  alias: {
    '@@/': '/',
    '~~/': '/',
    '@/': '/src/',
    '~/': '/src/'
  },
  // Server and port related information
  server: {
    port: 8088,
    host: 'localhost',
    openBrowser: true // Automatically open in browser after startup
  }
}
