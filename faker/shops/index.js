import Router from 'koa-router'
import { Mock, Random } from '../utils/index.js'

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

export default shops
