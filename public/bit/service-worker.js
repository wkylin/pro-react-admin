if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js')
      let s = Promise.resolve()
      return (
        r[e] ||
          (s = new Promise(async (s) => {
            if ('document' in self) {
              const r = document.createElement('script')
              ;(r.src = e), document.head.appendChild(r), (r.onload = s)
            } else importScripts(e), s()
          })),
        s.then(() => {
          if (!r[e]) throw new Error(`Module ${e} didn’t register its module`)
          return r[e]
        })
      )
    },
    s = (s, r) => {
      Promise.all(s.map(e)).then((e) => r(1 === e.length ? e[0] : e))
    },
    r = { require: Promise.resolve(s) }
  self.define = (s, i, t) => {
    r[s] ||
      (r[s] = Promise.resolve().then(() => {
        let r = {}
        const n = { uri: location.origin + s.slice(1) }
        return Promise.all(
          i.map((s) => {
            switch (s) {
              case 'exports':
                return r
              case 'module':
                return n
              default:
                return e(s)
            }
          })
        ).then((e) => {
          const s = t(...e)
          return r.default || (r.default = s), r
        })
      }))
  }
}
define('./service-worker.js', ['./workbox-cddd5cf8'], function (e) {
  'use strict'
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting()
  }),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/index.html', revision: 'aaac6473a3e4d9fd16d6b13c023b59ef' },
        { url: '/static/css/984.ee3cddd9.css', revision: null },
        { url: '/static/js/984.8a5d8ff4.js', revision: null },
        { url: '/static/js/984.8a5d8ff4.js.LICENSE.txt', revision: 'd62f274bb3724dbf6c8cb284ac59449b' },
        { url: '/static/js/main.e3ff8188.js', revision: null },
        { url: '/static/js/runtime-main.70313f8f.js', revision: null },
      ],
      {}
    ),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL('public/index.html'), { denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/] })
    )
})
