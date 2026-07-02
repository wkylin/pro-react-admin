/// <reference lib="WebWorker" />

import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { ExpirationPlugin, NetworkFirst, Serwist, StaleWhileRevalidate, type RuntimeCaching } from 'serwist'

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const runtimeCaching: RuntimeCaching[] = [
  {
    matcher: ({ request }) => request.mode === 'navigate',
    handler: new NetworkFirst({
      cacheName: 'pages',
      networkTimeoutSeconds: 3,
    }),
  },
  {
    matcher: ({ request }) =>
      request.destination === 'style' || request.destination === 'script' || request.destination === 'worker',
    handler: new StaleWhileRevalidate({
      cacheName: 'static-resources',
    }),
  },
  {
    matcher: ({ request }) => request.destination === 'image' || request.destination === 'font',
    handler: new StaleWhileRevalidate({
      cacheName: 'media-resources',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 120,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        }),
      ],
    }),
  },
]

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: false,
  clientsClaim: false,
  navigationPreload: true,
  runtimeCaching,
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    void self.skipWaiting()
  }
})

serwist.addEventListeners()
