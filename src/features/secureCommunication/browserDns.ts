// @xmpp/client imports optional DNS discovery for Node. Browser connections here always
// supply an explicit ws(s) URL, so DNS discovery must never be called.
const unavailable = (): never => {
  throw new Error('XMPP DNS discovery is unavailable in the browser')
}

export default { lookup: unavailable, resolveSrv: unavailable }
