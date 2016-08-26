'use strict'

const test = require('tape')
const core = require('../../core')

test('core.signup() returns a Promise', assert => {
  const actual = core.signup() instanceof Promise
  const expected = true

  assert.equal(actual, expected,
    'core.signup() should return a Promise.')
  assert.end()
})

test('core.signup() should fail, with missing input', assert => {
  const expected = 'no user'

  core.signup().catch(error => {
    assert.equal(error, expected)
    assert.end()
  })
})

test('core.signup() should fail, with missing last name', assert => {
  const expected = 'no last name'

  core.signup({
    name: 'John'
  }).catch(error => {
    assert.equal(error, expected)
    assert.end()
  })
})

test('core.signup() should fail, with invalid email', assert => {
  const expected = 'no valid email'

  core.signup({
    name: 'John Doe',
    password: 'hello',
    passwordRepeat: 'hello',
    email: 'invalid'
  }).catch(error => {
    assert.equal(error, expected)
    assert.end()
  })
})

test('core.signup() should fail, with invalid password', assert => {
  const expected = 'password mismatch'

  core.signup({
    name: 'John Doe',
    password: 'hello',
    passwordRepeat: 'hello2',
    email: 'jane@doe.com'
  }).catch(error => {
    assert.equal(error, expected)
    assert.end()
  })
})

test('core.signup() should work', assert => {
  const expected = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@doe.com'
  }

  core.signup({
    name: 'Jane Doe',
    password: 'hello',
    passwordRepeat: 'hello',
    email: 'jane@doe.com'
  })
  .then(actual => {
    assert.equal(actual.firstName, expected.firstName)
    assert.end()
  })
  .catch(error => {
    assert.fail(error)
  })
})
