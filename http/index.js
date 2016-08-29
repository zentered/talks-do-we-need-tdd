'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const core = require('../core')
const log = require('../libs/log')

router.get('/', (req, res) => {
  res.json({
    hello: 'world'
  })
})

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'tests', 'html') + '/signup.html')
})

router.post('/signup', (req, res) => {
  log.debug(`${req.method} ${req.url}`)

  if (!req.body.name) {
    log.error('no name')
    return res.status(400)
      .send('missing name')
  }

  if (!req.body.email) {
    log.error('empty email')
    return res.status(400)
      .send('missing email')
  }

  if (!req.body.password || !req.body.passwordRepeat) {
    log.error('empty password')
    return res.status(400)
      .send('missing password')
  }

  if (req.body.password !== req.body.passwordRepeat) {
    log.error('password mismatch')
    return res.status(400)
      .send('password mismatch')
  }

  return core.signup(req.body)
    .then(user => {
      res.json(user)
    })
    .catch(error => {
      res.status(400).send({
        status: 400,
        text: error
      })
    })
})

module.exports = router
