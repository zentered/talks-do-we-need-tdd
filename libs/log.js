'use strict'

const config = require('../config')
const bunyan = require('bunyan')

/* eslint-disable new-cap */
let log = new bunyan.createLogger({
  name: 'api',
  streams: [{
    stream: process.stdout,
    level: config.logLevel
  }],
  serializers: {
    req: (req) => {
      return {
        method: req.method,
        url: req.url
      }
    },
    res: (res) => {
      return {
        status: res.status,
        method: res.method,
        url: res.url
      }
    }
  }
})
/*
 eslint-enable new-cap */

module.exports = exports = log
