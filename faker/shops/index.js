const Router = require('koa-router')
const { Mock, Random } = require('../utils/index')

const shops = new Router()

const handler = (ctx) => {
  const mockData = Mock.mock({
    'shopList|1-4': [
      {
        'shopId|+1': 1,
        shopImage: Random.image('200x100', '#894FC4', '#FFF', 'png', '!'),
        shopMobile: '@mobile',
        shopName: '@shops',
      },
    ],
  })
  // ctx.status = 502
  ctx.body = mockData.shopList

  // ctx.body = {
  //   code: 41002,
  //   data: null,
  //   message: '',
  //   now: new Date().getTime(),
  // }
}

shops.get('/', handler)
shops.post('/', handler)

module.exports = shops
