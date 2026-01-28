/**
 * jscodeshift codemod to wrap @ant-design/icons icons with AnimatedIcon
 * Usage (dry-run): npx jscodeshift -t tools/jscodeshift/wrap-ant-icons.js src --extensions=js,jsx,ts,tsx -d -p --parser=tsx
 */

export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  const ANT_SOURCE = '@ant-design/icons'
  const ANIMATED_IMPORT = '@stateless/AnimatedIcon'

  // find import from '@ant-design/icons'
  const antImports = root.find(j.ImportDeclaration, { source: { value: ANT_SOURCE } })
  if (antImports.size() === 0) return null

  const iconNames = []
  antImports.forEach((p) => {
    p.node.specifiers.forEach((s) => {
      if (s.type === 'ImportSpecifier') {
        iconNames.push(s.local.name)
      }
    })
  })

  if (iconNames.length === 0) return null

  // ensure AnimatedIcon is imported
  const hasAnimatedImport = root.find(j.ImportDeclaration, { source: { value: ANIMATED_IMPORT } }).size() > 0
  if (!hasAnimatedImport) {
    const firstImport = root.find(j.ImportDeclaration).at(0)
    if (firstImport.size() > 0) {
      firstImport.insertBefore(
        j.importDeclaration([j.importDefaultSpecifier(j.identifier('AnimatedIcon'))], j.literal(ANIMATED_IMPORT))
      )
    } else {
      root
        .get()
        .node.program.body.unshift(
          j.importDeclaration([j.importDefaultSpecifier(j.identifier('AnimatedIcon'))], j.literal(ANIMATED_IMPORT))
        )
    }
  }

  // Wrap JSXElements that match imported icon names
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

  // Also handle self-closing JSX (though JSXElement covers them as well)
  root.find(j.JSXSelfClosingElement).forEach((p) => {
    const name = p.node.openingElement ? p.node.openingElement.name : p.node.name
    if (name && name.type === 'JSXIdentifier' && iconNames.includes(name.name)) {
      // skip if already wrapped
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

      const sc = p.node
      const wrapper = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('AnimatedIcon'), [
          j.jsxAttribute(j.jsxIdentifier('variant'), j.literal('spin')),
          j.jsxAttribute(j.jsxIdentifier('mode'), j.literal('hover')),
        ]),
        j.jsxClosingElement(j.jsxIdentifier('AnimatedIcon')),
        [sc]
      )
      j(p).replaceWith(wrapper)
    }
  })

  return root.toSource({ quote: 'single' })
}
