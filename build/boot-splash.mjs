import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const bootSplashTemplatePath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'boot-splash.html')

export function injectBootSplashHtml(html, projectId) {
  if (!/<body\b/i.test(html) || /id=["']?global-loader\b/i.test(html)) return html
  if (!/^[a-zA-Z0-9_-]+$/.test(projectId)) throw new Error(`Invalid boot splash project id: ${projectId}`)
  const fragment = fs.readFileSync(bootSplashTemplatePath, 'utf8').replaceAll('__WUI_PROJECT_ID__', projectId)
  return html.replace(/<body\b[^>]*>/i, (bodyTag) => `${bodyTag}\n${fragment}`)
}
