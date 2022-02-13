// import Koa from 'koa' package.json type: module
// Within a package, the package.json "type" field defines how Node.js should interpret .js files. If a package.json file does not have a "type" field, .js files are treated as CommonJS.
// A package.json "type" value of "module" tells Node.js to interpret .js files within that package as using ES module syntax.
// https://demopark.github.io/koa-docs-Zh-CN

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const portfinder = require('portfinder')

const app = new Koa()
const router = new Router()
app.use(bodyParser())
app.use(cors())

const shops = require('./shops')
const user = require('./app')

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
