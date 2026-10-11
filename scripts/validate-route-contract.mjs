import fs from 'node:fs'
import { collectRouteDeclarations, collectMenuDeclarations, root } from './route-contract.mjs'

const policies = JSON.parse(fs.readFileSync(`${root}/config/route-policy.json`, 'utf8'))
const routes = collectRouteDeclarations()
const menus = collectMenuDeclarations()
const declarations = new Map()
const issues = []
for (const route of routes.filter((route) => !route.index)) {
  if (declarations.has(route.path))
    issues.push(`Duplicate route ${route.path}: ${declarations.get(route.path)} and ${route.file}`)
  declarations.set(route.path, route.file)
}
for (const menu of menus) {
  const policy = policies[menu.path]
  if (!policy) issues.push(`Missing menu policy: ${menu.path}`)
  if (!declarations.has(menu.path) && !policy?.menuGroup) issues.push(`Menu has no declared route: ${menu.path}`)
  if (policy?.title !== menu.title || policy?.i18nKey !== menu.i18nKey)
    issues.push(`Menu metadata differs from canonical policy: ${menu.path}`)
}
for (const [routePath, policy] of Object.entries(policies)) {
  if (
    policy.permission &&
    !/^(?:[a-z][a-z0-9-]*(?::(?:create|read|update|delete|export|import|approve|reject|\*))?|\*:\*)$/.test(
      policy.permission
    )
  ) {
    issues.push(`Invalid permission code: ${routePath}`)
  }
  const exists = declarations.has(routePath) || declarations.has(`${routePath}/*`) || policy.menuGroup
  if (!exists) issues.push(`Policy has no route or explicit menu group: ${routePath}`)
}
if (issues.length) {
  console.error('[route-contract]\n' + issues.join('\n'))
  process.exitCode = 1
} else
  console.log(
    `[route-contract] ${declarations.size} routes and ${menus.length} menu entries respect canonical policies.`
  )
