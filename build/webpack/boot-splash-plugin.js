import HtmlWebpackPlugin from 'html-webpack-plugin'
import { bootSplashTemplatePath, injectBootSplashHtml } from '../boot-splash.mjs'

export default class BootSplashHtmlPlugin {
  constructor(projectId) {
    this.projectId = projectId
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('BootSplashHtmlPlugin', (compilation) => {
      compilation.fileDependencies.add(bootSplashTemplatePath)
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap('BootSplashHtmlPlugin', (data) => {
        data.html = injectBootSplashHtml(data.html, this.projectId)
        return data
      })
    })
  }
}
