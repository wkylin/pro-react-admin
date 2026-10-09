import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const registryPath = path.resolve(__dirname, '../src/projects/registry.json')
export const projectRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf8'))
export const mfeProtocolVersion = projectRegistry.mfeProtocolVersion

export const remoteProjects = projectRegistry.remotes

function toSafeName(name) {
  const safe = name.replace(/[^a-zA-Z0-9_]/g, '_')
  return /^[0-9]/.test(safe) ? 'app_' + safe : safe
}

function validateRemoteUrl(value, { isDev, allowRelative, name }) {
  const raw = String(value || '').trim()
  if (!raw) throw new Error('[mfe.config] Missing remote URL for ' + name)

  if (allowRelative && raw.startsWith('/') && !raw.startsWith('//')) {
    if (!raw.split('?')[0].endsWith('/remoteEntry.js')) {
      throw new Error('[mfe.config] Remote URL must point to remoteEntry.js: ' + name)
    }
    return raw
  }

  let parsed
  try {
    parsed = new URL(raw)
  } catch {
    throw new Error('[mfe.config] Invalid URL for ' + name + ': expected an absolute HTTP(S) URL')
  }

  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
    throw new Error('[mfe.config] Invalid URL for ' + name + ': only credential-free HTTP(S) URLs are allowed')
  }
  if (!parsed.pathname.endsWith('/remoteEntry.js')) {
    throw new Error('[mfe.config] Remote URL must point to remoteEntry.js: ' + name)
  }
  if (!isDev && parsed.protocol !== 'https:') {
    throw new Error('[mfe.config] Production remote URLs must use HTTPS: ' + name)
  }

  return parsed.toString()
}

function getRemoteUrl(project, isDev) {
  const override = project.envKey ? process.env[project.envKey] : ''
  if (override) {
    return validateRemoteUrl(override, {
      isDev,
      allowRelative: false,
      name: project.name,
    })
  }

  return validateRemoteUrl(isDev ? project.devUrl : project.prodPath, {
    isDev,
    allowRelative: !isDev,
    name: project.name,
  })
}

function createRemoteLoader(project, url) {
  const globalNames = Array.from(new Set([project.name, toSafeName(project.name)]))
  const missingContainerMessage = JSON.stringify('Remote container not found after loading ' + project.name)
  const loadFailureMessage = JSON.stringify('Failed to load remote entry for ' + project.name)
  const timeoutMessage = JSON.stringify('Timed out loading remote entry for ' + project.name)
  const manifestFailureMessage = JSON.stringify('Remote manifest is missing or incompatible for ' + project.name)

  return [
    'promise new Promise((resolve, reject) => {',
    '  const globalNames = ' + JSON.stringify(globalNames) + ';',
    '  const remoteUrl = ' + JSON.stringify(url) + ';',
    '  const findContainer = () => globalNames.map((name) => window[name]).find(Boolean);',
    '  const existingContainer = findContainer();',
    '  if (existingContainer) return resolve(existingContainer);',
    '  let settled = false;',
    '  let retryTimer;',
    '  let activeScript;',
    '  const controller = new AbortController();',
    '  const finish = (error, container) => {',
    '    if (settled) return;',
    '    settled = true;',
    '    window.clearTimeout(timer);',
    '    window.clearTimeout(retryTimer);',
    '    if (activeScript) { activeScript.onload = null; activeScript.onerror = null; }',
    '    if (error) { activeScript?.remove(); reject(error); }',
    '    else resolve(container);',
    '  };',
    '  const timer = window.setTimeout(() => { controller.abort(); finish(new Error(' + timeoutMessage + ')); }, 15000);',
    '  const loadAttempt = (attempt) => {',
    '    const manifestUrl = new URL(remoteUrl, document.baseURI);',
    '    manifestUrl.pathname = manifestUrl.pathname.replace(/remoteEntry\\.js$/, "remote-manifest.json");',
    '    manifestUrl.search = "";',
    '    fetch(manifestUrl.href, { cache: "no-store", credentials: "omit", signal: controller.signal })',
    '      .then((response) => { if (!response.ok) throw new Error(' + manifestFailureMessage + '); return response.json(); })',
    '      .then((manifest) => {',
    '        if (manifest?.schemaVersion !== 1 || manifest?.name !== ' + JSON.stringify(project.name) + ' || manifest?.protocolVersion !== ' + Number(mfeProtocolVersion) + ') {',
    '          throw new Error(' + manifestFailureMessage + ');',
    '        }',
    '        return new Promise((resolveAttempt, rejectAttempt) => {',
    '          const script = document.createElement("script");',
    '          activeScript = script;',
    '          script.src = remoteUrl;',
    '          script.async = true;',
    '          script.crossOrigin = "anonymous";',
    '          script.onload = () => {',
    '            const container = findContainer();',
    '            if (container) resolveAttempt(container);',
    '            else rejectAttempt(new Error(' + missingContainerMessage + '));',
    '          };',
    '          script.onerror = () => rejectAttempt(new Error(' + loadFailureMessage + '));',
    '          document.head.appendChild(script);',
    '        });',
    '      })',
    '      .then((container) => finish(null, container))',
    '      .catch((error) => {',
    '        activeScript?.remove();',
    '        if (settled) return;',
    '        if (attempt < 2) retryTimer = window.setTimeout(() => loadAttempt(attempt + 1), 250);',
    '        else finish(error);',
    '      });',
    '  };',
    '  loadAttempt(1);',
    '})',
  ].join('\n')
}

export function generateRemotesConfig(isDev = false) {
  return Object.fromEntries(
    remoteProjects.map((project) => [project.name, createRemoteLoader(project, getRemoteUrl(project, isDev))])
  )
}
