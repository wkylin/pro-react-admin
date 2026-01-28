/**
 * jscodeshift codemod to wrap lucide-react icons with AnimatedIcon
 * Usage: npx jscodeshift -t tools/jscodeshift/wrap-lucide-icons.js src --extensions=js,jsx,ts,tsx
 */

export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  // find import from 'lucide-react'
  const lucideImports = root.find(j.ImportDeclaration, { source: { value: 'lucide-react' } })
  if (lucideImports.size() === 0) return null

  const iconNames = []
  lucideImports.forEach((p) => {
    p.node.specifiers.forEach((s) => {
      if (s.type === 'ImportSpecifier') {
        iconNames.push(s.local.name)
      }
    })
  })

  if (iconNames.length === 0) return null

  // ensure AnimatedIcon is imported
  const hasAnimatedImport = root.find(j.ImportDeclaration, { source: { value: '@stateless/AnimatedIcon' } }).size() > 0
  if (!hasAnimatedImport) {
    const firstImport = root.find(j.ImportDeclaration).at(0)
    if (firstImport.size() > 0) {
      firstImport.insertBefore(
        j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier('AnimatedIcon'))],
          j.literal('@stateless/AnimatedIcon')
        )
      )
    } else {
      root
        .get()
        .node.program.body.unshift(
          j.importDeclaration(
            [j.importDefaultSpecifier(j.identifier('AnimatedIcon'))],
            j.literal('@stateless/AnimatedIcon')
          )
        )
    }
  }

  // wrap JSXElements
  root.find(j.JSXElement).forEach((p) => {
    const opening = p.node.openingElement
    const name = opening.name
    if (name && name.type === 'JSXIdentifier' && iconNames.includes(name.name)) {
      // skip if already wrapped by AnimatedIcon
      let parent = p.parentPath
      while (parent && parent.node) {
        if (
          parent.node.type === 'JSXElement' &&
          parent.node.openingElement.name &&
          parent.node.openingElement.name.type === 'JSXIdentifier' &&
          parent.node.openingElement.name.name === 'AnimatedIcon'
        )
          return
        parent = parent.parentPath
      }

      // create wrapper
      const iconElement = p.node
      const wrapper = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('AnimatedIcon'), [
          j.jsxAttribute(j.jsxIdentifier('variant'), j.literal('spin')),
          j.jsxAttribute(j.jsxIdentifier('mode'), j.literal('hover')),
        ]),
        j.jsxClosingElement(j.jsxIdentifier('AnimatedIcon')),
        [iconElement]
      )

      j(p).replaceWith(wrapper)
    }
  })

  // also handle self-closing icons <Icon /> which are JSXElement with selfClosing true already covered above

  return root.toSource({ quote: 'single' })
}
