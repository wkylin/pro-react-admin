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
  const directory = path.join(root, 'src/app/routing/modules')
  const featureDirectory = path.join(root, 'src/features')
  const files = [
    ...fs
      .readdirSync(directory)
      .filter((name) => name.endsWith('.routes.tsx'))
      .map((name) => path.join(directory, name)),
    ...fs
      .readdirSync(featureDirectory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(featureDirectory, entry.name, 'routes.tsx'))
      .filter((file) => fs.existsSync(file)),
  ]
  const routes = []
  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(file, 'utf8'),
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
        file: path.relative(root, file).split(path.sep).join('/'),
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
  const policies = JSON.parse(fs.readFileSync(path.join(root, 'config/route-policy.json'), 'utf8'))
  return Object.entries(policies)
    .filter(([, policy]) => policy.menu)
    .map(([path, policy]) => ({
      path,
      title: policy.title,
      i18nKey: policy.i18nKey,
      group: Boolean(policy.menuGroup),
      parent: policy.menu.parent,
      order: policy.menu.order,
      icon: policy.menu.icon,
    }))
}
