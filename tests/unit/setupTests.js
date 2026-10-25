require('@testing-library/jest-dom')
const { TextEncoder, TextDecoder } = require('node:util')
globalThis.TextEncoder ??= TextEncoder
globalThis.TextDecoder ??= TextDecoder

// Ensure React is available globally for transformed JSX/runtime in tests
globalThis.React = require('react')
