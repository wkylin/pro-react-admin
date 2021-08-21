// https://fakercloud.com/
// https://www.npmjs.com/package/faker
// https://www.npmjs.com/package/mockjs

const Mock = require('mockjs')
const Random = Mock.Random
Random.extend({
  mobile: function () {
    const phonePrefixs = ['132', '135', '189']
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  },
  shops: function () {
    const shops = ['Mini小店', '屏西店', '双子店']
    return this.pick(shops)
  },
})

module.exports = {
  Mock,
  Random,
}
