'use strict'

let core = {}

const validator = require('validator')
const crypto = require('crypto')

core.signup = (input) => {
  return new Promise((resolve, reject) => {
    let user = {}

    if (!input) {
      return reject('no user')
    }

    if (input.name.split(' ').length <= 1) {
      return reject('no last name')
    }

    if (input.password !== input.passwordRepeat) {
      return reject('password mismatch')
    }

    if (!validator.isEmail(input.email)) {
      return reject('no valid email')
    }

    user.firstName = input.name.split(' ')[0]
    user.lastName = input.name.split(' ')[1]
    user.email = input.email
    user.password = crypto
      .createHash('sha256')
      .update(input.password)
      .digest('base64')

    return resolve(user)
  })
}

module.exports = core
