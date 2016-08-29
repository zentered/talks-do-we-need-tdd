'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const log = require('./libs/log')
const api = express()

api.set('port', process.env.PORT || 3000)
api.use(bodyParser.urlencoded({
  extended: false
}))
api.use(bodyParser.json())

// pretty print json output
api.set('json spaces', 2)

api.use('/', require('./http'))

// don't listen in test mode
if (require.main === module) {
  api.listen(3000, function () {
    log.info('API is listening on port 3000!')
  })
}

module.exports = api
