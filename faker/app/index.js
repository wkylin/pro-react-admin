const Router = require('koa-router')
const { delay } = require('../utils/index')

const user = new Router()

user.get('/api/user/list', async (ctx) => {
  // ctx.response.status = 500
  // ctx.type = 'multipart/form-data'
  // ctx.type = 'application/octet-stream'
  // ctx.body = 'Hello, Koa!'
  await delay(30000)
  ctx.body = [{ name: 'wkylin', sex: 'man', age: 18 }]
})

module.exports = user
