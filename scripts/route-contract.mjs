import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const property = (node, name) =>
  node.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText().replace(/['"]/g, '') === name)
    ?.initializer
const string = (node) => (node && ts.isStringLiteral(node) ? node.text : undefined)
const absolute = (parent, current) => (current.startsWith('/') ? current : `${parent}/${current}`.replace(/\/+/g, '/'))

/** Read declarative route data without executing JSX, pages, or browser-dependent services. */
export function collectRouteDeclarations() {
  const directory = path.join(root, 'src/routers/modules')
  const routes = []
  for (const file of fs.readdirSync(directory).filter((name) => name.endsWith('.routes.tsx'))) {
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(path.join(directory, file), 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    )
    const visitRoute = (node, parent = '') => {
      if (!ts.isObjectLiteralExpression(node)) return
      const relativePath = string(property(node, 'path'))
      const index = property(node, 'index')?.kind === ts.SyntaxKind.TrueKeyword
      const fullPath = relativePath ? absolute(parent, relativePath) : parent || '/'
      const meta = property(node, 'meta')
      routes.push({
        path: fullPath,
        index,
        file: `src/routers/modules/${file}`,
        name:
          string(property(node, 'name')) ||
          (meta && ts.isObjectLiteralExpression(meta) ? string(property(meta, 'title')) : undefined),
        i18nKey: string(property(node, 'i18nKey')),
      })
      const children = property(node, 'children')
      if (children && ts.isArrayLiteralExpression(children))
        children.elements.forEach((child) => visitRoute(child, fullPath))
    }
    const walk = (node) => {
      if (ts.isVariableDeclaration(node) && node.initializer && /(?:Routes|Route)$/.test(node.name.getText())) {
        if (ts.isArrayLiteralExpression(node.initializer)) node.initializer.elements.forEach((item) => visitRoute(item))
        else if (ts.isObjectLiteralExpression(node.initializer)) visitRoute(node.initializer)
        return
      }
      ts.forEachChild(node, walk)
    }
    walk(source)
  }
  return routes
}

export function collectMenuDeclarations() {
  const file = 'src/layouts/navigation/menu.config.tsx'
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(path.join(root, file), 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  )
  const menus = []
  const walk = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const menuPath = string(property(node, 'path'))
      if (menuPath)
        menus.push({
          path: menuPath,
          title: string(property(node, 'label')),
          i18nKey: string(property(node, 'i18nKey')),
          group: Boolean(property(node, 'children')),
        })
    }
    ts.forEachChild(node, walk)
  }
  walk(source)
  return menus
}
