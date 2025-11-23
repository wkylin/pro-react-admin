const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '../src')

function readFile(filepath) {
  try {
    return fs.readFileSync(filepath, 'utf8')
  } catch (e) {
    return ''
  }
}

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const full = path.join(dir, file)
    if (fs.statSync(full).isDirectory()) {
      walk(full, fileList)
    } else if (/\.jsx?$/.test(full) || /\.tsx?$/.test(full) || /\.ts$/.test(full)) {
      fileList.push(full)
    }
  })
  return fileList
}

function extractRoutesFromFile(content) {
  const routes = new Set()
  // 匹配 key: '/path' 或 key: "/path"
  const keyRegex = /key\s*:\s*['`\"]([^'`\"]+)['`\"]/g
  let m
  while ((m = keyRegex.exec(content)) !== null) {
    routes.add(m[1])
  }
  // 匹配 path: '/path' 或 path: 'qrcode' etc.
  const pathRegex = /path\s*:\s*['`\"]([^'`\"]+)['`\"]/g
  while ((m = pathRegex.exec(content)) !== null) {
    routes.add(m[1])
  }
  // 也尝试捕获 literal strings that look like absolute paths
  const absRegex = /['`\"](\/[^'`\"]+)['`\"]/g
  while ((m = absRegex.exec(content)) !== null) {
    routes.add(m[1])
  }
  return Array.from(routes)
}

// parse routePermissionMap from mock/permission.ts
function parseRoutePermissionMap(content) {
  const map = {}
  const start = content.indexOf('export const routePermissionMap')
  if (start === -1) return map
  const braceStart = content.indexOf('{', start)
  if (braceStart === -1) return map
  // naive find matching brace
  let i = braceStart
  let depth = 0
  let end = -1
  for (; i < content.length; i++) {
    if (content[i] === '{') depth++
    else if (content[i] === '}') {
      depth--
      if (depth === 0) {
        end = i
        break
      }
    }
  }
  if (end === -1) return map
  const objText = content.slice(braceStart + 1, end)
  // match lines like '/path': 'perm', or "/path": 'perm', or key: 'perm'
  const lineRegex = /['`\"]?([^'`\":\s]+)['`\"]?\s*:\s*['`\"]([^'`\"]+)['`\"]/g
  let m
  while ((m = lineRegex.exec(objText)) !== null) {
    const k = m[1]
    const v = m[2]
    // normalize keys that are like /coupons/edit/:id -> keep as-is
    map[k] = v
  }
  return map
}

function main() {
  const files = walk(path.join(root, 'routers'))
  const allRoutes = new Set()
  files.forEach((file) => {
    const content = readFile(file)
    const found = extractRoutesFromFile(content)
    found.forEach((r) => allRoutes.add(r))
  })

  // also scan pages for absolute paths used in links
  const pageFiles = walk(path.join(root, 'pages'))
  pageFiles.forEach((file) => {
    const content = readFile(file)
    const found = extractRoutesFromFile(content)
    found.forEach((r) => allRoutes.add(r))
  })

  const permissionMock = readFile(path.join(root, 'mock', 'permission.ts'))
  const routePermissionMap = parseRoutePermissionMap(permissionMock)

  const allRoutesArr = Array.from(allRoutes).sort()
  const mappedKeys = Object.keys(routePermissionMap).sort()

  const unmapped = allRoutesArr.filter((r) => !mappedKeys.includes(r))
  const stale = mappedKeys.filter((k) => !allRoutesArr.includes(k))

  const report = {
    scannedFilesCount: files.length + pageFiles.length,
    discoveredRoutesCount: allRoutesArr.length,
    discoveredRoutes: allRoutesArr,
    mappedKeysCount: mappedKeys.length,
    mappedKeys: mappedKeys,
    unmappedRoutes: unmapped,
    staleMappedKeys: stale,
    timestamp: new Date().toISOString(),
  }

  const outPath = path.join(__dirname, 'route-permission-report.json')
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8')
  console.log('Report written to', outPath)
}

main()
