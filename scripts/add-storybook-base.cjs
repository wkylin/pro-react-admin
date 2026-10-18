// Built files only; the local dev server keeps its native base path.
const fs = require('node:fs')
const path = require('node:path')
const baseHref = process.env.STORYBOOK_BASE_HREF
if (!baseHref) {
  console.log('No STORYBOOK_BASE_HREF provided; keeping relative Storybook asset URLs.')
  process.exit(0)
}
if (!/^\/(?:[A-Za-z0-9_.-]+\/)*$/.test(baseHref) || baseHref.includes('/../')) {
  throw new Error('STORYBOOK_BASE_HREF must be an absolute site path ending in /')
}
for (const file of ['index.html', 'iframe.html']) {
  const filename = path.resolve('storybook-static', file)
  const html = fs.readFileSync(filename, 'utf8').replace(/\s*<base\s[^>]*>/gi, '')
  fs.writeFileSync(
    filename,
    html.replace(/<head(.*?)>/i, (head) => `${head}\n<base href="${baseHref}">`)
  )
}
console.log(`Set manager and preview base to ${baseHref}`)
