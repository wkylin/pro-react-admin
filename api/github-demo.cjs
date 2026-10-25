const express = require('express')
const { createHandler } = require('../server/github-oauth.cjs')

function createRouter(options) {
  const router = express.Router()
  const handle = createHandler(options)
  router.all('/:action', (request, response, next) => {
    Promise.resolve(handle(request, response, request.params.action)).catch(next)
  })
  return router
}

module.exports = { createRouter }
