/*
 Inserts a <base href="..."> tag into storybook-static/index.html when STORYBOOK_BASE_HREF env var is set.
 This avoids changing dev server behavior and only affects built files.

 Usage: set env var STORYBOOK_BASE_HREF (e.g. /pro-react-admin/storybook/) then run build-storybook.
*/
const fs = require('fs');
const path = require('path');

const outDir = path.resolve(process.cwd(), 'storybook-static');
const indexPath = path.join(outDir, 'index.html');

const baseHref = process.env.STORYBOOK_BASE_HREF;

if (!baseHref) {
  console.log('No STORYBOOK_BASE_HREF provided, skipping base href insertion.');
  process.exit(0);
}

if (!fs.existsSync(indexPath)) {
  console.error(`Cannot find ${indexPath}. Did you run build-storybook?`);
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

if (html.includes(`<base href="${baseHref}">`)) {
  console.log('Base href already inserted.');
  process.exit(0);
}

// Insert <base> just after opening <head>
const replaced = html.replace(/<head(.*?)>/i, (m) => {
  return m + `\n  <base href="${baseHref}">`;
});

fs.writeFileSync(indexPath, replaced, 'utf8');
console.log(`Inserted <base href="${baseHref}"> into ${indexPath}`);
process.exit(0);
