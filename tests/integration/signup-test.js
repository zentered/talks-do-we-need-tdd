'use strict'

const test = require('tape')
const request = require('supertest')
const api = require('../../api')

test('GET / should work', assert => {
  const expected = {
    'hello': 'world'
  }

  request(api)
  .get('/')
  .end((error, res) => {
    let actual = res.body
    if (error) {
      assert.fail(error)
    }
    assert.deepEqual(actual, expected)
    assert.end()
  })
})

test('GET / should work', assert => {
  const expected = 200

  request(api)
  .get('/signup')
  .end((error, res) => {
    if (error) {
      assert.fail(error)
    }
    assert.equal(res.status, expected)
    assert.end()
  })
})
