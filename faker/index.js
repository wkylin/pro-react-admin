// faker server (ESM)
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import portfinder from 'portfinder'

import shops from './shops/index.js'
import user from './app/index.js'

const app = new Koa()
const router = new Router()
app.use(bodyParser())
app.use(cors())

router.use('/shops', shops.routes())
router.use('/app', user.routes())

app.use(router.routes()).use(router.allowedMethods())

portfinder.getPort(
  {
    port: 4000,
    stopPort: 65535,
  },
  (err, port) => {
    if (err) {
      return
    }
    app.listen(port, 'localhost', (error, result) => {
      if (error) {
        console.log(error)
      }
      console.log('result', result)
      console.log(`Listening at localhost:${port}`)
    })
  }
)
