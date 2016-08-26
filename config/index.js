'use strict'
let config

if (process.env.NODE_ENV === 'test') {
  config = require('./test')
} else {
  config = require('./dev')
}

config.env = process.env.NODE_ENV || 'development'

module.exports = exports = config
