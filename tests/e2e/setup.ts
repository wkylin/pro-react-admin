import { webcrypto } from 'crypto'

// Polyfill for TransformStream and other Web APIs
if (typeof globalThis.TransformStream === 'undefined') {
  globalThis.TransformStream = require('web-streams-polyfill').TransformStream
}

if (typeof globalThis.WritableStream === 'undefined') {
  globalThis.WritableStream = require('web-streams-polyfill').WritableStream
}

if (typeof globalThis.ReadableStream === 'undefined') {
  globalThis.ReadableStream = require('web-streams-polyfill').ReadableStream
}

if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = webcrypto as any
}