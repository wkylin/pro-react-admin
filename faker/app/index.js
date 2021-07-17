const delay = require('../utils/index')
const Router = require('koa-router')

const user = new Router()

user.get('/api/user/list', async (ctx) => {
  // ctx.response.status = 500;
  // ctx.type = 'multipart/form-data'
  // ctx.type = 'application/octet-stream'
  // ctx.body = 'Hello, Koa!'
  // async function delay(time) {
  //   return new Promise(function (resolve, reject) {
  //     setTimeout(function () {
  //       resolve()
  //     }, time)
  //   })
  // }
  await delay(30000)
  ctx.body = [{ name: 'wkylin', sex: 'man', age: 18 }]
})

module.exports = user
