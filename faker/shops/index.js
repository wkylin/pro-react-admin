const Router = require('koa-router')

const shops = new Router()

const handler = (ctx) => {
  ctx.body = [
    {
      shopId: 1,
      shopName: '屏西店',
    },
  ]
  // ctx.body = {
  //   code: 41002,
  //   data: null,
  //   message: ''
  // }
}

shops.get('/', handler)
shops.post('/', handler)

module.exports = shops
