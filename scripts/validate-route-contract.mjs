import fs from 'node:fs'
import { collectRouteDeclarations, collectMenuDeclarations, root } from './route-contract.mjs'

const policies = JSON.parse(fs.readFileSync(`${root}/config/route-policy.json`, 'utf8'))
const routes = collectRouteDeclarations()
const menus = collectMenuDeclarations()
const declarations = new Map()
const issues = []
const iconsSource = fs.readFileSync(`${root}/src/app/layouts/navigation/menu.config.tsx`, 'utf8')
const importedIcons = new Set(iconsSource.match(/\b[A-Za-z][A-Za-z0-9]*Outlined\b/g) ?? [])
const positions = new Set()
for (const route of routes.filter((route) => !route.index)) {
  if (declarations.has(route.path))
    issues.push(`Duplicate route ${route.path}: ${declarations.get(route.path)} and ${route.file}`)
  declarations.set(route.path, route.file)
}
for (const menu of menus) {
  const policy = policies[menu.path]
  if (!declarations.has(menu.path) && !policy.menuGroup) issues.push(`Menu has no declared route: ${menu.path}`)
  if (!menu.title || !Number.isInteger(menu.order) || menu.order < 0)
    issues.push(`Invalid navigation metadata: ${menu.path}`)
  if (menu.icon && !importedIcons.has(menu.icon)) issues.push(`Navigation icon is not registered: ${menu.icon}`)
  const position = `${menu.parent ?? 'root'}:${menu.order}`
  if (positions.has(position)) issues.push(`Duplicate sibling menu order: ${position}`)
  positions.add(position)
  const visited = new Set([menu.path])
  let parent = menu.parent
  while (parent) {
    if (visited.has(parent)) {
      issues.push(`Navigation cycle: ${menu.path}`)
      break
    }
    visited.add(parent)
    const ancestor = policies[parent]
    if (!ancestor?.menu) {
      issues.push(`Missing navigation parent: ${parent}`)
      break
    }
    parent = ancestor.menu.parent
  }
}
for (const [routePath, policy] of Object.entries(policies)) {
  if (!routePath.startsWith('/')) issues.push(`Policy must use an absolute path: ${routePath}`)
  if (
    policy.permission &&
    !/^(?:[a-z][a-z0-9-]*(?::(?:create|read|update|delete|export|import|approve|reject|\*))?|\*:\*)$/.test(
      policy.permission
    )
  )
    issues.push(`Invalid permission code: ${routePath}`)
  if (!declarations.has(routePath) && !declarations.has(`${routePath}/*`) && !policy.menuGroup)
    issues.push(`Policy has no route or explicit menu group: ${routePath}`)
}
if (issues.length) {
  console.error('[route-contract]\n' + issues.join('\n'))
  process.exitCode = 1
} else
  console.log(
    `[route-contract] ${declarations.size} routes and ${menus.length} menu entries respect canonical policies.`
  )
