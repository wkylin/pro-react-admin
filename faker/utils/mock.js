// https://fakercloud.com/
// https://www.npmjs.com/package/faker
// https://www.npmjs.com/package/better-mock

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const Mock = require('better-mock')
const { Random } = Mock
Random.extend({
  mobile() {
    const phonePrefixs = ['132', '135', '189']
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  },
  shops() {
    const shops = ['Mini小店', '麒麟店', '双子店']
    return this.pick(shops)
  },
})

export { Mock, Random }
