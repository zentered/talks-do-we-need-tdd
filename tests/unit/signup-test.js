'use strict'

const test = require('tape')
const core = require('../../core')

test('core.signup() function output type', assert => {
  const actual = core.signup() instanceof Promise
  const expected = true

  assert.equal(actual, expected,
    'core.signup() should return a Promise.')
  assert.end()
})

test('core.signup() fails with missing input', assert => {
  const expected = 'no user'

  core.signup().catch(error => {
    assert.equal(error, expected)
    assert.end()
  })
})

test('core.signup() fails with mismatching passwords', assert => {
  const expected = 'no last name'

  core.signup({
    name: 'John'
  }).catch(error => {
    assert.equal(error, expected)
    assert.end()
  })
})

test('core.signup() fails with mismatching passwords', assert => {
  const expected = 'password mismatch'

  core.signup({
    name: 'John Doe',
    password: 'hello',
    passwordRepeat: 'world'
  }).catch(error => {
    assert.equal(error, expected)
    assert.end()
  })
})

test('core.signup() fails with invalid email', assert => {
  const expected = 'no valid email'

  core.signup({
    name: 'John Doe',
    password: 'hello',
    passwordRepeat: 'hello',
    email: 'notvalid'
  }).catch(error => {
    assert.equal(error, expected)
    assert.end()
  })
})

test('core.signup() returns user object', assert => {
  const expected = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com'
  }

  core.signup({
    name: 'John Doe',
    password: 'hello',
    passwordRepeat: 'hello',
    email: 'john@doe.com'
  })
    .then(actual => {
      assert.equal(actual.firstName, expected.firstName)
      assert.equal(actual.lastName, expected.lastName)
      assert.equal(actual.email, expected.email)
      assert.ok(actual.password)
      assert.end()
    })
    .catch(error => {
      assert.fail(error)
    })
})
